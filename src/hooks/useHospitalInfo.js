import { useState, useEffect } from 'react';
import { getDocument } from '../services/db';
import { hospitalInfo as defaultInfo } from '../constants/data';

// Module-level cache — cleared when admin saves settings
let cachedSettings = null;

// Call this after saving settings to force a fresh fetch everywhere
export function clearHospitalInfoCache() {
  cachedSettings = null;
}

function buildMerged(docData) {
  return {
    ...defaultInfo,
    name: docData.name || defaultInfo.name,
    tagline: docData.tagline || defaultInfo.tagline,
    phone: docData.phone || defaultInfo.phone,
    emergencyPhone: docData.emergencyPhone || defaultInfo.emergencyPhone,
    whatsapp: docData.whatsapp || defaultInfo.whatsapp,
    email: docData.email || defaultInfo.email,
    address: docData.address || defaultInfo.address,
    mapUrl: docData.mapUrl || defaultInfo.mapUrl,
    emergencyMessage: docData.emergencyMessage || '24/7 Emergency Services Available',
    facebookUrl: docData.facebookUrl || '',
    instagramUrl: docData.instagramUrl || '',
    youtubeUrl: docData.youtubeUrl || '',
    playStoreUrl: docData.playStoreUrl || '',
    appStoreUrl: docData.appStoreUrl || '',
    maintenanceMode: docData.maintenanceMode || false,
    workingHours: {
      weekdays: docData.weekdayHours || defaultInfo.workingHours?.weekdays,
      sunday: docData.sundayHours || defaultInfo.workingHours?.sunday,
      emergency: docData.emergencyHours || defaultInfo.workingHours?.emergency,
    },
  };
}

export function useHospitalInfo() {
  const [info, setInfo] = useState(cachedSettings || defaultInfo);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    if (cachedSettings) {
      setInfo(cachedSettings);
      setLoading(false);
      return;
    }

    const fetchSettings = async () => {
      try {
        const docData = await getDocument('settings', 'hospital-settings');
        if (docData) {
          const merged = buildMerged(docData);
          cachedSettings = merged;
          setInfo(merged);
        }
      } catch (err) {
        console.warn('Could not fetch hospital settings from DB, using defaults:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { info, loading };
}
