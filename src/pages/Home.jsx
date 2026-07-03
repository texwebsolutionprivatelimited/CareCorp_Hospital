import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaCalendarAlt,
  FaAmbulance,
  FaHospitalAlt,
  FaUserMd,
  FaChild,
  FaStethoscope,
  FaStar,
  FaArrowRight,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
  FaHeartbeat,
  FaShieldAlt,
  FaHandHoldingHeart,
  FaBaby,
  FaSyringe,
  FaChartLine,
  FaThermometerHalf,
  FaVirus,
  FaTint,
  FaAllergies,
  FaAppleAlt,
  FaClinicMedical,
  FaCarrot,
  FaLungs,
  FaBrain,
  FaClipboardCheck,
  FaCheckCircle,
  FaQuoteLeft,
} from 'react-icons/fa';
import { MdEmergency, MdBiotech } from 'react-icons/md';

import SectionHeading from '../components/ui/SectionHeading';
import ServiceCard from '../components/ui/ServiceCard';
import DoctorCard from '../components/ui/DoctorCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import StatsCounter from '../components/ui/StatsCounter';
import FAQAccordion from '../components/ui/FAQAccordion';
import BlogCard from '../components/ui/BlogCard';

import {
  hospitalInfo,
  generalPhysicianServices,
  childCareServices,
  doctors,
  stats,
  whyChooseUs,
  faqs,
  testimonials,
  sampleBlogs,
} from '../constants/data';

/* ─── Icon map for Why Choose Us section ─── */
const whyChooseIconMap = {
  MdEmergency,
  FaUserMd,
  MdBiotech,
  FaHandHoldingHeart,
  FaChild,
  FaHeartbeat,
  FaHeart: FaHeartbeat, // fallback for FaHeart → FaHeartbeat
};

/* ─── Shared animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const Home = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — Hero Banner
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Hospital background image */}
        <div className="absolute inset-0">
          <img
            src="/images/hospital-hero.jpg"
            alt="CareFirst Hospital Building"
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-slate-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30" />
        </div>

        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 -left-32 w-80 h-80 rounded-full bg-secondary/10 blur-3xl animate-float" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary-light/5 blur-2xl animate-bounce-gentle" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Badge */}
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full text-sm mb-6 backdrop-blur-sm"
            >
              <FaHeartbeat className="text-primary-light" />
              Welcome to {hospitalInfo.name}
            </motion.span>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight"
            >
              Compassionate Care
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary">
                for{' '}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary">
                Every Age
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 max-w-2xl mt-6"
            >
              Providing expert general physician and pediatric care with modern
              facilities, experienced doctors, and a warm, patient-first
              environment for your whole family.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-500/25"
              >
                <FaCalendarAlt />
                Book Appointment
              </Link>
              <a
                href={`tel:${hospitalInfo.emergencyPhone}`}
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <FaPhoneAlt />
                Emergency Call
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 lg:mt-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 px-6 py-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '15000+', label: 'Patients Treated' },
                { value: '15+', label: 'Years Experience' },
                { value: '10+', label: 'Expert Doctors' },
                { value: '25+', label: 'Awards Won' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-heading font-extrabold text-white">
                    {stat.value}
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — Emergency Contact (Coming Soon)
      ═══════════════════════════════════════════════════════════ */}
      {false && (<>
      <section className="gradient-emergency text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 font-semibold">
              <FaAmbulance className="text-xl animate-bounce-gentle" />
              <span>Emergency Services Available 24/7</span>
            </div>
            <a
              href={`tel:${hospitalInfo.emergencyPhone}`}
              className="flex items-center gap-2 hover:underline transition-all duration-300 hover:scale-105"
            >
              <FaPhoneAlt />
              <span>{hospitalInfo.emergencyPhone}</span>
            </a>
            <a
              href={`https://wa.me/${hospitalInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline transition-all duration-300 hover:scale-105"
            >
              <FaWhatsapp className="text-xl" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — Book Appointment CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
                <SectionHeading
                  centered={false}
                  title="Book Your Appointment Today"
                  subtitle="Schedule your visit in just a few clicks. Choose your preferred doctor, date, and time slot."
                />
              </motion.div>

              <motion.ul
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 space-y-4"
              >
                {[
                  'Easy Online Booking',
                  'Choose Your Preferred Doctor',
                  'Flexible Time Slots',
                  'Instant Confirmation',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-primary flex-shrink-0 text-lg" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-2 gradient-primary text-white font-semibold px-8 py-4 rounded-full mt-8 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                >
                  <FaCalendarAlt />
                  Book Now
                  <FaArrowRight className="text-sm" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Decorative appointment card mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary-light/10 rounded-3xl p-8 border border-primary/10">
                {/* Mockup header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                      <FaCalendarAlt className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-slate-800">
                        Schedule Appointment
                      </p>
                      <p className="text-xs text-slate-400">
                        Quick & Easy Booking
                      </p>
                    </div>
                  </div>

                  {/* Real form fields */}
                  <div className="space-y-3">
                    <div className="relative">
                      <FaUserMd className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 text-sm pointer-events-none" />
                      <select className="w-full h-11 bg-slate-50 rounded-xl border border-slate-200 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-primary appearance-none cursor-pointer">
                        <option value="">Select Doctor</option>
                        {doctors.map(doc => (
                          <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialization}</option>
                        ))}
                      </select>
                    </div>
                    <div className="relative">
                      <input 
                        type="date" 
                        className="w-full h-11 bg-slate-50 rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none focus:border-primary cursor-pointer"
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="time" 
                        className="w-full h-11 bg-slate-50 rounded-xl border border-slate-200 px-4 text-sm text-slate-700 outline-none focus:border-primary cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* CTA button */}
                  <Link 
                    to="/appointment" 
                    className="block mt-4 gradient-primary text-white text-center py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition"
                  >
                    Confirm Appointment
                  </Link>
                </div>

                {/* Decorative elements around the card */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/15 rounded-full blur-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — About Hospital
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Decorative image area */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto rounded-3xl relative overflow-hidden shadow-2xl group">
                {/* Hospital image */}
                <img
                  src="/images/hospital-about.jpg"
                  alt="CareFirst Hospital Interior"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />

                {/* Floating decorative cards */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 flex items-center gap-2 animate-float">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <FaShieldAlt className="text-green-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Trusted</p>
                    <p className="text-[10px] text-slate-400">Since 2009</p>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 flex items-center gap-2 animate-bounce-gentle">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <FaStar className="text-amber-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">4.9 Rating</p>
                    <p className="text-[10px] text-slate-400">Google Reviews</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: About content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
                <SectionHeading
                  centered={false}
                  title={`About ${hospitalInfo.name}`}
                  subtitle="A legacy of trust and excellence in healthcare"
                />
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-6 space-y-4 text-slate-600 leading-relaxed"
              >
                <p>
                  {hospitalInfo.name} is a premier multispecialty clinic dedicated to
                  providing compassionate, high-quality healthcare for patients of all
                  ages. With over 15 years of medical excellence, we have earned the
                  trust of thousands of families across Mumbai.
                </p>
                <p>
                  Our team of experienced physicians and pediatricians, supported by
                  modern diagnostic equipment, ensures accurate diagnosis and
                  effective treatment. From routine health check-ups to emergency
                  care, we are here for you 24/7.
                </p>
              </motion.div>

              {/* Mission & Vision cards */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="grid sm:grid-cols-2 gap-4 mt-8"
              >
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <FaHeartbeat className="text-primary" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-800 mb-1">
                    Our Mission
                  </h4>
                  <p className="text-sm text-slate-500">
                    To deliver affordable, accessible, and exceptional healthcare to
                    every patient with empathy and integrity.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                    <FaShieldAlt className="text-secondary" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-800 mb-1">
                    Our Vision
                  </h4>
                  <p className="text-sm text-slate-500">
                    To be the most trusted community hospital, setting the standard
                    for patient-centric care and medical innovation.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary font-semibold mt-8 hover:gap-3 transition-all duration-300"
                >
                  Learn More About Us <FaArrowRight className="text-sm" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — Our Doctors
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Meet Our Expert Doctors"
            subtitle="Experienced, caring physicians dedicated to your health and well-being"
          />

          <div className="mt-12 overflow-hidden w-full relative pb-8">
            {/* Gradient masks for smooth fade out at edges */}
            <div className="absolute top-0 left-0 w-8 md:w-24 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 md:w-24 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            {/* Sliding track */}
            <div className="flex gap-8 w-max animate-scroll">
              {/* Duplicate the array to create an infinite loop effect */}
              {[...doctors, ...doctors].map((doctor, idx) => (
                <div key={`${doctor.id}-${idx}`} className="w-[320px] md:w-[350px] shrink-0">
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
            >
              View All Doctors <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — General Physician Services
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="General Physician Services"
            subtitle="Comprehensive medical care for adults — from diagnostics to chronic disease management"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {generalPhysicianServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
                variant="general"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — Child Care Services
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Child Care & Pediatric Services"
            subtitle="Gentle, expert care for your little ones — from newborn to adolescent health"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {childCareServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
                variant="childcare"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8 — Why Choose Us
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding gradient-hero overflow-hidden relative">
        {/* Decorative background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            light
            title="Why Choose CareFirst?"
            subtitle="Delivering excellence in healthcare with a patient-first philosophy"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {whyChooseUs.map((item, index) => {
              const IconComp = whyChooseIconMap[item.icon] || FaHeartbeat;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComp className="text-2xl text-primary-light" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Stats Counter */}
          <div className="mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="text-4xl md:text-5xl font-heading font-bold text-white">
                      {stat.value.toLocaleString()}
                      {stat.suffix}
                    </div>
                    <p className="text-sm text-slate-300 mt-2 font-medium">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9 — Patient Testimonials
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="What Our Patients Say"
            subtitle="Real experiences from the families who trust us with their health"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-12">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
            >
              View All Testimonials <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 10 — Health Tips (Latest Blogs)
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Health Tips & Articles"
            subtitle="Expert health advice and latest updates from our medical team"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {sampleBlogs.slice(0, 3).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
            >
              View All Articles <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 11 — FAQ
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions about our services"
          />

          <div className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
            {faqs.slice(0, 5).map((faq, index) => (
              <FAQAccordion
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onToggle={() =>
                  setOpenFAQ(openFAQ === index ? null : index)
                }
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
            >
              View All FAQs <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 12 — Contact
      ═══════════════════════════════════════════════════════════ */}
      <section className="section-padding gradient-primary text-white overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            light
            title="Get in Touch"
            subtitle="We're here to help — reach out to us anytime"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {/* Phone */}
            <motion.a
              href={`tel:${hospitalInfo.phone}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-300 text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaPhoneAlt className="text-xl text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1">
                Phone
              </h3>
              <p className="text-sm text-slate-200">{hospitalInfo.phone}</p>
              <p className="text-sm text-slate-200">
                {hospitalInfo.emergencyPhone}
              </p>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${hospitalInfo.email}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-300 text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaEnvelope className="text-xl text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1">
                Email
              </h3>
              <p className="text-sm text-slate-200">{hospitalInfo.email}</p>
            </motion.a>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-300 text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaMapMarkerAlt className="text-xl text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1">
                Address
              </h3>
              <p className="text-sm text-slate-200">{hospitalInfo.address}</p>
            </motion.div>

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all duration-300 text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaClock className="text-xl text-white" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1">
                Working Hours
              </h3>
              <p className="text-sm text-slate-200">
                {hospitalInfo.workingHours.weekdays}
              </p>
              <p className="text-sm text-slate-200">
                {hospitalInfo.workingHours.sunday}
              </p>
              <p className="text-sm text-amber-300 font-medium mt-1">
                {hospitalInfo.workingHours.emergency}
              </p>
            </motion.div>
          </div>

          {/* CTA to contact page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Contact Us
              <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>
      </>)}
    </>

  );
};

export default Home;
