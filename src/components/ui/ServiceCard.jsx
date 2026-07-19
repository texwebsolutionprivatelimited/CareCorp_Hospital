import { motion } from 'framer-motion';
import {
  FaThermometerHalf,
  FaVirus,
  FaTint,
  FaHeartbeat,
  FaStethoscope,
  FaClinicMedical,
  FaAllergies,
  FaAppleAlt,
  FaBaby,
  FaSyringe,
  FaChartLine,
  FaCarrot,
  FaLungs,
  FaChild,
  FaClipboardCheck,
  FaBrain,
} from 'react-icons/fa';

const iconMap = {
  FaThermometerHalf,
  FaVirus,
  FaTint,
  FaHeartbeat,
  FaStethoscope,
  FaClinicMedical,
  FaAllergies,
  FaAppleAlt,
  FaBaby,
  FaSyringe,
  FaChartLine,
  FaCarrot,
  FaLungs,
  FaChild,
  FaClipboardCheck,
  FaBrain,
};

const ServiceCard = ({ title, description, icon, index = 0, variant = 'general' }) => {
  const IconComponent = iconMap[icon];

  const isChildcare = variant === 'childcare';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group border border-slate-100 hover:border-primary/30 relative overflow-hidden"
    >
      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${
          isChildcare
            ? 'bg-gradient-to-r from-amber-400 to-pink-400'
            : 'bg-primary'
        }`}
      />

      {/* Icon container */}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
          isChildcare
            ? 'bg-amber-50 text-amber-500'
            : 'bg-primary/10 text-primary'
        }`}
      >
        {IconComponent && <IconComponent className="text-2xl" />}
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-lg text-slate-800 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default ServiceCard;
