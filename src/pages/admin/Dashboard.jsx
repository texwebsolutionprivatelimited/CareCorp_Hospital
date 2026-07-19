import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaCalendarCheck, FaClock, FaUserMd, FaEnvelope, FaNewspaper, FaPlus, FaEye, FaDatabase } from 'react-icons/fa';
import { setDocument, getCollection, deleteDocument } from '../../services/db';
import { doctors, sampleBlogs, testimonials, sampleGallery, sampleEnquiries } from '../../constants/data';

// Fallback stat cards
const fallbackStatCards = [
  { title: 'Total Appointments', value: 0, key: 'appointments', icon: FaCalendarAlt, color: 'bg-blue-500', bg: 'bg-blue-50' },
  { title: "Pending", value: 0, key: 'pendingAppointments', icon: FaClock, color: 'bg-amber-500', bg: 'bg-amber-50' },
  { title: 'Total Doctors', value: 0, key: 'doctors', icon: FaUserMd, color: 'bg-teal-500', bg: 'bg-teal-50' },
  { title: 'Enquiries', value: 0, key: 'enquiries', icon: FaEnvelope, color: 'bg-purple-500', bg: 'bg-purple-50' },
  { title: 'Blog Posts', value: 0, key: 'blogs', icon: FaNewspaper, color: 'bg-indigo-500', bg: 'bg-indigo-50' },
  { title: 'Testimonials', value: 0, key: 'testimonials', icon: FaCalendarCheck, color: 'bg-emerald-500', bg: 'bg-emerald-50' }
];

const recentAppointments = [
  { id: 1, patient: 'Rahul Sharma', doctor: 'Dr. Rajesh Sharma', date: '2026-12-20', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, patient: 'Priya Singh', doctor: 'Dr. Priya Patel', date: '2026-12-20', time: '3:30 PM', status: 'Pending' },
  { id: 3, patient: 'Amit Kumar', doctor: 'Dr. Rajesh Sharma', date: '2026-12-19', time: '11:00 AM', status: 'Completed' },
  { id: 4, patient: 'Sneha Desai', doctor: 'Dr. Priya Patel', date: '2026-12-19', time: '4:00 PM', status: 'Confirmed' },
  { id: 5, patient: 'Vikram Mehta', doctor: 'Dr. Rajesh Sharma', date: '2026-12-18', time: '9:30 AM', status: 'Cancelled' },
];

const statusColors = {
  Pending: 'bg-amber-100 text-amber-700',
  Confirmed: 'bg-emerald-100 text-emerald-700',
  Completed: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function Dashboard() {
  const [seeding, setSeeding] = useState(false);
  const [recentApps, setRecentApps] = useState(recentAppointments);
  const [stats, setStats] = useState({
    appointments: 0,
    pendingAppointments: 0,
    doctors: 0,
    enquiries: 0,
    blogs: 0,
    testimonials: 0
  });

  const fetchStats = async () => {
    try {
      const doctorsData = await getCollection('doctors');
      const blogsData = await getCollection('blogs');
      const enquiriesData = await getCollection('enquiries');
      const testimonialsData = await getCollection('testimonials');
      
      let appointmentsData = [];
      try {
        appointmentsData = await getCollection('appointments');
      } catch(e) {
        // collection might not exist yet
      }
      
      if (appointmentsData.length > 0) {
        // Sort by date descending and take top 5
        const sorted = [...appointmentsData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentApps(sorted.slice(0, 5));
      }
      
      const pendingCount = appointmentsData.filter(a => a.status === 'Pending').length;
      
      setStats({
        appointments: appointmentsData.length,
        pendingAppointments: pendingCount,
        doctors: doctorsData.length,
        enquiries: enquiriesData.length,
        blogs: blogsData.length,
        testimonials: testimonialsData.length
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSeedDatabase = async () => {
    if (!window.confirm("Are you sure? This will overwrite or duplicate data in Firestore.")) return;
    setSeeding(true);
    try {
      // Seed Doctors
      for (const doc of doctors) {
        await setDocument('doctors', doc.id || `doc-${Date.now()}`, doc);
      }
      // Seed Blogs
      for (const blog of sampleBlogs) {
        await setDocument('blogs', blog.id || `blog-${Date.now()}`, blog);
      }
      // Seed Testimonials
      for (const testimonial of testimonials) {
        await setDocument('testimonials', `test-${testimonial.id || Date.now()}`, testimonial);
      }
      // Seed Gallery
      const existingGallery = await getCollection('gallery');
      for (const item of existingGallery) {
        await deleteDocument('gallery', item.id);
      }
      for (const image of sampleGallery) {
        await setDocument('gallery', `gal-${image.id || Date.now()}`, image);
      }
      // Seed Enquiries
      for (const enquiry of sampleEnquiries) {
        await setDocument('enquiries', `enq-${enquiry.id || Date.now()}`, enquiry);
      }
      alert("Database seeded successfully! Gallery has been restored.");
      fetchStats();
    } catch (error) {
      console.error("Error seeding DB:", error);
      alert("Error seeding database.");
    }
    setSeeding(false);
  };

  const handleClearData = async () => {
    if (!window.confirm("Are you sure you want to delete ALL Enquiries and Appointments?")) return;
    setSeeding(true);
    try {
      const existingEnquiries = await getCollection('enquiries');
      for (const item of existingEnquiries) {
        await deleteDocument('enquiries', item.id);
      }
      let existingAppointments = [];
      try {
        existingAppointments = await getCollection('appointments');
      } catch(e) {}
      for (const item of existingAppointments) {
        await deleteDocument('appointments', item.id);
      }
      alert("Enquiries and Appointments cleared!");
      fetchStats();
    } catch (error) {
      console.error("Error clearing DB:", error);
      alert("Error clearing database.");
    }
    setSeeding(false);
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {fallbackStatCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">{card.title}</p>
                <p className="text-3xl font-heading font-bold text-slate-800 mt-1">{stats[card.key] || 0}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon className={`text-xl ${card.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link to="/admin/doctors" className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition">
          <FaPlus /> Add Doctor
        </Link>
        <Link to="/admin/blogs" className="inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-600 transition">
          <FaPlus /> New Blog Post
        </Link>
        <Link to="/admin/enquiries" className="inline-flex items-center gap-2 bg-purple-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-purple-600 transition">
          <FaEye /> View Enquiries
        </Link>
        <div className="ml-auto flex gap-2">
          <button 
            onClick={handleClearData} 
            disabled={seeding}
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-orange-600 transition disabled:opacity-50"
          >
            {seeding ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaDatabase />} 
            {seeding ? 'Processing...' : 'Clear Enquiries & Apps'}
          </button>
          <button 
            onClick={handleSeedDatabase} 
            disabled={seeding}
            className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-red-600 transition disabled:opacity-50"
          >
            {seeding ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FaDatabase />} 
            {seeding ? 'Processing...' : 'Seed Database'}
          </button>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-heading font-semibold text-lg text-slate-800">Recent Appointments</h3>
          <Link to="/admin/appointments" className="text-primary text-sm font-medium hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentApps.map(apt => (
                <tr key={apt.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">{apt.patientName || apt.patient}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{apt.doctor}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{apt.date}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{apt.time}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[apt.status] || 'bg-slate-100 text-slate-700'}`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
