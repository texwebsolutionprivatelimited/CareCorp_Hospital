import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";
import ServiceCard from "../../components/ui/ServiceCard";
import { childCareServices } from "../../constants/data";

import {
  FaBaby,
  FaSyringe,
  FaHeartbeat,
  FaAppleAlt,
  FaCheckCircle,
  FaClinicMedical,
  FaArrowRight,
} from "react-icons/fa";

const services = [
  {
    title: "Newborn Care",
    icon: <FaBaby />,
    color: "from-pink-500 to-rose-400",
    bgColor: "bg-pink-50 text-pink-600",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600",
    items: [
      "Newborn Health Check-up",
      "Weight Monitoring",
      "Sleep Guidance",
      "Breastfeeding Support",
    ],
  },
  {
    title: "Vaccination",
    icon: <FaSyringe />,
    color: "from-blue-500 to-indigo-400",
    bgColor: "bg-blue-50 text-blue-600",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600",
    items: [
      "Routine Vaccination",
      "Immunization Schedule",
      "Flu Vaccine",
      "Travel Vaccination",
    ],
  },
  {
    title: "Child Health",
    icon: <FaHeartbeat />,
    color: "from-teal-500 to-emerald-400",
    bgColor: "bg-teal-50 text-teal-600",
    image: "https://ik.imagekit.io/bumvzsaaz/Hero-image.jpeg?updatedAt=1782707301130",
    items: [
      "Fever Treatment",
      "Cold & Cough",
      "Infection Care",
      "Routine Check-up",
    ],
  },
  {
    title: "Nutrition Care",
    icon: <FaAppleAlt />,
    color: "from-amber-500 to-orange-400",
    bgColor: "bg-amber-50 text-amber-600",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600",
    items: [
      "Growth Monitoring",
      "Healthy Diet Plan",
      "Vitamin Guidance",
      "Development Assessment",
    ],
  },
];

// Animation Configuration Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function ChildCare() {
  return (
    <div className="overflow-hidden">
      {/* Banner */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hospital-hero.jpg"
            alt="Child Care"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 text-center relative z-10"
        >
          <h1 className="text-5xl font-bold">Child Care</h1>
          <div className="mt-4">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link> / Child Care
          </div>
        </motion.div>
      </section>

      {/* Main Hero Section Wrap */}
      <section className="relative overflow-hidden pt-10 pb-24 bg-gradient-to-b from-blue-50/70 via-white to-slate-50">
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl -z-10 animate-pulse duration-[6000ms]" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-pink-100/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Enhanced Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs tracking-wider uppercase border border-blue-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              Child Care Excellence
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              Caring For Your Child's <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Healthy & Happy Future
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal pt-2">
              Our dedicated pediatric specialists provide comprehensive, compassionate healthcare services 
              from infancy to adolescence, ensuring your little ones grow strong and healthy.
            </p>
          </motion.div>

          {/* Service Cards Grid with Staggered Fade-in */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 transition-shadow duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Zoom & Overlay Effect */}
                  <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10 transition-opacity opacity-60 group-hover:opacity-40" />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Floating Icon badge */}
                    <div className={`absolute -bottom-5 right-6 w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-xl text-white shadow-lg z-20 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 pt-8">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-4">
                      {service.title}
                    </h3>

                    <ul className="space-y-3">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-tight">
                          <FaCheckCircle className="text-emerald-500 text-base shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="p-6 pt-0">
                  <a href="/Appointment">
                  <button className="w-full py-3 px-4 rounded-xl bg-slate-50 text-slate-700 font-semibold text-sm transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:shadow-md flex items-center justify-center gap-2 cursor-pointer">
                    <span>Book Appointment</span>
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Trust Features Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-20 relative rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-xl shadow-slate-200/50 p-8 sm:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/20 pointer-events-none" />
            
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 division-x division-slate-100">
              
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-16 h-16 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110">
                  <FaBaby />
                </div>
                <h3 className="font-extrabold text-xl text-slate-800">Child Specialists</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                  Highly certified & experienced pediatricians offering warm, friendly medical environments.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110">
                  <FaHeartbeat />
                </div>
                <h3 className="font-extrabold text-xl text-slate-800">Healthy Growth</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                  Proactive age-based developmental milestone tracking and physical-mental wellness care.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110">
                  <FaClinicMedical />
                </div>
                <h3 className="font-extrabold text-xl text-slate-800">Complete Care</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                  From emergency check-ups and vaccines to strict nutrition plans, all under one safe roof.
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Additional Cards Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Child Care Services"
            subtitle="Specialized healthcare for children."
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300 group flex flex-col"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className={`absolute -bottom-6 right-6 w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg bg-gradient-to-br ${service.color}`}>
                    {service.icon}
                  </div>
                </div>
                <div className="p-6 pt-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-heading font-bold text-slate-800 mb-4">{service.title}</h3>
                  <ul className="space-y-2 mb-6 flex-1">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <FaCheckCircle className={`shrink-0 ${service.bgColor.split(' ')[1]}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/appointment"
                    className={`inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all ${service.bgColor.split(' ')[1]}`}
                  >
                    Book Consultation <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}