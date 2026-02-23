import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";

const PRODUCTS_COLLECTION = "admin_products";

const normalizeFirestoreProduct = (document) => {
  const data = document.data() || {};
  return {
    ...data,
    documentId: document.id,
    source: "firestore",
  };
};

export const getAdminProducts = async () => {
  const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return snapshot.docs.map(normalizeFirestoreProduct);
};

export const addAdminProduct = async (product) => {
  const payload = {
    ...product,
    source: "firestore",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), payload);
  return docRef.id;
};

export const updateAdminProduct = async (documentId, updates) => {
  await updateDoc(doc(db, PRODUCTS_COLLECTION, documentId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteAdminProduct = async (documentId) => {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, documentId));
};
