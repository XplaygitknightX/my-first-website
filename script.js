// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Simple counter animation
function animateCounter(id, target, duration = 900) {
  const el = document.getElementById(id);
  let start = 0;
  const step = Math.max(1, Math.floor(target / (duration / 16)));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = start;
    }
  }, 16);
}

animateCounter("stat1", 3);
animateCounter("stat2", 7);
animateCounter("stat3", 12);

// Glow toggle (small fun effect)
const themeBtn = document.getElementById("themeBtn");
let glowOn = true;
themeBtn.addEventListener("click", () => {
  glowOn = !glowOn;
  document.documentElement.style.setProperty("--glow", glowOn ? "0 0 30px rgba(255,60,60,.22)" : "0 0 0 rgba(0,0,0,0)");
  themeBtn.textContent = glowOn ? "Glow" : "No Glow";
});

const texts = [
  "Beginner Web Developer",
  "HTML • CSS • JavaScript",
  "Building Projects Daily",
  "Future Freelancer 🚀"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type(){
  if(count === texts.length) count = 0;

  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  document.getElementById("typed").textContent = letter;

  if(letter.length === currentText.length){
    count++;
    index = 0;
    setTimeout(type, 1000);
  } else {
    setTimeout(type, 80);
  }
})();

window.addEventListener("DOMContentLoaded", () => {
  const introForge = document.getElementById("intro-forge");
  if (!introForge) return;

  setTimeout(() => {
    introForge.classList.add("hide");
  }, 2300);
});