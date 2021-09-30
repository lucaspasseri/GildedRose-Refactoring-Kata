const { Shop, Item } = require("../src/gilded_rose");
const { randomValueBetween } = require("../utils/randomValue");

describe("Gilded Rose", function () {
	const { agedBrie, backstage, sulfuras } = {
		agedBrie: "Aged Brie",
		backstage: "Backstage passes to a TAFKAL80ETC concert",
		sulfuras: "Sulfuras, Hand of Ragnaros",
	};
	const typeOfItems = ["Any name", agedBrie, backstage, sulfuras];
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
	it("should returns a array with multiple Items, when multiple Items were set on Shop", function () {
		const newItems = [];
		const randomValue = randomValueBetween(1, 50);
		for (let i = 0; i < randomValue; i++) {
			newItems.push(new Item("foo", 0, 0));
		}
		const gildedRose = new Shop(newItems);
		const items = gildedRose.allItems;
		expect(items.length).toBe(randomValue);
	});
	it("allows bad assigment", function () {
		const badSulfuras = new Item(sulfuras, -1, 0);
		const badBrie = new Item(agedBrie, -1, -1);
		const badBackstage = new Item(backstage, -1, 1);
		const gildedRose = new Shop([badSulfuras, badBrie, badBackstage]);
		const items = gildedRose.allItems;
		expect(items).toEqual([
			{
				name: sulfuras,
				sellIn: -1,
				quality: 0,
			},
			{
				name: agedBrie,
				sellIn: -1,
				quality: -1,
			},
			{
				name: backstage,
				sellIn: -1,
				quality: 1,
			},
		]);
	});
	it("should updates the status of any Item", function () {
		const gildedRose = new Shop([
			new Item("Any Item", 20, 20),
			new Item(agedBrie, 20, 20),
			new Item(backstage, 20, 20),
			new Item(sulfuras, 20, 20),
		]);
		for (let i = 0; i < 30; i++) {
			gildedRose.updateQuality();
		}
		const items = gildedRose.allItems;
		expect(items).toEqual([
			{
				name: "Any Item",
				sellIn: -10,
				quality: 0,
			},
			{
				name: agedBrie,
				sellIn: -10,
				quality: 50,
			},
			{
				name: backstage,
				sellIn: -10,
				quality: 0,
			},
			{
				name: sulfuras,
				sellIn: 20,
				quality: 20,
			},
		]);
	});
	it("should updates the status of any Items, including on edge cases", function () {
		const gildedRose = new Shop([
			new Item("Any Name", 0, 2),
			new Item(sulfuras, -1, 20),
		]);

		gildedRose.updateQuality();
		const items = gildedRose.allItems;
		expect(items).toEqual([
			{
				name: "Any Name",
				sellIn: -1,
				quality: 0,
			},
			{
				name: sulfuras,
				sellIn: -1,
				quality: 20,
			},
		]);
	});
});
