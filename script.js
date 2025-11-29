import { knapsack, treeLog, count } from "./Algo/knapsack.js";

let items = [];
let animationSpeed = 500;

function start() {
  const startBtn = document.getElementById("startSim");
  const genBtn = document.getElementById("generate");
  const clearBtn = document.getElementById("reset");

  startBtn.addEventListener("click", startSim);
  genBtn.addEventListener("click", generateItems);
  clearBtn.addEventListener("click", reset);
}

function generateItems() {
  items = [];

  for (let i = 0; i < 5; i++) {
    items.push({
      weight: Math.floor(Math.random() * 5) + 1,
      value: Math.floor(Math.random() * 20) + 1,
    });
  }
  displayItems();
}

function reset() {
  items = [];
  document.getElementById("logs").innerHTML = "";
  document.getElementById("resultContent").innerHTML =
    "Run simulation for a result";
  document.querySelectorAll(".item").forEach((el) => {
    el.classList.remove("picked", "not-picked");
  });
  displayItems();
}

async function startSim() {
  document.getElementById("resultContent").innerHTML = "wait for result";

  const maxCap = parseInt(document.getElementById("maxCap").value);
  animationSpeed = parseInt(document.getElementById("speed").value);

  const result = knapsack(items, maxCap);

  const logsDiv = document.getElementById("logs");

  logsDiv.innerHTML = "";
  for (let log of treeLog) {
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));

    const node = document.createElement("div");

    node.className = `tree-node chosen-${log.chosen}`;
    node.innerHTML = `
      <div><strong>1)</strong> Items: [${log.pickItems}] with <strong>Value:</strong> ${log.pickValue} and <strong>TotalWeight:</strong> ${log.pickTotalWeight}</div>
      <div><strong>2)</strong> Items: [${log.notPickItems}] with <strong>Value:</strong> ${log.notPickValue} and <strong>TotalWeight:</strong> ${log.notPickTotalWeight}</div>
      <div style="margin-top: 6px;"><em>Chosen: ${log.chosen}</em></div>
      `;

    logsDiv.appendChild(node);
  }
  displayResult(result);
}

function displayResult(result) {
  const resultDiv = document.getElementById("result");
  let resultConent = document.getElementById("resultContent");

  let resultHTML = `
  <div class="result-item"><strong>Antal repetitioner: </strong> ${count}</div>
  <div class="result-item"><strong>Maksimal værdi: </strong>${
    result.maxValue
  }</div>
  <div class="result-item"><strong>Total vægt:</strong> ${
    result.totalWeight
  }</div>
  <div class="result-item"><strong>Valgte items:</strong> ${
    result.selectedItems.map((i) => `Item ${i}`).join(", ") || "Ingen"
  }</div>
      `;

  resultConent.innerHTML = resultHTML;
  resultDiv.style.display = "block";
}

function displayItems() {
  const list = document.getElementById("items");
  list.innerHTML = "";
  items.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "item";
    div.id = `item-${i}`;
    div.innerHTML = `
    <div class="item-info">
    <div class="item-label">Item ${i}</div>
    vægt: ${item.weight}, værdi: ${item.value}
    </div>   
    `;
    list.appendChild(div);
  });
}

start();
