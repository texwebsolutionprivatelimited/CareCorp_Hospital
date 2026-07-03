import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaArrowRight } from 'react-icons/fa';

const categoryGradients = {
  'Health Tips': 'from-teal-400 to-teal-600',
  'Child Care': 'from-amber-400 to-pink-400',
  'Seasonal Diseases': 'from-blue-400 to-purple-500',
  Vaccination: 'from-green-400 to-emerald-600',
  Lifestyle: 'from-indigo-400 to-indigo-600',
};

const BlogCard = ({ blog }) => {
  const { id, title, excerpt, category, date, readTime } = blog;

  const gradient = categoryGradients[category] || 'from-teal-400 to-teal-600';

  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-slate-100"
    >
      {/* Cover image or gradient fallback */}
      <div className={`h-48 relative ${!blog.image ? `bg-gradient-to-br ${gradient}` : ''} flex items-center justify-center overflow-hidden`}>
        {blog.image ? (
          <img 
            src={blog.image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <FaNewspaper className="text-white text-4xl opacity-30" />
        )}

        {/* Category badge */}
        <span className="absolute top-4 left-4 bg-white/90 text-primary text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title with line clamp */}
        <h3
          className="font-heading font-semibold text-lg text-slate-800 mb-2 group-hover:text-primary transition-colors duration-300"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </h3>

        {/* Excerpt with line clamp */}
        <p
          className="text-sm text-text-secondary mb-4"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {excerpt}
        </p>

        {/* Bottom meta info */}
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>{formattedDate}</span>
          <span>{readTime}</span>
        </div>

        {/* Read More link */}
        <Link
          to={`/blog/${id}`}
          className="mt-4 inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all duration-300"
        >
          Read More <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
