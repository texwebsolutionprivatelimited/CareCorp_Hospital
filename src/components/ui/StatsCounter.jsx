import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CounterItem = ({ label, value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    let animationFrame;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-heading font-bold text-primary">
        {displayValue.toLocaleString()}
        {suffix}
      </div>
      <p className="text-sm md:text-base text-text-secondary mt-2 font-medium">
        {label}
      </p>
    </motion.div>
  );
};

const StatsCounter = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <CounterItem
          key={index}
          label={stat.label}
          value={stat.value}
          suffix={stat.suffix}
        />
      ))}
    </div>
  );
};

export default StatsCounter;
