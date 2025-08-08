// Countdown logic
const targetDate = new Date("August 12, 2025 00:00:00").getTime();
const countdownFunc = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    clearInterval(countdownFunc);
    document.getElementById("countdown").innerHTML = "<h2>🎉 Happy Birthday! 🎉</h2>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = String(days).padStart(2, '0');
  document.getElementById("hours").innerText = String(hours).padStart(2, '0');
  document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
  document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}, 1000);

// Balloons
function spawnBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");
  balloon.style.left = Math.random() * 90 + "%";
  balloon.style.animationDelay = Math.random() * 5 + "s";
  document.body.appendChild(balloon);
  setTimeout(() => balloon.remove(), 10000);
}
setInterval(spawnBalloon, 5000);
for (let i = 0; i < 3; i++) setTimeout(spawnBalloon, i * 1000);

// Fireworks
function launchFirework() {
  const centerX = Math.random() * window.innerWidth;
  const centerY = Math.random() * (window.innerHeight / 2);
  const colors = ['#ff0', '#f00', '#0ff', '#0f0', '#f0f', '#fff'];

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.classList.add("firework-particle");
    const angle = (Math.PI * 2) * (i / 30);
    const radius = Math.random() * 100 + 50;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.setProperty('--x', `${x}px`);
    particle.style.setProperty('--y', `${y}px`);
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  }
}
setInterval(launchFirework, 2500);

// Music toggle
const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("music-toggle");
music.volume = 0.3;
toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleBtn.textContent = "🔊 Pause Music";
  } else {
    music.pause();
    toggleBtn.textContent = "🔈 Play Music";
  }
});

//Cursore Heart
let lastTrailTime = 0;
const trailInterval = 65; // time in ms between emojis (try 60–150 for testing)

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastTrailTime < trailInterval) return;
  lastTrailTime = now;

  const heart = document.createElement("div");
  heart.className = "trail-heart";

  const emojis = ["❤️", "💖", "💘", "💕", "💞", "💗", "💓", "🌸", "🎀", "✨"];
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  heart.style.left = (e.pageX - 10) + "px";
  heart.style.top = (e.pageY - 95) + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
});

// 🎁 Scratch Card Logic
const canvas = document.getElementById("scratch-canvas");
const ctx = canvas.getContext("2d");
const container = document.querySelector(".scratch-card-container");

canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

// Fill canvas with gray cover
ctx.fillStyle = "#ffb6c1";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Optional: glitter or texture (uncomment to use image pattern)
// const coverImg = new Image();
// coverImg.src = "glitter.png";
// coverImg.onload = () => ctx.drawImage(coverImg, 0, 0, canvas.width, canvas.height);

ctx.globalCompositeOperation = "destination-out";

let isDrawing = false;

function scratch(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
}

canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) scratch(e);
});

canvas.addEventListener("touchstart", () => isDrawing = true);
canvas.addEventListener("touchend", () => isDrawing = false);
canvas.addEventListener("touchmove", (e) => {
  if (isDrawing) scratch(e);
});

// 💖 Message Carousel Logic
const messages = [
  "I LOVE YOUR EYES😍",
  "I LOVE YOUR SMILE😉",
  "I LOVE THE WAY YOU LOOK AT ME ❤️",
  "I LOVE YOU CHUBBY CHEEKS😘",
  "I LOVE IT WHEN YOU SAY TIGER🐯 YANI CHEETA",
  "YOU MAKE ME A BETTER PERSON, YOU MAKE ME WHO I AM😚",
  "YOU ARE MY EVERYTHING SAB KUCH TU🥰",
  "I LOVE YOU SHONAA❤️"
];

let messageIndex = 0;
const messageEl = document.getElementById("love-message");

function rotateMessage() {
  messageEl.style.opacity = 0;

  setTimeout(() => {
    messageEl.textContent = messages[messageIndex];
    messageEl.style.opacity = 1;
    messageIndex = (messageIndex + 1) % messages.length;
  }, 500);
}

setInterval(rotateMessage, 4000); // Change every 4 seconds
rotateMessage(); // Initial call


const petalContainer = document.querySelector('.petal-container');
let isNight = false;
let petalInterval;
let starInterval;

const petalEmojis = ['🌸', '💮', '🌺'];
const starEmojis = ['⭐', '🌟', '✨'];

function createFallingElement(emojiArray, className) {
  const el = document.createElement('div');
  el.classList.add(className);
  el.textContent = emojiArray[Math.floor(Math.random() * emojiArray.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.animationDuration = 5 + Math.random() * 5 + 's';
  el.style.fontSize = 16 + Math.random() * 10 + 'px';
  el.style.opacity = Math.random();
  petalContainer.appendChild(el);
  setTimeout(() => el.remove(), 10000);
}

function startPetals() {
  petalInterval = setInterval(() =>
    createFallingElement(petalEmojis, 'petal'), 300);
}

function stopPetals() {
  clearInterval(petalInterval);
}

function startStars() {
  starInterval = setInterval(() =>
    createFallingElement(starEmojis, 'petal'), 300);
}

function stopStars() {
  clearInterval(starInterval);
}

const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('night');
  isNight = document.body.classList.contains('night');

  if (isNight) {
    stopPetals();
    petalContainer.innerHTML = '';
    startStars();
    themeBtn.textContent = '☀️ Switch to Day Mode';
  } else {
    stopStars();
    petalContainer.innerHTML = '';
    startPetals();
    themeBtn.textContent = '🌙 Switch to Night Mode';
  }
});

// Start petals on page load
startPetals();





const puzzleWord = "I LOVE YOU";
const letters = puzzleWord.split("");
let shuffledLetters = [...letters].sort(() => 0.5 - Math.random());

const puzzleBox = document.getElementById("puzzle-box");
const successMsg = document.getElementById("puzzle-success");

shuffledLetters.forEach((char, idx) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.classList.add("puzzle-letter");
  span.setAttribute("draggable", true);
  span.setAttribute("data-index", idx);
  puzzleBox.appendChild(span);
});

let dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
}

function handleDrop(e) {
  e.preventDefault();
  if (dragSrcEl !== this) {
    const temp = dragSrcEl.textContent;
    dragSrcEl.textContent = this.textContent;
    this.textContent = temp;

    checkPuzzleSolved();
  }
}

function handleDragOver(e) {
  e.preventDefault();
}

function checkPuzzleSolved() {
  const current = Array.from(puzzleBox.children)
    .map((el) => el.textContent)
    .join("");
  if (current === puzzleWord) {
    successMsg.classList.remove("hidden");
  }
}

document.querySelectorAll(".puzzle-letter").forEach((el) => {
  el.addEventListener("dragstart", handleDragStart);
  el.addEventListener("drop", handleDrop);
  el.addEventListener("dragover", handleDragOver);
});
