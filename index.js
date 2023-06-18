const root = document.getElementById('root');
// const canvas = document.getElementById('live_desk');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const rows = 100;
const cols = 100;
let counter = 0;
let timer;

canvas.width = 2000;
canvas.height = 1000;
canvas.style.border = '1px solid black';
canvas.style.backgroundColor = 'black';

ctx.fillStyle = '#ff9501';

let firstGenerate = [];

function firstGeneration() {
  for (let x = 0; x < 2000; x++) {
    firstGenerate[x] = [];
    for (let y = 0; y < 1000; y++) {
      ctx.fillStyle = '#ff9501';
      firstGenerate[x][y] = Math.random() * 100 > 90 ? 1 : 0;
      if (firstGenerate[x][y]) ctx.fillRect(x * 5, y * 5, 5, 5);
    }
  }
}

function startGameOfLife() {
  ctx.clearRect(0, 0, 2000, 1000);
  const newGenerate = [];
  for (let x = 0; x < 2000; x++) {
    newGenerate[x] = [];
    for (let y = 0; y < 1000; y++) {
      let lifePower = getCellsPosition(x, y);
      if (firstGenerate[x][y] === 0 && lifePower === 3) newGenerate[x][y] = 1;
      else if (firstGenerate[x][y] === 1 && (lifePower > 3 || lifePower < 2)) newGenerate[x][y] = 0;
      else newGenerate[x][y] = firstGenerate[x][y];
      if (newGenerate[x][y]) ctx.fillRect(x * 5, y * 5, 5, 5);
    }
  }
  firstGenerate = [...newGenerate];
  counter++;
  document.getElementById('counter').innerHTML = counter;
}

function getCellsPosition(x, y) {
  let lifePower =
    cellsPosition(x - 1, y - 1) +
    cellsPosition(x - 1, y) +
    cellsPosition(x - 1, y + 1) +
    cellsPosition(x, y - 1) +
    cellsPosition(x, y + 1) +
    cellsPosition(x + 1, y - 1) +
    cellsPosition(x + 1, y) +
    cellsPosition(x + 1, y + 1);
  return lifePower;
}

// определение позиции точки на экране и условие при котором не допускается выхода за рамки игровой плоскости
function cellsPosition(x, y) {
  if (x < 2000 && y < 1000 && x >= 0 && y >= 0) return firstGenerate[x][y];
  return 0;
}

function startLife() {
  setInterval(startGameOfLife, 60);
}

const startButton = (document.getElementById('start').onclick = startLife);
const generateButton = (document.getElementById('generate').onclick = firstGeneration);

root.appendChild(canvas);
