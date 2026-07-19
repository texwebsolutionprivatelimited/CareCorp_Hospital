import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import SectionHeading from '../../components/ui/SectionHeading';
import FAQAccordion from '../../components/ui/FAQAccordion';
import { faqs, hospitalInfo } from '../../constants/data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Banner */}
      <section className="gradient-hero pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4"
          >
            FAQ
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-slate-300"
          >
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-primary-light">FAQ</span>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services"
          />

          {/* Search */}
          <div className="mt-10 mb-8 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 bg-background text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-sm"
            />
          </div>

          {/* FAQ List */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <FAQAccordion
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                  index={index}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-text-secondary">No questions found matching your search.</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-3 text-primary font-semibold hover:underline text-sm"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-heading font-bold text-slate-800 mb-4">Still Have Questions?</h2>
            <p className="text-text-secondary mb-8">
              Can&apos;t find what you&apos;re looking for? Feel free to reach out to us directly.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href={`tel:${hospitalInfo.phone.replace(/\s/g, '')}`}
                className="gradient-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition inline-flex items-center gap-2"
              >
                <FaPhoneAlt /> Call Us
              </a>
              <a
                href={`https://wa.me/${hospitalInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition inline-flex items-center gap-2"
              >
                <FaWhatsapp /> WhatsApp
              </a>
              <Link
                to="/contact"
                className="border border-slate-200 text-slate-600 px-6 py-3 rounded-full font-semibold hover:bg-slate-50 transition"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
