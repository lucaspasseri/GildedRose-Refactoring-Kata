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
	static maxQuality = 50;
	static firstEveValorization = 10;
	static secondEveValorization = 5;

	get allItems() {
		return this.items;
	}

	updateQuality() {
		this.items.forEach(item => {
			this.updateState(item);
		});
	}

	updateState(item) {
		if (item.name === Shop.sulfuras) {
			return;
		}
		if (item.quality > 0 && item.quality < Shop.maxQuality) {
			if (item.name === Shop.agedBrie || item.name === Shop.backstage) {
				item.quality += 1;
				if (item.name === Shop.backstage) {
					if (item.sellIn <= Shop.firstEveValorization) {
						if (item.quality < Shop.maxQuality) {
							item.quality += 1;
						}
					}
					if (item.sellIn <= Shop.secondEveValorization) {
						if (item.quality < Shop.maxQuality) {
							item.quality += 1;
						}
					}
				}
			} else {
				item.quality -= 1;
			}
		}
		item.sellIn -= 1;
		if (item.name !== Shop.agedBrie && item.sellIn < 0) {
			item.quality = 0;
		}
	}
}

module.exports = {
	Item,
	Shop,
};
