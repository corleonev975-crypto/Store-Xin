import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase-config.js";

const loginBtn = document.getElementById("loginBtn");

function setLoggedOut() {
  if (!loginBtn) return;
  loginBtn.textContent = "Login";
  loginBtn.href = "auth/login.html";
  loginBtn.onclick = null;
}

function setLoggedIn(user) {
  if (!loginBtn) return;

  const userData = {
    uid: user.uid,
    name: user.displayName || "",
    email: user.email || "",
    photo: user.photoURL || ""
  };

  localStorage.setItem("xinn_user", JSON.stringify(userData));

  loginBtn.textContent = user.displayName || user.email || "Akun Saya";
  loginBtn.href = "#";
  loginBtn.onclick = function (e) {
    e.preventDefault();
    const yes = confirm("Logout dari akun ini?");
    if (yes) {
      localStorage.removeItem("xinn_user");
      location.href = "auth/login.html";
    }
  };
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    setLoggedIn(user);
  } else {
    const savedUser = localStorage.getItem("xinn_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      loginBtn.textContent = user.name || user.email || "Akun Saya";
      loginBtn.href = "#";
      loginBtn.onclick = function (e) {
        e.preventDefault();
        const yes = confirm("Logout dari akun ini?");
        if (yes) {
          localStorage.removeItem("xinn_user");
          location.href = "auth/login.html";
        }
      };
    } else {
      setLoggedOut();
    }
  }
});
