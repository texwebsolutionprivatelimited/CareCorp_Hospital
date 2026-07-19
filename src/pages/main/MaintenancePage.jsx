import { motion } from 'framer-motion';
import { FaHospitalAlt, FaTools, FaClock, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { useHospitalInfo } from '../../hooks/useHospitalInfo';

export default function MaintenancePage() {
  const { info } = useHospitalInfo();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a4e 30%, #24243e 60%, #0f3460 100%)'}}>

      {/* Animated background orbs */}
      <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{animationDelay:'1s'}} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none animate-pulse" style={{animationDelay:'2s'}} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-lg w-full"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <FaHospitalAlt className="text-white text-2xl" />
          </div>
          <span className="text-2xl font-bold font-heading text-white">
            {info.name || 'CareFirst Hospital'}
          </span>
        </motion.div>

        {/* Animated Gear Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="w-20 h-20 mx-auto mb-6 text-violet-400"
        >
          <FaTools className="w-full h-full" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
        >
          Under Maintenance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-300 text-lg leading-relaxed mb-8"
        >
          We're currently performing scheduled maintenance to improve your experience.
          We'll be back shortly!
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent mb-8"
        />

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4"
          style={{background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'}}
        >
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4">
            For emergencies, contact us directly
          </p>

          {info.emergencyPhone && (
            <a
              href={`tel:${info.emergencyPhone}`}
              className="flex items-center justify-center gap-3 text-white hover:text-teal-300 transition-colors duration-200 group"
            >
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/40 transition">
                <FaPhoneAlt className="text-red-400 text-sm" />
              </div>
              <span className="font-semibold">Emergency: {info.emergencyPhone}</span>
            </a>
          )}

          {info.phone && (
            <a
              href={`tel:${info.phone}`}
              className="flex items-center justify-center gap-3 text-white hover:text-teal-300 transition-colors duration-200 group"
            >
              <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center group-hover:bg-teal-500/40 transition">
                <FaPhoneAlt className="text-teal-400 text-sm" />
              </div>
              <span>{info.phone}</span>
            </a>
          )}

          {info.email && (
            <a
              href={`mailto:${info.email}`}
              className="flex items-center justify-center gap-3 text-white hover:text-teal-300 transition-colors duration-200 group"
            >
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition">
                <FaEnvelope className="text-blue-400 text-sm" />
              </div>
              <span>{info.email}</span>
            </a>
          )}
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-slate-300 text-sm font-semibold mt-8 flex items-center justify-center gap-2"
        >
          <FaClock className="text-slate-600" />
          Thank you for your patience. We'll be back soon.
        </motion.p>
      </motion.div>
    </div>
  );
}
