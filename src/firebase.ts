import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPx7Em1LiNJFcDFKs04PSJSsxjP6XPyYM",
  authDomain: "islevselbaglantilar.firebaseapp.com",
  projectId: "islevselbaglantilar",
  storageBucket: "islevselbaglantilar.firebasestorage.app",
  messagingSenderId: "711993565163",
  appId: "1:711993565163:web:c2777d1a961cdef4bf83ae",
  measurementId: "G-EPC2RVQET4"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
