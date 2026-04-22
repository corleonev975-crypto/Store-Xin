import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth, db } from "./firebase-config.js";

const provider = new GoogleAuthProvider();

async function saveUser(user) {
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
}

function goHome() {
  window.location.replace("../index.html");
}

window.loginGoogle = async function () {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error(error);
    alert("Login gagal: " + error.message);
  }
};

async function initLoginPage() {
  try {
    const result = await getRedirectResult(auth);

    if (result && result.user) {
      await saveUser(result.user);
      goHome();
      return;
    }
  } catch (error) {
    console.error("redirect result error:", error);
    alert("Login gagal: " + error.message);
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await saveUser(user);
      goHome();
    }
  });
}

initLoginPage();

window.logoutGoogle = async function () {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }

  localStorage.removeItem("xinn_user");
  window.location.replace("../index.html");
};
