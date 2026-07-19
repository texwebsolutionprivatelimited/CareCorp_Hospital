import React, { useEffect, useState } from 'react';
import { 
  FaCheckCircle, FaEye, FaTrophy, FaBookOpen, FaUsers, 
  FaLaptopCode, FaGlobe, FaBriefcase, FaWallet, FaUserCheck, 
  FaGraduationCap, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt 
} from 'react-icons/fa';

// Custom Hook for Scroll Animation
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, []);
};

export default function SarvadnyaVidyapeeth() {
  useScrollAnimation();

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen selection:bg-purple-200">
      
      {/* 1. Founder & Chairman Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <p className="text-xs uppercase tracking-widest text-purple-600 font-bold">- Message From Founder -</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">
            Founder & <span className="text-purple-600">Chairman</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2 italic">A visionary word from Dr. Bhuvneshwar Patit on our core educational lesson.</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl md:flex items-center gap-10 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
          <div className="md:w-1/4 text-center mb-6 md:mb-0">
            <div className="w-40 h-40 mx-auto rounded-2xl bg-gray-200 overflow-hidden shadow-md border-4 border-purple-100">
              {/* Replace with actual image source */}
              <div className="w-full h-full bg-slate-400 flex items-center justify-center text-white font-bold">Photo</div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mt-3">Dr. Bhuvneshwar Patit</h3>
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mt-1 inline-block">FOUNDER & CHAIRMAN</span>
          </div>

          <div className="md:w-3/4">
            <h4 className="text-purple-700 font-bold text-lg mb-3 flex items-center gap-2">
              <span className="h-1 w-6 bg-purple-600 block"></span> SHAPING THE FUTURE
            </h4>
            <blockquote className="border-l-4 border-purple-600 pl-4 italic text-slate-700 text-lg mb-4 bg-purple-50/50 p-4 rounded-r-xl">
              "We are living in the age of quantum jump of knowledge. The rapid pace of development of our country has provided tremendous opportunities for the young minds to achieve new insights..."
            </blockquote>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Dr. Bhuvneshwar Patit is a visionary, philanthropist, and social worker who has been working in the fields of rural livelihood, women empowerment, and the upliftment of backward classes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> We work for rural areas.</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> We work for Tribe and Scheduled Caste students.</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> We work for women's empowerment.</div>
              <div className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> We work for sustainability.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Parent Trust Info */}
      <section className="bg-slate-900 text-white py-10 my-8">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 items-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div>
            <span className="text-xs text-purple-400 uppercase font-bold">Parent Organization</span>
            <h3 className="text-xl font-bold mt-1">Triveni Charitable Trust</h3>
            <p className="text-xs text-gray-400">Reg No: 123-ABC-202X</p>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-gray-700 pt-4 md:pt-0 md:pl-6">
            <h4 className="text-amber-400 font-semibold text-sm uppercase">Our Vision</h4>
            <p className="text-xs text-gray-300 mt-1">To foster human development through excellence in quality education, lifetime learning, and modern facilities.</p>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-gray-700 pt-4 md:pt-0 md:pl-6">
            <h4 className="text-amber-400 font-semibold text-sm uppercase">Our Mission</h4>
            <p className="text-xs text-gray-300 mt-1">Providing financial assistance for tribes, rural, and needy youth for higher education and sustainable livelihood.</p>
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="text-center mb-10">
          <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full uppercase">Who We Are</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">About Sarvadnya Vidyapeeth</h2>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
          <p>
            <strong className="text-purple-600">Sarvadnya Vidyapeeth</strong> was established under the aegis of <strong className="text-slate-800">Triveni Charitable Trust</strong> with the objective of creating a strong educational platform where students can gain not only academic knowledge but also practical skills required in today's competitive world.
          </p>
          <p>
            The institution believes that education should lead to self-reliance, confidence, and career success. Therefore, equal emphasis is placed on maximum learning, industry exposure, personality development, digital literacy, and employability skills.
          </p>
          <p className="bg-purple-50 p-4 rounded-xl text-purple-900 font-medium border-l-4 border-purple-500">
            Located in the educational hub of Patna, Sarvadnya Vidyapeeth provides students with a modern learning environment, experienced faculty, practical training, and career guidance to help them achieve their professional goals.
          </p>
        </div>
      </section>

      {/* 4. Vision & Mission Cards */}
      <section className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-white to-purple-50/40 p-8 rounded-3xl shadow-lg border border-purple-100/50 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="w-12 h-12 bg-purple-600 text-white flex items-center justify-center rounded-2xl shadow-md mb-4 text-xl">
            <FaEye />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            To become one of the leading centers of excellence in higher education by providing affordable, quality, and skill-oriented education that empowers students to become knowledgeable, innovative, self-reliant, and socially responsible individuals.
          </p>
          <div className="flex gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <span>• Inclusive Learning</span>
            <span>• Empowerment</span>
            <span>• Self-Reliance</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-purple-50/40 p-8 rounded-3xl shadow-lg border border-purple-100/50 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
          <div className="w-12 h-12 bg-purple-600 text-white flex items-center justify-center rounded-2xl shadow-md mb-4 text-xl">
            <FaTrophy />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li className="flex items-start gap-2">✔ To provide quality higher education at affordable fees.</li>
            <li className="flex items-start gap-2">✔ To promote skill-based and industry-oriented learning.</li>
            <li className="flex items-start gap-2">✔ To bridge the gap between academics and employment.</li>
            <li className="flex items-start gap-2">✔ To develop leadership, communication, and entrepreneurial skills.</li>
            <li className="flex items-start gap-2">✔ To encourage innovation, creativity, and lifelong learning.</li>
          </ul>
        </div>
      </section>

      {/* 5. Why Choose Us (Grid Section) */}
      <section className="max-w-6xl mx-auto px-4 py-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="text-center mb-12">
          <p className="text-xs uppercase font-bold text-purple-600 tracking-widest">- Why Choose Us -</p>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Why Sarvadnya <span className="text-purple-600">Vidyapeeth?</span></h2>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">Providing a robust educational platform that blends university standards with hands-on skills.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <FaBookOpen />, title: "Quality Education", desc: "Rigorous curriculum designed according to industry standards." },
            { icon: <FaUsers />, title: "Experienced Faculty", desc: "Dedicated mentors with exceptional academic and professional backgrounds." },
            { icon: <FaLaptopCode />, title: "Practical Learning", desc: "Project work, case studies, seminars, workshops, and hands-on training." },
            { icon: <FaGlobe />, title: "Digital Environment", desc: "Modern teaching methodologies supported by digital tools." },
            { icon: <FaBriefcase />, title: "Placement Support", desc: "Special focus on preparing students for career success." },
            { icon: <FaWallet />, title: "Affordable Fee", desc: "Quality education accessible to students from all financial backgrounds." },
            { icon: <FaUserCheck />, title: "Personality Dev.", desc: "Regular sessions on communication, leadership, and professional ethics." },
            { icon: <FaGraduationCap />, title: "Scholarship Support", desc: "Guidance for BSCC (Bihar Student Credit Card) and government support." },
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-purple-600 text-2xl mb-3 bg-purple-50 w-10 h-10 flex items-center justify-center rounded-xl">{item.icon}</div>
              <h4 className="font-bold text-slate-800 text-base mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Institutional Dignitaries */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-purple-600 tracking-widest uppercase">- The Leaders -</p>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Institutional <span className="text-purple-600">Dignitaries</span></h2>
            <p className="text-sm text-gray-500 mt-2">Guidance from visionaries dedicated to academic excellence.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Smt. Ranju Patil", role: "PATRON, SARVADNYA GROUP", desc: "A visionary educationalist dedicated to bringing world-class learning infrastructure to Bihar." },
              { name: "Dr. Sanjay Patil", role: "PRESIDENT & CHANCELLOR", desc: "Academic leader focused on global partnerships, modern vocational courses, and creating industry-ready professionals." },
              { name: "Prof. Dr. Sunita Deshmukh", role: "MANAGING & VICE CHANCELLOR", desc: "Leading the academic council with passion for multi-disciplinary curricula and value-based learning." },
            ].map((leader, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl text-center shadow-md border border-gray-200/60">
                <div className="w-16 h-16 bg-purple-900 mx-auto rounded-full mb-4 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                  {leader.name.charAt(0)}
                </div>
                <h4 className="font-bold text-slate-800 text-lg">{leader.name}</h4>
                <p className="text-purple-600 font-semibold text-xs tracking-wider uppercase mt-1 mb-3">{leader.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{leader.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Assistance Available & Helpline Footer */}
      <section className="max-w-6xl mx-auto px-4 py-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="mb-8">
          <span className="text-xs font-bold text-purple-600 border-l-4 border-purple-600 pl-2 uppercase block mb-2">Support</span>
          <h2 className="text-2xl font-extrabold text-slate-900">ASSISTANCE AVAILABLE</h2>
          <p className="text-sm text-gray-500 mt-1">Our support team is dedicated to assisting students at every step. Feel free to contact our counselors.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {["Admission Counseling", "Course Selection Guidance", "Documentation Support", "Student Credit Card/BSCC Support", "Government Scheme Awareness"].map((help, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 text-sm font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span> {help}
            </div>
          ))}
        </div>

        {/* Admissions Contact Block */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-bold mb-2 tracking-wide">ADMISSIONS HELPLINE</h3>
          <p className="text-xs text-purple-200 mb-6">Ready to secure your future? Get in touch with our help desk directly or visit our admission office.</p>
          
          <div className="grid md:grid-cols-3 gap-6 text-sm mb-6 border-b border-purple-800 pb-6">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-amber-400" />
              <span>+91 7070C23456 | +91 9334367890</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-amber-400" />
              <span>info@sarvadnyavidyapeeth.in</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-amber-400" />
              <span>Near Ashiana Road, Patna (Bihar) - 800001</span>
            </div>
          </div>

          <button className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold py-3 rounded-xl transition duration-300 text-sm tracking-wider uppercase">
            ASK A QUESTION / ENQUIRE
          </button>
        </div>
      </section>

    </div>
  );
}