// Screen references
const landing = document.getElementById("landing");
const memory = document.getElementById("memory");
const cake = document.getElementById("cake");
const finalScreen = document.getElementById("final");

// Buttons
const startBtn = document.getElementById("startBtn");
const toCakeBtn = document.getElementById("toCakeBtn");
const likeCake = document.getElementById("likeCake");
const notSureCake = document.getElementById("notSureCake");
const finishBtn = document.getElementById("finishBtn");
const restartBtn = document.getElementById("restartBtn");

// Other elements
const memoryContainer = document.getElementById("memoryContainer");
const cakeButtons = document.getElementById("cakeButtons");
const cakeResponse = document.getElementById("cakeResponse");
const finalMessage = document.getElementById("finalMessage");

let revealedCount = 0;

// Utility function
function showScreen(screen) {
  landing.classList.add("hidden");
  memory.classList.add("hidden");
  cake.classList.add("hidden");
  finalScreen.classList.add("hidden");

  screen.classList.remove("hidden");
}

// Start button
startBtn.addEventListener("click", () => {
  showScreen(memory);
});

// Render memory cards
memoryData.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("memoryCard");

  card.innerHTML = `
    <h3>${item.title}</h3>
    <p class="hidden">${item.text}</p>
  `;

  card.addEventListener("click", () => {
    const paragraph = card.querySelector("p");

    if (paragraph.classList.contains("hidden")) {
      paragraph.classList.remove("hidden");
      revealedCount++;
    }

    if (revealedCount === memoryData.length) {
      toCakeBtn.disabled = false;
    }
  });

  memoryContainer.appendChild(card);
});

// Continue to cake
toCakeBtn.addEventListener("click", () => {
  showScreen(cake);

  setTimeout(() => {
    cakeButtons.classList.remove("hidden");
  }, 1500);
});

// Cake responses
likeCake.addEventListener("click", () => {
  cakeResponse.textContent = "That makes me happy.";
  finishBtn.classList.remove("hidden");
});

notSureCake.addEventListener("click", () => {
  cakeResponse.textContent = "I tried my best. Now please say you like it.";
  finishBtn.classList.remove("hidden");
});

// Final screen
finishBtn.addEventListener("click", () => {
  showScreen(finalScreen);
  finalMessage.textContent = finalLetter;
});

// Restart
restartBtn.addEventListener("click", () => {
  location.reload();
});
