import { GoogleAuthProvider, signInWithRedirect } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase-config.js";

const provider = new GoogleAuthProvider();

window.loginGoogle = async function () {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error(error);
    alert("Login gagal");
  }
};
