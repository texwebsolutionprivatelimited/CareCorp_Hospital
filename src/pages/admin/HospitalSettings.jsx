import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaHospitalAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaShare, FaCheckCircle, FaMobileAlt, FaWhatsapp } from 'react-icons/fa';
import { MdEmergency } from 'react-icons/md';
import { getDocument, setDocument } from '../../services/db';
import { hospitalInfo as defaultInfo } from '../../constants/data';
import { clearHospitalInfoCache } from '../../hooks/useHospitalInfo';

const SETTINGS_DOC_ID = 'hospital-settings';

const Section = ({ icon: Icon, title, color, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
      <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center`}>
        <Icon className="text-white text-sm" />
      </div>
      <h3 className="font-heading font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="p-6 space-y-4">{children}</div>
  </div>
);

const Field = ({ label, name, value, onChange, placeholder, type = 'text', hint, rows = 3 }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-y"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
      />
    )}
    {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
  </div>
);

export default function HospitalSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docData = await getDocument('settings', SETTINGS_DOC_ID);
        if (docData) {
          setSettings(docData);
        } else {
          setSettings({
            name: defaultInfo.name,
            tagline: defaultInfo.tagline,
            phone: defaultInfo.phone,
            emergencyPhone: defaultInfo.emergencyPhone,
            whatsapp: defaultInfo.whatsapp,
            email: defaultInfo.email,
            address: defaultInfo.address,
            mapUrl: defaultInfo.mapUrl,
            waConfirmTemplate: defaultInfo.waConfirmTemplate,
            weekdayHours: defaultInfo.workingHours?.weekdays || 'Mon - Sat: 9:00 AM - 8:00 PM',
            sundayHours: defaultInfo.workingHours?.sunday || 'Sun: 10:00 AM - 2:00 PM',
            emergencyHours: defaultInfo.workingHours?.emergency || 'Emergency: 24/7 Available',
            emergencyMessage: '24/7 Emergency Services Available',
            facebookUrl: '',
            instagramUrl: '',
            youtubeUrl: '',
            playStoreUrl: '',
            appStoreUrl: '',
            maintenanceMode: false
          });
        }
      } catch (err) {
        console.error('Error loading settings:', err);
        setSettings({});
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDocument('settings', SETTINGS_DOC_ID, settings);
      clearHospitalInfoCache(); // Force all components to re-fetch fresh data
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const SaveButton = () => (
    <motion.button
      onClick={handleSave}
      disabled={saving}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md ${
        saved ? 'bg-emerald-500 text-white' : 'gradient-primary text-white hover:opacity-90'
      } disabled:opacity-60`}
    >
      {saved ? (
        <><FaCheckCircle /> Saved!</>
      ) : saving ? (
        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
      ) : (
        <><FaSave /> Save Changes</>
      )}
    </motion.button>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-heading font-bold text-slate-800">Hospital Settings</h2>
          <p className="text-sm text-slate-500 mt-0.5">All changes will be reflected on the live website after saving.</p>
        </div>
        <SaveButton />
      </div>

      {/* Maintenance Mode Toggle — top priority card */}
      <div className={`rounded-2xl border-2 p-6 flex items-center justify-between gap-4 flex-wrap transition-all duration-300 ${
        settings.maintenanceMode
          ? 'bg-red-50 border-red-300 shadow-red-100 shadow-lg'
          : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all ${
            settings.maintenanceMode ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-400'
          }`}>
            🔧
          </div>
          <div>
            <p className={`font-heading font-bold text-lg ${settings.maintenanceMode ? 'text-red-700' : 'text-slate-800'}`}>
              Maintenance Mode
            </p>
            <p className={`text-sm ${settings.maintenanceMode ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
              {settings.maintenanceMode
                ? '⚠️ Website is currently OFFLINE for visitors'
                : 'When ON, visitors will see a maintenance page. Admin panel stays accessible.'}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => setSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner ${
            settings.maintenanceMode ? 'bg-red-500' : 'bg-slate-300'
          }`}
          aria-label="Toggle maintenance mode"
        >
          <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            settings.maintenanceMode ? 'translate-x-9' : 'translate-x-1'
          }`} />
        </button>
      </div>

      {/* 1. Hospital Identity */}
      <Section icon={FaHospitalAlt} title="Hospital Identity" color="bg-teal-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Hospital Name" name="name" value={settings.name} onChange={handleChange} placeholder="e.g. CareFirst Hospital" />
          <Field label="Tagline / Slogan" name="tagline" value={settings.tagline} onChange={handleChange} placeholder="e.g. Compassionate Care for Every Age" />
        </div>
        <Field
          label="SEO Meta Description"
          name="metaDescription"
          value={settings.metaDescription}
          onChange={handleChange}
          placeholder="Short description for Google search (150-160 characters)"
          hint="This appears below the hospital name in Google search results."
        />
      </Section>

      {/* 2. Contact Information */}
      <Section icon={FaPhone} title="Contact Information" color="bg-blue-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Primary Phone" name="phone" value={settings.phone} onChange={handleChange} placeholder="+91-XXXXX-XXXXX" />
          <Field
            label="Emergency Phone"
            name="emergencyPhone"
            value={settings.emergencyPhone}
            onChange={handleChange}
            placeholder="e.g. 0755-4927608"
            hint="Shown in the Navbar emergency strip and in the footer."
          />
          <Field
            label="WhatsApp Number (Digits only)"
            name="whatsapp"
            value={settings.whatsapp}
            onChange={handleChange}
            placeholder="e.g. 919009485948"
            hint="Country code + number, no spaces or + symbol."
          />
          <Field label="Email Address" name="email" value={settings.email} onChange={handleChange} placeholder="info@hospital.com" type="email" />
        </div>
      </Section>

      {/* 3. Address & Map */}
      <Section icon={FaMapMarkerAlt} title="Address & Location" color="bg-purple-500">
        <Field
          label="Full Address"
          name="address"
          value={settings.address}
          onChange={handleChange}
          placeholder="Full hospital address with pin code"
        />
        <Field
          label="Google Maps Embed URL"
          name="mapUrl"
          value={settings.mapUrl}
          onChange={handleChange}
          placeholder="https://maps.google.com/maps?q=..."
          hint='Go to Google Maps > Share > Embed a map > Copy HTML, then paste only the URL from src="..." here.'
        />
      </Section>

      {/* 4. Working Hours */}
      <Section icon={FaClock} title="Working Hours" color="bg-amber-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Weekdays" name="weekdayHours" value={settings.weekdayHours} onChange={handleChange} placeholder="Mon - Sat: 9:00 AM - 8:00 PM" />
          <Field label="Sunday" name="sundayHours" value={settings.sundayHours} onChange={handleChange} placeholder="Sun: 10:00 AM - 2:00 PM" />
          <Field label="Emergency Text" name="emergencyHours" value={settings.emergencyHours} onChange={handleChange} placeholder="Emergency: 24/7 Available" />
        </div>
      </Section>

      {/* 5. Emergency Strip */}
      <Section icon={MdEmergency} title="Emergency Navbar Strip" color="bg-red-500">
        <div className="text-xs text-slate-500 bg-red-50 rounded-xl px-4 py-3 border border-red-100">
          ℹ️ This message appears in the red emergency strip at the top of the Navbar. The Emergency Phone number is automatically pulled from the Contact Information section above.
        </div>
        <Field
          label="Emergency Strip Message"
          name="emergencyMessage"
          value={settings.emergencyMessage}
          onChange={handleChange}
          placeholder="e.g. 24/7 Emergency Services Available"
        />
      </Section>

      {/* 6. Social Media */}
      <Section icon={FaShare} title="Social Media Links" color="bg-indigo-500">
        <p className="text-xs text-slate-500">Links for social media icons displayed in the footer. Leave blank to hide that icon.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Facebook Page URL" name="facebookUrl" value={settings.facebookUrl} onChange={handleChange} placeholder="https://facebook.com/..." />
          <Field label="Instagram Page URL" name="instagramUrl" value={settings.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/..." />
          <Field label="YouTube Channel URL" name="youtubeUrl" value={settings.youtubeUrl} onChange={handleChange} placeholder="https://youtube.com/..." />
        </div>
      </Section>

      {/* 8. WhatsApp Templates */}
      <Section icon={FaWhatsapp} title="WhatsApp Templates" color="bg-green-600">
        <div className="text-xs text-slate-500 bg-green-50 rounded-xl px-4 py-3 border border-green-100 mb-4">
          💬 Customize the message sent to patients when their appointment is confirmed. 
          Use placeholders like <code>{'{patientName}'}</code>, <code>{'{doctor}'}</code>, <code>{'{date}'}</code>, <code>{'{time}'}</code>, <code>{'{reason}'}</code>, <code>{'{hospitalName}'}</code>, <code>{'{address}'}</code>, <code>{'{phone}'}</code>.
        </div>
        <Field
          label="Appointment Confirmation Template"
          name="waConfirmTemplate"
          type="textarea"
          rows={10}
          value={settings.waConfirmTemplate}
          onChange={handleChange}
          placeholder="Enter your custom WhatsApp template..."
        />
      </Section>

      {/* 9. Mobile App Links */}
      <Section icon={FaMobileAlt} title="Mobile App Links" color="bg-green-500">
        <div className="text-xs text-slate-500 bg-green-50 rounded-xl px-4 py-3 border border-green-100">
          📱 These links appear in the footer "Download Our App" section. Leave blank if the app is not available on that platform.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Google Play Store URL"
            name="playStoreUrl"
            value={settings.playStoreUrl}
            onChange={handleChange}
            placeholder="https://play.google.com/store/apps/details?id=..."
            hint="Link to your Android app on Google Play Store."
          />
          <Field
            label="Apple App Store URL"
            name="appStoreUrl"
            value={settings.appStoreUrl}
            onChange={handleChange}
            placeholder="https://apps.apple.com/app/..."
            hint="Link to your iOS app on Apple App Store."
          />
        </div>
      </Section>

    </div>
  );
}
