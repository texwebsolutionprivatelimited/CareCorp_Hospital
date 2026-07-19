import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaStar } from 'react-icons/fa';
import { getCollection, addDocument, setDocument, deleteDocument } from '../../services/db';

export default function TestimonialManagement() {
  const [testimonialList, setTestimonialList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', rating: 5, review: '', role: 'Patient' });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await getCollection('testimonials');
      setTestimonialList(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
    setLoading(false);
  };

  const openAdd = () => { setEditingItem(null); setForm({ name: '', rating: 5, review: '', role: 'Patient' }); setShowModal(true); };
  const openEdit = (item) => { setEditingItem(item); setForm({ name: item.name, rating: item.rating, review: item.review, role: item.role }); setShowModal(true); };

  const handleSave = async () => {
    const data = { ...form };
    try {
      if (editingItem) {
        await setDocument('testimonials', editingItem.id, data);
      } else {
        await addDocument('testimonials', data);
      }
      setShowModal(false);
      fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Failed to save testimonial");
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this testimonial?")) return;
    try {
      await deleteDocument('testimonials', id);
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Failed to delete testimonial");
    }
  };

  const inputClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition';

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-slate-800">Testimonial Management</h2>
        <button onClick={openAdd} className="inline-flex items-center gap-2 gradient-primary text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition"><FaPlus /> Add Testimonial</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonialList.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-slate-800">{item.name}</h4>
                <p className="text-xs text-text-secondary">{item.role}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"><FaEdit /></button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"><FaTrash /></button>
              </div>
            </div>
            <div className="flex gap-0.5 mb-2">{[1,2,3,4,5].map(s => <FaStar key={s} className={s <= item.rating ? 'text-amber-400' : 'text-slate-200'} />)}</div>
            <p className="text-sm text-text-secondary italic line-clamp-3">&ldquo;{item.review}&rdquo;</p>
          </div>
        ))}
        {testimonialList.length === 0 && (
          <div className="col-span-full text-center py-8 text-slate-500">
            No testimonials found.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-lg">{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><FaTimes /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Name</label><input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Patient name" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select className={inputClass} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                  <option value="Patient">Patient</option><option value="Parent">Parent</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                <div className="flex gap-1">{[1,2,3,4,5].map(s => <button key={s} type="button" onClick={() => setForm({ ...form, rating: s })}><FaStar className={`text-xl ${s <= form.rating ? 'text-amber-400' : 'text-slate-200'}`} /></button>)}</div>
              </div>
              <div><label className="block text-sm font-medium text-slate-700 mb-1">Review</label><textarea className={inputClass + ' resize-none'} rows={4} value={form.review} onChange={e => setForm({ ...form, review: e.target.value })} placeholder="Patient review..." /></div>
              <button onClick={handleSave} disabled={!form.name || !form.review} className="w-full gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50">{editingItem ? 'Update' : 'Add'} Testimonial</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
