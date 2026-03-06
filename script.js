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

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("scorpion-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w = window.innerWidth;
  let h = window.innerHeight;

  function resizeCanvas() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const mouse = {
    x: w / 2,
    y: h / 2
  };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const SEGMENT_COUNT = 22;
  const GAP = 12;
  const segments = [];

  for (let i = 0; i < SEGMENT_COUNT; i++) {
    segments.push({
      x: mouse.x - i * GAP,
      y: mouse.y,
      angle: 0
    });
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function drawBoneLine(x1, y1, x2, y2, width = 2, alpha = 0.65) {
    ctx.strokeStyle = `rgba(210,210,220,${alpha})`;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function drawJoint(x, y, r, alpha = 0.9) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(230,230,235,${alpha})`;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "rgba(120,120,130,0.18)";
    ctx.arc(x - 1.5, y - 1.5, r * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  function updateSegments() {
    segments[0].x = lerp(segments[0].x, mouse.x, 0.22);
    segments[0].y = lerp(segments[0].y, mouse.y, 0.22);

    for (let i = 1; i < segments.length; i++) {
      const prev = segments[i - 1];
      const s = segments[i];

      const dx = prev.x - s.x;
      const dy = prev.y - s.y;
      const angle = Math.atan2(dy, dx);

      s.angle = angle;
      s.x = prev.x - Math.cos(angle) * GAP;
      s.y = prev.y - Math.sin(angle) * GAP;
    }

    if (segments[1]) {
      segments[0].angle = Math.atan2(
        segments[0].y - segments[1].y,
        segments[0].x - segments[1].x
      );
    }
  }

  function drawBody() {
    for (let i = 0; i < segments.length - 1; i++) {
      const a = segments[i];
      const b = segments[i + 1];
      drawBoneLine(a.x, a.y, b.x, b.y, 2.2, 0.5);
    }

    for (let i = 0; i < segments.length; i++) {
      const s = segments[i];
      const r = Math.max(3, 7 - i * 0.18);
      drawJoint(s.x, s.y, r, 0.95);
    }
  }

  function drawLegs() {
    for (let i = 3; i < segments.length - 5; i += 2) {
      const s = segments[i];
      const t = performance.now() * 0.008 + i;
      const swing = Math.sin(t) * 10;

      const len1 = 16 + (i % 3) * 2;
      const len2 = 14 + (i % 2) * 3;

      const leftMidX = s.x - len1;
      const leftMidY = s.y + swing;
      const leftEndX = leftMidX - len2;
      const leftEndY = leftMidY + 10;

      const rightMidX = s.x + len1;
      const rightMidY = s.y - swing;
      const rightEndX = rightMidX + len2;
      const rightEndY = rightMidY - 10;

      drawBoneLine(s.x, s.y, leftMidX, leftMidY, 1.5, 0.55);
      drawBoneLine(leftMidX, leftMidY, leftEndX, leftEndY, 1.3, 0.55);

      drawBoneLine(s.x, s.y, rightMidX, rightMidY, 1.5, 0.55);
      drawBoneLine(rightMidX, rightMidY, rightEndX, rightEndY, 1.3, 0.55);

      drawJoint(leftMidX, leftMidY, 2.2, 0.8);
      drawJoint(leftEndX, leftEndY, 2.4, 0.9);

      drawJoint(rightMidX, rightMidY, 2.2, 0.8);
      drawJoint(rightEndX, rightEndY, 2.4, 0.9);
    }
  }

  function drawClaws() {
    const head = segments[0];
    const angle = head.angle;

    function claw(side) {
      const dir = side === "left" ? -1 : 1;

      const baseX = head.x + Math.cos(angle + dir * 0.9) * 10;
      const baseY = head.y + Math.sin(angle + dir * 0.9) * 10;

      const armX = baseX + dir * 18;
      const armY = baseY - 8;

      const clawTopX = armX + dir * 12;
      const clawTopY = armY - 10;

      const clawBotX = armX + dir * 14;
      const clawBotY = armY + 8;

      drawBoneLine(baseX, baseY, armX, armY, 1.8, 0.7);
      drawBoneLine(armX, armY, clawTopX, clawTopY, 1.5, 0.75);
      drawBoneLine(armX, armY, clawBotX, clawBotY, 1.5, 0.75);

      drawJoint(baseX, baseY, 2.5, 0.9);
      drawJoint(armX, armY, 2.2, 0.9);
      drawJoint(clawTopX, clawTopY, 2.1, 0.95);
      drawJoint(clawBotX, clawBotY, 2.1, 0.95);
    }

    claw("left");
    claw("right");
  }

  function drawTail() {
    const tailBase = segments[segments.length - 1];
    let x = tailBase.x;
    let y = tailBase.y;

    const points = [{ x, y }];

    for (let i = 0; i < 8; i++) {
      const bend = Math.sin(performance.now() * 0.004 + i * 0.55) * 8;
      x += 10;
      y -= 7 + bend * 0.35;
      points.push({ x, y });
    }

    for (let i = 0; i < points.length - 1; i++) {
      drawBoneLine(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, 1.6, 0.6);
      drawJoint(points[i].x, points[i].y, Math.max(1.8, 3 - i * 0.18), 0.85);
    }

    const tip = points[points.length - 1];
    drawJoint(tip.x, tip.y, 2.2, 0.95);

    ctx.beginPath();
    ctx.strokeStyle = "rgba(215,215,225,0.75)";
    ctx.lineWidth = 1.4;
    ctx.moveTo(tip.x, tip.y);
    ctx.lineTo(tip.x + 7, tip.y - 7);
    ctx.lineTo(tip.x + 3, tip.y + 6);
    ctx.stroke();
  }

  function drawHeadGlow() {
    const head = segments[0];
    const glow = ctx.createRadialGradient(head.x, head.y, 1, head.x, head.y, 38);
    glow.addColorStop(0, "rgba(255,255,255,0.06)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(head.x, head.y, 38, 0, Math.PI * 2);
    ctx.fill();
  }

 function animate() {
  ctx.clearRect(0, 0, w, h);

  updateSegments();
  drawHeadGlow();
  drawLegs();
  drawTail();
  drawBody();
  drawClaws();

  requestAnimationFrame(animate);
}
  animate();
});