const savedUser = localStorage.getItem("xinn_user");
const loginBtn = document.getElementById("loginBtn");

if (savedUser && loginBtn) {
  const user = JSON.parse(savedUser);

  loginBtn.textContent = user.name || "Akun Saya";
  loginBtn.href = "#";

  loginBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    const yes = confirm("Logout dari akun ini?");
    if (!yes) return;

    const mod = await import("./auth.js?v=1001");
    if (window.logoutGoogle) {
      window.logoutGoogle();
    }
  });
}
