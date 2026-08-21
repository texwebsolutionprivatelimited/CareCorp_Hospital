import React, { useState, useEffect, useRef } from 'react';

const CountUp = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  // Extract target number and suffix
  const strValue = String(value ?? '');
  const numericMatch = strValue.match(/[\d,]+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0].replace(/,/g, ''), 10) : 0;
  const suffix = strValue.replace(/[\d,]+/, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || targetNumber === 0) return;

    let startTime = null;
    let animationFrameId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Ease out exponential curve for smooth deceleration
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easeOut * targetNumber);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [hasStarted, targetNumber, duration]);

  return (
    <span ref={ref}>
      {hasStarted ? count.toLocaleString() : 0}{suffix}
    </span>
  );
};

export default CountUp;
