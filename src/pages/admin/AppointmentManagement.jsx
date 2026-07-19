import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClipboardCheck, FaFilter, FaPlus, FaTimes, FaDownload } from 'react-icons/fa';
import { getCollection, setDocument, addDocument } from '../../services/db';
import { timeSlots } from '../../constants/data';
import { useForm } from 'react-hook-form';
import { useHospitalInfo } from '../../hooks/useHospitalInfo';

const statusColors = { Pending: 'bg-amber-100 text-amber-700', Confirmed: 'bg-emerald-100 text-emerald-700', Completed: 'bg-blue-100 text-blue-700', Cancelled: 'bg-red-100 text-red-700' };
const statusFilters = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModalApt, setConfirmModalApt] = useState(null);
  const { info: hospitalInfo } = useHospitalInfo();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await getCollection('appointments');
      // Sort by date descending
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
    setLoading(false);
  };

  const fetchDoctors = async () => {
    try {
      const data = await getCollection('doctors');
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const filtered = statusFilter === 'All' ? appointments : appointments.filter(a => a.status === statusFilter);

  const updateStatus = async (apt, newStatus, sendWa = false) => {
    try {
      await setDocument('appointments', apt.id, { ...apt, status: newStatus });
      fetchAppointments();
      
      if (newStatus === 'Confirmed' && sendWa) {
        const phone = apt.phone || apt.mobile;
        if (phone) {
          let formattedPhone = phone.replace(/\D/g, '');
          if (formattedPhone.length === 10) formattedPhone = '91' + formattedPhone;
          
          const patientName = apt.patientName || apt.patient || 'Patient';
          
          let message = hospitalInfo.waConfirmTemplate;
          
          if (message) {
            // Replace placeholders
            message = message
              .replace(/{hospitalName}/g, hospitalInfo.name || 'CareFirst Hospital')
              .replace(/{patientName}/g, patientName)
              .replace(/{doctor}/g, apt.doctor || 'Our Doctor')
              .replace(/{date}/g, apt.date || 'TBD')
              .replace(/{time}/g, apt.time || 'TBD')
              .replace(/{reason}/g, apt.symptoms || apt.reason ? `🤒 *Reason:* ${apt.symptoms || apt.reason}` : '')
              .replace(/{address}/g, hospitalInfo.address || 'Hospital Address')
              .replace(/{phone}/g, hospitalInfo.phone || 'N/A');
          } else {
            // Fallback message
            message = `🏥 *${hospitalInfo.name || 'CareFirst Hospital'}*
━━━━━━━━━━━━━━━━━━
🎉 *APPOINTMENT CONFIRMED*
━━━━━━━━━━━━━━━━━━

Dear *${patientName}*,

Your appointment has been successfully booked and confirmed. Please find the details below:

🩺 *Doctor:* ${apt.doctor || 'Our Doctor'}
📅 *Date:* ${apt.date || 'TBD'}
🕐 *Time:* ${apt.time || 'TBD'}
${apt.symptoms || apt.reason ? `🤒 *Reason:* ${apt.symptoms || apt.reason}\n` : ''}
━━━━━━━━━━━━━━━━━━
📍 *Address:* ${hospitalInfo.address || 'Hospital Address'}
📞 *Help Desk:* ${hospitalInfo.phone || 'N/A'}
━━━━━━━━━━━━━━━━━━
_Please arrive 10 minutes before your scheduled time. We wish you good health!_ 🙏`;
          }
          
          window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, '_blank');
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const onSubmit = async (data) => {
    try {
      const appointmentData = {
        patientName: data.patientName,
        phone: data.phone,
        doctor: data.doctor,
        date: data.date,
        time: data.time,
        symptoms: data.symptoms,
        gender: data.gender,
        age: data.age,
        status: 'Confirmed', // Admin books it directly as Confirmed
        createdAt: new Date().toISOString(),
        bookedBy: 'Admin'
      };
      await addDocument('appointments', appointmentData);
      setIsModalOpen(false);
      reset();
      fetchAppointments();
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment");
    }
  };

  const exportToCSV = () => {
    if (appointments.length === 0) {
      alert("No data to export");
      return;
    }
    const headers = ["Patient Name", "Mobile", "Doctor", "Date", "Time", "Reason", "Status", "Booked By"];
    const csvRows = [headers.join(',')];
    
    // Use the filtered appointments, or all if preferred. Using filtered here.
    filtered.forEach(apt => {
      const row = [
        `"${(apt.patientName || apt.patient || '').replace(/"/g, '""')}"`,
        `"${(apt.phone || apt.mobile || '').replace(/"/g, '""')}"`,
        `"${(apt.doctor || '').replace(/"/g, '""')}"`,
        `"${(apt.date || '').replace(/"/g, '""')}"`,
        `"${(apt.time || '').replace(/"/g, '""')}"`,
        `"${(apt.reason || apt.symptoms || '').replace(/"/g, '""')}"`,
        `"${(apt.status || 'Pending').replace(/"/g, '""')}"`,
        `"${(apt.bookedBy || 'User').replace(/"/g, '""')}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading && appointments.length === 0) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-heading font-bold text-slate-800">Appointment Management</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <FaFilter className="text-slate-400 text-sm" />
            {statusFilters.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${statusFilter === s ? 'gradient-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition shadow-sm"
          >
            <FaPlus /> Book New
          </button>
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition shadow-sm"
            title="Export to Excel / CSV"
          >
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Patient</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Mobile</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Doctor</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Date</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Time</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Reason</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(apt => (
                <tr key={apt.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">
                    {apt.patientName || apt.patient}
                    {apt.bookedBy === 'Admin' && <span className="ml-2 inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-200 text-slate-600 font-bold">Admin</span>}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{apt.phone || apt.mobile}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{apt.doctor}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{apt.date}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{apt.time}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 max-w-[150px] truncate">{apt.reason || apt.symptoms}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[apt.status] || 'bg-slate-100 text-slate-700'}`}>{apt.status || 'Pending'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {(!apt.status || apt.status === 'Pending') && (
                        <button onClick={() => setConfirmModalApt(apt)} className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition" title="Confirm"><FaCheckCircle /></button>
                      )}
                      {(!apt.status || apt.status === 'Pending' || apt.status === 'Confirmed') && (
                        <>
                          <button onClick={() => updateStatus(apt, 'Completed')} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition" title="Complete"><FaClipboardCheck /></button>
                          <button onClick={() => updateStatus(apt, 'Cancelled')} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition" title="Cancel"><FaTimesCircle /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-10 text-text-secondary">No appointments found.</div>}
      </div>

      {/* Book Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-heading font-bold text-slate-800">Book New Appointment (Admin)</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    {...register('patientName', { required: 'Name is required' })}
                  />
                  {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    {...register('phone', { 
                      required: 'Mobile is required',
                      pattern: { value: /^[0-9]{10}$/, message: 'Valid 10-digit number required' }
                    })}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Age *</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    {...register('age', { required: 'Age is required' })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    {...register('gender', { required: 'Gender is required' })}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Doctor *</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    {...register('doctor', { required: 'Doctor is required' })}
                  >
                    <option value="">Select doctor</option>
                    {doctors.map(doc => (
                      <option key={doc.id} value={doc.name}>{doc.name} - {doc.specialization}</option>
                    ))}
                  </select>
                  {errors.doctor && <p className="text-red-500 text-xs mt-1">{errors.doctor.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    min={today}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    {...register('date', { required: 'Date is required' })}
                  />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Time *</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    {...register('time', { required: 'Time is required' })}
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason / Symptoms</label>
                <textarea
                  rows="2"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  {...register('symptoms')}
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Booking...' : 'Book Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Confirmation Modal */}
      {confirmModalApt && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                <FaCheckCircle />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Confirm Appointment</h3>
              <p className="text-sm text-slate-600 mb-6">Do you want to send a WhatsApp confirmation message to the patient?</p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    updateStatus(confirmModalApt, 'Confirmed', true);
                    setConfirmModalApt(null);
                  }}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition shadow-md shadow-emerald-500/20"
                >
                  Yes, Send WhatsApp
                </button>
                <button
                  onClick={() => {
                    updateStatus(confirmModalApt, 'Confirmed', false);
                    setConfirmModalApt(null);
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition"
                >
                  No, Just Confirm
                </button>
                <button
                  onClick={() => setConfirmModalApt(null)}
                  className="w-full mt-2 text-slate-400 hover:text-slate-600 font-medium text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
