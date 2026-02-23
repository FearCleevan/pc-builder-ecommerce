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

const PRODUCTS_COLLECTION = "products";
const LEGACY_PRODUCTS_COLLECTION = "admin_products";

const normalizeFirestoreProduct = (document, collectionName) => {
  const data = document.data() || {};
  return {
    ...data,
    documentId: document.id,
    collectionName,
    source: "firestore",
  };
};

export const getAdminProducts = async () => {
  const [productsSnapshot, legacySnapshot] = await Promise.all([
    getDocs(collection(db, PRODUCTS_COLLECTION)),
    getDocs(collection(db, LEGACY_PRODUCTS_COLLECTION)).catch(() => ({ docs: [] })),
  ]);

  return [
    ...productsSnapshot.docs.map((item) => normalizeFirestoreProduct(item, PRODUCTS_COLLECTION)),
    ...legacySnapshot.docs.map((item) =>
      normalizeFirestoreProduct(item, LEGACY_PRODUCTS_COLLECTION)
    ),
  ];
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

export const updateAdminProduct = async (
  documentId,
  updates,
  collectionName = PRODUCTS_COLLECTION
) => {
  await updateDoc(doc(db, collectionName, documentId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteAdminProduct = async (
  documentId,
  collectionName = PRODUCTS_COLLECTION
) => {
  await deleteDoc(doc(db, collectionName, documentId));
};
