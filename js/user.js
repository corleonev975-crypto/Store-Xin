const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  const btn = document.querySelector(".login-btn");
  if (btn) {
    btn.innerText = user.displayName;
  }
}