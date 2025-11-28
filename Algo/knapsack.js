// Resursive
export let treeLog = [];

let count = 1;
function knapsackRecursive(items, maxCap, index = 0, selected = []) {
  // console.log(`the recusion is on: ${count}`);
  if (items == null || maxCap < 0 || index < 0) {
    return { maxValue: 0, selectedItems: [], totalWeight: 0 };
  }

  // Base Case
  if (index === items.length || maxCap === 0) {
    return { maxValue: 0, selectedItems: [], totalWeight: 0 };
  }

  let pick = { maxValue: 0, selectedItems: [], totalWeight: 0 };

  if (items[index].weight <= maxCap) {
    // count++;
    const result = knapsackRecursive(items, maxCap - items[index].weight, index + 1);

    pick = {
      maxValue: items[index].value + result.maxValue,
      selectedItems: [index, ...result.selectedItems],
      totalWeight: items[index].weight + result.totalWeight,
    };
    treeLog.push({ type: 'Pick', item: index }); 
  }
  // count++;
  const notPick = knapsackRecursive(items, maxCap, index + 1);
  treeLog.push({ type: 'Not picked', item: index }); 

  return pick.maxValue > notPick.maxValue ? pick : notPick;
}

export function knapsack(items, maxCap) {
  return knapsackRecursive(items, maxCap);
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
