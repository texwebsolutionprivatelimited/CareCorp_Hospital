import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/ui/SectionHeading';
import ServiceCard from '../../components/ui/ServiceCard';
import { generalPhysicianServices, childCareServices } from '../../constants/data';

const tabs = [
  { id: 'general', label: 'General Physician', emoji: '🩺' },
  { id: 'childcare', label: 'Child Care (Pediatrics)', emoji: '👶' },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('general');

  const services = activeTab === 'general' ? generalPhysicianServices : childCareServices;
  const variant = activeTab === 'general' ? 'general' : 'childcare';

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
            Our Services
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-slate-300"
          >
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-primary-light">Services</span>
          </motion.div>
        </div>
      </section>

      {/* Services Content */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Healthcare Services"
            subtitle="Comprehensive medical services for patients of all ages"
          />

          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-4 mt-10 mb-12">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'gradient-primary text-white shadow-lg scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="text-lg">{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Service Cards Grid */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
                variant={variant}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Info */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title={activeTab === 'general' ? 'General Physician Care' : 'Child Care & Pediatrics'}
            subtitle={activeTab === 'general'
              ? 'Expert medical care for adults and senior citizens'
              : 'Specialized healthcare for children from newborns to adolescents'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 items-start bg-white rounded-xl p-5 border border-slate-100"
              >
                <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${activeTab === 'general' ? 'bg-primary' : 'bg-secondary'}`} />
                <div>
                  <h4 className="font-heading font-semibold text-slate-800">{service.title}</h4>
                  <p className="text-text-secondary text-sm mt-1 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative text-white text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hospital-hero.jpg"
            alt="Expert Medical Care"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Need Expert Medical Care?</h2>
            <p className="text-teal-100 mb-8 text-lg">Book an appointment and let our specialists take care of you.</p>
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
