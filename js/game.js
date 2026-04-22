const gameMap = {
  "mobile-legends": {
    title: "Mobile Legends",
    desc: "Top up cepat, aman, dan nyaman.",
    image: "assets/ml.jpg",
    nominals: [
      { name: "86 Diamonds", price: 20000 },
      { name: "172 Diamonds", price: 39000 },
      { name: "257 Diamonds", price: 56000 },
      { name: "344 Diamonds", price: 75000 }
    ]
  },
  "free-fire": {
    title: "Free Fire",
    desc: "Top up instan dan harga bersahabat.",
    image: "assets/ff.jpg",
    nominals: [
      { name: "5 Diamonds", price: 978 },
      { name: "12 Diamonds", price: 2055 },
      { name: "50 Diamonds", price: 10000 },
      { name: "70 Diamonds", price: 14000 }
    ]
  },
  "roblox": {
    title: "Roblox",
    desc: "Beli Robux cepat dan mudah.",
    image: "assets/roblox.jpg",
    nominals: [
      { name: "80 Robux", price: 16000 },
      { name: "400 Robux", price: 65000 },
      { name: "800 Robux", price: 120000 },
      { name: "1700 Robux", price: 240000 }
    ]
  }
};

function formatRupiah(value) {
  return "Rp" + value.toLocaleString("id-ID");
}

window.addEventListener("load", function () {
  const params = new URLSearchParams(window.location.search);
  const gameKey = params.get("game") || "mobile-legends";
  const currentGame = gameMap[gameKey] || gameMap["mobile-legends"];

  const gameTitle = document.getElementById("gameTitle");
  const gameDesc = document.getElementById("gameDesc");
  const gameBanner = document.getElementById("gameBanner");
  const nominalGrid = document.getElementById("nominalGrid");
  const totalPrice = document.getElementById("totalPrice");
  const paySelected = document.getElementById("paySelected");
  const buyNowBtn = document.getElementById("buyNowBtn");
  const emailNotif = document.getElementById("emailNotif");

  if (gameTitle) gameTitle.textContent = currentGame.title;
  if (gameDesc) gameDesc.textContent = currentGame.desc;
  if (gameBanner) gameBanner.src = currentGame.image;
  if (!nominalGrid) return;

  const savedUser = localStorage.getItem("xinn_user");
  if (savedUser && emailNotif) {
    const user = JSON.parse(savedUser);
    emailNotif.value = user.email || "";
  }

  nominalGrid.innerHTML = "";
  let selectedPrice = 0;
  let selectedNominal = "";

  currentGame.nominals.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "nominal-btn" + (index === 0 ? " active" : "");
    btn.innerHTML = `${item.name}<span>${formatRupiah(item.price)}</span>`;

    btn.addEventListener("click", function () {
      document.querySelectorAll(".nominal-btn").forEach((el) => el.classList.remove("active"));
      btn.classList.add("active");
      selectedPrice = item.price;
      selectedNominal = item.name;
      if (totalPrice) totalPrice.textContent = formatRupiah(selectedPrice);
    });

    nominalGrid.appendChild(btn);

    if (index === 0) {
      selectedPrice = item.price;
      selectedNominal = item.name;
      if (totalPrice) totalPrice.textContent = formatRupiah(selectedPrice);
    }
  });

  document.querySelectorAll(".pay-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".pay-btn").forEach((el) => el.classList.remove("active"));
      btn.classList.add("active");
      if (paySelected) paySelected.textContent = btn.dataset.pay;
    });
  });

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", function () {
      const userId = document.getElementById("userId")?.value || "";
      const zoneId = document.getElementById("zoneId")?.value || "";
      const email = document.getElementById("emailNotif")?.value || "";
      const payment = document.querySelector(".pay-btn.active")?.dataset.pay || "DANA";

      if (!userId.trim()) {
        alert("Masukkan User ID dulu");
        return;
      }

      alert(
        "Order siap diproses:\n" +
        "Game: " + currentGame.title + "\n" +
        "User ID: " + userId + "\n" +
        "Zone: " + zoneId + "\n" +
        "Nominal: " + selectedNominal + "\n" +
        "Payment: " + payment + "\n" +
        "Email: " + email + "\n" +
        "Total: " + formatRupiah(selectedPrice)
      );
    });
  }
});
