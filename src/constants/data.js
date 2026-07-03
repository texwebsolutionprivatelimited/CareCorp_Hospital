export const hospitalInfo = {
  name: 'CareFirst Hospital',
  tagline: 'Compassionate Care for Every Age',
  phone: '+91-90094-85948',
  emergencyPhone: '0755-4927608',
  whatsapp: '919009485948',
  email: 'info@carefirsthospital.com',
  address: 'A-1, LIG, Near Piplani Petrol Pump, Sonagiri, Bhopal, Madhya Pradesh - 462021',
  workingHours: {
    weekdays: 'Mon - Sat: 9:00 AM - 8:00 PM',
    sunday: 'Sun: 10:00 AM - 2:00 PM',
    emergency: 'Emergency: 24/7 Available',
  },
  mapUrl: 'https://maps.google.com/maps?q=Piplani%20Petrol%20Pump,%20Sonagiri,%20Bhopal&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '#' },
  { name: 'Doctors', path: '#' },
  { name: 'Services', path: '#' },
  { name: 'Gallery', path: '#' },
  { name: 'Blog', path: '#' },
  { name: 'Testimonials', path: '#' },
  { name: 'FAQ', path: '#' },
  { name: 'Contact', path: '#' },
];

export const generalPhysicianServices = [
  {
    id: 'fever-treatment',
    title: 'Fever Treatment',
    description: 'Expert diagnosis and treatment for all types of fevers including viral, bacterial, and tropical fevers with comprehensive care.',
    icon: 'FaThermometerHalf',
  },
  {
    id: 'viral-infection',
    title: 'Viral Infection',
    description: 'Specialized treatment for viral infections including flu, dengue, chikungunya, and other seasonal viral diseases.',
    icon: 'FaVirus',
  },
  {
    id: 'diabetes-management',
    title: 'Diabetes Management',
    description: 'Comprehensive diabetes care including blood sugar monitoring, medication management, and lifestyle counseling.',
    icon: 'FaTint',
  },
  {
    id: 'blood-pressure',
    title: 'Blood Pressure Management',
    description: 'Expert monitoring and management of hypertension with personalized treatment plans and regular follow-ups.',
    icon: 'FaHeartbeat',
  },
  {
    id: 'health-checkup',
    title: 'Health Check-up',
    description: 'Complete health screening packages including blood tests, ECG, and comprehensive physical examination.',
    icon: 'FaStethoscope',
  },
  {
    id: 'thyroid-consultation',
    title: 'Thyroid Consultation',
    description: 'Diagnosis and treatment of thyroid disorders including hypothyroidism, hyperthyroidism, and thyroid nodules.',
    icon: 'FaClinicMedical',
  },
  {
    id: 'allergy-treatment',
    title: 'Allergy Treatment',
    description: 'Identification and treatment of allergies including skin allergies, food allergies, and respiratory allergies.',
    icon: 'FaAllergies',
  },
  {
    id: 'lifestyle-consultation',
    title: 'Lifestyle Consultation',
    description: 'Personalized guidance on diet, exercise, stress management, and healthy living for disease prevention.',
    icon: 'FaAppleAlt',
  },
];

export const childCareServices = [
  {
    id: 'newborn-care',
    title: 'Newborn Care',
    description: 'Specialized care for newborns including health assessments, feeding guidance, and developmental monitoring.',
    icon: 'FaBaby',
  },
  {
    id: 'child-vaccination',
    title: 'Child Vaccination',
    description: 'Complete vaccination program following the national immunization schedule with safe and effective vaccines.',
    icon: 'FaSyringe',
  },
  {
    id: 'growth-monitoring',
    title: 'Growth Monitoring',
    description: 'Regular tracking of your child\'s height, weight, and developmental milestones with growth chart analysis.',
    icon: 'FaChartLine',
  },
  {
    id: 'nutrition-guidance',
    title: 'Nutrition Guidance',
    description: 'Expert advice on child nutrition, dietary plans, and addressing nutritional deficiencies for healthy growth.',
    icon: 'FaCarrot',
  },
  {
    id: 'child-fever',
    title: 'Fever Treatment',
    description: 'Gentle and effective treatment of childhood fevers with careful monitoring and age-appropriate medications.',
    icon: 'FaThermometerHalf',
  },
  {
    id: 'cold-cough',
    title: 'Cold & Cough Treatment',
    description: 'Treatment for common cold, cough, and respiratory infections in children with safe medications.',
    icon: 'FaLungs',
  },
  {
    id: 'routine-checkup',
    title: 'Routine Check-up',
    description: 'Regular pediatric check-ups to ensure your child\'s health and development are on track.',
    icon: 'FaChild',
  },
  {
    id: 'development-assessment',
    title: 'Development Assessment',
    description: 'Comprehensive evaluation of cognitive, motor, and social development milestones in children.',
    icon: 'FaBrain',
  },
];

export const doctors = [
  {
    id: 'dr-rajesh-sharma',
    name: 'Dr. Rajesh Sharma',
    qualification: 'MBBS, MD (General Medicine)',
    specialization: 'General Physician',
    experience: '15+ Years Experience',
    timing: 'Mon - Sat: 9:00 AM - 2:00 PM',
    languages: ['Hindi', 'English', 'Marathi'],
    image: '/images/doctors/dr-rajesh-sharma.jpg',
    about: 'Dr. Rajesh Sharma is a highly experienced general physician with over 15 years of practice. He specializes in treating chronic conditions like diabetes, hypertension, and thyroid disorders. Known for his patient-centric approach and thorough diagnosis.',
  },
  {
    id: 'dr-priya-patel',
    name: 'Dr. Priya Patel',
    qualification: 'MBBS, MD (Pediatrics)',
    specialization: 'Pediatrician & Child Specialist',
    experience: '12+ Years Experience',
    timing: 'Mon - Sat: 3:00 PM - 8:00 PM',
    languages: ['Hindi', 'English', 'Gujarati'],
    image: '/images/doctors/dr-priya-patel.jpg',
    about: 'Dr. Priya Patel is a compassionate pediatrician dedicated to providing exceptional care for children from newborns to adolescents. She is an expert in child vaccinations, growth monitoring, and developmental assessments.',
  },
  {
    id: 'dr-suresh-mehta',
    name: 'Dr. Suresh Mehta',
    qualification: 'MBBS, MS (General Surgery)',
    specialization: 'General Physician',
    experience: '25+ Years Experience',
    timing: 'Mon - Fri: 10:00 AM - 4:00 PM',
    languages: ['Hindi', 'English'],
    image: '/images/doctors/dr-suresh-mehta.jpg',
    about: 'Dr. Suresh Mehta is a senior consultant physician with vast experience in managing complex medical cases. He is highly respected for his accurate clinical diagnosis and evidence-based treatment protocols.',
  },
  {
    id: 'dr-anjali-desai',
    name: 'Dr. Anjali Desai',
    qualification: 'MBBS, DCH, MD (Pediatrics)',
    specialization: 'Pediatrician & Child Specialist',
    experience: '18+ Years Experience',
    timing: 'Tue - Sun: 9:00 AM - 1:00 PM',
    languages: ['Hindi', 'English', 'Marathi'],
    image: '/images/doctors/dr-anjali-desai.jpg',
    about: 'Dr. Anjali Desai is a renowned pediatrician with special interest in pediatric nutrition and infectious diseases. She ensures a comforting environment for children and provides detailed counseling for parents.',
  },
  {
    id: 'dr-vikram-joshi',
    name: 'Dr. Vikram Joshi',
    qualification: 'MBBS, MD (Internal Medicine)',
    specialization: 'General Physician',
    experience: '10+ Years Experience',
    timing: 'Mon - Sat: 4:00 PM - 9:00 PM',
    languages: ['Hindi', 'English', 'Konkani'],
    image: '/images/doctors/dr-vikram-joshi.jpg',
    about: 'Dr. Vikram Joshi is a dynamic internal medicine specialist focusing on adult preventive healthcare, lifestyle diseases, and acute medical emergencies. He believes in proactive health management.',
  },
  {
    id: 'dr-amit-kulkarni',
    name: 'Dr. Amit Kulkarni',
    qualification: 'MBBS, DNB (Family Medicine)',
    specialization: 'General Physician',
    experience: '14+ Years Experience',
    timing: 'Mon - Sat: 8:00 AM - 1:00 PM',
    languages: ['Hindi', 'English', 'Marathi'],
    image: '/images/doctors/dr-amit-kulkarni.jpg',
    about: 'Dr. Amit Kulkarni is a dedicated family physician providing comprehensive healthcare services. He has extensive experience in managing adult health, geriatric care, and common infectious diseases.',
  },
  {
    id: 'dr-sneha-rao',
    name: 'Dr. Sneha Rao',
    qualification: 'MBBS, MD (Pediatrics), Fellowship in Neonatology',
    specialization: 'Pediatrician & Neonatologist',
    experience: '8+ Years Experience',
    timing: 'Mon - Sat: 2:00 PM - 7:00 PM',
    languages: ['Hindi', 'English', 'Kannada'],
    image: '/images/doctors/dr-sneha-rao.jpg',
    about: 'Dr. Sneha Rao specializes in neonatal care and general pediatrics. She is passionate about early childhood development and provides expert care for premature babies and infants.',
  },
  {
    id: 'dr-rahul-verma',
    name: 'Dr. Rahul Verma',
    qualification: 'MBBS, MD (General Medicine)',
    specialization: 'General Physician',
    experience: '11+ Years Experience',
    timing: 'Mon - Sat: 5:00 PM - 10:00 PM',
    languages: ['Hindi', 'English', 'Punjabi'],
    image: '/images/doctors/dr-rahul-verma.jpg',
    about: 'Dr. Rahul Verma is an expert in diagnosing and treating a wide range of adult illnesses. He is particularly focused on managing metabolic disorders, respiratory conditions, and tropical diseases.',
  }
];

export const stats = [
  { label: 'Happy Patients', value: 15000, suffix: '+' },
  { label: 'Years Experience', value: 15, suffix: '+' },
  { label: 'Expert Doctors', value: 10, suffix: '+' },
  { label: 'Awards Won', value: 25, suffix: '+' },
];

export const whyChooseUs = [
  {
    title: '24/7 Emergency Care',
    description: 'Round-the-clock emergency services with experienced medical staff ready to handle any medical situation.',
    icon: 'MdEmergency',
  },
  {
    title: 'Experienced Doctors',
    description: 'Our team of highly qualified doctors brings decades of combined experience in general medicine and pediatrics.',
    icon: 'FaUserMd',
  },
  {
    title: 'Modern Equipment',
    description: 'State-of-the-art medical equipment and technology for accurate diagnosis and effective treatment.',
    icon: 'MdBiotech',
  },
  {
    title: 'Affordable Care',
    description: 'Quality healthcare at reasonable prices with transparent billing and no hidden charges.',
    icon: 'FaHandHoldingHeart',
  },
  {
    title: 'Child-Friendly Environment',
    description: 'A warm, colorful, and child-friendly atmosphere to make young patients feel comfortable and safe.',
    icon: 'FaChild',
  },
  {
    title: 'Patient-First Approach',
    description: 'We prioritize patient comfort, communication, and satisfaction in every aspect of our care.',
    icon: 'FaHeart',
  },
];

export const faqs = [
  {
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment through our website by visiting the Appointment page, calling us at +91-90094-85948, or sending a WhatsApp message. Walk-in appointments are also available based on doctor availability.',
  },
  {
    question: 'What are the consultation timings?',
    answer: 'Dr. Rajesh Sharma (General Physician) is available Monday to Saturday from 9:00 AM to 2:00 PM. Dr. Priya Patel (Pediatrician) is available Monday to Saturday from 3:00 PM to 8:00 PM. Sunday hours are 10:00 AM to 2:00 PM.',
  },
  {
    question: 'Do you provide child vaccination services?',
    answer: 'Yes, we offer a complete vaccination program following the national immunization schedule. Our pediatrician, Dr. Priya Patel, ensures safe and comfortable vaccination experiences for children of all ages.',
  },
  {
    question: 'Is emergency consultation available?',
    answer: 'Yes, our emergency services are available 24/7. For emergencies, please call our emergency hotline at 0755-4927608 or visit the hospital directly. Our emergency team is always ready to assist.',
  },
  {
    question: 'Which insurance plans are accepted?',
    answer: 'We accept most major health insurance plans including government health schemes. Please contact our reception desk at +91-90094-85948 for specific insurance queries and cashless treatment options.',
  },
  {
    question: 'Is online video consultation available?',
    answer: 'We are currently in the process of launching our telemedicine services. For now, you can consult with our doctors via WhatsApp for follow-up queries. Full video consultation will be available soon.',
  },
  {
    question: 'How can I access my medical reports?',
    answer: 'Medical reports can be collected from the hospital reception during working hours. We are working on a digital patient portal where you will soon be able to access your reports online.',
  },
  {
    question: 'Is parking available at the hospital?',
    answer: 'Yes, we have dedicated parking space for patients and visitors. Two-wheeler and four-wheeler parking is available free of charge within the hospital premises.',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Anita Deshmukh',
    rating: 5,
    review: 'Dr. Sharma is an excellent physician. He diagnosed my condition accurately and the treatment worked wonderfully. The staff is courteous and the hospital is very clean. Highly recommended!',
    role: 'Patient',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    rating: 5,
    review: 'Dr. Priya Patel is amazing with children. My daughter used to be scared of doctors, but Dr. Patel made her feel so comfortable. The vaccination experience was smooth and painless.',
    role: 'Parent',
  },
  {
    id: 3,
    name: 'Sunita Kulkarni',
    rating: 4,
    review: 'Been visiting CareFirst for my diabetes management for over 3 years. Dr. Sharma is very thorough with his check-ups and always explains everything clearly. Great hospital!',
    role: 'Patient',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    rating: 5,
    review: 'The newborn care at CareFirst is exceptional. Dr. Patel guided us through every step of our newborn\'s health journey. The entire team is supportive and professional.',
    role: 'Parent',
  },
];

export const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
];

export const galleryCategories = ['All', 'Hospital', 'Doctors', 'Facilities', 'Events'];

export const blogCategories = ['All', 'Health Tips', 'Child Care', 'Seasonal Diseases', 'Vaccination', 'Lifestyle'];

export const sampleBlogs = [
  {
    id: 'importance-of-child-vaccination',
    title: 'The Importance of Child Vaccination: A Complete Guide',
    excerpt: 'Learn why vaccinations are crucial for your child\'s health and development. Understand the vaccination schedule and common myths debunked.',
    image: 'https://images.unsplash.com/photo-1633431305705-c2438b770dbc?auto=format&fit=crop&q=80&w=800',
    category: 'Vaccination',
    date: '2024-12-15',
    readTime: '5 min read',
    content: 'Vaccination is one of the most important steps you can take to protect your child from serious diseases. Vaccines work by training your child\'s immune system to recognize and fight specific pathogens. The national immunization schedule recommends specific vaccines at different ages, starting from birth. Common vaccines include BCG, OPV, DPT, MMR, and Hepatitis B. It\'s essential to follow the recommended schedule for optimal protection. Many parents have concerns about vaccine safety, but extensive research has shown that vaccines are safe and effective. Side effects, if any, are usually mild and temporary. Consult your pediatrician for personalized advice about your child\'s vaccination needs.',
  },
  {
    id: 'managing-diabetes-naturally',
    title: 'Managing Diabetes: Tips for a Healthier Lifestyle',
    excerpt: 'Discover practical tips for managing diabetes through diet, exercise, and medication. Expert advice from our general physician.',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800',
    category: 'Health Tips',
    date: '2024-12-10',
    readTime: '7 min read',
    content: 'Diabetes management requires a holistic approach combining proper medication, balanced diet, and regular exercise. Start by monitoring your blood sugar levels regularly and keeping a log. Focus on a diet rich in whole grains, lean proteins, vegetables, and healthy fats. Limit refined carbohydrates and sugary foods. Aim for at least 30 minutes of moderate exercise daily, such as brisk walking, swimming, or cycling. Stress management through yoga or meditation can also help regulate blood sugar levels. Regular check-ups with your doctor are essential for monitoring HbA1c levels and adjusting medications as needed.',
  },
  {
    id: 'monsoon-health-tips',
    title: 'Stay Healthy This Monsoon: Essential Health Tips',
    excerpt: 'Protect yourself and your family from monsoon-related diseases. Tips on hygiene, diet, and when to see a doctor.',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=800',
    category: 'Seasonal Diseases',
    date: '2024-12-05',
    readTime: '4 min read',
    content: 'The monsoon season brings relief from the heat but also increases the risk of waterborne and vector-borne diseases. Dengue, malaria, typhoid, and cholera are common during this season. Protect yourself by drinking only boiled or purified water, avoiding street food, and maintaining good hygiene. Use mosquito repellents and wear protective clothing. Keep your surroundings clean and ensure there\'s no stagnant water where mosquitoes can breed. If you experience symptoms like high fever, body aches, or persistent diarrhea, consult a doctor immediately.',
  },
  {
    id: 'child-nutrition-guide',
    title: 'Complete Nutrition Guide for Growing Children',
    excerpt: 'Expert pediatric advice on ensuring your child gets proper nutrition for healthy growth and development.',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800',
    category: 'Child Care',
    date: '2024-11-28',
    readTime: '6 min read',
    content: 'Proper nutrition during childhood is essential for physical growth, cognitive development, and overall health. Children need a balanced diet that includes proteins, carbohydrates, healthy fats, vitamins, and minerals. Include dairy products, fruits, vegetables, whole grains, and lean meats in their daily diet. Iron-rich foods like spinach and lentils help prevent anemia, while calcium from milk and cheese supports bone development. Limit junk food, sugary drinks, and processed snacks. Encourage your child to eat a rainbow of fruits and vegetables for diverse nutrient intake.',
  },
  {
    id: 'healthy-heart-tips',
    title: '10 Tips for a Healthy Heart',
    excerpt: 'Simple lifestyle changes that can significantly reduce your risk of heart disease. Expert advice from our physicians.',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    date: '2024-11-20',
    readTime: '5 min read',
    content: 'Heart disease remains one of the leading causes of death worldwide, but many risk factors are within your control. Here are 10 tips for a healthy heart: 1) Exercise regularly for at least 30 minutes daily. 2) Maintain a healthy weight. 3) Eat a heart-healthy diet rich in fruits, vegetables, and whole grains. 4) Limit salt, sugar, and saturated fats. 5) Quit smoking and limit alcohol. 6) Manage stress through relaxation techniques. 7) Get adequate sleep (7-8 hours). 8) Monitor your blood pressure and cholesterol. 9) Stay hydrated. 10) Schedule regular health check-ups.',
  },
  {
    id: 'newborn-care-essentials',
    title: 'Newborn Care Essentials: What Every Parent Should Know',
    excerpt: 'A comprehensive guide to caring for your newborn, from feeding and sleeping patterns to common health concerns.',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
    category: 'Child Care',
    date: '2024-11-15',
    readTime: '8 min read',
    content: 'Bringing a newborn home is both exciting and overwhelming. This guide covers the essential aspects of newborn care. Feeding: Breastfeed exclusively for the first 6 months if possible. Feed on demand, typically every 2-3 hours. Sleep: Newborns sleep 16-17 hours a day. Always place them on their back to sleep. Bathing: Sponge baths until the umbilical cord falls off, then gentle tub baths. Health: Watch for signs of jaundice, feeding difficulties, or excessive crying. Keep up with vaccination schedules. Bonding: Skin-to-skin contact, talking, and singing to your baby promotes bonding and development.',
  },
];

export const sampleGallery = [
  { id: 1, category: 'Hospital', caption: 'Hospital Reception Area', gradient: 'from-teal-400 to-teal-600' },
  { id: 2, category: 'Facilities', caption: 'Modern Consultation Room', gradient: 'from-blue-400 to-blue-600' },
  { id: 3, category: 'Hospital', caption: 'Waiting Lounge', gradient: 'from-emerald-400 to-emerald-600' },
  { id: 4, category: 'Facilities', caption: 'Pediatric Care Unit', gradient: 'from-amber-400 to-amber-600' },
  { id: 5, category: 'Doctors', caption: 'Our Medical Team', gradient: 'from-indigo-400 to-indigo-600' },
  { id: 6, category: 'Events', caption: 'Health Camp 2024', gradient: 'from-pink-400 to-pink-600' },
  { id: 7, category: 'Facilities', caption: 'Diagnostic Laboratory', gradient: 'from-purple-400 to-purple-600' },
  { id: 8, category: 'Hospital', caption: 'Hospital Entrance', gradient: 'from-cyan-400 to-cyan-600' },
  { id: 9, category: 'Events', caption: 'Vaccination Drive', gradient: 'from-rose-400 to-rose-600' },
  { id: 10, category: 'Doctors', caption: 'Doctor Consultation', gradient: 'from-teal-500 to-emerald-600' },
  { id: 11, category: 'Facilities', caption: 'Pharmacy', gradient: 'from-sky-400 to-sky-600' },
  { id: 12, category: 'Events', caption: 'Community Health Talk', gradient: 'from-orange-400 to-orange-600' },
];
