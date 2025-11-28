import * as controller from "./controller.js";

let simulationInterval = null;
let generation = 0;

export function makeGrid() {
  const grid = document.getElementById("grid");
  const rowsInput = document.getElementById("rows");
  const colsInput = document.getElementById("cols");
  const generateBtn = document.getElementById("generate");
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const randBtn = document.getElementById("rand");

  generateBtn.addEventListener("click", () => {
    const rows = parseInt(rowsInput.value, 10);
    const cols = parseInt(colsInput.value, 10);

    controller.createGrid(rows, cols);

    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 20px)`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.addEventListener("click", () => {
          controller.toggleCell(r, c);
          renderGrid();
        });
        grid.appendChild(cell);
      }
    }
    renderGrid();
  });

  startBtn.addEventListener("click", startSimulation);
  stopBtn.addEventListener("click", stopSimulation);
  randBtn.addEventListener("click", randomize)
}

function renderGrid() {
  const cells = document.querySelectorAll(".cell");
  const modelGrid = controller.getGrid();

  cells.forEach((cell, index) => {
    const rows = modelGrid.rows();
    const row = Math.floor(index / modelGrid.cols());
    const col = index % modelGrid.cols();

    const value = modelGrid.get({ row, col });

    if (value === 1) {
      cell.classList.add("alive");
    } else {
      cell.classList.remove("alive");
    }
  });
}

function resetGeneration() {
  generation = 0;
  updateGenerationCounter();
}

function updateGenerationCounter() {
  const genText = document.getElementById("genText");
  genText.textContent = generation;
}

// TODO look at it
export function stopSimulation() {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    resetGeneration();
    simulationInterval = null;
  }
}
function startSimulation() {
  const model = controller.getGrid();

  simulationInterval = setInterval(() => {
    generation++;
    model.nextGeneration();
    renderGrid();
    updateGenerationCounter();
  }, 500);
}

  export function randomize(){
  controller.randomizeGrid();
  renderGrid();
}

