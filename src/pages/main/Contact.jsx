import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import SectionHeading from '../../components/ui/SectionHeading';
import { hospitalInfo } from '../../constants/data';
import { addDocument } from '../../services/db';

const contactCards = [
  { icon: FaPhoneAlt, title: 'Phone', detail: hospitalInfo.phone, link: `tel:${hospitalInfo.phone.replace(/\s/g, '')}`, color: 'bg-primary/10 text-primary' },
  { icon: FaEnvelope, title: 'Email', detail: hospitalInfo.email, link: `mailto:${hospitalInfo.email}`, color: 'bg-blue-50 text-blue-600' },
  { icon: FaMapMarkerAlt, title: 'Address', detail: hospitalInfo.address, link: null, color: 'bg-amber-50 text-amber-600' },
  { icon: FaWhatsapp, title: 'WhatsApp', detail: 'Chat with us', link: `https://wa.me/${hospitalInfo.whatsapp}`, color: 'bg-green-50 text-green-600' },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const enquiryData = {
        ...data,
        read: false,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      };
      await addDocument('enquiries', enquiryData);
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); reset(); }, 4000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-sm';

  return (
    <div>
      {/* Banner */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hospital-hero.jpg"
            alt="CareFirst Hospital"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
        </div>

        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">Contact Us</motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center justify-center gap-2 text-slate-300">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-primary-light">Contact</span>
          </motion.div>
        </div>
      </section>


      {/* Form + Map */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeading title="Send Us a Message" subtitle="We'll get back to you within 24 hours" centered={false} />
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name *</label>
                    <input type="text" placeholder="Enter your Full Name" className={inputClass} {...register('name', { required: 'Name is required' })} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                    <input type="email" placeholder="Enter your Email Address" className={inputClass} {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                    <input type="tel" placeholder="Enter your Phone number" className={inputClass} {...register('phone')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject *</label>
                    <select className={inputClass} {...register('subject', { required: 'Please select a subject' })}>
                      <option value="">Select subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Appointment">Appointment</option>
                      <option value="Child Care">Child Care</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                  <textarea rows={5} placeholder="How can we help you?" className={inputClass + ' resize-none'} {...register('message', { required: 'Message is required' })} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="gradient-primary text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin " /> Sending...</>
                  ) : isSubmitted ? (
                    <><FaCheckCircle /> Message Sent!</>
                  ) : (
                    <><FaPaperPlane /> Send Message</>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Google Maps */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px] border border-slate-200">
                <iframe
                  src={hospitalInfo.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hospital Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Working Hours + Emergency */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background rounded-2xl p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FaClock className="text-primary text-xl" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-800">Working Hours</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-text-secondary">Monday - Saturday</span><span className="font-medium">9:00 AM - 8:00 PM</span></div>
                <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-text-secondary">Sunday</span><span className="font-medium">10:00 AM - 2:00 PM</span></div>
                <div className="flex justify-between py-2"><span className="text-red-500 font-medium">Emergency</span><span className="font-medium text-red-500">24/7 Available</span></div>
              </div>
            </div>
            <div className="gradient-emergency text-white rounded-2xl p-8 flex flex-col justify-center items-center text-center">
              <h3 className="font-heading font-bold text-2xl mb-2">Emergency?</h3>
              <p className="text-red-100 mb-6">Our emergency team is available 24/7</p>
              <a href={`tel:${hospitalInfo.emergencyPhone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-bold hover:bg-red-50 transition text-lg">
                <FaPhoneAlt /> {hospitalInfo.emergencyPhone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
