const savedUser = localStorage.getItem("xinn_user");
const loginBtn = document.querySelector(".login-btn");

if (savedUser && loginBtn) {
  const user = JSON.parse(savedUser);

  loginBtn.textContent = user.name || "Akun Saya";
  loginBtn.onclick = function () {
    const confirmLogout = confirm("Logout dari akun ini?");
    if (confirmLogout) {
      import("./auth.js").then((module) => {
        if (window.logoutGoogle) {
          window.logoutGoogle();
        }
      });
    }
  };
}
