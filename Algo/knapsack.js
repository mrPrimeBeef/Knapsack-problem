// Resursive
function knapsackRecursive(items, maxCap, n, selected = []) {
  if (items == null || maxCap < 0 || n < 0) {
    return { maxValue: 0, selectedItems: [], totalWeight: 0 };
  }

  // Base Case
  if (n === 0 || maxCap === 0) {
    return { maxValue: 0, selectedItems: [], totalWeight: 0 };
  }

  let pick = { maxValue: 0, selectedItems: [], totalWeight: 0 };

  if (items[n - 1].weight <= maxCap) {
    const result = knapsackRecursive(items, maxCap - items[n - 1].weight, n - 1);

    pick = {
      maxValue: items[n - 1].value + result.maxValue,
      selectedItems: [n - 1, ...result.selectedItems],
      totalWeight: items[n - 1].weight + result.totalWeight,
    };
  }

  const notPick = knapsackRecursive(items, maxCap, n - 1);

  return pick.maxValue > notPick.maxValue ? pick : notPick;
}

export function knapsack(items, maxCap) {
  const n = items.length;
  return knapsackRecursive(items, maxCap, n);
}

const items = [
  { weight: 4, value: 5 },
  { weight: 2, value: 3 },
  { weight: 3, value: 2 },
  { weight: 3, value: 4 },
  { weight: 1, value: 2 },
];

console.log(knapsack(items, 7));