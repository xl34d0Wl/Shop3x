import { defineNuxtPlugin } from '#app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBwVTTAtT-TnBkUhk-VwGUy1Ej3H5Ei7lU",
  authDomain: "shop20242.firebaseapp.com",
  projectId: "shop20242",
  storageBucket: "shop20242.firebasestorage.app",
  messagingSenderId: "1090849252624",
  appId: "1:1090849252624:web:406dabd16bf41271fc3195"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      db,
      auth,
    },
  };
});
