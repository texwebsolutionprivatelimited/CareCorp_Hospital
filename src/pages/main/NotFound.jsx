import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaStethoscope, FaHeartbeat, FaChild } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <FaStethoscope className="text-primary text-6xl animate-float" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <FaHeartbeat className="text-primary text-5xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-10">
        <FaChild className="text-secondary text-4xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <h1 className="text-8xl md:text-9xl font-heading font-extrabold text-gradient mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-800 mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Don&apos;t worry, let&apos;s get you back on track!
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/"
            className="gradient-primary text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 shadow-lg"
          >
            <FaHome /> Go Home
          </Link>
          <Link
            to="/appointment"
            className="border border-primary text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            Book Appointment
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
