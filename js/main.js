// Select screens
const landingScreen = document.getElementById("landing");
const timelineScreen = document.getElementById("timeline");
const cakeScreen = document.getElementById("cake");
const finalScreen = document.getElementById("final");

// Select buttons
const startBtn = document.getElementById("startBtn");
const toCakeBtn = document.getElementById("toCakeBtn");
const finishCakeBtn = document.getElementById("finishCakeBtn");
const restartBtn = document.getElementById("restartBtn");

// Utility function to switch screens
function showScreen(screenToShow) {
  const screens = [landingScreen, timelineScreen, cakeScreen, finalScreen];

  screens.forEach(screen => {
    screen.classList.add("hidden");
  });

  screenToShow.classList.remove("hidden");
}

// Landing → Timeline
startBtn.addEventListener("click", () => {
  showScreen(timelineScreen);
});

// Timeline → Cake
toCakeBtn.addEventListener("click", () => {
  showScreen(cakeScreen);
});

// Cake → Final
finishCakeBtn.addEventListener("click", () => {
  showScreen(finalScreen);
});

// Restart → Landing
restartBtn.addEventListener("click", () => {
  showScreen(landingScreen);
});
