const wrapper = document.getElementById("wrapper");
const question = document.getElementById("question");
const gif = document.getElementById("gif");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const audio = document.getElementById("celebration-sound");
const envelopeWrapper = document.getElementById("envelope-wrapper"); // Added for the letter

// --- START: Initial Position Setup ---
function initNoBtn() {
    const btnGroup = document.getElementById("btn-group");
    const rect = btnGroup.getBoundingClientRect();
    noBtn.style.left = (rect.left + rect.width / 2 + 20) + "px";
    noBtn.style.top = (rect.top + 10) + "px";
}
window.onload = initNoBtn;
window.onresize = initNoBtn;
// --- END: Initial Position Setup ---

yesBtn.addEventListener("click", () => {
  question.innerHTML = "Yay! 💖 Can't wait for our date on Feb 14th! I love you Baby 💖💌😍❤️ !!!";
  gif.src = "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif";

  // 1. Audio Logic
  if (audio) {
    audio.currentTime = 0;
    audio.volume = 0;
    audio.play();

    let fadeIn = setInterval(() => {
      if (audio.volume < 0.5) {
        audio.volume += 0.05;
      } else {
        clearInterval(fadeIn);
      }
    }, 200);

    setTimeout(() => {
      let fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05;
        } else {
          audio.pause();
          clearInterval(fadeOut);
        }
      }, 200);
    }, 10000);
  }

  // 2. Visual Transitions
  document.body.style.transition = "background-color 2s ease";
  document.body.style.backgroundColor = "#ff9a9e"; 
  
  const card = document.querySelector(".card");
  if (card) {
    card.style.transition = "background 2s ease";
    card.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
  }

  gif.style.transition = "transform 0.3s ease";
  gif.style.transform = "scale(1.2)";
  setTimeout(() => { gif.style.transform = "scale(1)"; }, 800);

  // 3. Floating Hearts
  createHearts();
  let heartInterval = setInterval(createHearts, 2000);
  setTimeout(() => clearInterval(heartInterval), 8000);

  // 4. NEW: The Envelope Sequence
  // Show the envelope after a short delay
  setTimeout(() => {
    envelopeWrapper.classList.add("show");
  }, 1500);

  // Open the envelope and slide letter up shortly after
  setTimeout(() => {
    envelopeWrapper.classList.add("open");
  }, 2500);
});

function createHearts() {
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = Math.random() * window.innerHeight + "px";
    heart.style.fontSize = Math.random() * 24 + 16 + "px";
    heart.style.opacity = "0.8";
    heart.style.transition = "all 2.5s ease-out";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999"; 
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.top = (parseInt(heart.style.top) - 300) + "px";
      heart.style.opacity = "0";
    }, 50);

    setTimeout(() => heart.remove(), 2500);
  }
}

// THE "UNCATCHABLE" NO BUTTON LOGIC
noBtn.addEventListener("mouseover", () => { 
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
});