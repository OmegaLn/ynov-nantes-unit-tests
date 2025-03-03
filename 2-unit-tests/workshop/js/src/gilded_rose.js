class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  get sellIn() {
    return this._sellIn;
  }

  set sellIn(value) {
    if (typeof value !== "number")
      throw new Error("sellIn n'est pas un nombre");

    if (!Number.isInteger(value)) throw new Error("sellIn n'est pas un int");

    this._sellIn = value;
  }

  get quality() {
    return this._quality;
  }

  set quality(value) {
    if (typeof value !== "number")
      throw new Error("quality n'est pas un nombre");

    if (value < 0) throw new Error("quality ne peut pas être négative");

    if (!Number.isInteger(value)) throw new Error("quality n'est pas un int");

    if (value > 50 && this.name !== "Sulfuras, Hand of Ragnaros")
      throw new Error("quality ne peut pas dépasser 50");

    this._quality = value;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            if (this.items[i].name == "Conjured Mana Cake") {
              this.items[i].quality = this.items[i].quality - 2;
            } else {
              this.items[i].quality = this.items[i].quality - 1;
            }
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn <= 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } 
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};