import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserMd, FaBriefcase, FaClock, FaGlobe, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const DoctorCard = ({ doctor }) => {
  const { name, qualification, specialization, experience, timing, languages, about, image, isAvailable, availabilityStatus } = doctor;
  
  // Default to true if not set
  const currentlyAvailable = isAvailable !== false;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full relative"
    >
      {/* Top gradient section */}
      <div className="gradient-primary h-40 sm:h-48 md:h-52 flex items-center justify-center relative shrink-0 pb-3">
        
        {/* Availability Badge */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
          {currentlyAvailable ? (
            <span className="flex items-center gap-1 bg-green-500/90 backdrop-blur text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Available
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-red-500/90 backdrop-blur text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium shadow-sm">
              <FaExclamationTriangle className="text-[9px] sm:text-[10px]" />
              {availabilityStatus || 'Unavailable'}
            </span>
          )}
        </div>

        {/* Doctor avatar */}
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover object-top border-2 sm:border-4 border-white/30 shadow-lg z-10 ${!currentlyAvailable ? 'grayscale opacity-80' : ''}`}
          />
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white/20 flex items-center justify-center border-2 sm:border-4 border-white/30 shadow-lg z-10">
            <FaUserMd className="text-white text-2xl sm:text-3xl md:text-4xl" />
          </div>
        )}

        {/* Specialization badge */}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-primary text-[10px] sm:text-xs font-semibold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-md whitespace-nowrap z-20 max-w-[90%] truncate border border-slate-100">
          {specialization}
        </span>
      </div>

      {/* Content section */}
      <div className="p-3 sm:p-5 md:p-6 pt-5 sm:pt-6 md:pt-7 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-sm sm:text-lg md:text-xl font-heading font-bold text-slate-800 line-clamp-1">
            {name}
          </h3>
          <p className="text-[11px] sm:text-xs md:text-sm text-text-secondary mt-0.5 sm:mt-1 line-clamp-1">{qualification}</p>

          {/* Divider */}
          <div className="w-full h-px bg-slate-100 my-2 sm:my-3 md:my-4" />

          {/* Info rows */}
          <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm text-slate-600">
              <FaBriefcase className="text-primary flex-shrink-0 text-xs sm:text-sm" />
              <span className="truncate">{experience}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm text-slate-600">
              <FaClock className="text-primary flex-shrink-0 text-xs sm:text-sm" />
              <span className="truncate">{Array.isArray(timing) ? timing.join(' | ') : timing || 'Not specified'}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm text-slate-600">
              <FaGlobe className="text-primary flex-shrink-0 text-xs sm:text-sm" />
              <span className="truncate">{Array.isArray(languages) ? languages.join(', ') : languages || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Book Appointment CTA */}
        <Link
          to={`/appointment?doctor=${encodeURIComponent(name || '')}`}
          className={`block w-full text-center text-white py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm md:text-base transition-opacity duration-300 mt-3 sm:mt-4 ${currentlyAvailable ? 'gradient-primary hover:opacity-90' : 'bg-slate-300 hover:bg-slate-400 text-slate-600'}`}
        >
          {currentlyAvailable ? 'Book Appointment' : 'Book for Future'}
        </Link>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
