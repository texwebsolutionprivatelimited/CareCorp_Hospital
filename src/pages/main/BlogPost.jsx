import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUser, FaWhatsapp, FaLink, FaCheckCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import BlogCard from '../../components/ui/BlogCard';
import { getCollection } from '../../services/db';

export default function BlogPost() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogsData = await getCollection('blogs');
        const currentBlog = blogsData.find(b => b.id === id);
        if (currentBlog) {
          setBlog(currentBlog);
          
          const related = blogsData.filter(b => b.category === currentBlog.category && b.id !== currentBlog.id && b.published !== false).slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-secondary">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-slate-800 mb-4">Article Not Found</h2>
          <p className="text-text-secondary mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link to="/blog" className="gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition inline-flex items-center gap-2">
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = blog.content.split('. ').reduce((acc, sentence, i) => {
    const pIndex = Math.floor(i / 3);
    if (!acc[pIndex]) acc[pIndex] = '';
    acc[pIndex] += sentence + '. ';
    return acc;
  }, []);

  const shareUrl = window.location.href;
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(blog.title + ' - ' + shareUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Banner */}
      <section className="gradient-hero pt-32 pb-16 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition mb-6">
              <FaArrowLeft /> Back to Blog
            </Link>
            <span className="inline-block bg-white/10 text-primary-light text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-white/20">
              {blog.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-6 text-slate-300 text-sm flex-wrap">
              <span className="flex items-center gap-2"><FaCalendarAlt /> {new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-2"><FaClock /> {blog.readTime || '3 min read'}</span>
              <span className="flex items-center gap-2"><FaUser /> CareFirst Hospital</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose-custom"
          >
            {blog.excerpt && (
              <p className="text-lg text-text-secondary font-medium leading-relaxed mb-8 border-l-4 border-primary pl-6 bg-primary/5 py-4 pr-4 rounded-r-xl">
                {blog.excerpt}
              </p>
            )}

            <div className="space-y-5 text-text-secondary leading-relaxed">
              {paragraphs.map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="font-heading font-bold text-slate-800 mb-4">Share This Article</h3>
              <div className="flex items-center gap-3">
                <a
                  href={whatsappShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-green-600 transition"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 bg-slate-100 text-slate-600 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-200 transition"
                >
                  {copied ? <><FaCheckCircle className="text-success" /> Copied!</> : <><FaLink /> Copy Link</>}
                </button>
              </div>
            </div>
          </motion.article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-heading font-bold text-slate-800 mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                  <BlogCard key={post.id} blog={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
