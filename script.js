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
  // document.getElementById("logs").innerHTML = "";
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

  for (let log of treeLog) {
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));

    const row = document.createElement("tr");

    for (let i = 0; i < items.length + 2; i++) {
      let tabelData = document.createElement("td");
      tabelData.id = `item-${i}`;
      console.log(log);
      if (i < items.length) {
        tabelData.innerText = `item: ${i}`;
      } else if (i === items.length) {
        if(log.firstChoiceValue > log.secoundChoiceValue){
          tabelData.innerText = `${log.firstChoiceValue}`;
        } else {
          tabelData.innerText = `${log.secoundChoiceValue}`;
        }
      } else {
        tabelData.innerText = `${log.firstChoiceTotalWeight}`;
      }

      row.appendChild(tabelData);
    }

    document.querySelector("table tbody").appendChild(row);
    displayResult(result);
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
