import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaEye, FaTrophy, FaBookOpen, FaUsers, FaLaptopCode,
  FaGlobe, FaBriefcase, FaWallet, FaUserCheck, FaGraduationCap,
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle,
  FaHeartbeat, FaStethoscope, FaAmbulance, FaHospital, FaUserMd, FaShieldAlt
} from 'react-icons/fa';
import SectionHeading from '../../components/ui/SectionHeading';



// Container animation for stagger effect (Slow & Smooth)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Elements will load one after another smoothly
    },
  },
};

// Item animation for slow fade-in and slide-up
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 40, damping: 20, duration: 0.8 },
  },
};

export default function About() {
  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen">

      {/* Page Banner */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hospital-hero.jpg"
            alt="About CareFirst Hospital"
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
            About CareFirst Hospital
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-slate-300"
          >
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-primary-light">About</span>
          </motion.div>
        </div>
      </section>

      {/* 2. Founder & Chairman Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <SectionHeading
            title="Founder & Chairman"
            subtitle="A visionary word from Dr. Stish Mishra Patit on our healthcare mission and clinical excellence."
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl md:flex items-center gap-10"
        >
          <div className="md:w-1/4 text-center mb-6 md:mb-0">
            <div className="w-40 h-40 mx-auto rounded-2xl bg-slate-200 overflow-hidden shadow-md border-4 border-purple-100 flex items-center justify-center text-slate-400">
              <img
                src='https://ik.imagekit.io/bumvzsaaz/Doctor-image-2.jpeg'
                alt='Dr. Stish Mishra'
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mt-3">Dr. Stish Mishra</h3>
            <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-3 py-1 rounded-full mt-1 inline-block">FOUNDER & CHAIRMAN</span>
          </div>

          <div className="md:w-3/4">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span className="h-1 w-6 bg-primary block"></span> ADVANCING PATIENT CARE
            </h4>
            <blockquote className="border-l-4 border-purple-600 pl-4 italic text-slate-700 text-base md:text-lg mb-4 bg-purple-50/50 p-4 rounded-r-xl">
              "We are living in an era of rapid medical breakthrough and healthcare evolution. Our hospital is highly committed to bringing advanced treatment modalities and empathetic patient care to every corner of society..."
            </blockquote>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Dr.Stish Mishra is a veteran clinical specialist, visionary philanthropist, and healthcare pioneer who has dedicated his career to rural medical outreach, healthcare affordability, and uplifting public health standards.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2"><FaCheckCircle className="text-primary shrink-0" /> Dedicated services for rural health camps.</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-primary shrink-0" /> Specialized care for backward and tribal communities.</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-primary shrink-0" /> Focus on maternal health and women's wellness.</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-primary shrink-0" /> Environment-friendly and sustainable clinical operations.</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Detailed About Narrative */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <SectionHeading title="About CareFirst Hospital" subtitle="WHO WE ARE" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 space-y-4 text-slate-600 leading-relaxed text-sm md:text-base"
        >
          <p>
            <strong className="text-primary">CareFirst Hospital</strong> is a premier multispecialty clinic dedicated to
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
      </section>

      {/* 4. Vision & Mission Core Cards */}
      <section className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-3xl shadow-lg border border-purple-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 text-xl">
            <FaEye />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            To become a premier benchmark center of clinical excellence in the region by providing premium, patient-centric healthcare that restores life quality and builds an incredibly healthy society.
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-bold text-primary uppercase tracking-wider">
            <span>• Patient Centricity</span>
            <span>• Clinical Rigor</span>
            <span>• Ethical Medicine</span>
          </div>
        </motion.div>

        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-3xl shadow-lg border border-purple-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 text-xl">
            <FaTrophy />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
          <ul className="text-slate-600 text-sm space-y-2.5">
            <li className="flex items-start gap-2">• To deliver comprehensive multi-specialty clinical checkups at optimal price points.</li>
            <li className="flex items-start gap-2">• To incorporate high-end technology and evidence-based diagnostic patterns.</li>
            <li className="flex items-start gap-2">• To maintain an absolute minimal wait-time for trauma cases and emergency.</li>
            <li className="flex items-start gap-2">• To nurture world-class paramedical personnel, nursing ethic, and patient transparency.</li>
          </ul>
        </motion.div>
      </section>

      {/* 5. Why Choose Us (Grid Feature Section) */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <SectionHeading
            title="Why CareFirst Hospital?"
            subtitle="Delivering absolute medical security that merges international treatment algorithms with ultimate comfort."
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: <FaStethoscope />, title: "Expert Consultations", desc: "Highly skilled doctors and super-specialists across all key medical departments." },
            { icon: <FaUsers />, title: "Experienced Panel", desc: "Top-tier surgeons, consultants, and intensive care specialists with extensive medical experience." },
            { icon: <FaHeartbeat />, title: "Advanced Diagnostics", desc: "Ultra-modern labs, fully functional radiology setups, CT scan, and point-of-care tests." },
            { icon: <FaAmbulance />, title: "24/7 Trauma & Emergency", desc: "Rapid ambulance transport service with life support systems ready round-the-clock." },
            { icon: <FaBriefcase />, title: "Post-Op Rehab Desk", desc: "Robust physical therapy, dedicated monitoring setups, and streamlined regular follow-ups." },
            { icon: <FaWallet />, title: "Affordable Care Packages", desc: "Transparent billing models and fair costs for medical procedures and tests." },
            { icon: <FaUserCheck />, title: "Compassionate Nursing", desc: "Thoroughly professional nursing staff providing compassionate post-surgical patient care." },
            { icon: <FaHospital />, title: "Cashless & Health Panels", desc: "Seamless corporate tie-ups, major TPA integrations, and Ayushman Bharat / government scheme access." },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 text-xl">{item.icon}</div>
              <h4 className="font-semibold text-slate-800 text-base mb-1">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. Institutional Dignitaries */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionHeading
              title="Medical Dignitaries"
              subtitle="Guidance from veteran doctors and health visionaries dedicated to patient safety."
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Smt. Ranju Patil",
                role: "PATRON, CAREFIRST GROUP",
                desc: "A dedicated health administrator focused on expanding premier tertiary clinical setups across Bihar.",
                img: "https://ik.imagekit.io/bumvzsaaz/Doctor.Image.-1jpeg.jpeg"
              },
              {
                name: "Dr. Sanjay Patil",
                role: "PRESIDENT & MEDICAL DIRECTOR",
                desc: "Senior cardiac surgeon leading global clinical collaborations, innovative surgical methods, and safe health procedures.",
                img: "https://ik.imagekit.io/bumvzsaaz/Doctor-image-3.jpeg"
              },
              {
                name: "Prof. Dr. Sunita Deshmukh",
                role: "CHIEF MEDICAL OFFICER",
                desc: "Head of internal medicine board with a powerful passion for patient welfare metrics and preventative medical checkups.",
                img: "https://ik.imagekit.io/bumvzsaaz/Doctor-image-4.avif?updatedAt=1782727105504"
              },
            ].map((leader, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white p-6 rounded-3xl text-center shadow-md border border-slate-200/60 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="w-24 h-24 rounded-full mb-4 overflow-hidden border-4 border-purple-100 shadow-md">
                  <img
                    src={leader.img.trim()}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `<div className="w-full h-full bg-purple-950 text-white flex items-center justify-center font-bold text-xl">${leader.name.charAt(0)}</div>`;
                    }}
                  />
                </div>

                <h4 className="font-bold text-slate-800 text-lg">{leader.name}</h4>
                <p className="text-primary font-semibold text-xs tracking-wider uppercase mt-1 mb-3">{leader.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{leader.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Assistance Available & Helpline */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="text-xs font-bold border-l-4 pl-2 uppercase block mb-2">Support</span>
          <h2 className="text-2xl font-bold text-slate-900">HEALTHCARE HELPDESK</h2>
          <p className="text-sm text-slate-500 mt-1">Our customer experience unit is focused on managing seamless patient admission and checkup routes. Contact our medical desks directly.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
        >
          {["OPD & Emergency Consultation",
            "Multi-Specialty Surgeon Booking",
            "Cashless TPA & Corporate Claims",
            "Ayushman Bharat Scheme Support",
            "Diagnostics & Pathology Tracking"
          ]
            .map((help, idx) => (
              <motion.div key={idx} variants={itemVariants} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3 text-sm font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full bg-primary"></span> {help}
              </motion.div>
            ))}
        </motion.div>

        {/* Admissions Contact Footer Block */}
        <div className='w-[70%] mx-auto '>
          <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-purple-900 to-slate-950 text-white p-8 rounded-3xl shadow-xl"
        >
          <h3 className="text-xl font-bold mb-2 tracking-wide">PATIENT APPOINTMENTS HELPLINE</h3>
          <p className="text-xs text-purple-200 mb-6">Planning a health screening or critical consultation? Connect with our desk right away or drop by our admission counter.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6 border-b border-purple-800 pb-6">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-amber-400 shrink-0" />
              <span>+91 8423193193</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-amber-400 shrink-0" />
              <span>deepakn7267@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-amber-400 shrink-0" />
              <span>AIIMS Gorakhpur ( Kunraghat, Gorakhpur Uttar Pradesh, 273008 )</span>
            </div>
          </div>

          <button className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold py-3 rounded-xl transition duration-300 text-sm tracking-wider uppercase shadow-md">
            <a href='/Appointment'>
              BOOK AN APPOINTMENT
            </a>
          </button>
        </motion.div>
        </div>
      </section>
    </div>
  );
}