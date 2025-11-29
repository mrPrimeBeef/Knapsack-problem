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
  displayItems();
}

async function startSim() {
  const maxCap = parseInt(document.getElementById("maxCap").value);
  animationSpeed = parseInt(document.getElementById("speed").value);

  const result = knapsack(items, maxCap);

  const logsDiv = document.getElementById("logs");

  logsDiv.innerHTML = "";
  for (let log of treeLog) {
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));

    const node = document.createElement("div");
    node.className = `tree-node ${log.type}`;
    node.textContent = `item: ${log.item}`;
    logsDiv.appendChild(node);
    logsDiv.scrollTop = logsDiv.scrollHeight;

    const itemEl = document.getElementById(`item-${log.item}`);
    if (itemEl) {
      itemEl.classList.remove("picked", "not-picked");
      itemEl.classList.add(log.type === "pick" ? "picked" : "not-picked");
    }
  }
  displayResult(result);
}

function displayResult(result) {
  const resultDiv = document.getElementById("result");
  let resultConent = document.getElementById("resultContent");

  let resultHTML = `
  <div class="result-item"><strong>Antal repitioner: </strong> ${count}</div>
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
    div.id = `item-${i + 1}`;
    div.innerHTML = `
    <div class="item-info">
    <div class="item-label">Item ${i + 1}</div>
    vægt: ${item.weight}, værdi: ${item.value}
    </div>   
    `;
    list.appendChild(div);
  });
}

function stopSim() {
  animationSpeed = 10000000000;
}

start();
