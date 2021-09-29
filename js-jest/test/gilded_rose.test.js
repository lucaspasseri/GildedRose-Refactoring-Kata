const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
	const { agedBrie, backstage, sulfuras } = {
		agedBrie: "Aged Brie",
		backstage: "Backstage passes to a TAFKAL80ETC concert",
		sulfuras: "Sulfuras, Hand of Ragnaros",
	};
	it("should returns a empty array when no Item was set on Shop", function () {
		const gildedRose = new Shop();
		const items = gildedRose.allItems;
		expect(items).toEqual([]);
	});
	it("should returns a array with a single Item, when a single Item was set on Shop", function () {
		const gildedRose = new Shop([new Item("foo", 0, 0)]);
		const items = gildedRose.allItems;
		expect(items).toEqual([
			{
				name: "foo",
				sellIn: 0,
				quality: 0,
			},
		]);
	});
});
