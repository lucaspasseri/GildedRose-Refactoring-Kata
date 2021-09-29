const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
	it("should foo", function () {
		const gildedRose = new Shop([new Item("foo", 0, 0)]);
		const items = gildedRose.allItems;
		expect(items[0].name).toBe("foo");
	});
});
