const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
	const specialItems = [
		"Aged Brie",
		"Backstage passes to a TAFKAL80ETC concert",
		"Sulfuras, Hand of Ragnaros",
	];
	it("should foo", function () {
		const gildedRose = new Shop([new Item("foo", 0, 0)]);
		const items = gildedRose.allItems;
		expect(items[0].name).toBe("foo");
	});
	it("should returns a empty array when no item was set", function () {
		const gildedRose = new Shop();
		const items = gildedRose.allItems;
		expect(items).toEqual([]);
	});
	it("should updates the status of any item", function () {
		const gildedRose = new Shop([
			new Item("Any Name", 20, 20),
			new Item(specialItems[0], 20, 20),
			new Item(specialItems[1], 20, 20),
			new Item(specialItems[2], 20, 20),
		]);
		const items = gildedRose.allItems;
		for (let i = 0; i < 20; i++) {
			gildedRose.updateQuality();
		}
		expect(items).toEqual([
			{
				name: "Any Name",
				sellIn: 0,
				quality: 0,
			},
			{
				name: "Aged Brie",
				sellIn: 0,
				quality: 40,
			},
			{
				name: "Backstage passes to a TAFKAL80ETC concert",
				sellIn: 0,
				quality: 50,
			},
			{
				name: "Sulfuras, Hand of Ragnaros",
				sellIn: 20,
				quality: 20,
			},
		]);
	});
	it("should updates the status of any item", function () {
		const gildedRose = new Shop([
			new Item("Any Name", 20, 20),
			new Item(specialItems[0], 20, 20),
			new Item(specialItems[1], 20, 20),
			new Item(specialItems[2], 20, 20),
		]);
		const items = gildedRose.allItems;
		for (let i = 0; i < 21; i++) {
			gildedRose.updateQuality();
		}
		expect(items).toEqual([
			{
				name: "Any Name",
				sellIn: -1,
				quality: 0,
			},
			{
				name: "Aged Brie",
				sellIn: -1,
				quality: 42,
			},
			{
				name: "Backstage passes to a TAFKAL80ETC concert",
				sellIn: -1,
				quality: 0,
			},
			{
				name: "Sulfuras, Hand of Ragnaros",
				sellIn: 20,
				quality: 20,
			},
		]);
	});
	it("should updates the status of any item", function () {
		const gildedRose = new Shop([
			new Item("Any Name", 0, 2),
			new Item(specialItems[2], -1, 20),
			new Item(specialItems[0], 0, 50),
		]);
		const items = gildedRose.allItems;
		gildedRose.updateQuality();
		expect(items).toEqual([
			{
				name: "Any Name",
				sellIn: -1,
				quality: 0,
			},
			{
				name: specialItems[2],
				sellIn: -1,
				quality: 20,
			},
			{
				name: specialItems[0],
				sellIn: -1,
				quality: 50,
			},
		]);
	});
});
