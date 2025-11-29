// Resursive
export let treeLog = [];
export let count = 1;

function knapsackRecursive(items, maxCap, index = 0, depth = 0, selected = []) {
  if (items == null || maxCap < 0 || index < 0) {
    return { maxValue: 0, selectedItems: [], totalWeight: 0 };
  }

  if (index === items.length || maxCap === 0) {
    return { maxValue: 0, selectedItems: [], totalWeight: 0 };
  }
  treeLog.push({
    type: "Evaluating",
    item: index,
    depth: depth,
    canFit: items[index].weight <= maxCap,
  });

  let pick = { maxValue: 0, selectedItems: [], totalWeight: 0 };

  if (items[index].weight <= maxCap) {
    count++;
    const result = knapsackRecursive(
      items,
      maxCap - items[index].weight,
      index + 1,
      depth + 1
    );

    pick = {
      maxValue: items[index].value + result.maxValue,
      selectedItems: [index, ...result.selectedItems],
      totalWeight: items[index].weight + result.totalWeight,
    };
  }
  count++;
  const notPick = knapsackRecursive(items, maxCap, index + 1, depth + 1);

  const chosenType = pick.maxValue > notPick.maxValue ? "Pick" : "Not-pick";
  treeLog.push({
    type: chosenType,
    item: index,
    depth: depth,
    value: Math.max(pick.maxValue, notPick.maxValue)
  });

  return pick.maxValue > notPick.maxValue ? pick : notPick;
}
export function knapsack(items, maxCap) {
  treeLog = [];
  count = 1;
  return knapsackRecursive(items, maxCap, 0, 0);
}

// const items = [
//   { weight: 4, value: 5 },
//   { weight: 2, value: 3 },
//   { weight: 3, value: 2 },
//   { weight: 3, value: 4 },
//   { weight: 1, value: 2 },
// ];

// console.log(knapsack(items, 7));

// const items = [{ weight: 10, value: 50 }];
// console.log(knapsack(items, 20));
