const params = new URLSearchParams(window.location.search);
const game = params.get("game");

const gameTitle = document.getElementById("gameTitle");
const gameImage = document.getElementById("gameImage");
const totalPrice = document.getElementById("totalPrice");

const gameData = {
  "mobile-legends": {
    title: "Mobile Legends",
    image: "assets/ml.jpg"
  },
  "free-fire": {
    title: "Free Fire",
    image: "assets/ff.jpg"
  },
  "free-fire-max": {
    title: "Free Fire MAX",
    image: "assets/ff.jpg"
  },
  "roblox": {
    title: "Roblox",
    image: "assets/roblox.jpg"
  }
};

if (gameTitle && gameImage) {
  const selected = gameData[game] || gameData["mobile-legends"];
  gameTitle.textContent = selected.title;
  gameImage.src = selected.image;
  gameImage.alt = selected.title;
}

const nominalCards = document.querySelectorAll(".nominal-card");
nominalCards.forEach((card) => {
  card.addEventListener("click", () => {
    nominalCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");

    const price = Number(card.dataset.price || 0);
    if (totalPrice) {
      totalPrice.textContent = "Rp" + price.toLocaleString("id-ID");
    }
  });
});

const payMethods = document.querySelectorAll(".pay-method");
payMethods.forEach((btn) => {
  btn.addEventListener("click", () => {
    payMethods.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");
  });
});
