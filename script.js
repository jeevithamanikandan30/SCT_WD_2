let ms = 0, sec = 0, min = 0, hr = 0;
let timer = null;

function updateDisplay() {
  let h = String(hr).padStart(2, '0');
  let m = String(min).padStart(2, '0');
  let s = String(sec).padStart(2, '0');
  let milli = String(ms).padStart(2, '0');

  document.getElementById("display").innerText =
    `${h}:${m}:${s}:${milli}`;
}

function start() {
  if (timer) return;

  timer = setInterval(() => {
    ms++;

    if (ms === 100) { ms = 0; sec++; }
    if (sec === 60) { sec = 0; min++; }
    if (min === 60) { min = 0; hr++; }

    updateDisplay();
  }, 10);
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  pause();
  ms = sec = min = hr = 0;
  document.getElementById("laps").innerHTML = "";
  localStorage.removeItem("laps");
  updateDisplay();
}

function lap() {
  let lapTime = document.getElementById("display").innerText;

  let li = document.createElement("li");
  li.innerText = lapTime;

  document.getElementById("laps").appendChild(li);

  saveLaps();
}

/* 💾 Save laps */
function saveLaps() {
  let laps = [];
  document.querySelectorAll("#laps li").forEach(li => {
    laps.push(li.innerText);
  });
  localStorage.setItem("laps", JSON.stringify(laps));
}

/* Load laps on refresh */
window.onload = () => {
  let saved = JSON.parse(localStorage.getItem("laps")) || [];
  saved.forEach(time => {
    let li = document.createElement("li");
    li.innerText = time;
    document.getElementById("laps").appendChild(li);
  });
};

/* 🌗 Theme toggle */
function toggleTheme() {
  document.body.classList.toggle("light");

  let btn = document.getElementById("themeBtn");
  btn.innerText =
    document.body.classList.contains("light") ? "🌞" : "🌙";
}