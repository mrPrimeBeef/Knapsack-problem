import assert from "assert";
import { knapsack } from "./knapsack.js";

describe("knapsack", function () {
  describe("basic functionality", function () {
    let items = [];
    let capacity = 7;

    before(function () {
      items = [
        { weight: 4, value: 5 },
        { weight: 2, value: 3 },
        { weight: 3, value: 2 },
        { weight: 3, value: 4 },
        { weight: 1, value: 2 },
      ];
    });

    describe("optimal selection", function () {
      it("The knapsack should return ", function () {
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

  describe("edge cases", function () {
    describe("single item fits", function () {
      it("should select the single item", function () {
        const items = [{ weight: 10, value: 50 }];
        const result = knapsack(items, 20);
        assert.equal(result.maxValue, 50);
        assert.deepEqual(result.selectedItems, [0]);
      });
    });

    describe("single item too heavy", function () {
      it("should return empty selection", function () {
        const items = [{ weight: 30, value: 50 }];
        const result = knapsack(items, 20);
        assert.equal(result.maxValue, 0);
        assert.deepEqual(result.selectedItems, []);
      });
    });

    describe("zero capacity", function () {
      it("should return zero value and no items", function () {
        const items = [{ weight: 10, value: 50 }];
        const result = knapsack(items, 0);
        assert.equal(result.maxValue, 0);
        assert.deepEqual(result.selectedItems, []);
      });
    });

    describe("empty items array", function () {
      it("should return zero value and no items", function () {
        const result = knapsack([], 50);
        assert.equal(result.maxValue, 0);
        assert.deepEqual(result.selectedItems, []);
      });
    });
  });
});
