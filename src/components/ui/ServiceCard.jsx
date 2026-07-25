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

const ServiceCard = ({ title, description, icon, index = 0, variant = 'general', image }) => {
  const IconComponent = iconMap[icon];

  const isChildcare = variant === 'childcare';
  const hasImage = Boolean(image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group border border-slate-100 hover:border-primary/30 min-h-[260px] ${
        hasImage ? 'text-white' : 'bg-white'
      }`}
    >
      {hasImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-500 group-hover:scale-110 blur-[1px]"
            style={{ backgroundImage: `url(${image})`, filter: 'saturate(0.9) contrast(0.95)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/45 to-slate-900/20" />
        </>
      )}

      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 z-10 ${
          isChildcare
            ? 'bg-gradient-to-r from-amber-400 to-pink-400'
            : hasImage
              ? 'bg-white/80'
              : 'bg-primary'
        }`}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Icon container */}
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
            isChildcare
              ? 'bg-amber-50 text-amber-500'
              : hasImage
                ? 'bg-white/20 backdrop-blur-sm text-white border border-white/20'
                : 'bg-primary/10 text-primary'
          }`}
        >
          {IconComponent && <IconComponent className="text-2xl" />}
        </div>

        {/* Title */}
        <div>
          <h3 className={`font-heading font-semibold text-lg mb-2 ${hasImage ? 'text-white' : 'text-slate-800'}`}>
            {title}
          </h3>

          {/* Description */}
          <p className={`text-sm leading-relaxed ${hasImage ? 'text-slate-200' : 'text-text-secondary'}`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
