import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaStethoscope, FaClipboardCheck, FaMicroscope, FaCalendarAlt, FaShieldAlt, FaMobileAlt, FaCheckCircle } from 'react-icons/fa';

const packages = [
  {
    title: 'Basic Wellness Screening',
    price: '₹1,500',
    description: 'Ideal for routine assessment with essential blood tests and general health review.',
    features: ['CBC', 'Blood Sugar', 'Blood Pressure Check', 'Doctor Consultation'],
    image: "https://ik.imagekit.io/bumvzsaaz/download.jpeg?updatedAt=1784787144145"
  },
  {
    title: 'Advanced Health Check',
    price: '₹3,500',
    description: 'Complete full-body screening for early detection of common lifestyle diseases.',
    features: ['Lipid Profile', 'Liver & Kidney Function', 'ECG', 'Nutrition Guidance'],
    image: "https://ik.imagekit.io/bumvzsaaz/Medium%20shot%20nurse%20and%20doctor%20checking%20patient%20_%20Free%20Photo.jpeg?updatedAt=1784787147145"
  },
  {
    title: 'Executive Premium Package',
    price: '₹6,500',
    description: 'Comprehensive package designed for professionals and families seeking in-depth evaluation.',
    features: ['Vitamin Profile', 'Thyroid Test', 'Chest X-ray', 'Priority Consultation'],
    image: "https://ik.imagekit.io/bumvzsaaz/istockphoto-2162707468-612x612.jpg?updatedAt=1784356297322"
  },
];

const highlights = [
  {
    icon: FaStethoscope,
    title: 'Expert doctors',
    text: 'Consult with experienced physicians and specialists.',
    image: 'https://ik.imagekit.io/bumvzsaaz/Health-image-2.jpeg?updatedAt=1782724056979',
  },
  {
    icon: FaMicroscope,
    title: 'Modern diagnostics',
    text: 'Fast lab testing and accurate results with quality assurance.',
    image: 'https://ik.imagekit.io/bumvzsaaz/photo-1629909613654-28e377c37b09.avif?updatedAt=1784784157816',
  },
  {
    icon: FaShieldAlt,
    title: 'Preventive care',
    text: 'Detect issues early and stay ahead of health risks.',
    image: 'https://ik.imagekit.io/bumvzsaaz/photo-1584036561566-baf8f5f1b144.avif',
  },
];

export default function HealthCheckup() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-800 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_40%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur mt-5">
                <FaHeartbeat className="text-teal-300" />
                Preventive Care Made Simple
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                Health Check-up Packages for Every Stage of Life
              </h1>
              <p className="mt-5 text-lg text-slate-200 leading-relaxed">
                Get complete health screening, expert medical guidance, and peace of mind with our tailored check-up plans.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/appointment" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:scale-105">
                  <FaCalendarAlt /> Book Your Check-up
                </Link>
                <a href="tel:+919876543210" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                  <FaMobileAlt /> Call for Help
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/20 p-3">
                  <FaClipboardCheck className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Why choose us?</h2>
                  <p className="text-sm text-slate-200">Fast appointments, trusted diagnostics, and expert follow-up.</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-100">
                <li className="flex items-start gap-2"><FaCheckCircle className="mt-1 text-teal-300" /> Same-day or next-day check-up availability.</li>
                <li className="flex items-start gap-2"><FaCheckCircle className="mt-1 text-teal-300" /> Trusted lab partners and modern medical equipment.</li>
                <li className="flex items-start gap-2"><FaCheckCircle className="mt-1 text-teal-300" /> Clear reports with doctor consultation and guidance.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-lg"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-slate-950/55" />
                  <div className="relative z-10 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
                      <Icon className="text-xl" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Popular Packages</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-slate-800">Choose a package that fits your needs</h2>
            <p className="mt-3 text-lg text-text-secondary">Whether you need a quick wellness review or a comprehensive screening, we have the right option for you.</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${pkg.image})` }}
                />
                <div className="absolute inset-0 bg-slate-950/65" />
                <div className="relative z-10 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-semibold text-white">{pkg.title}</h3>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white backdrop-blur">{pkg.price}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-200">{pkg.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-100">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <FaCheckCircle className="mt-1 text-emerald-300" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/appointment" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600">
                    <FaCalendarAlt /> Book Appointment
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto rounded-3xl border border-slate-200 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Need guidance?</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold text-slate-800">Schedule a check-up and get your health roadmap</h2>
              <p className="mt-4 text-lg text-text-secondary">Our doctors will help you understand your results and recommend next steps with clarity and care.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-heading text-xl font-semibold text-slate-800">Quick appointment support</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">Call us or visit the appointment page to choose a convenient time.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="tel:+919876543210" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white">Call Now</a>
                <Link to="/appointment" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700">Book Appointment</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
