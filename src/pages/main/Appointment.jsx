import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaCheckCircle, FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkerAlt, FaCalendarAlt, FaWhatsapp } from 'react-icons/fa';
import SectionHeading from '../../components/ui/SectionHeading';
import { timeSlots } from '../../constants/data';
import { getCollection, addDocument } from '../../services/db';
import { useHospitalInfo } from '../../hooks/useHospitalInfo';

export default function Appointment() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const { info: hospitalInfo } = useHospitalInfo();


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getCollection('doctors');
        setDoctors(data.filter(doc => doc.name));
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Ensure URL parameter is selected after doctors are loaded and rendered
  useEffect(() => {
    if (doctors.length > 0) {
      const params = new URLSearchParams(location.search);
      const docParam = params.get('doctor');
      if (docParam) {
        setValue('doctor', docParam);
      }
    }
  }, [doctors, location.search, setValue]);

  const onSubmit = async (data) => {
    try {
      const appointmentData = {
        ...data,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      await addDocument('appointments', appointmentData);
      setSubmittedData(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    reset();
  };

  const today = new Date().toISOString().split('T')[0];

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-sm';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';
  const errorClass = 'text-red-500 text-xs mt-1';

  // Find if selected doctor is unavailable
  const watchedDoctor = watch('doctor');
  const selectedDocInfo = doctors.find(d => d.name === watchedDoctor);
  const isSelectedUnavailable = selectedDocInfo && selectedDocInfo.isAvailable === false;

  // Determine available time slots based on selected doctor
  let availableSlots = timeSlots; // Default generic fallback slots
  if (selectedDocInfo) {
    if (Array.isArray(selectedDocInfo.timing) && selectedDocInfo.timing.length > 0) {
      availableSlots = selectedDocInfo.timing.filter(t => t.trim() !== '');
    } else if (typeof selectedDocInfo.timing === 'string' && selectedDocInfo.timing.trim() !== '') {
      availableSlots = [selectedDocInfo.timing];
    }
  }

  return (
    <div>
      {/* Banner */}
      <section className="gradient-hero pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hospital-hero.jpg"
            alt="CareFirst Hospital"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4"
          >
            Book an Appointment
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-slate-300"
          >
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-primary-light">Appointment</span>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-xl mx-auto"
              >

                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                      className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                    >
                      <FaCheckCircle className="text-green-500 text-3xl" />
                    </motion.div>
                    <h2 className="text-2xl font-heading font-bold text-slate-800 mb-1">Appointment Booked! 🎉</h2>
                    <p className="text-slate-500 text-sm">We will confirm your slot shortly. Please check your WhatsApp.</p>
                  </div>

                  {submittedData && (
                    <div className="bg-slate-50 rounded-2xl p-5 text-sm space-y-3 mb-6 border border-slate-100">
                      <p className="font-semibold text-slate-700 text-base mb-3">📋 Booking Summary</p>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500">👤 Patient</span>
                        <span className="font-semibold text-slate-800">{submittedData.patientName}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500">🩺 Doctor</span>
                        <span className="font-semibold text-slate-800">{submittedData.doctor}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500">📅 Date</span>
                        <span className="font-semibold text-slate-800">{submittedData.date}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500">🕐 Time</span>
                        <span className="font-semibold text-slate-800">{submittedData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">📊 Status</span>
                        <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full text-xs">⏳ Pending Confirmation</span>
                      </div>
                    </div>
                  )}


                  <div className="flex gap-3">
                    <button
                      onClick={handleReset}
                      className="flex-1 gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition text-sm"
                    >
                      Book Another
                    </button>
                    <Link
                      to="/"
                      className="flex-1 text-center border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition text-sm"
                    >
                      Go Home
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Form */}
                  <div className="lg:col-span-2">
                    <SectionHeading title="Patient Details" subtitle="Fill in your details to book an appointment" centered={false} />

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClass}>Full Name *</label>
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            className={inputClass}
                            {...register('patientName', { required: 'Full name is required' })}
                          />
                          {errors.patientName && <p className={errorClass}>{errors.patientName.message}</p>}
                        </div>

                        <div>
                          <label className={labelClass}>Mobile Number *</label>
                          <input
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            className={inputClass}
                            {...register('phone', {
                              required: 'Mobile number is required',
                              pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' }
                            })}
                          />
                          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                        </div>

                        <div>
                          <label className={labelClass}>Age *</label>
                          <input
                            type="number"
                            placeholder="Enter your age"
                            className={inputClass}
                            {...register('age', {
                              required: 'Age is required',
                              min: { value: 0, message: 'Age must be positive' },
                              max: { value: 120, message: 'Enter a valid age' }
                            })}
                          />
                          {errors.age && <p className={errorClass}>{errors.age.message}</p>}
                        </div>

                        <div>
                          <label className={labelClass}>Gender *</label>
                          <select className={inputClass} {...register('gender', { required: 'Please select gender' })}>
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.gender && <p className={errorClass}>{errors.gender.message}</p>}
                        </div>

                        <div className="md:col-span-2">
                          <label className={labelClass}>Preferred Doctor *</label>
                          <select className={inputClass} {...register('doctor', { required: 'Please select a doctor' })}>
                            <option value="">Select doctor</option>
                            {doctors.map(doc => {
                              const isAvail = doc.isAvailable !== false;
                              return (
                                <option key={doc.id} value={doc.name}>
                                  {doc.name} - {doc.specialization} {!isAvail ? `(Unavailable: ${doc.availabilityStatus || 'Busy'})` : ''}
                                </option>
                              );
                            })}
                          </select>
                          {errors.doctor && <p className={errorClass}>{errors.doctor.message}</p>}
                          
                          {/* Warning Message if selected doctor is unavailable */}
                          {isSelectedUnavailable && (
                            <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                              <span className="text-red-500 mt-0.5 text-sm">⚠️</span>
                              <p className="text-sm text-red-700">
                                <span className="font-semibold">Note:</span> This doctor is currently marked as <strong>"{selectedDocInfo.availabilityStatus || 'Unavailable'}"</strong>. You may still book an appointment for a future date, but please confirm their availability.
                              </p>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className={labelClass}>Preferred Date *</label>
                          <input
                            type="date"
                            min={today}
                            className={inputClass}
                            {...register('date', { required: 'Please select a date' })}
                          />
                          {errors.date && <p className={errorClass}>{errors.date.message}</p>}
                        </div>

                        <div>
                          <label className={labelClass}>Preferred Time *</label>
                          <select className={inputClass} {...register('time', { required: 'Please select a time' })}>
                            <option value="">Select time slot</option>
                            {availableSlots.length > 0 ? availableSlots.map(slot => (
                              <option key={slot} value={slot}>{slot}</option>
                            )) : (
                              <option value="Not Specified" disabled>No slots available</option>
                            )}
                          </select>
                          {errors.time && <p className={errorClass}>{errors.time.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Reason for Visit *</label>
                        <textarea
                          rows={4}
                          placeholder="Briefly describe your symptoms or reason for visit"
                          className={inputClass + ' resize-none'}
                          {...register('symptoms', { required: 'Please provide a reason' })}
                        />
                        {errors.symptoms && <p className={errorClass}>{errors.symptoms.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full gradient-primary text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Booking...
                          </>
                        ) : (
                          <>
                            <FaCalendarAlt />
                            Book Appointment
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <div className="bg-background rounded-2xl p-6 border border-slate-100">
                      <h3 className="font-heading font-bold text-lg text-slate-800 mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <a href={`tel:${hospitalInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-primary transition">
                          <FaPhoneAlt className="text-primary" />
                          {hospitalInfo.phone}
                        </a>
                        <a href={`mailto:${hospitalInfo.email}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-primary transition">
                          <FaEnvelope className="text-primary" />
                          {hospitalInfo.email}
                        </a>
                        <a href={`https://wa.me/${hospitalInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-600 hover:text-green-500 transition">
                          <FaWhatsapp className="text-green-500" />
                          WhatsApp Us
                        </a>
                        <div className="flex items-start gap-3 text-sm text-slate-600">
                          <FaMapMarkerAlt className="text-primary mt-0.5 shrink-0" />
                          {hospitalInfo.address}
                        </div>
                      </div>
                    </div>

                    <div className="bg-background rounded-2xl p-6 border border-slate-100">
                      <h3 className="font-heading font-bold text-lg text-slate-800 mb-4">Working Hours</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3 text-slate-600">
                          <FaClock className="text-primary" />
                          {hospitalInfo.workingHours.weekdays}
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                          <FaClock className="text-secondary" />
                          {hospitalInfo.workingHours.sunday}
                        </div>
                        <div className="flex items-center gap-3 text-red-500 font-medium">
                          <FaClock className="text-red-500" />
                          {hospitalInfo.workingHours.emergency}
                        </div>
                      </div>
                    </div>

                    <div className="gradient-emergency text-white rounded-2xl p-6 text-center">
                      <h3 className="font-heading font-bold text-lg mb-2">Emergency?</h3>
                      <p className="text-sm text-red-100 mb-4">Call us immediately for emergency care</p>
                      <a
                        href={`tel:${hospitalInfo.emergencyPhone.replace(/\s/g, '')}`}
                        className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-full font-bold text-sm hover:bg-red-50 transition"
                      >
                        <FaPhoneAlt /> {hospitalInfo.emergencyPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>


    </div>
  );
}
