import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { useHospitalInfo } from '../../hooks/useHospitalInfo';

const whatsappOptions = [
  {
    emoji: '📅',
    label: 'Book Appointment',
    message: `🏥 *Appointment Request*\n━━━━━━━━━━━━━━━━━━\nHello! I would like to *book an appointment*.\n\nPlease let me know the available slots.\n\n_Thank you!_ 🙏`,
  },
  {
    emoji: '❓',
    label: 'Ask a Question',
    message: `🏥 *General Inquiry*\n━━━━━━━━━━━━━━━━━━\nHello! I have a *question* regarding your services.\n\nCould you please help me?\n\n_Thank you!_ 🙏`,
  },
  {
    emoji: '👶',
    label: 'Child Care Enquiry',
    message: `🏥 *Child Care Enquiry*\n━━━━━━━━━━━━━━━━━━\nHello! I need information about your *Child Care services*.\n\n👶 Could you please share details about:\n• Available pediatric doctors\n• Consultation timings\n• Fee structure\n\n_Thank you!_ 🙏`,
  },
  {
    emoji: '🏥',
    label: 'General Physician',
    message: `🏥 *General Physician Consultation*\n━━━━━━━━━━━━━━━━━━\nHello! I would like to *consult a General Physician*.\n\n🩺 Please share:\n• Available doctors & timings\n• Appointment availability\n• Consultation charges\n\n_Thank you!_ 🙏`,
  },
  {
    emoji: '🚨',
    label: 'Emergency Contact',
    message: `🚨 *EMERGENCY ASSISTANCE NEEDED*\n━━━━━━━━━━━━━━━━━━\nHello! I need *immediate emergency assistance*.\n\nPlease contact me urgently!\n\n_Thank you!_ 🙏`,
  },
];

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { info: hospitalInfo } = useHospitalInfo();

  const getWhatsAppUrl = (message) =>
    `https://wa.me/${hospitalInfo.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Popup Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-primary px-4 py-3 flex items-center justify-between">
              <span className="text-white font-heading font-semibold text-sm">
                Chat with us
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Close chat options"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            {/* Options List */}
            <div className="p-2">
              {whatsappOptions.map((option) => (
                <a
                  key={option.label}
                  href={getWhatsAppUrl(option.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors duration-200 text-sm font-medium text-slate-700"
                >
                  <span className="text-xl flex-shrink-0">{option.emoji}</span>
                  <span>{option.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-pulse-slow"
        aria-label="Open WhatsApp chat"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </button>
    </div>
  );
};

export default WhatsAppFloat;
