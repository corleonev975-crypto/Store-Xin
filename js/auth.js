import { GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

console.log("auth.js loaded");

const provider = new GoogleAuthProvider();

window.loginGoogle = async function () {
  console.log("loginGoogle clicked");

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

    window.location.href = "../index.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("Login Google gagal: " + error.message);
  }
};

window.logoutGoogle = async function () {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }

  localStorage.removeItem("xinn_user");
  window.location.href = "../index.html";
};
