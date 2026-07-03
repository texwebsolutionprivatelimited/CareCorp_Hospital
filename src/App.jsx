import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/layout/WhatsAppFloat';
import ScrollToTop from './components/layout/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Services = lazy(() => import('./pages/Services'));
const Appointment = lazy(() => import('./pages/Appointment'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminAppointments = lazy(() => import('./pages/admin/AppointmentManagement'));
const AdminDoctors = lazy(() => import('./pages/admin/DoctorManagement'));
const AdminBlogs = lazy(() => import('./pages/admin/BlogManagement'));
const AdminGallery = lazy(() => import('./pages/admin/GalleryManagement'));
const AdminTestimonials = lazy(() => import('./pages/admin/TestimonialManagement'));
const AdminEnquiries = lazy(() => import('./pages/admin/ContactEnquiries'));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-text-secondary font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/services" element={<Services />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/appointments" element={<AdminAppointments />} />
                <Route path="/doctors" element={<AdminDoctors />} />
                <Route path="/blogs" element={<AdminBlogs />} />
                <Route path="/gallery" element={<AdminGallery />} />
                <Route path="/testimonials" element={<AdminTestimonials />} />
                <Route path="/enquiries" element={<AdminEnquiries />} />
              </Routes>
            </AdminLayout>
          } />
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </Suspense>
    </>
  );
}
