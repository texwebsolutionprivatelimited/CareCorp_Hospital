import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { blogCategories } from '../../constants/data';
import { getCollection, addDocument, setDocument, deleteDocument } from '../../services/db';
import { uploadToImageKit } from '../../utils/imagekit';

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form, setForm] = useState({ title: '', category: '', excerpt: '', content: '', published: true, image: '' });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await getCollection('blogs');
      // Set defaults for missing fields and sort by date descending
      const formattedBlogs = data.map(b => ({ ...b, published: b.published ?? true }));
      formattedBlogs.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
      setBlogs(formattedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  const openAdd = () => { setEditingBlog(null); setForm({ title: '', category: '', excerpt: '', content: '', published: true, image: '' }); setShowModal(true); };
  const openEdit = (blog) => { setEditingBlog(blog); setForm({ title: blog.title, category: blog.category, excerpt: blog.excerpt, content: blog.content, published: blog.published ?? true, image: blog.image || '' }); setShowModal(true); };

  const handleSave = async () => {
    const blogData = { 
      ...form, 
      date: editingBlog?.date || new Date().toISOString().split('T')[0], 
      readTime: `${Math.max(3, Math.ceil(form.content.length / 500))} min read` 
    };
    
    try {
      if (editingBlog) {
        await setDocument('blogs', editingBlog.id, blogData);
      } else {
        await addDocument('blogs', blogData);
      }
      setShowModal(false);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog");
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this blog?")) return;
    try {
      await deleteDocument('blogs', id);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const togglePublish = async (blog) => {
    try {
      await setDocument('blogs', blog.id, { ...blog, published: !blog.published });
      fetchBlogs();
    } catch (error) {
      console.error("Error toggling publish:", error);
      alert("Failed to update status");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    setUploadingImage(true);
    try {
      const imageUrl = await uploadToImageKit(file, 'blogs');
      setForm({ ...form, image: imageUrl });
    } catch (error) {
      console.error('ImageKit upload error:', error);
      alert('Image upload failed. Please try again.');
    }
    setUploadingImage(false);
  };

  const inputClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition';

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-slate-800">Blog Management</h2>
        <button onClick={openAdd} className="inline-flex items-center gap-2 gradient-primary text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition">
          <FaPlus /> New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Title</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Category</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Date</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map(blog => (
                <tr key={blog.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800 max-w-[250px] truncate">{blog.title}</td>
                  <td className="px-4 py-3"><span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">{blog.category}</span></td>
                  <td className="px-4 py-3 text-sm text-slate-600">{blog.date}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublish(blog)} className="flex items-center gap-1.5">
                      {blog.published ? <FaToggleOn className="text-emerald-500 text-xl" /> : <FaToggleOff className="text-slate-300 text-xl" />}
                      <span className={`text-xs font-medium ${blog.published ? 'text-emerald-600' : 'text-slate-400'}`}>{blog.published ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(blog)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"><FaEdit /></button>
                      <button onClick={() => handleDelete(blog.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-slate-500">
                    No blog posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-lg">{editingBlog ? 'Edit Post' : 'New Post'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><FaTimes /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Title</label><input className={inputClass} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Article title" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select className={inputClass} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select category</option>
                  {blogCategories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image</label>
                <div className="flex items-center gap-3">
                  {form.image && (
                    <img src={form.image} alt="Preview" className="w-16 h-12 rounded-lg object-cover border border-slate-200" />
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                  </div>
                  {uploadingImage && <span className="text-sm text-primary animate-pulse">Uploading...</span>}
                </div>
              </div>
              
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label><textarea className={inputClass + ' resize-none'} rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Brief summary..." /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Content</label><textarea className={inputClass + ' resize-none'} rows={6} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Full article content..." /></div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-700">Published:</label>
                <button onClick={() => setForm({ ...form, published: !form.published })} className="flex items-center gap-1.5">
                  {form.published ? <FaToggleOn className="text-emerald-500 text-2xl" /> : <FaToggleOff className="text-slate-300 text-2xl" />}
                </button>
              </div>
              <button onClick={handleSave} disabled={uploadingImage} className="w-full gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50">{editingBlog ? 'Update Post' : 'Publish Post'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
