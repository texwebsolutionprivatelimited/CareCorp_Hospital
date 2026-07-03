import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const FAQAccordion = ({ question, answer, isOpen, onToggle, index }) => {
  return (
    <div className="border-b border-slate-100 last:border-0">
      {/* Question button */}
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-5 px-2 text-left group cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-heading font-semibold text-slate-800 group-hover:text-primary transition-colors duration-300 pr-4 text-base md:text-lg">
          {question}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <FaChevronDown className="text-primary text-sm" />
        </motion.div>
      </button>

      {/* Answer with AnimatePresence */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-5 text-text-secondary text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQAccordion;
