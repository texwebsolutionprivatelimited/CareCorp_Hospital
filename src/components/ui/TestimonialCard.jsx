import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => {
  const { name, rating, review, role } = testimonial;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-primary relative"
    >
      {/* Decorative quote icon */}
      <FaQuoteLeft className="absolute top-4 right-4 text-4xl text-primary/10" />

      {/* Star rating */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={star <= rating ? 'text-amber-400' : 'text-slate-200'}
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
        &ldquo;{review}&rdquo;
      </p>

      {/* Bottom: avatar + name */}
      <div className="flex items-center gap-3">
        {/* Avatar circle with first letter */}
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {name.charAt(0)}
          </span>
        </div>

        <div>
          <p className="font-semibold text-slate-800 text-sm">{name}</p>
          <p className="text-xs text-text-secondary">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
