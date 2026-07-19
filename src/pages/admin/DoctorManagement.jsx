import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaUserMd, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { getCollection, addDocument, setDocument, updateDocument, deleteDocument } from '../../services/db';
import { uploadToImageKit } from '../../utils/imagekit';

export default function DoctorManagement() {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [form, setForm] = useState({ name: '', qualification: '', specialization: '', experience: '', timing: [''], languages: '', about: '', image: '', isAvailable: true, availabilityStatus: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [quickEditStatusId, setQuickEditStatusId] = useState(null);
  const [quickStatusForm, setQuickStatusForm] = useState({ isAvailable: true, availabilityStatus: '' });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await getCollection('doctors');
      const validData = [];
      
      // Auto-cleanup corrupted records that have no name
      for (const doc of data) {
        if (!doc.name) {
          await deleteDocument('doctors', doc.id);
        } else {
          validData.push(doc);
        }
      }
      
      setDoctorList(validData);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
    setLoading(false);
  };

  const openAdd = () => { setEditingDoctor(null); setForm({ name: '', qualification: '', specialization: '', experience: '', timing: [''], languages: '', about: '', image: '', isAvailable: true, availabilityStatus: '' }); setShowModal(true); };
  
  const openEdit = (doc) => { 
    setEditingDoctor(doc); 
    setForm({ 
      ...doc, 
      languages: Array.isArray(doc.languages) ? doc.languages.join(', ') : doc.languages,
      timing: Array.isArray(doc.timing) ? doc.timing : (doc.timing ? [doc.timing] : ['']),
      image: doc.image || '',
      isAvailable: doc.isAvailable !== false, // default true
      availabilityStatus: doc.availabilityStatus || ''
    }); 
    setShowModal(true); 
  };

  const openQuickStatusEdit = (doc) => {
    setQuickEditStatusId(doc.id);
    setQuickStatusForm({
      isAvailable: doc.isAvailable !== false,
      availabilityStatus: doc.availabilityStatus || ''
    });
  };

  const handleQuickStatusSave = async (docId) => {
    try {
      await updateDocument('doctors', docId, {
        isAvailable: quickStatusForm.isAvailable,
        availabilityStatus: quickStatusForm.availabilityStatus
      }); 
      
      setQuickEditStatusId(null);
      fetchDoctors();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleSave = async () => {
    const docData = { 
      ...form, 
      languages: form.languages.split(',').map(l => l.trim()),
      timing: form.timing.filter(t => t.trim() !== ''), // Remove empty slots
      isAvailable: form.isAvailable !== false,
      availabilityStatus: form.availabilityStatus || ''
    };
    
    try {
      if (editingDoctor) {
        await setDocument('doctors', editingDoctor.id, docData);
      } else {
        await addDocument('doctors', docData);
      }
      setShowModal(false);
      fetchDoctors(); // Refresh list
    } catch (error) {
      console.error("Error saving doctor:", error);
      alert("Failed to save doctor");
    }
  };

  const handleDelete = async (id) => { 
    try {
      await deleteDocument('doctors', id);
      setDeleteConfirm(null);
      fetchDoctors(); // Refresh list
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    setUploadingImage(true);
    try {
      const imageUrl = await uploadToImageKit(file, 'doctors');
      setForm({ ...form, image: imageUrl });
    } catch (error) {
      console.error('ImageKit upload error:', error);
      alert('Image upload failed. Please try again.');
    }
    setUploadingImage(false);
  };

  const inputClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition';

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-slate-800">Doctor Management</h2>
        <button onClick={openAdd} className="inline-flex items-center gap-2 gradient-primary text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition">
          <FaPlus /> Add Doctor
        </button>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctorList.map(doc => (
          <div key={doc.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-full">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {doc.image ? (
                    <img src={doc.image} alt={doc.name} className="w-14 h-14 rounded-xl object-cover" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
                      <FaUserMd className="text-white text-xl" />
                    </div>
                  )}
                  {/* Availability Indicator */}
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${doc.isAvailable !== false ? 'bg-green-500' : 'bg-red-500'}`} title={doc.isAvailable !== false ? 'Available' : 'Unavailable'} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-slate-800">{doc.name}</h3>
                  <p className="text-sm text-text-secondary">{doc.specialization}</p>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => openEdit(doc)} className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition" title="Edit Details"><FaEdit /></button>
                <button onClick={() => setDeleteConfirm(doc.id)} className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition" title="Delete"><FaTrash /></button>
              </div>
            </div>

            {/* Quick Status Update Section */}
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
              {quickEditStatusId === doc.id ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Set Availability</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={quickStatusForm.isAvailable} onChange={e => setQuickStatusForm({...quickStatusForm, isAvailable: e.target.checked})} />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                      <span className="ml-2 text-sm font-medium text-slate-600">{quickStatusForm.isAvailable ? 'Available' : 'Unavailable'}</span>
                    </label>
                  </div>
                  {!quickStatusForm.isAvailable && (
                    <input 
                      type="text" 
                      placeholder="Reason (e.g. In Surgery until 3 PM)" 
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-primary"
                      value={quickStatusForm.availabilityStatus}
                      onChange={e => setQuickStatusForm({...quickStatusForm, availabilityStatus: e.target.value})}
                    />
                  )}
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setQuickEditStatusId(null)} className="text-xs px-3 py-1.5 text-slate-500 hover:bg-slate-200 rounded-lg transition">Cancel</button>
                    <button onClick={() => handleQuickStatusSave(doc.id)} className="text-xs px-3 py-1.5 bg-primary text-white hover:bg-primary-dark rounded-lg transition">Save Status</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {doc.isAvailable !== false ? (
                      <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium"><FaCheckCircle /> Available</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-sm text-red-600 font-medium">
                        <FaExclamationTriangle /> 
                        {doc.availabilityStatus || 'Unavailable'}
                      </span>
                    )}
                  </div>
                  <button onClick={() => openQuickStatusEdit(doc)} className="text-xs text-primary hover:underline font-medium">Update Status</button>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-1 text-sm text-slate-600">
              <span className="font-medium text-slate-700">Timings:</span>
              <ul className="list-disc pl-4 mt-1">
                {Array.isArray(doc.timing) ? (
                  doc.timing.map((t, idx) => <li key={idx}>{t}</li>)
                ) : (
                  <li>{doc.timing || 'Not specified'}</li>
                )}
              </ul>
            </div>
          </div>
        ))}
        {doctorList.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500">
            No doctors found. Please add a doctor.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-lg">{editingDoctor ? 'Edit Doctor' : 'Add Doctor'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><FaTimes /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Name</label><input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dr. Full Name" /></div>
              
              <div className="flex gap-4">
                <div className="flex-1"><label className="block text-sm font-medium text-slate-700 mb-1">Qualification</label><input className={inputClass} value={form.qualification} onChange={e => setForm({ ...form, qualification: e.target.value })} placeholder="MBBS, MD" /></div>
                <div className="flex-1"><label className="block text-sm font-medium text-slate-700 mb-1">Experience</label><input className={inputClass} value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="10+ Years" /></div>
              </div>

              <div><label className="block text-sm font-medium text-slate-700 mb-1">Specialization</label><input className={inputClass} value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} placeholder="General Physician" /></div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-slate-700">Time Slots</label>
                  <button 
                    onClick={() => setForm({ ...form, timing: [...form.timing, ''] })} 
                    className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
                  >
                    <FaPlus /> Add Slot
                  </button>
                </div>
                <div className="space-y-2">
                  {form.timing.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input 
                        className={inputClass} 
                        value={slot} 
                        onChange={e => {
                          const newTiming = [...form.timing];
                          newTiming[index] = e.target.value;
                          setForm({ ...form, timing: newTiming });
                        }} 
                        placeholder="e.g. 10:00 AM - 02:00 PM" 
                      />
                      {form.timing.length > 1 && (
                        <button 
                          onClick={() => {
                            const newTiming = form.timing.filter((_, i) => i !== index);
                            setForm({ ...form, timing: newTiming });
                          }}
                          className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Languages (comma separated)</label><input className={inputClass} value={form.languages} onChange={e => setForm({ ...form, languages: e.target.value })} placeholder="Hindi, English, Marathi" /></div>
              
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">Currently Available</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={form.isAvailable} onChange={e => setForm({...form, isAvailable: e.target.checked})} />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
                {!form.isAvailable && (
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Reason for unavailability</label>
                    <input className={inputClass} value={form.availabilityStatus} onChange={e => setForm({ ...form, availabilityStatus: e.target.value })} placeholder="e.g. On Leave Today" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Doctor Photo</label>
                <div className="flex items-center gap-3">
                  {form.image && (
                    <img src={form.image} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                  </div>
                  {uploadingImage && <span className="text-sm text-primary animate-pulse">Uploading...</span>}
                </div>
              </div>

              <div><label className="block text-sm font-medium text-slate-700 mb-1">About</label><textarea className={inputClass + ' resize-none'} rows={3} value={form.about} onChange={e => setForm({ ...form, about: e.target.value })} placeholder="Brief description..." /></div>
              <button onClick={handleSave} disabled={uploadingImage} className="w-full gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50">{editingDoctor ? 'Update Doctor' : 'Add Doctor'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <h3 className="font-heading font-bold text-lg mb-2">Delete Doctor?</h3>
            <p className="text-text-secondary text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
