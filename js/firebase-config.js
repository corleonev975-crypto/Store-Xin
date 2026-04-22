import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyATRCjF5S_4AmHbghuqk9VKNV4lAZHSnrE",
  authDomain: "xinnstore-app.firebaseapp.com",
  projectId: "xinnstore-app",
  storageBucket: "xinnstore-app.firebasestorage.app",
  messagingSenderId: "506601909592",
  appId: "1:506601909592:web:ba0aa0be4cd77a0e2b092d"
};


const app = initializeApp(firebaseConfig);

// EXPORT
export const auth = getAuth(app);
export const db = getFirestore(app);
