import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserMd, FaBriefcase, FaClock, FaGlobe } from 'react-icons/fa';

const DoctorCard = ({ doctor }) => {
  const { name, qualification, specialization, experience, timing, languages, about, image } = doctor;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
    >
      {/* Top gradient section */}
      <div className="gradient-primary h-48 flex items-center justify-center relative shrink-0">
        {/* Doctor avatar */}
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-lg z-10"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/20 shadow-lg z-10">
            <FaUserMd className="text-white text-4xl" />
          </div>
        )}

        {/* Specialization badge */}
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-primary text-xs font-semibold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap z-20">
          {specialization}
        </span>
      </div>

      {/* Content section */}
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold text-slate-800">
          {name}
        </h3>
        <p className="text-sm text-text-secondary mt-1">{qualification}</p>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 my-4" />

        {/* Info rows */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FaBriefcase className="text-primary flex-shrink-0" />
            <span>{experience}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FaClock className="text-primary flex-shrink-0" />
            <span>{timing}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FaGlobe className="text-primary flex-shrink-0" />
            <span>{languages.join(', ')}</span>
          </div>
        </div>

        {/* Book Appointment CTA */}
        <Link
          to="/appointment"
          className="block w-full text-center gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity duration-300 mt-4"
        >
          Book Appointment
        </Link>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
