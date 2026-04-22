import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { auth } from "./firebase-config.js";

const provider = new GoogleAuthProvider();

window.loginGoogle = function () {
  signInWithRedirect(auth, provider);
};

// INI YANG PENTING 🔥
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userData = {
      uid: user.uid,
      name: user.displayName,
      email: user.email
    };

    localStorage.setItem("xinn_user", JSON.stringify(userData));

    // redirect ke home
    window.location.href = "../index.html";
  }
});
