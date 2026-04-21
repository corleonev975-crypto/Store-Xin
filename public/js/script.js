
const products = {
  "free-fire": [
    { name: "5 Diamonds", price: 978 },
    { name: "12 Diamonds", price: 2055 },
    { name: "50 Diamonds", price: 10000 }
  ],
  "mobile-legends": [
    { name: "86 Diamonds", price: 20000 },
    { name: "172 Diamonds", price: 39000 },
    { name: "257 Diamonds", price: 56000 }
  ],
  "roblox": [
    { name: "80 Robux", price: 16000 },
    { name: "400 Robux", price: 65000 },
    { name: "800 Robux", price: 120000 }
  ]
};
const gameInfo = {
  "free-fire": { title: "Free Fire", image: "assets/ff.jpg" },
  "mobile-legends": { title: "Mobile Legends", image: "assets/ml.jpg" },
  "roblox": { title: "Roblox", image: "assets/roblox.jpg" }
};
function formatIDR(v){return "Rp" + v.toLocaleString("id-ID")}
const diamondGrid = document.getElementById("diamondGrid");
if (diamondGrid) {
  const params = new URLSearchParams(window.location.search);
  const game = params.get("game") || "free-fire";
  const info = gameInfo[game] || gameInfo["free-fire"];
  document.getElementById("gameBanner").src = info.image;
  document.getElementById("gameTitle").textContent = info.title;
  let selected = 0;
  (products[game] || products["free-fire"]).forEach((item, i) => {
    const btn = document.createElement("button");
    btn.className = "diamond-option" + (i === 0 ? " active" : "");
    btn.innerHTML = `<strong>${item.name}</strong><span>${formatIDR(item.price)}</span>`;
    btn.onclick = () => {
      document.querySelectorAll(".diamond-option").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
      selected = item.price;
      document.getElementById("price").textContent = formatIDR(selected);
    };
    diamondGrid.appendChild(btn);
    if (i === 0) { selected = item.price; document.getElementById("price").textContent = formatIDR(selected); }
  });
  document.querySelectorAll(".payment").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".payment").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
      const pay = btn.dataset.pay;
      document.getElementById("payTitle").textContent = pay;
      document.getElementById("payValue").textContent = pay === "QRIS" ? "Scan QRIS kamu di sini" : (pay === "GoPay" ? "08xxxxxxxxxx (GoPay)" : "08xxxxxxxxxx");
    };
  });
  document.getElementById("buyBtn").onclick = () => {
    const userId = document.getElementById("userId").value.trim();
    if (!userId) { alert("Masukkan User ID dulu"); return; }
    alert("Versi demo siap kamu edit di GitHub. Order belum terhubung backend.");
  };
}
