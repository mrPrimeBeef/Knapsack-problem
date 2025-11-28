import assert from "assert";
import { knapsack } from "./knapsack.js";

describe("knapsack", function () {
  describe("basic functionality", function () {
    let items = [];
    let capacity = 50;

    before(function () {
      // create items with weight and value
      items = [
        { weight: 4, value: 5 }, 
        { weight: 2, value: 3 }, 
        { weight: 3, value: 2 },
        { weight: 3, value: 4 },
        { weight: 1, value: 2 }, 
      ];
    });

    describe("optimal selection", function () {
      it("The knapsack algo should return: ", function () {
        const result = knapsack(items, capacity);
        assert.equal(result.maxValue, 10);
      });
    });

        describe("item selection", function () {
          it("should select items 0, 1 and 4", function () {
            const result = knapsack(items, capacity);
            assert.deepEqual(result.selectedItems, [0, 1, 4]);
          });
        });

        describe("total weight", function () {
          it("should use exactly 7 weight", function () {
            const result = knapsack(items, capacity);
            assert.equal(result.totalWeight, 7);
          });
        });
      });

    //   describe("edge cases", function () {
    //     describe("single item fits", function () {
    //       it("should select the single item", function () {
    //         const items = [{ weight: 10, value: 50 }];
    //         const result = knapsack(items, 20);
    //         assert.equal(result.maxValue, 50);
    //         assert.deepEqual(result.selectedItems, [0]);
    //       });
    //     });

    //     describe("single item too heavy", function () {
    //       it("should return empty selection", function () {
    //         const items = [{ weight: 30, value: 50 }];
    //         const result = knapsack(items, 20);
    //         assert.equal(result.maxValue, 0);
    //         assert.deepEqual(result.selectedItems, []);
    //       });
    //     });

    //     describe("zero capacity", function () {
    //       it("should return zero value and no items", function () {
    //         const items = [{ weight: 10, value: 50 }];
    //         const result = knapsack(items, 0);
    //         assert.equal(result.maxValue, 0);
    //         assert.deepEqual(result.selectedItems, []);
    //       });
    //     });

    //     describe("empty items array", function () {
    //       it("should return zero value and no items", function () {
    //         const result = knapsack([], 50);
    //         assert.equal(result.maxValue, 0);
    //         assert.deepEqual(result.selectedItems, []);
    //       });
    //     });
    //   });

    //   describe("complex scenarios", function () {
    //     let items = [];

    //     before(function () {
    //       // create a larger dataset
    //       items = [
    //         { weight: 5, value: 10 },
    //         { weight: 4, value: 40 },
    //         { weight: 6, value: 30 },
    //         { weight: 2, value: 50 },
    //         { weight: 8, value: 60 },
    //       ];
    //     });

    //     describe("high value density items", function () {
    //       it("should prioritize high value per weight", function () {
    //         const result = knapsack(items, 10);
    //         assert.equal(result.maxValue, 130);
    //         // items 1 (4, 40) and 3 (2, 50) and 4 (8, 60) won't fit all
    //         // should include items with best value/weight ratio
    //         assert.ok(result.totalWeight <= 10);
    //       });
    //     });

    //     describe("fill capacity optimally", function () {
    //       it("should use available capacity effectively", function () {
    //         const result = knapsack(items, 15);
    //         assert.ok(result.totalWeight <= 15);
    //         assert.ok(result.maxValue > 0);
    //       });
    //     });

    //     describe("all items fit", function () {
    //       it("should select all items when they fit", function () {
    //         const result = knapsack(items, 100);
    //         assert.equal(result.selectedItems.length, 5);
    //         assert.equal(result.maxValue, 190);
    //       });
    //     });
    //   });

    //   describe("identical items", function () {
    //     describe("multiple identical items", function () {
    //       it("should select best combination of identical items", function () {
    //         const items = [
    //           { weight: 5, value: 20 },
    //           { weight: 5, value: 20 },
    //           { weight: 5, value: 20 },
    //         ];
    //         const result = knapsack(items, 10);
    //         assert.equal(result.maxValue, 40);
    //         assert.equal(result.selectedItems.length, 2);
    //       });
    //     });
  });
});
