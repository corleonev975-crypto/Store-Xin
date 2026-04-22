const loginBtn = document.getElementById("loginBtn");
const savedUser = localStorage.getItem("xinn_user");

if (loginBtn) {
  if (savedUser) {
    const user = JSON.parse(savedUser);
    loginBtn.textContent = user.name || user.email || "Akun Saya";
    loginBtn.href = "#";

    loginBtn.onclick = function (e) {
      e.preventDefault();
      const yes = confirm("Logout dari akun ini?");
      if (yes) {
        localStorage.removeItem("xinn_user");
        window.location.reload();
      }
    };
  } else {
    loginBtn.textContent = "Login";
    loginBtn.href = "#";
  }
}
