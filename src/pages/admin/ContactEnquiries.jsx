import { useState, useEffect } from 'react';
import { FaEnvelopeOpen, FaEnvelope, FaTrash, FaChevronDown, FaChevronUp, FaDownload } from 'react-icons/fa';
import { getCollection, setDocument, deleteDocument } from '../../services/db';

const subjectColors = { 'General Inquiry': 'bg-blue-100 text-blue-700', 'Child Care': 'bg-amber-100 text-amber-700', Appointment: 'bg-emerald-100 text-emerald-700', Feedback: 'bg-purple-100 text-purple-700', Emergency: 'bg-red-100 text-red-700' };

export default function ContactEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const data = await getCollection('enquiries');
      // Sort by date descending
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEnquiries(data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
    setLoading(false);
  };

  const toggleRead = async (enquiry) => {
    try {
      await setDocument('enquiries', enquiry.id, { ...enquiry, read: !enquiry.read });
      fetchEnquiries();
    } catch (error) {
      console.error("Error toggling read status:", error);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this enquiry?")) return;
    try {
      await deleteDocument('enquiries', id);
      fetchEnquiries();
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    }
  };

  const exportToCSV = () => {
    if (enquiries.length === 0) {
      alert("No data to export");
      return;
    }
    const headers = ["Name", "Email", "Phone", "Subject", "Date", "Message", "Status"];
    const csvRows = [headers.join(',')];
    
    enquiries.forEach(enq => {
      const row = [
        `"${(enq.name || '').replace(/"/g, '""')}"`,
        `"${(enq.email || '').replace(/"/g, '""')}"`,
        `"${(enq.phone || '').replace(/"/g, '""')}"`,
        `"${(enq.subject || '').replace(/"/g, '""')}"`,
        `"${(enq.date || '').replace(/"/g, '""')}"`,
        `"${(enq.message || '').replace(/"/g, '""')}"`,
        `"${enq.read ? 'Read' : 'Unread'}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleExpand = (id) => { 
    setExpandedId(expandedId === id ? null : id); 
    const enquiry = enquiries.find(e => e.id === id);
    if (enquiry && !enquiry.read) {
      toggleRead(enquiry);
    }
  };

  const unreadCount = enquiries.filter(e => !e.read).length;

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-heading font-bold text-slate-800">Contact Enquiries</h2>
          {unreadCount > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{unreadCount} new</span>}
        </div>
        <button 
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition shadow-sm"
          title="Export to Excel / CSV"
        >
          <FaDownload /> Export
        </button>
      </div>

      <div className="space-y-3">
        {enquiries.map(enquiry => (
          <div key={enquiry.id} className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition ${enquiry.read ? 'border-slate-100' : 'border-primary/30 bg-primary/[0.02]'}`}>
            <button onClick={() => toggleExpand(enquiry.id)} className="w-full px-5 py-4 flex items-center justify-between text-left">
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${enquiry.read ? 'bg-slate-200' : 'bg-primary'}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-800 text-sm">{enquiry.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${subjectColors[enquiry.subject] || 'bg-slate-100 text-slate-600'}`}>{enquiry.subject}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">{enquiry.email} &middot; {enquiry.date}</p>
                </div>
              </div>
              {expandedId === enquiry.id ? <FaChevronUp className="text-slate-400" /> : <FaChevronDown className="text-slate-400" />}
            </button>

            {expandedId === enquiry.id && (
              <div className="px-5 pb-4 border-t border-slate-100">
                <div className="pt-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                    <div><span className="text-text-secondary">Phone:</span> <span className="font-medium text-slate-700">{enquiry.phone}</span></div>
                    <div><span className="text-text-secondary">Email:</span> <span className="font-medium text-slate-700">{enquiry.email}</span></div>
                    <div><span className="text-text-secondary">Date:</span> <span className="font-medium text-slate-700">{enquiry.date}</span></div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4"><p className="text-sm text-slate-700 leading-relaxed">{enquiry.message}</p></div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleRead(enquiry)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition">
                      {enquiry.read ? <><FaEnvelope /> Mark Unread</> : <><FaEnvelopeOpen /> Mark Read</>}
                    </button>
                    <button onClick={() => handleDelete(enquiry.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {enquiries.length === 0 && <div className="text-center py-12 text-text-secondary">No enquiries yet.</div>}
      </div>
    </div>
  );
}
