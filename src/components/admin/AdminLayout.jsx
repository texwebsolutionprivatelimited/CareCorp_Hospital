import { useState } from 'react';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHospitalAlt, FaCalendarAlt, FaUserMd, FaNewspaper, FaImages, FaStar, FaEnvelope, FaSignOutAlt, FaBars, FaTimes, FaCog } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: MdDashboard, end: true },
  { name: 'Appointments', path: '/admin/appointments', icon: FaCalendarAlt },
  { name: 'Doctors', path: '/admin/doctors', icon: FaUserMd },
  { name: 'Blogs', path: '/admin/blogs', icon: FaNewspaper },
  { name: 'Gallery', path: '/admin/gallery', icon: FaImages },
  { name: 'Testimonials', path: '/admin/testimonials', icon: FaStar },
  { name: 'Enquiries', path: '/admin/enquiries', icon: FaEnvelope },
  { name: 'Settings', path: '/admin/settings', icon: FaCog },
];

export default function AdminLayout({ children }) {
  const { currentUser, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" />;
  }

  const currentPage = navItems.find(item => location.pathname === item.path)?.name || 'Admin';

  const handleLogout = async () => {
    await logout();
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <FaHospitalAlt className="text-white text-lg" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-white text-lg">CareFirst</h1>
            <p className="text-slate-400 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary/20 text-primary-light border-r-2 border-primary'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <item.icon className="text-lg" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all duration-200"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-slate-900 fixed h-full z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 h-full w-64 bg-slate-900 z-50 flex flex-col lg:hidden"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <FaTimes className="text-xl" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-600 hover:text-primary transition"
              >
                <FaBars className="text-xl" />
              </button>
              <h2 className="font-heading font-semibold text-lg text-slate-800">{currentPage}</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {currentUser?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <span className="text-sm text-text-secondary hidden md:block">{currentUser?.email || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
