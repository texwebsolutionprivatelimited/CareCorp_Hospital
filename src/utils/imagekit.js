// ImageKit Upload Utility
// Uses ImageKit Upload API with Basic Auth (Private Key)
// Free tier: 20GB storage + 20GB bandwidth/month

const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
const IMAGEKIT_PUBLIC_KEY = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const IMAGEKIT_PRIVATE_KEY = import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY;

/**
 * Upload a file directly to ImageKit using Basic Auth
 * @param {File} file - The file object to upload
 * @param {string} folder - Folder name in ImageKit (e.g., 'doctors', 'gallery', 'blogs')
 * @returns {Promise<string>} - Returns the public CDN URL of the uploaded image
 */
export const uploadToImageKit = async (file, folder = 'hospital') => {
  if (!IMAGEKIT_PRIVATE_KEY) {
    throw new Error('ImageKit private key missing. Please add VITE_IMAGEKIT_PRIVATE_KEY to your .env file.');
  }

  const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', fileName);
  formData.append('folder', `/${folder}`);

  // Basic Auth: username = private key, password = empty string
  const credentials = btoa(`${IMAGEKIT_PRIVATE_KEY}:`);

  const response = await fetch('https://upload.imagekit.io/api/v2/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Upload failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.url; // Returns the full CDN URL
};

/**
 * Get optimized image URL with ImageKit transformations
 * @param {string} url - The ImageKit URL
 * @param {object} options - Transformation options
 * @returns {string} - Optimized URL
 */
export const getOptimizedUrl = (url, { width, height, quality = 80 } = {}) => {
  if (!url || !url.includes('ik.imagekit.io')) return url;

  const transformations = [];
  if (width) transformations.push(`w-${width}`);
  if (height) transformations.push(`h-${height}`);
  transformations.push(`q-${quality}`);
  transformations.push('f-auto'); // Auto format (WebP where supported)

  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/');
  pathParts.splice(2, 0, `tr:${transformations.join(',')}`);
  urlObj.pathname = pathParts.join('/');

  return urlObj.toString();
};

