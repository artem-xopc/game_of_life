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
      let lifePower = getLifePower(x, y);
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

function getLifePower(x, y) {
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

function cellsPosition(x, y) {
  if (x < 2000 && y < 1000 && x >= 0 && y >= 0) return firstGenerate[x][y];
  return 0;
}

function startLife() {
  setInterval(startGameOfLife, 60);
}

const startButton = (document.getElementById('start').onclick = startLife);
const generateButton = (document.getElementById('generate').onclick = firstGeneration);

// startButton.addEventListener('click', () => {
//   clearInterval(interval);
//   interval = setInterval(startGameOfLife, 60);
// });
root.appendChild(canvas);

// старая версия

// canvas.onclick = function (event) {
//   let x = event.offsetX;
//   let y = event.offsetY;
//   console.log(x, y);
//   x = Math.floor(x / 10);
//   y = Math.floor(y / 10);
//   liveArr[y][x] = 1;
//   drawCells();
// };

// заполнение сетки пустыми клетками
// function gameBoard() {
//   for (let i = 0; i < rows; i++) {
//     liveArr[i] = [];
//     for (let j = 0; j < cols; j++) liveArr[i][j] = 0;
//   }
// }
// gameBoard();

// // отрисовка одной клетки
// function drawCells() {
//   ctx.clearRect(0, 0, 1000, 1000);
//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       if (liveArr[i][j] === 1) {
//         ctx.fillStyle = '#ff9501';
//         ctx.fillRect(j * 5, i * 5, 5, 5);
//       }
//     }
//   }
// }

// // основная логика
// function startGame() {
//   let liveArr2 = [];
//   for (let i = 0; i < rows; i++) {
//     liveArr2[i] = [];
//     for (let j = 0; j < cols; j++) {
//       let neighbours = [];
//       // краевые условия
//       if (liveArr[countermeasureTL(i) - 1][j] === 1) neighbours[i][j] = 1; // вверхняя грань
//       if (liveArr[i][countermeasureRB(j) + 1] === 1) neighbours[i][j] = 1; // правая грань
//       if (liveArr[countermeasureRB(i) + 1][j] === 1) neighbours[i][j] = 1; // нижняя грань
//       if (liveArr[i][countermeasureTL(j) - 1] === 1) neighbours[i][j] = 1; // левая грань
//       // диагональные условия
//       if (liveArr[countermeasureTL(i) - 1][countermeasureRB(j) + 1] === 1) neighbours[i][j] = 1; // правая верхняя диагональ
//       if (liveArr[countermeasureRB(i) + 1][countermeasureRB(j) + 1] === 1) neighbours[i][j] = 1; // правая нижняя диагональ
//       if (liveArr[countermeasureRB(i) + 1][countermeasureTL(j) - 1] === 1) neighbours[i][j] = 1; // левая нижняя диагональ
//       if (liveArr[countermeasureTL(i) - 1][countermeasureTL(j) - 1] === 1) neighbours[i][j] = 1; // левая верхняя диагональ
//       // правила игры
//       neighbours.length === 1 || neighbours.length === 2 || neighbours.length === 3
//         ? (liveArr2[i][j] = 1)
//         : (liveArr2[i][j] = 0);
//       // neighbours === 3 ? (liveArr2[i][j] = 1) : (liveArr2[i][j] = 0);
//     }
//   }
//   liveArr = liveArr2;
//   drawCells();
//   counter++;
//   document.getElementById('counter').innerHTML = counter;
//   timer = setTimeout(startGame, 300);
// }

// // функции проверки краевых значений

// // проверка верхней грани и левой грани
// function countermeasureTL(i) {
//   if (i === 0) return rows;
//   else return i;
// }
// // проверка правой и нижней грани
// function countermeasureRB(i) {
//   if (i === 99) return -1;
//   else return i;
// }

// document.getElementById('start').onclick = startGame;
