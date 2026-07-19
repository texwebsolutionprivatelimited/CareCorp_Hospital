import { motion } from 'framer-motion';
import {
  FaHospital,
  FaUserMd,
  FaMicroscope,
  FaCalendarAlt,
  FaSearchPlus,
} from 'react-icons/fa';

const categoryIcons = {
  Hospital: FaHospital,
  Doctors: FaUserMd,
  Facilities: FaMicroscope,
  Events: FaCalendarAlt,
};

const GalleryImage = ({ image, onClick }) => {
  const { category, caption, gradient, imageUrl } = image;

  const IconComponent = categoryIcons[category] || FaHospital;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden cursor-pointer group relative aspect-square"
      onClick={onClick}
    >
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={caption} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          {/* Gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient || 'from-slate-400 to-slate-600'}`}
          />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <IconComponent className="text-white text-5xl opacity-20" />
          </div>
        </>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between">
        {/* Search icon at top-right */}
        <div className="flex justify-end p-4">
          <FaSearchPlus className="text-white text-lg" />
        </div>

        {/* Caption bar at bottom */}
        <div className="p-4 w-full">
          <p className="text-white font-heading font-semibold text-sm">
            {caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryImage;
