import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaAmbulance, FaHospitalAlt } from 'react-icons/fa';
import { HiMenuAlt3, HiX, HiChevronDown } from 'react-icons/hi';
import { hospitalInfo as defaultHospitalInfo, navLinks } from '../../constants/data';
import { useHospitalInfo } from '../../hooks/useHospitalInfo';

const Navbar = () => {
  const { info: hospitalInfo } = useHospitalInfo();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

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
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {/* Emergency Strip - Professional Medical Red */}
        <div className="bg-gradient-to-r from-[#B91C3B] to-[#A41635] text-white shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 flex items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs md:text-sm font-medium">
            <span className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <FaAmbulance className="text-xs sm:text-sm animate-pulse flex-shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">24/7 Emergency</span>
            </span>
            <div className="w-px h-4 bg-white/30 hidden sm:block"></div>
            <a
              href={`tel:${hospitalInfo.emergencyPhone}`}
              className="flex items-center gap-1 sm:gap-1.5 hover:text-red-100 font-semibold transition-colors duration-200 flex-shrink-0 active:scale-95"
            >
              <FaPhoneAlt className="text-xs flex-shrink-0" />
              <span className="whitespace-nowrap">{hospitalInfo.emergencyPhone}</span>
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/100 shadow-md backdrop-blur-sm'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16 lg:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0">
              <FaHospitalAlt className="text-xl sm:text-2xl text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
              <span className="text-lg sm:text-xl font-bold font-heading text-primary whitespace-nowrap">
                {hospitalInfo.name?.split(' ')[0] || 'CareFirst'}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div key={link.path} className="relative group">
                  <NavLink
                    to={link.path}
                    onClick={(e) => {
                      if (link.subLinks) {
                        e.preventDefault();
                      }
                    }}
                    className={({ isActive }) =>
                      `relative px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center gap-1 whitespace-nowrap ${
                        isActive || (link.subLinks && location.pathname.startsWith(link.path))
                          ? 'text-primary'
                          : 'text-slate-600 hover:text-primary'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.name}
                        {link.subLinks && <HiChevronDown className="text-base transition-transform group-hover:rotate-180" />}
                        {(isActive || (link.subLinks && location.pathname.startsWith(link.path))) && (
                          <motion.span
                            layoutId="navbar-underline"
                            className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-primary rounded-full"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                  
                  {link.subLinks && (
                    <div className="absolute top-full left-0 mt-1.5 w-48 bg-white rounded-lg shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden z-50">
                      {link.subLinks.map((subLink) => (
                        <NavLink
                          key={subLink.path}
                          to={subLink.path}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors ${
                              isActive ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                            }`
                          }
                        >
                          {subLink.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block flex-shrink-0">
              <Link
                to="/appointment"
                className="gradient-primary text-white rounded-full px-5 py-2 text-xs sm:text-sm font-semibold hover:shadow-lg transition-shadow duration-200 inline-block shadow-sm hover:translate-y-[-2px]"
              >
                Book Appointment
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:text-primary transition-colors flex-shrink-0"
              aria-label="Open menu"
            >
              <HiMenuAlt3 className="text-xl sm:text-2xl" />
            </button>
          </div>
        </div>
      </nav>
      </header>

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
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
                <Link
                  to="/"
                  className="flex items-center gap-1.5 sm:gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaHospitalAlt className="text-lg sm:text-xl text-primary flex-shrink-0" />
                  <span className="text-base sm:text-lg font-bold font-heading text-primary whitespace-nowrap">
                    {hospitalInfo.name?.split(' ')[0] || 'CareFirst'}
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-primary transition-colors flex-shrink-0"
                  aria-label="Close menu"
                >
                  <HiX className="text-xl sm:text-2xl" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-1"
                    >
                      {link.subLinks ? (
                        <>
                          <div
                            onClick={() => setExpandedMenu(expandedMenu === link.name ? null : link.name)}
                            className={`flex items-center justify-between px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium cursor-pointer transition-all duration-200 ${
                              location.pathname.startsWith(link.path) || expandedMenu === link.name
                                ? 'bg-primary/5 text-primary' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                            }`}
                          >
                            <span>{link.name}</span>
                            <HiChevronDown className={`transition-transform duration-300 ${expandedMenu === link.name ? 'rotate-180' : ''}`} />
                          </div>
                          <AnimatePresence>
                            {expandedMenu === link.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-4 space-y-1"
                              >
                                {link.subLinks.map((subLink) => (
                                  <NavLink
                                    key={subLink.path}
                                    to={subLink.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                      `block px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                                        isActive
                                          ? 'bg-primary/10 text-primary font-semibold'
                                          : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                                      }`
                                    }
                                  >
                                    {subLink.name}
                                  </NavLink>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <NavLink
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                              isActive
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                            }`
                          }
                        >
                          {link.name}
                        </NavLink>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-3 sm:pt-4 border-t border-slate-100">
                <Link
                  to="/appointment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center gradient-primary text-white rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
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
