const landing = document.getElementById("landing");
const memory = document.getElementById("memory");
const startBtn = document.getElementById("startBtn");
const cardStack = document.getElementById("cardStack");

const revealLayer = document.getElementById("revealLayer");
const overlay = document.querySelector(".overlay");
const revealContent = document.getElementById("revealContent");

const memoryTitle = document.getElementById("memoryTitle");

/* LANDING */

startBtn.addEventListener("click", () => {
  landing.classList.add("fade-out");

  setTimeout(() => {
    landing.style.display = "none";
    memory.classList.remove("hidden");
    memory.classList.add("show");
  }, 600);
});

/* CARDS */

function createCards() {
  memoryData.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("memoryCard");
    card.style.zIndex = memoryData.length - index;
    card.innerHTML = `<p>${item.text}</p>`;

    addDragLogic(card);
    cardStack.appendChild(card);
  });
}

function addDragLogic(card) {
  let startX = 0;
  let currentX = 0;
  let dragging = false;
  const threshold = 100;

  card.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.clientX;
    card.style.transition = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    currentX = e.clientX - startX;
    card.style.transform =
      `translateX(${currentX}px) rotate(${currentX * 0.1}deg)`;
  });

  document.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    card.style.transition = "transform 0.3s ease";

    if (Math.abs(currentX) > threshold) {
      card.style.transform =
        `translateX(${currentX > 0 ? 1000 : -1000}px)`;

      setTimeout(() => {
        card.remove();
        if (cardStack.children.length === 0) {
          startReveal();
        }
      }, 300);
    } else {
      card.style.transform = "translateX(0)";
    }

    currentX = 0;
  });
}

createCards();

/* REVEAL SEQUENCE */

function startReveal() {

  memoryTitle.classList.add("fade-out-text");

  revealLayer.classList.remove("hidden");

  revealContent.innerHTML =
    `<div class="reveal-text">I have something for you.</div>`;

  const text = document.querySelector(".reveal-text");

  setTimeout(() => text.classList.add("show"), 100);

  setTimeout(() => overlay.classList.add("show"), 800);

  setTimeout(() => {
    revealContent.innerHTML =
      `<img src="assets/images/cake.png" class="cake-img">
       <div class="banner">Happy Birthday</div>`;
  }, 1500);

  setTimeout(() => {
    revealContent.innerHTML +=
      `<img src="assets/images/envelope.png" 
            class="envelope show" id="envelope">`;

    document.getElementById("envelope")
      .addEventListener("click", openLetter);

  }, 3000);
}

function openLetter() {
  revealContent.innerHTML =
    `<img src="assets/images/letter.png" class="letter-img">`;
}
