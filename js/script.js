const loginBtn = document.getElementById("loginBtn");
const loginModalOverlay = document.getElementById("loginModalOverlay");
const closeLoginModal = document.getElementById("closeLoginModal");
const googleLoginBtn = document.getElementById("googleLoginBtn");
const agreeTerms = document.getElementById("agreeTerms");

function openLoginModal() {
  if (!loginModalOverlay) return;
  loginModalOverlay.classList.add("show");
}

function closeModal() {
  if (!loginModalOverlay) return;
  loginModalOverlay.classList.remove("show");
}

if (loginBtn) {
  loginBtn.addEventListener("click", function (e) {
    const savedUser = localStorage.getItem("xinn_user");
    if (savedUser) return;
    e.preventDefault();
    openLoginModal();
  });
}

if (closeLoginModal) {
  closeLoginModal.addEventListener("click", closeModal);
}

if (loginModalOverlay) {
  loginModalOverlay.addEventListener("click", function (e) {
    if (e.target === loginModalOverlay) {
      closeModal();
    }
  });
}

if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", async function () {
    if (!agreeTerms || !agreeTerms.checked) {
      alert("Centang persetujuan dulu");
      return;
    }

    const mod = await import("./auth.js?v=3000");
    if (window.loginGoogle) {
      window.loginGoogle();
    }
  });
}
