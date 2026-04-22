import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth, db } from "./firebase-config.js";

const provider = new GoogleAuthProvider();

window.loginGoogle = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
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

    alert("Login berhasil: " + user.displayName);
    window.location.href = "../index.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("Login Google gagal");
  }
};

window.logoutUser = function () {
  localStorage.removeItem("xinn_user");
  alert("Logout berhasil");
  window.location.href = "../index.html";
};
