import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTimes, FaSearchPlus } from 'react-icons/fa';
import SectionHeading from '../../components/ui/SectionHeading';
import GalleryImage from '../../components/ui/GalleryImage';
import { galleryCategories } from '../../constants/data';
import { getCollection } from '../../services/db';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getCollection('gallery');
        setGallery(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredGallery = activeCategory === 'All'
    ? gallery
    : gallery.filter(img => img.category === activeCategory);

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
            Our Gallery
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-slate-300"
          >
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-primary-light">Gallery</span>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Hospital Gallery"
            subtitle="Take a virtual tour of our facilities, team, and events"
          />

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-2 mt-10 mb-10 flex-wrap">
            {galleryCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'gradient-primary text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">Loading images...</p>
            </div>
          ) : (
            <>
              {/* Gallery Grid */}
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                <AnimatePresence>
                  {filteredGallery.map(image => (
                    <GalleryImage
                      key={image.id}
                      image={image}
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredGallery.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-lg">No images found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary-light transition"
              >
                <FaTimes className="text-2xl" />
              </button>
              {selectedImage.imageUrl ? (
                <img src={selectedImage.imageUrl} alt={selectedImage.caption} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${selectedImage.gradient} flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <FaSearchPlus className="text-5xl mx-auto mb-4 opacity-40" />
                    <p className="text-xl font-heading font-semibold">{selectedImage.caption}</p>
                    <span className="inline-block mt-2 bg-white/20 text-sm px-3 py-1 rounded-full">{selectedImage.category}</span>
                  </div>
                </div>
              )}
              {selectedImage.imageUrl && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 rounded-b-2xl">
                  <p className="text-white font-heading text-lg">{selectedImage.caption}</p>
                  <span className="inline-block mt-1 bg-white/20 text-white text-xs px-2 py-1 rounded-full">{selectedImage.category}</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
