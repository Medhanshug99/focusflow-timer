let time = 25 * 60;
let interval = null;

const timer = document.getElementById("timer");
const durationSelect = document.getElementById("duration");

function formatTime(t) {
  if (t >= 3600) { 
    const hr = Math.floor(t / 3600);
    const min = Math.floor((t % 3600) / 60);
    return `${hr} hr ${min} min`;
  } else {
    const m = String(Math.floor(t / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${m}:${s}`;
  }
}

function update() {
  timer.textContent = formatTime(time);
  if (time === 0) {
    clearInterval(interval);
    interval = null;
    alert("⏰ Time is up! Take a break or start the next session.");
  }
}

durationSelect.onchange = () => {
  clearInterval(interval);
  interval = null;
  time = Number(durationSelect.value) * 60;
  update();
};

document.getElementById("start").onclick = () => {
  if (interval) return;
  interval = setInterval(() => {
    if (time > 0) {
      time--;
      update();
    }
  }, 1000);
};

document.getElementById("pause").onclick = () => {
  clearInterval(interval);
  interval = null;
};

document.getElementById("reset").onclick = () => {
  clearInterval(interval);
  interval = null;
  time = Number(durationSelect.value) * 60;
  update();
};

update();
