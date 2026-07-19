import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaTimes, FaSpinner } from 'react-icons/fa';
import { galleryCategories } from '../../constants/data';
import { getCollection, addDocument, deleteDocument } from '../../services/db';
import { uploadToImageKit } from '../../utils/imagekit';

const gradients = ['from-teal-400 to-teal-600', 'from-blue-400 to-blue-600', 'from-emerald-400 to-emerald-600', 'from-amber-400 to-amber-600', 'from-purple-400 to-purple-600', 'from-pink-400 to-pink-600', 'from-indigo-400 to-indigo-600', 'from-cyan-400 to-cyan-600'];

export default function GalleryManagement() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ caption: '', category: 'Hospital' });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const data = await getCollection('gallery');
      setGallery(data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!imageFile) {
      alert('Please select an image to upload.');
      return;
    }

    if (!imageFile.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    setUploading(true);
    try {
      // Upload to ImageKit CDN
      const imageUrl = await uploadToImageKit(imageFile, 'gallery');

      const newImage = {
        caption: form.caption,
        category: form.category,
        imageUrl: imageUrl,
        gradient: gradients[Math.floor(Math.random() * gradients.length)]
      };

      await addDocument('gallery', newImage);
      setForm({ caption: '', category: 'Hospital' });
      setImageFile(null);
      setShowForm(false);
      fetchGallery();
    } catch (error) {
      console.error('Error adding gallery image:', error);
      alert(`Failed to upload image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this image?")) return;
    try {
      await deleteDocument('gallery', id);
      fetchGallery();
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-slate-800">Gallery Management</h2>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 gradient-primary text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition">
          <FaPlus /> Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map(img => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-100 shadow-sm">
            {img.imageUrl ? (
              <img src={img.imageUrl} alt={img.caption} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${img.gradient}`} />
            )}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center">
              <p className="text-white font-medium text-sm text-center drop-shadow-md">{img.caption}</p>
            </div>
            <div className="absolute top-2 left-2">
              <span className="bg-white/90 text-xs font-medium px-2 py-1 rounded-full text-slate-700 shadow-sm">{img.category}</span>
            </div>
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-600 shadow-lg"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        ))}
        {gallery.length === 0 && (
          <div className="col-span-full text-center py-8 text-slate-500">
            No images in gallery.
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-lg">Add Image</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><FaTimes /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Upload Image (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setImageFile(e.target.files[0])}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Caption *</label>
                <input className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })} placeholder="Image caption" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {galleryCategories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button 
                onClick={handleAdd} 
                disabled={!form.caption || uploading} 
                className="w-full gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {uploading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Uploading...
                  </>
                ) : (
                  'Save Image'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
