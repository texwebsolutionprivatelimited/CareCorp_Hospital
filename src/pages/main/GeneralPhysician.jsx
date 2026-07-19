import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";
import ServiceCard from "../../components/ui/ServiceCard";
import { generalPhysicianServices } from "../../constants/data";
import {
  FaUserMd,
  FaHeartbeat,
  FaStethoscope,
  FaClinicMedical,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const services = [
  {
    title: "General Consultation",
    icon: <FaUserMd />,
    color: "from-blue-600 to-cyan-500",
    image:
      "https://ik.imagekit.io/bumvzsaaz/Doctor-image-5.avif?updatedAt=1782727105648",
    items: [
      "Routine Health Check-up",
      "Fever Treatment",
      "Cold & Cough",
      "Viral Infection",
    ],
  },
  {
    title: "Chronic Disease Care",
    icon: <FaHeartbeat />,
    color: "from-rose-500 to-red-400",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
    items: [
      "Diabetes Management",
      "Blood Pressure Control",
      "Thyroid Consultation",
      "Heart Health Monitoring",
    ],
  },
  {
    title: "Preventive Healthcare",
    icon: <FaStethoscope />,
    color: "from-indigo-600 to-blue-500",
    image:
      "https://ik.imagekit.io/bumvzsaaz/Doctor-image-3.jpeg?updatedAt=1782713685418",
    items: [
      "Lifestyle Consultation",
      "Annual Check-up",
      "Vaccination Advice",
      "Nutrition Guidance",
    ],
  },
  {
    title: "Family Medical Care",
    icon: <FaClinicMedical />,
    color: "from-emerald-600 to-teal-500",
    image:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600",
    items: [
      "Children Health",
      "Adult Care",
      "Senior Citizen Care",
      "Allergy Treatment",
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

export default function GeneralPhysician() {
  return (
    <div className="overflow-hidden">
      {/* Banner */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hospital-hero.jpg"
            alt="General Physician"
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
          <h1 className="text-5xl font-bold">General Physician</h1>
          <div className="mt-4">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link> / General Physician
          </div>
        </motion.div>
      </section>

      {/* Main Container Section */}
      <section className="relative overflow-hidden pt-10 pb-24 bg-gradient-to-b from-cyan-50/60 via-white to-slate-50">
        
        {/* Soft Ambient Background Elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl -z-10 animate-pulse duration-[8000ms]" />
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-700 font-semibold text-xs tracking-wider uppercase border border-cyan-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              Primary Care Physicians
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              Complete Healthcare <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                For Your Entire Family
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal pt-2">
              Our experienced medical team provides first-class diagnosis and treatment. From managing chronic conditions to quick relief recovery, we've got you covered.
            </p>
          </motion.div>

          {/* Cards Grid with Staggered Fade-in */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 transition-shadow duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image wrapper with Zoom Effect */}
                  <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10 opacity-75 group-hover:opacity-50 transition-opacity duration-300" />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Floating Doctor-Theme Badge */}
                    <div className={`absolute -bottom-5 right-6 w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-xl text-white shadow-lg z-20 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 pt-8">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-4">
                      {service.title}
                    </h3>

                    <ul className="space-y-3">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-tight">
                          <FaCheckCircle className="text-emerald-500 text-base shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
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

          {/* Bottom Trust Badge Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-24 relative rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-xl shadow-slate-200/50 p-8 sm:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/30 to-blue-50/20 pointer-events-none" />
            
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 division-x division-slate-100">
              
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110">
                  <FaUserMd />
                </div>
                <h3 className="font-extrabold text-xl text-slate-800">Expert Doctors</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                  Highly skilled medical practitioners with years of clinical diagnostic experience.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110">
                  <FaHeartbeat />
                </div>
                <h3 className="font-extrabold text-xl text-slate-800">Quality Treatment</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                  Advanced primary clinical protocols designed around patient safety and rapid relief.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110">
                  <FaClinicMedical />
                </div>
                <h3 className="font-extrabold text-xl text-slate-800">24×7 Support</h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                  Constant access to pharmacy desk routing and clinical monitoring whenever you need us.
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
            title="General Physician Services"
            subtitle="Expert healthcare for adults."
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {generalPhysicianServices.map((service, index) => (
              <motion.div key={service.id || index} variants={fadeInUp}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  index={index}
                  variant="general"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}