import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import SectionHeading from '../../components/ui/SectionHeading';
import TestimonialCard from '../../components/ui/TestimonialCard';
import { getCollection } from '../../services/db';
import { testimonials as sampleTestimonials } from '../../constants/data';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(2);
  const [hasViewedMore, setHasViewedMore] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (!hasViewedMore) {
        setVisibleCount(2);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hasViewedMore]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getCollection('testimonials');
        if (data && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(sampleTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials(sampleTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handleViewMore = () => {
    setHasViewedMore(true);
    const step = 2;
    setVisibleCount(prev => prev + step);
  };

  const avgRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + Number(t.rating || 5), 0) / testimonials.length).toFixed(1)
    : "5.0";

  const visibleTestimonials = testimonials.slice(0, visibleCount);

  return (
    <div>
      {/* Banner */}
      <section className="gradient-hero pt-24 pb-8 md:pt-32 md:pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4"
          >
            Patient Testimonials
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-slate-300"
          >
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-primary-light">Testimonials</span>
          </motion.div>
        </div>
      </section>

      {/* Rating Summary */}
      <section className="bg-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-2xl p-4 sm:p-6 md:p-8 flex flex-row items-center justify-around md:justify-center gap-2 sm:gap-4 md:gap-8 border border-slate-100 shadow-sm"
          >
            <div className="text-center flex-1 md:flex-initial">
              <p className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-primary">{avgRating}</p>
              <div className="flex items-center gap-0.5 sm:gap-1 mt-1 sm:mt-2 justify-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <FaStar key={star} className={`text-xs sm:text-sm ${star <= Math.round(Number(avgRating)) ? 'text-amber-400' : 'text-slate-200'}`} />
                ))}
              </div>
              <p className="text-[11px] sm:text-xs md:text-sm text-text-secondary mt-1 whitespace-nowrap">Average Rating</p>
            </div>
            <div className="h-10 md:h-16 w-px bg-slate-200" />
            <div className="text-center flex-1 md:flex-initial">
              <p className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-primary">{testimonials.length}</p>
              <p className="text-[11px] sm:text-xs md:text-sm text-text-secondary mt-1 sm:mt-2 whitespace-nowrap">Total Reviews</p>
            </div>
            <div className="h-10 md:h-16 w-px bg-slate-200" />
            <div className="text-center flex-1 md:flex-initial">
              <p className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-primary">100%</p>
              <p className="text-[11px] sm:text-xs md:text-sm text-text-secondary mt-1 sm:mt-2 whitespace-nowrap">Patient Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="What Our Patients Say"
            subtitle="Real experiences from real patients who trust CareFirst Hospital"
          />
          {loading ? (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg">Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id || index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
              {testimonials.length === 0 && (
                <div className="col-span-full text-center py-8 text-slate-500">No testimonials available.</div>
              )}
              {visibleCount < testimonials.length && (
                <div className="col-span-full text-center mt-6">
                  <button
                    onClick={handleViewMore}
                    className="bg-white border-2 border-primary text-primary font-semibold px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-md text-sm cursor-pointer"
                  >
                    View More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-primary text-white text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Share Your Experience</h2>
            <p className="text-teal-100 mb-8 text-lg">Your feedback helps us improve and serve you better.</p>
            <Link
              to="/contact"
              className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-slate-50 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Leave a Review
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
