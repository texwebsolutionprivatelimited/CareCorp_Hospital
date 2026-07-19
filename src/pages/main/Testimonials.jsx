import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import SectionHeading from '../../components/ui/SectionHeading';
import TestimonialCard from '../../components/ui/TestimonialCard';
import { getCollection } from '../../services/db';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getCollection('testimonials');
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const avgRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : "5.0";

  return (
    <div>
      {/* Banner */}
      <section className="gradient-hero pt-32 pb-20 text-white relative overflow-hidden">
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
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-2xl p-8 flex flex-col md:flex-row items-center justify-center gap-8 border border-slate-100"
          >
            <div className="text-center">
              <p className="text-5xl font-heading font-bold text-primary">{avgRating}</p>
              <div className="flex items-center gap-1 mt-2 justify-center">
                {[1, 2, 3, 4, 5].map(star => (
                  <FaStar key={star} className={star <= Math.round(Number(avgRating)) ? 'text-amber-400' : 'text-slate-200'} />
                ))}
              </div>
              <p className="text-text-secondary text-sm mt-1">Average Rating</p>
            </div>
            <div className="h-16 w-px bg-slate-200 hidden md:block" />
            <div className="text-center">
              <p className="text-5xl font-heading font-bold text-primary">{testimonials.length}</p>
              <p className="text-text-secondary text-sm mt-2">Total Reviews</p>
            </div>
            <div className="h-16 w-px bg-slate-200 hidden md:block" />
            <div className="text-center">
              <p className="text-5xl font-heading font-bold text-primary">100%</p>
              <p className="text-text-secondary text-sm mt-2">Patient Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto">
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
              {testimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
              {testimonials.length === 0 && (
                <div className="col-span-full text-center py-8 text-slate-500">No testimonials available.</div>
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
