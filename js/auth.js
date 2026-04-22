import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth, db } from "./firebase-config.js";

const provider = new GoogleAuthProvider();

window.loginGoogle = async function () {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("redirect start error:", error);
    alert("Login gagal: " + error.message);
  }
};

async function handleRedirectLogin() {
  try {
    const result = await getRedirectResult(auth);

    if (!result) return;

    const user = result.user;

    const userData = {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      photo: user.photoURL || ""
    };

    localStorage.setItem("xinn_user", JSON.stringify(userData));

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        photo: user.photoURL || "",
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );

    window.location.href = "../index.html";
  } catch (error) {
    console.error("redirect result error:", error);
    alert("Login gagal: " + error.message);
  }
}

handleRedirectLogin();

window.logoutGoogle = async function () {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }

  localStorage.removeItem("xinn_user");
  window.location.href = "../index.html";
};
