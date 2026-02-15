// ================= ELEMENT REFERENCES =================

const landing = document.getElementById("landing");
const memory = document.getElementById("memory");
const startBtn = document.getElementById("startBtn");

const cardStack = document.getElementById("cardStack");

const revealLayer = document.getElementById("revealLayer");
const overlay = document.querySelector(".overlay");
const revealContent = document.getElementById("revealContent");

// ================= LANDING TO MEMORY =================

startBtn.addEventListener("click", () => {
  landing.classList.add("fade-out");

  setTimeout(() => {
    landing.style.display = "none";
    memory.classList.remove("hidden");
    memory.classList.add("show");
  }, 600);
});

// ================= MEMORY CARDS =================

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
      startRevealSequence();
    }, 700);
  }
}

createCards();

// ================= REVEAL SEQUENCE =================

function startRevealSequence() {

  revealLayer.classList.remove("hidden");

  // Step 1: Text
  revealContent.innerHTML = `
    <div class="reveal-text">I have something for you.</div>
  `;

  const text = document.querySelector(".reveal-text");

  setTimeout(() => {
    text.classList.add("show");
  }, 100);

  // Step 2: Dim whole screen
  setTimeout(() => {
    overlay.classList.add("show");
  }, 800);

  // Step 3: Envelope appears
  setTimeout(() => {
    showEnvelope();
  }, 2000);
}

// ================= ENVELOPE =================

function showEnvelope() {
  revealContent.innerHTML = `
    <img src="assets/images/envelope.png" class="envelope" id="envelope">
    <p class="open-text">Open me</p>
  `;

  const envelope = document.getElementById("envelope");

  setTimeout(() => {
    envelope.classList.add("show");
  }, 100);

  envelope.addEventListener("click", openLetter);
}

// ================= LETTER =================

function openLetter() {
  revealContent.innerHTML = `
    <div class="letter-content">
      ${finalLetter}
    </div>
  `;
}
