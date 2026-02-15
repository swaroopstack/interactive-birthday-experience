// ================= SCREEN REFERENCES =================

const landing = document.getElementById("landing");
const memory = document.getElementById("memory");
const cake = document.getElementById("cake");
const finalScreen = document.getElementById("final");

// Buttons
const startBtn = document.getElementById("startBtn");
const toCakeBtn = document.getElementById("toCakeBtn");
const restartBtn = document.getElementById("restartBtn");

// Memory Elements
const cardStack = document.getElementById("cardStack");
const stackEndMessage = document.getElementById("stackEndMessage");

// Cake Scene Elements
const cakeScene = document.querySelector(".cake-scene");
const startCakeBtn = document.getElementById("startCake");
const blowCandlesBtn = document.getElementById("blowCandles");
const banner = document.getElementById("birthdayBanner");

// Final
const finalMessage = document.getElementById("finalMessage");

// ================= UTILITY =================

function showScreen(screen) {
  landing.classList.add("hidden");
  memory.classList.add("hidden");
  cake.classList.add("hidden");
  finalScreen.classList.add("hidden");

  screen.classList.remove("hidden");
}

// ================= NAVIGATION =================

startBtn.addEventListener("click", () => {
  showScreen(memory);
});

// ================= MEMORY STACK =================

function createCards() {
  memoryData.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("memoryCard");

    card.style.zIndex = memoryData.length - index;

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    `;

    addDragLogic(card);
    cardStack.appendChild(card);
  });
}

function addDragLogic(card) {
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  const threshold = 100;

  // Mouse
  card.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    card.style.transition = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    currentX = e.clientX - startX;
    card.style.transform =
      `translateX(${currentX}px) rotate(${currentX * 0.1}deg)`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;
    card.style.transition = "transform 0.3s ease";

    handleRelease(card, currentX, threshold);
    currentX = 0;
  });

  // Touch
  card.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    card.style.transition = "none";
  });

  card.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    currentX = e.touches[0].clientX - startX;
    card.style.transform =
      `translateX(${currentX}px) rotate(${currentX * 0.1}deg)`;
  });

  card.addEventListener("touchend", () => {
    isDragging = false;
    card.style.transition = "transform 0.3s ease";

    handleRelease(card, currentX, threshold);
    currentX = 0;
  });
}

function handleRelease(card, currentX, threshold) {
  if (Math.abs(currentX) > threshold) {
    card.style.transform =
      `translateX(${currentX > 0 ? 1000 : -1000}px) rotate(${currentX * 0.2}deg)`;

    setTimeout(() => {
      card.remove();
      checkStackEnd();
    }, 300);
  } else {
    card.style.transform = "translateX(0) rotate(0)";
  }
}

function checkStackEnd() {
  if (cardStack.children.length === 0) {
    stackEndMessage.classList.remove("hidden");
    toCakeBtn.classList.remove("hidden");
  }
}

createCards();

// ================= MOVE TO CAKE =================

toCakeBtn.addEventListener("click", () => {
  showScreen(cake);
});

// ================= CAKE CINEMATIC FLOW =================

startCakeBtn.addEventListener("click", () => {
  cakeScene.classList.add("dimmed");

  blowCandlesBtn.classList.remove("hidden");
  startCakeBtn.classList.add("hidden");
});

blowCandlesBtn.addEventListener("click", () => {

  // Turn off flames and glow
  document.querySelectorAll(".flame, .glow").forEach(el => {
    el.style.opacity = "0";
  });

  // Add smoke effect
  document.querySelectorAll(".candle").forEach(candle => {
    const smoke = document.createElement("div");
    smoke.classList.add("smoke");
    smoke.style.left = "0px";
    smoke.style.top = "-30px";
    candle.appendChild(smoke);

    setTimeout(() => smoke.remove(), 1000);
  });

  // Restore lighting and drop banner
  setTimeout(() => {
    cakeScene.classList.remove("dimmed");

    banner.classList.remove("hidden");

    setTimeout(() => {
      banner.classList.add("drop");
    }, 50);

    // Move to final after short celebration
    setTimeout(() => {
      showFinal();
    }, 2500);

  }, 800);

  blowCandlesBtn.classList.add("hidden");
});

// ================= FINAL =================

function showFinal() {
  showScreen(finalScreen);
  finalMessage.textContent = finalLetter;
}

// Restart
restartBtn.addEventListener("click", () => {
  location.reload();
});
