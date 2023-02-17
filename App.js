let container = document.getElementById("container");
let canvas = document.getElementById("myCanvas");
let toolbar = document.getElementById("options");
let minus = document.getElementById("minus");
let width = document.getElementById("size");
let plus = document.getElementById("plus");
let color = document.getElementById("color");
let clear = document.getElementById("clear");
let tipOfDay = document.getElementById("tip");
let ctx = canvas.getContext("2d");

container.width = window.outerWidth;
container.height = window.outerHeight;

let isPainting = false;
let lineWidth = 1;
let startX;
let startY;
console.log();
width.innerHTML = lineWidth;
toolbar.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  if (lineWidth > 1) {
    if (e.target.id === "minus") {
      lineWidth--;
      width.innerHTML = lineWidth;
      console.log("cliked");
    }
  }
  if (e.target.id === "plus") {
    lineWidth++;
    width.innerHTML = lineWidth;
  }
});

toolbar.addEventListener("change", (e) => {
  if (e.target.id === "color") {
    ctx.strokeStyle = e.target.value;
  }
});

canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
  console.log(e.clientX, e.clientY);
});

canvas.addEventListener("mouseup", (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

const draw = (e) => {
  if (!isPainting) {
    return;
  }

  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";

  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
};

canvas.addEventListener("mousemove", draw);

let url = "https://api.adviceslip.com/advice";

async function tipOfTheDay() {
  let getTip = await fetch(url);
  let tip = await getTip.json();
  let tipText = tip.slip.advice;
  tipOfDay.innerHTML = "[Tip Of The Day: " + tipText + "]";
}
tipOfTheDay();
