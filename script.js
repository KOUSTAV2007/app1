// ===== Splash logic =====
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const left = document.querySelector(".splash-left");
  const right = document.querySelector(".splash-right");
  const text = document.querySelector(".splash-text");
  const app = document.getElementById("app");

  // Fade out text before opening
  setTimeout(() => {
    text.style.animation = "textFadeOut 0.6s forwards";
  }, 2000);

  // Open curtains (middle → sides)
  setTimeout(() => {
    left.style.animation = "curtainOutLeft 1.5s ease forwards";
    right.style.animation = "curtainOutRight 1.5s ease forwards";
  }, 2500);

  // Remove splash after animation
  setTimeout(() => {
    splash.style.display = "none";
    app.style.display = "flex";
  }, 2500 + 1500 + 200);
});

// ===== Love App Logic =====
let questionMain = null;
let gifMain = null;
let yesButton = null;
let noButton = null;
let runawayBtn = null;
let input = null;
let count = 0;

document.addEventListener("click", (e) => {
  const startButton = document.getElementById("start_button");
  if (e.target === startButton) {
    input = document.getElementById("fname").value.trim();
    const gifLanding = document.querySelector(".gif");
    const questionLanding = document.querySelector(".question");

    if (input === "") {
      gifLanding.src = "https://github.com/KOUSTAV2007/gif-host/raw/main/1.gif";
      questionLanding.innerHTML = "Please give me your name before we start!";
    } else {
      document.body.innerHTML = `
        <div class="wrapper">
          <h2 class="question">Hello ${input}! Will you go out with me?</h2>
          <img class="gif" alt="gif" src="https://github.com/KOUSTAV2007/gif-host/raw/main/7.gif"/>
          <div class="btn-row">
            <button class="yes-btn">Yes</button>
            <button class="no-btn">No</button>
          </div>
        </div>
      `;
      questionMain = document.querySelector(".question");
      gifMain = document.querySelector(".gif");
      yesButton = document.querySelector(".yes-btn");
      noButton = document.querySelector(".no-btn");

      yesButton.addEventListener("click", yesButtonListener);
      noButton.addEventListener("mouseenter", firstHoverHandler, { once: true });
      noButton.addEventListener("click", firstHoverHandler, { once: true });
    }
  }
});

function yesButtonListener() {
  document.body.innerHTML = `
    <div class="wrapper">
      <h2 class="question">Yay! I know you love me ❤️, ${input}!</h2>
      <img class="gif" alt="gif" src="https://github.com/KOUSTAV2007/gif-host/raw/main/2.gif"/>
    </div>
  `;
}

function firstHoverHandler() {
  questionMain.innerHTML = "Hi " + input + ", Will you go out with me?";
  const rect = noButton.getBoundingClientRect();
  runawayBtn = noButton.cloneNode(true);
  runawayBtn.classList.add("runaway-btn");
  runawayBtn.style.left = rect.left + "px";
  runawayBtn.style.top = rect.top + "px";
  runawayBtn.style.margin = "0";
  noButton.style.visibility = "hidden";
  document.body.appendChild(runawayBtn);
  runawayBtn.addEventListener("mouseenter", moveRunaway);
  runawayBtn.addEventListener("click", moveRunaway);
  noButton = runawayBtn;
  moveRunaway();
}

function moveRunaway() {
  if (count === 5) {
    gifMain.src = "https://github.com/KOUSTAV2007/gif-host/raw/main/6.gif";
    questionMain.innerHTML = "Don't you love me?";
  } else if (count === 12) {
    gifMain.src = "https://github.com/KOUSTAV2007/gif-host/raw/main/4.gif";
    questionMain.innerHTML = "Stop playing with me! Do you love me or not?";
  } else if (count === 17) {
    gifMain.src = "https://github.com/KOUSTAV2007/gif-host/raw/main/5.gif";
    questionMain.innerHTML = "JUST ANSWER IT! DO YOU LOVE ME?";
  }

  const btnRect = noButton.getBoundingClientRect();
  const maxX = window.innerWidth - btnRect.width - 20;
  const maxY = window.innerHeight - btnRect.height - 20;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  noButton.style.left = randomX + "px";
  noButton.style.top = randomY + "px";
  count++;
}
