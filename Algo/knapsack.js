// Resursive
export let treeLog = [];
export let count = 0;

function knapsackRecursive(items, maxCap, index = 0, selected = []) {
  console.group(`Depth: ${index + 1}`);
  if (items == null || maxCap < 0 || index < 0) {
    console.groupEnd();
    return { maxValue: 0, selectedItems: [], totalWeight: 0 };
  }

  if (index === items.length || maxCap === 0) {
    console.groupEnd();
    return { maxValue: 0, selectedItems: [], totalWeight: 0 };
  }

  let firstChoice = {
    number: 0,
    maxValue: 0,
    selectedItems: [],
    totalWeight: 0,
  };
  // let consoleF = items[index]
  // console.log(consoleF);
  if (items[index].weight <= maxCap) {
    const result = knapsackRecursive(
      items,
      maxCap - items[index].weight,
      index + 1
    );

    firstChoice = {
      maxValue: items[index].value + result.maxValue,
      selectedItems: [index, ...result.selectedItems],
      totalWeight: items[index].weight + result.totalWeight,
    };
  }
  const secoundChoice = knapsackRecursive(items, maxCap, index + 1);

  count++;
  treeLog.push({
    firstChoiceItems: firstChoice.selectedItems,
    firstChoiceValue: firstChoice.maxValue,
    firstChoiceTotalWeight: firstChoice.totalWeight,

    secoundChoiceItems: secoundChoice.selectedItems,
    secoundChoiceValue: secoundChoice.maxValue,
    secoundChoiceTotalWeight: secoundChoice.totalWeight,
    chosen: firstChoice.maxValue > secoundChoice.maxValue ? "1" : "2",
  });
  console.groupEnd();
  console.log(
    ` firstChoice: ${firstChoice.maxValue} ||| secoundChoice: ${secoundChoice.maxValue}`
  );
  return firstChoice.maxValue > secoundChoice.maxValue
    ? firstChoice
    : secoundChoice;
}
export function knapsack(items, maxCap) {
  treeLog = [];
  count = 0;
  return knapsackRecursive(items, maxCap, 0);
}

const items = [
  { weight: 4, value: 5 },
  { weight: 2, value: 3 },
  { weight: 3, value: 2 },
  { weight: 3, value: 4 },
  { weight: 1, value: 2 },
];

console.log(knapsack(items, 7));

// const items = [{ weight: 10, value: 50 }];
// console.log(knapsack(items, 20));
