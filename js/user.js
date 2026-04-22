const savedUser = localStorage.getItem("xinn_user");
const loginBtn = document.getElementById("loginBtn");

if (savedUser && loginBtn) {
  const user = JSON.parse(savedUser);
  loginBtn.textContent = user.name || "Akun Saya";
  loginBtn.href = "#";
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const yes = confirm("Logout dari akun ini?");
    if (yes) {
      import("./auth.js").then(() => {
        if (window.logoutGoogle) {
          window.logoutGoogle();
        }
      });
    }
  });
}
