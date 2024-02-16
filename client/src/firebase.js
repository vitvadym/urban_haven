// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'urban-haven.firebaseapp.com',
  projectId: 'urban-haven',
  storageBucket: 'urban-haven.appspot.com',
  messagingSenderId: '610541312023',
  appId: '1:610541312023:web:5548fed0cafc285343e452',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
