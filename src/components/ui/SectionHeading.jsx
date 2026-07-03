import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle, centered = true, light = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={centered ? 'text-center' : ''}
    >
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>

      <div
        className={`w-20 h-1.5 bg-gradient-to-r from-primary to-primary-light rounded-full mb-4 ${
          centered ? 'mx-auto' : ''
        }`}
      />

      {subtitle && (
        <p
          className={`text-lg ${
            light ? 'text-slate-300' : 'text-text-secondary'
          } ${centered ? 'max-w-2xl mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
