import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import SectionHeading from '../../components/ui/SectionHeading';
import BlogCard from '../../components/ui/BlogCard';
import { blogCategories } from '../../constants/data';
import { getCollection } from '../../services/db';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await getCollection('blogs');
        // Only show published blogs and sort by date descending
        const publishedBlogs = blogsData.filter(b => b.published !== false);
        publishedBlogs.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Banner */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hospital-hero.jpg"
            alt="CareFirst Hospital"
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
            Health Blog
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-slate-300"
          >
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-primary-light">Blog</span>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Health Tips & Articles"
            subtitle="Expert advice and health information from our doctors"
          />

          {/* Search & Filter */}
          <div className="mt-10 mb-10 space-y-6">
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-white text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-sm"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {blogCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? 'gradient-primary text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">Loading articles...</p>
            </div>
          ) : (
            <>
              {/* Blog Grid */}
              {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-lg">No articles found matching your criteria.</p>
                  <button
                    onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}
                    className="mt-4 text-primary font-semibold hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
