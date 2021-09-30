class Item {
	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}
class Shop {
	constructor(items = []) {
		this.items = items;
	}

	static agedBrie = "Aged Brie";
	static backstage = "Backstage passes to a TAFKAL80ETC concert";
	static sulfuras = "Sulfuras, Hand of Ragnaros";
	static conjured = "Conjured";
	static maxQuality = 50;
	static firstEveValorization = 10;
	static secondEveValorization = 5;

	get allItems() {
		return this.items;
	}

	updateQuality() {
		this.items.forEach(item => {
			this.updateStates(item);
		});
	}

	updateStates(item) {
		const isSulfuras = item.name === Shop.sulfuras;
		if (isSulfuras) {
			return;
		}

		item.sellIn -= 1;

		const isTooLate = item.name !== Shop.agedBrie && item.sellIn < 0;
		if (isTooLate) {
			item.quality = 0;
			return;
		}

		const validQuality = item.quality > 0 && item.quality < Shop.maxQuality;
		if (!validQuality) {
			return;
		}

		const isAgedBrie = item.name === Shop.agedBrie;
		if (isAgedBrie) {
			item.quality += 1;
			return;
		}

		const isBackstage = item.name === Shop.backstage;
		if (isBackstage) {
			item.quality += 1;
			if (item.sellIn < Shop.firstEveValorization) {
				if (item.quality < Shop.maxQuality) {
					item.quality += 1;
				}
			}
			if (item.sellIn < Shop.secondEveValorization) {
				if (item.quality < Shop.maxQuality) {
					item.quality += 1;
				}
			}
			return;
		}

		const isConjured = item.name === Shop.conjured;
		if (isConjured) {
			item.quality -= 2;
			return;
		}

		item.quality -= 1;
	}
}

module.exports = {
	Item,
	Shop,
};
