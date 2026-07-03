import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaAmbulance, FaHospitalAlt } from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { hospitalInfo, navLinks } from '../../constants/data';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const menuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'tween', duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: { type: 'tween', duration: 0.25, ease: 'easeIn' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.07, duration: 0.3, ease: 'easeOut' },
    }),
  };

  return (
    <>
      {/* Emergency Strip */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-center gap-4 text-xs sm:text-sm font-medium">
          <span className="flex items-center gap-2">
            <FaAmbulance className="text-sm animate-pulse" />
            <span className="hidden sm:inline">24/7 Emergency</span>
          </span>
          <a
            href={`tel:${hospitalInfo.emergencyPhone}`}
            className="flex items-center gap-1.5 hover:underline font-semibold"
          >
            <FaPhoneAlt className="text-xs" />
            {hospitalInfo.emergencyPhone}
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed top-[34px] sm:top-[36px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/100 shadow-lg backdrop-blur-sm'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <FaHospitalAlt className="text-2xl text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl font-bold font-heading text-primary">
                CareFirst
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-primary'
                        : 'text-slate-600 hover:text-primary'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="navbar-underline"
                          className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                to="/appointment"
                className="gradient-primary text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:scale-105 transition-transform duration-200 inline-block shadow-md hover:shadow-lg"
              >
                Book Appointment
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:text-primary transition-colors"
              aria-label="Open menu"
            >
              <HiMenuAlt3 className="text-2xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[60] shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <Link
                  to="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaHospitalAlt className="text-xl text-primary" />
                  <span className="text-lg font-bold font-heading text-primary">
                    CareFirst
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                  aria-label="Close menu"
                >
                  <HiX className="text-2xl" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-primary/10 text-primary font-semibold'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="px-6 pb-8 pt-4 border-t border-slate-100">
                <Link
                  to="/appointment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center gradient-primary text-white rounded-full px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
