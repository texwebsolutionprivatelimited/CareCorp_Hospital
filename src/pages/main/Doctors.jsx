import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import SectionHeading from '../../components/ui/SectionHeading';
import DoctorCard from '../../components/ui/DoctorCard';
import { getCollection } from '../../services/db';

const filters = ['All', 'General Physician', 'Pediatrician'];

export default function Doctors() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const docsData = await getCollection('doctors');
        // Filter out any corrupted records without a name
        const validDocs = docsData.filter(doc => doc.name);
        setDoctors(validDocs);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = activeFilter === 'All'
    ? doctors
    : doctors.filter(doc => doc.specialization.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div>
      {/* Banner */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hospital-hero.jpg"
            alt="CareFirst Hospital"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
        </div>

        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4"
          >
            Our Doctors
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-slate-300"
          >
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-primary-light">Doctors</span>
          </motion.div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Meet Our Expert Doctors"
            subtitle="Experienced, compassionate, and dedicated to your health and wellbeing"
          />

          {/* Filters */}
          <div className="flex items-center justify-center gap-3 mt-10 mb-12 flex-wrap">
            <FaFilter className="text-text-secondary text-sm" />
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeFilter === filter
                    ? 'gradient-primary text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg">Loading doctors...</p>
            </div>
          ) : (
            <>
              {/* Doctor Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>

              {filteredDoctors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-text-secondary text-lg">No doctors found for this filter.</p>
                </div>
              )}
            </>
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Need a Consultation?</h2>
            <p className="text-teal-100 mb-8 text-lg">Book an appointment with our expert doctors today.</p>
            <Link
              to="/appointment"
              className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-slate-50 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Book Appointment
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
