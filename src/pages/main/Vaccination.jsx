import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaSyringe, FaCalendarAlt, FaMobileAlt, FaHeartbeat, FaCheckCircle, FaChild, FaClock } from 'react-icons/fa';

const vaccinePrograms = [
  {
    title: 'Newborn Vaccination',
    age: '0-12 months',
    description: 'Essential childhood immunizations for healthy growth and protection from common infections.',
    features: ['BCG', 'OPV', 'Hepatitis B', 'DTP'],
  },
  {
    title: 'Child Immunization',
    age: '1-10 years',
    description: 'Timely vaccines for school-age children to prevent seasonal and contagious illnesses.',
    features: ['MMR', 'Typhoid', 'Chickenpox', 'Annual Flu'],
  },
  {
    title: 'Adult Vaccination',
    age: '18+ years',
    description: 'Protect yourself with vaccines suited for adults, travelers, and high-risk groups.',
    features: ['Influenza', 'COVID Booster', 'Td/Tdap', 'Travel Vaccines'],
  },
];

const benefits = [
  { icon: FaSyringe, title: 'Safe & Certified', text: 'Vaccines administered under expert medical guidance.' },
  { icon: FaClock, title: 'Flexible Scheduling', text: 'Book appointments that suit your family routine.' },
  { icon: FaShieldAlt, title: 'Preventive Care', text: 'Stay protected with timely immunization plans.' },
];

export default function Vaccination() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-teal-800 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur mt-5">
                <FaHeartbeat className="text-cyan-300" />
                Immunization for a Safer Future
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl font-heading">
                Vaccination Services for Every Age Group
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">
                Keep your family protected with safe, timely, and evidence-based vaccination care.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/appointment" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:scale-105">
                  <FaCalendarAlt /> Book Vaccination
                </Link>
                <a href="tel:+919876543210" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                  <FaMobileAlt /> Call Support
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/20 p-3">
                  <FaChild className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Trusted immunization care</h2>
                  <p className="text-sm text-slate-200">From infants to adults, we help families stay protected.</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-100">
                <li className="flex items-start gap-2"><FaCheckCircle className="mt-1 text-cyan-300" /> Expert pediatric and adult vaccination support.</li>
                <li className="flex items-start gap-2"><FaCheckCircle className="mt-1 text-cyan-300" /> Pre-vaccination counseling and follow-up guidance.</li>
                <li className="flex items-start gap-2"><FaCheckCircle className="mt-1 text-cyan-300" /> Convenient appointment slots for busy families.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-slate-800">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Vaccination Programs</p>
            <h2 className="mt-3 text-3xl font-heading font-bold text-slate-800 sm:text-4xl">Choose the right vaccine plan for your family</h2>
            <p className="mt-3 text-lg text-text-secondary">We provide age-appropriate vaccination guidance and support for all life stages.</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {vaccinePrograms.map((program, index) => (
              <motion.div key={program.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-semibold text-slate-800">{program.title}</h3>
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700">{program.age}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{program.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <FaCheckCircle className="mt-1 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/appointment" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark">
                  <FaCalendarAlt /> Book Appointment
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-gradient-to-r from-primary/10 to-cyan-100/60 p-8 sm:p-10 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Consult with us</p>
              <h2 className="mt-3 text-3xl font-heading font-bold text-slate-800 sm:text-4xl">Book your vaccination visit today</h2>
              <p className="mt-4 text-lg text-text-secondary">Our medical team will help you understand schedules, vaccine types, and what to expect during your visit.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-heading text-xl font-semibold text-slate-800">Need quick support?</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">Contact us to check availability and plan your child or family vaccination schedule.</p>
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
