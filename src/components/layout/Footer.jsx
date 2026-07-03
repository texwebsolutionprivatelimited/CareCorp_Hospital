import { Link } from 'react-router-dom';
import {
  FaHospitalAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaGooglePlay,
  FaApple,
} from 'react-icons/fa';
import { hospitalInfo, navLinks } from '../../constants/data';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Doctors', path: '/doctors' },
  { name: 'Services', path: '/services' },
  { name: 'Appointment', path: '/appointment' },
  { name: 'Contact', path: '/contact' },
];

const services = [
  'General Physician',
  'Child Care',
  'Health Check-up',
  'Vaccination',
  'Diabetes Management',
  'Emergency Care',
];

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer>
      {/* Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-teal-500 to-emerald-500" />

      {/* Main Footer */}
      <div className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1 - About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaHospitalAlt className="text-2xl text-primary" />
                <h3 className="text-xl font-bold font-heading text-white">
                  {hospitalInfo.name}
                </h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Dedicated to providing compassionate, high-quality healthcare
                services to our community. Your health is our priority, and we
                are committed to delivering excellence in every aspect of care.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-600 text-slate-400 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                  >
                    <social.icon className="text-sm" />
                  </a>
                ))}
              </div>

              {/* App Download Badges */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Download Our App</h4>
                <div className="flex flex-wrap items-center gap-4">
                  {/* Google Play Badge */}
                  <a href="#" className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-xl border border-slate-700 hover:border-slate-500 hover:scale-105 transition-all duration-300 w-max">
                    <FaGooglePlay className="text-xl" />
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-wider opacity-80 leading-none mb-0.5">GET IT ON</div>
                      <div className="text-sm font-semibold leading-none font-sans">Google Play</div>
                    </div>
                  </a>

                  {/* App Store Badge */}
                  <a href="#" className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-xl border border-slate-700 hover:border-slate-500 hover:scale-105 transition-all duration-300 w-max">
                    <FaApple className="text-2xl mb-0.5" />
                    <div className="text-left">
                      <div className="text-[10px] tracking-wider opacity-80 leading-none mb-0.5">Download on the</div>
                      <div className="text-sm font-semibold leading-none font-sans">App Store</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h4 className="text-lg font-semibold font-heading text-white mb-1">
                Quick Links
              </h4>
              <div className="w-10 h-0.5 bg-primary rounded-full mb-6" />
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-primary-light transition-colors duration-200 text-sm flex items-center gap-2 group"
                    >
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        →
                      </span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Our Services */}
            <div>
              <h4 className="text-lg font-semibold font-heading text-white mb-1">
                Our Services
              </h4>
              <div className="w-10 h-0.5 bg-primary rounded-full mb-6" />
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="text-slate-400 hover:text-primary-light transition-colors duration-200 text-sm flex items-center gap-2 group"
                    >
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        →
                      </span>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Contact Us */}
            <div>
              <h4 className="text-lg font-semibold font-heading text-white mb-1">
                Contact Us
              </h4>
              <div className="w-10 h-0.5 bg-primary rounded-full mb-6" />
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                  <span className="text-slate-400 text-sm leading-relaxed">
                    {hospitalInfo.address}
                  </span>
                </li>
                <li>
                  <a
                    href={`tel:${hospitalInfo.phone}`}
                    className="flex items-center gap-3 text-slate-400 hover:text-primary-light transition-colors duration-200"
                  >
                    <FaPhoneAlt className="text-primary flex-shrink-0 text-sm" />
                    <span className="text-sm">{hospitalInfo.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${hospitalInfo.email}`}
                    className="flex items-center gap-3 text-slate-400 hover:text-primary-light transition-colors duration-200"
                  >
                    <FaEnvelope className="text-primary flex-shrink-0 text-sm" />
                    <span className="text-sm">{hospitalInfo.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${hospitalInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-400 hover:text-green-400 transition-colors duration-200"
                  >
                    <FaWhatsapp className="text-green-500 flex-shrink-0 text-sm" />
                    <span className="text-sm">WhatsApp Us</span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FaClock className="text-primary mt-1 flex-shrink-0 text-sm" />
                  <div className="text-sm">
                    <p className="text-slate-400">
                      <span className="text-slate-300 font-medium">Weekdays:</span>{' '}
                      {hospitalInfo.workingHours.weekdays}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-slate-300 font-medium">Sunday:</span>{' '}
                      {hospitalInfo.workingHours.sunday}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-slate-300 font-medium">Emergency:</span>{' '}
                      {hospitalInfo.workingHours.emergency}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
            <p className="text-center text-slate-400 text-sm">
              © 2026 {hospitalInfo.name}. All rights reserved.
            </p>
            <p className="text-center text-slate-500 text-xs mt-2">
              Your Health, Our Priority.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
