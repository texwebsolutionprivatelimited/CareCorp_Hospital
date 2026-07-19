import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InitialPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup after 5 seconds on every refresh/first visit
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleBookAppointment = () => {
    setIsOpen(false);
    navigate('/appointment');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 9999 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
            style={{ zIndex: 10000 }}
          >
            <div className="relative p-6 sm:p-8 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
              >
                <FaTimes size={20} />
              </button>
              
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <FaCalendarCheck size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading">
                Need a Doctor?
              </h3>
              <p className="text-gray-600 mb-8">
                Book an appointment with our expert doctors today and get the best healthcare services tailored to your needs.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleBookAppointment}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/30"
                >
                  Book Appointment Now
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-gray-500 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InitialPopup;
