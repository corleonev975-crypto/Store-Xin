// FIREBASE CONFIG

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// CONFIG DARI FIREBASE KAMU
const firebaseConfig = {
  apiKey: "ISI_APIKEY_KAMU",
  authDomain: "ISI_AUTH_DOMAIN_KAMU",
  projectId: "ISI_PROJECT_ID_KAMU",
  storageBucket: "ISI_STORAGE_KAMU",
  messagingSenderId: "ISI_SENDER_ID_KAMU",
  appId: "ISI_APP_ID_KAMU"
};


// INIT
const app = initializeApp(firebaseConfig);

// EXPORT BIAR BISA DIPAKAI FILE LAIN
export const auth = getAuth(app);
export const db = getFirestore(app);
