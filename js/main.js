// ================= SCREEN REFERENCES =================

const landing = document.getElementById("landing");
const memory = document.getElementById("memory");
const cake = document.getElementById("cake");
const finalScreen = document.getElementById("final");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const cardStack = document.getElementById("cardStack");

const finalMessage = document.getElementById("finalMessage");

// Cake elements
const cakeScene = document.querySelector(".cake-scene");
const centerText = document.getElementById("centerText");
const cakeContainer = document.getElementById("cakeContainer");
const banner = document.getElementById("birthdayBanner");

// ================= UTILITY =================

function showScreen(screen) {
  landing.classList.add("hidden");
  memory.classList.add("hidden");
  cake.classList.add("hidden");
  finalScreen.classList.add("hidden");

  screen.classList.remove("hidden");
}

// ================= LANDING =================

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

  // Touch support
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
    if (!isDragging) return;
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
    setTimeout(() => {
      startCakeReveal();
    }, 800);
  }
}

createCards();

// ================= CAKE REVEAL SEQUENCE =================

function startCakeReveal() {

  showScreen(cake);

  // Step 1 — Text appears
  setTimeout(() => {
    centerText.classList.remove("hidden");
    centerText.classList.add("show");
  }, 300);

  // Step 2 — Lights dim
  setTimeout(() => {
    cakeScene.classList.add("dimmed");
  }, 1000);

  // Step 3 — Cake fades in
  setTimeout(() => {
    cakeContainer.classList.remove("hidden");
    cakeContainer.classList.add("show");
  }, 1800);

  // Step 4 — Lights brighten + remove text
  setTimeout(() => {
    cakeScene.classList.remove("dimmed");
    centerText.classList.remove("show");
  }, 3000);

  // Step 5 — Banner drop
  setTimeout(() => {
    banner.classList.remove("hidden");
    setTimeout(() => {
      banner.classList.add("drop");
    }, 50);
  }, 3600);

  // Step 6 — Final letter
  setTimeout(() => {
    showFinal();
  }, 5500);
}

// ================= FINAL =================

function showFinal() {
  showScreen(finalScreen);
  finalMessage.textContent = finalLetter;
}

restartBtn.addEventListener("click", () => {
  location.reload();
});
