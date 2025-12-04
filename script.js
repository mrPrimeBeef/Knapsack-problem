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

  generateItems();
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
  document.getElementById("logs2").innerHTML = ``;
  document.getElementById("logsbody").innerHTML = ``;
  document.getElementById("resultContent").innerHTML =
    "Run simulation for a result";
  document.querySelectorAll(".item").forEach((el) => {
    el.classList.remove("1", "2");
  });
  displayItems();
}

async function startSim() {
  document.getElementById("resultContent").innerHTML = "wait for result";

  const maxCap = parseInt(document.getElementById("maxCap").value);
  animationSpeed = parseInt(document.getElementById("speed").value);

  const result = knapsack(items, maxCap);

  await Promise.all([retree(animationSpeed), tabel(animationSpeed)]);

  displayResult(result);
}

async function tabel() {
  for (let log of treeLog) {
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));

    const row = document.createElement("tr");

    const isFirstChoiceBetter = log.firstChoiceValue > log.secoundChoiceValue;
    const chosenItems = isFirstChoiceBetter
      ? log.firstChoiceItems
      : log.secoundChoiceItems;

    for (let i = 0; i < items.length + 3; i++) {
      let tabelData = document.createElement("td");
      tabelData.className = `${i} tabledata`;

      if (i === 0) {
        tabelData.innerText = `${treeLog.indexOf(log) + 1}`;
      } else if (i <= items.length) {
        tabelData.innerText = `item: ${i-1}`;
        if (chosenItems.includes(i - 1)) {
          tabelData.classList.add(
            isFirstChoiceBetter ? "chosen-1" : "chosen-2"
          );
        }
      } else if (i === items.length + 1) {
        tabelData.innerText = isFirstChoiceBetter
          ? `${log.firstChoiceValue}`
          : `${log.secoundChoiceValue}`;
      } else {
        tabelData.innerText = isFirstChoiceBetter
          ? `${log.firstChoiceTotalWeight}`
          : `${log.secoundChoiceTotalWeight}`;
      }

      row.appendChild(tabelData);
    }

    document.querySelector("table tbody").appendChild(row);

    document.querySelector("table tbody tr:last-child").scrollIntoView();
  }
}

async function retree(animationSpeed) {
  const logsDiv = document.getElementById("logs2");

  logsDiv.innerHTML = "";
  for (let log of treeLog) {
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));

    const node = document.createElement("div");

    node.className = `tree-node chosen-${log.chosen}`;
    node.innerHTML = `
    <div><strong>iteration: ${treeLog.indexOf(log) + 1}</strong></div>
    <br>
      <div><strong>1)</strong> Items: [${
        log.firstChoiceItems
      }] with <strong>Value:</strong> ${
      log.firstChoiceValue
    } and <strong>TotalWeight:</strong> ${log.firstChoiceTotalWeight}</div>
      <br>
      <div><strong>2)</strong> Items: [${
        log.secoundChoiceItems
      }] with <strong>Value:</strong> ${
      log.secoundChoiceValue
    } and <strong>TotalWeight:</strong> ${log.secoundChoiceTotalWeight}</div>
      <div style="margin-top: 6px;"><em>Chosen: ${log.chosen}</em></div>
      `;

    logsDiv.appendChild(node);

    logsDiv.querySelector(".tree-node:last-child").scrollIntoView();
  }
}

function displayResult(result) {
  const resultDiv = document.getElementById("result");
  let resultConent = document.getElementById("resultContent");

  document.querySelectorAll(".item").forEach((element) => {
    const itemId = parseInt(element.id.split("-")[1]);

    if (result.selectedItems.includes(itemId)) {
      element.classList.add("chosen");
    }
  });

  let resultHTML = `
  <div class="resultContainer">
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
      </div>`;

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
