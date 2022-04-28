const {Shop, Item} = require("../src/gilded_rose");


const itemMock = (...params) => new Item(...params);
describe("Gilded Rose", function() {
  /*
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("fixme");
  });*/

  describe('L\'item doit avoir un attribut nom', () => {
    it("should have a name", () => {
      const item = itemMock("+5 Dexterity Vest", 10, 20);
      expect(item.name).toBe("+5 Dexterity Vest");
    });
  });
  //Test de l'attribut SellIn
  // SellIn est le nombre de jours avant la péremption, on teste si elle a une valeur valide:
  describe("La variable SellIn pour chaque item", () => {
    it("should have a valid sellIn value", () => {
      const items = [itemMock("foo", 0, 0), itemMock("bar", 0, 0)];
      const shop = new Shop(items);
      shop.items.forEach((itemShop) => {
        expect(itemShop.sellIn).toBeDefined();
        expect(typeof itemShop.sellIn).toBe("number");
        expect(itemShop.sellIn).toBeGreaterThanOrEqual(0);
      });
    });
    //SellIn doit être un nombre:
    it("should throw an error if sellIn is not defined", () => {
      try {
        itemMock("foo", undefined, 0);
      } catch ({ message }) {
        expect(message).toBe("sellIn n'est pas un nombre");
      }
    });

    //SellIn doit être un entier naturel:

    it("should throw an error if sellIn is not a int", () => {
      try {
        itemMock("foo", 1.5, 0);
      } catch ({ message }) {
        expect(message).toBe("sellIn n'est pas un int");
      }
    });
  });

  // Test de l'attribut quality:
  describe("La variable quality pour chaque Item", () => {
    it("should have a valid quality value", () => {
      const items = [itemMock("foo", 0, 0), itemMock("bar", 0, 0)];
      const shop = new Shop(items);
      shop.items.forEach((itemShop) => {
        expect(itemShop.quality).toBeDefined();
        expect(typeof itemShop.quality).toBe("number");
        expect(itemShop.quality).toBeGreaterThanOrEqual(0);
      });
    });

    it("should throw an error if quality is not defined", () => {
      try {
        itemMock("foo", 0, undefined);
      } catch ({ message }) {
        expect(message).toBe("quality n'est pas un nombre");
      }
    });

    it("should throw an error if quality is not a integer", () => {
      try {
        itemMock("foo", 0, 1.5);
      } catch ({ message }) {
        expect(message).toBe("quality n'est pas un int");
      }
    });

    it("should throw an error if quality is less than 0", () => {
      try {
        itemMock("foo", 0, -1);
      } catch ({ message }) {
        expect(message).toBe("quality ne peut pas être négative");
      }
    });

    it("should throw an error if quality is greater than 50", () => {
      try {
        itemMock("foo", 0, 51);
      } catch ({ message }) {
        expect(message).toBe("quality ne peut pas dépasser 50");
      }
    });
  });

  // vérifie la valeur de l'attribut quality quotidiennement
  it("should chaccck the decrease of quality on a daily basis", () => {
    const gildedRose = new Shop([itemMock("foo", 10, 20)]);
    const days =  2;
    let items = [];
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
    }
    expect(items[0].quality).toBe(18);
    expect(items[0].sellIn).toBe(8);
  });

  // vérifie que la qualité se dégrade deux fois plus après la péremption.
  it("should decrease quality twice more after expiring date", () => {
    const items = [itemMock("foo", -2, 7), itemMock("bar", 0, 4)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(5); 
    expect(items[1].quality).toBe(2); 
  });

  // Le cas Aged Brie
  describe("'Aged Brie'`s quality",()=>{
    it("should increases the more time passes", () => {
      const items = [itemMock("Aged Brie", 0, 7)];
      const gildedRose = new Shop(items);
      gildedRose.updateQuality();
      expect(items[0].quality).toBe(8); 
    });
    it("should not be greater than 50", () => {
      const items = [itemMock("Aged Brie", 0, 50)];
      const gildedRose = new Shop(items);
      gildedRose.updateQuality();
      expect(items[0].quality).toBe(50); 
    });
  });

  it("should verify the increasing quality of Brie by 2 then by 3 based on how far the concert day is", () => {
    const gildedRose = new Shop([
      itemMock("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    ]);

    const days = 20;
    let items = [];
    let previousQualityValue = 20;

    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
      if (items[0].sellIn < 10 && items[0].sellIn > 5) {
        expect(items[0].quality).toBe(previousQualityValue + 2);
      } else if (items[0].sellIn < 5 && items[0].sellIn > 0) {
        expect(items[0].quality).toBe(previousQualityValue + 3);
      } else if (items[0].sellIn <= 0) {
        expect(items[0].quality).toBe(0);
      }

      previousQualityValue = items[0].quality;
    }
  });

  // Le cas Sulfuras, Hand of Ragnaros
  it("should verify the quality and non expiration of sulufuras", () => {
    const gildedRose = new Shop([
      itemMock("Sulfuras, Hand of Ragnaros", 0, 80),
    ]);

    const days = 20;
    let items = [];
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(80);
  });

  // Le cas Conjured Mana Cake:
  it("should check the twice fast dropping quality of Conjuring", () => {
    const gildedRose = new Shop([
      itemMock("Conjured Mana Cake", 3, 6),
    ]);
    const days = 2;
    let items = [];
    for (let day = 0; day < days; day++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(2);
  }
  );
});
