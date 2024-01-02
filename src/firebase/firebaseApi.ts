import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebaseClient";

export const collectionName = "notes";

export const saveNote = (newLink) =>
  addDoc(collection(db, collectionName), newLink);

export const updateNote = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const getNotes = () => getDocs(collection(db, collectionName));

export const deleteNote = (id) => deleteDoc(doc(db, collectionName, id));

export const getNote = (id) => getDoc(doc(db, collectionName, id));