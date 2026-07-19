import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAmbulance, FaTimes } from 'react-icons/fa';
import { useHospitalInfo } from '../../hooks/useHospitalInfo';

const EmergencyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { info: hospitalInfo } = useHospitalInfo();

  if (!isVisible) return null;

  const phoneLink = `tel:${hospitalInfo.emergencyPhone.replace(/\s/g, '')}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-30 md:relative md:bottom-auto gradient-emergency text-white"
        >
          <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
            {/* Left: Emergency info */}
            <div className="flex items-center gap-2 text-sm font-medium">
              <FaAmbulance className="text-lg animate-pulse flex-shrink-0" />
              <span className="hidden sm:inline">
                Emergency: {hospitalInfo.emergencyPhone}
              </span>
              <span className="sm:hidden">Emergency</span>
            </div>

            {/* Right: Call button + close */}
            <div className="flex items-center gap-3">
              <a
                href={phoneLink}
                className="bg-white text-red-600 font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-red-50 transition-colors duration-300"
              >
                Call Now
              </a>

              <button
                onClick={() => setIsVisible(false)}
                className="text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
                aria-label="Dismiss emergency banner"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyBanner;
