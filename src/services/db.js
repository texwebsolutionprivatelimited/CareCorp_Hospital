import { db, storage } from '../config/firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Fetch all documents from a collection
export const getCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

// Fetch a single document by ID
export const getDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id };
  }
  return null;
};

// Add a new document with an auto-generated ID
export const addDocument = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), data);
  return { ...data, id: docRef.id };
};

// Set a document with a specific ID (creates or overwrites)
export const setDocument = async (collectionName, id, data) => {
  await setDoc(doc(db, collectionName, id), data);
  return { ...data, id };
};

// Update an existing document
export const updateDocument = async (collectionName, id, data) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
  return { ...data, id };
};

// Delete a document
export const deleteDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
  return id;
};

// Upload an image to Firebase Storage
export const uploadImage = async (file, path = 'uploads') => {
  if (!file) return null;
  const fileRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};
