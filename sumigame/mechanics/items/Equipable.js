const cc = require("node-console-colors");
const { Item, ItemCategory } = require("./Item");

class Equipable extends Item {
  #artistry;
  #level;

  constructor(
    name = "Unnamed Equipable",
    category = ItemCategory.EQUIPABLE,
    carryWeight = 0,
    value = 0,
    maxQuantity = 1,
    artistry = 3,
    level = 1
  ) {
    super(name, category, carryWeight, value, maxQuantity);

    // validate arguments on initialization
    this.artistry = artistry;
    this.level = level;
  }

  toString() {
    const name = cc.set("fg_dark_green", this.name);
    const category = cc.set("fg_dark_purple", this.category);
    const currency = cc.set("fg_dark_yellow", this.getQuantityValueCurrencyArray().join("."));
    const value = cc.set("fg_dark_gray", this.value);
    const artistry = cc.set("fg_dark_green", this.#artistry);
    const level = cc.set("fg_dark_green", this.#level);

    return `${name} ${category} ${currency} ${value} - Art ${artistry}, Lv ${level}`;
  }

  get artistry() {
    return this.#artistry;
  }

  set artistry(value) {
    if (value >= 1 && value <= 5) {
      this.#artistry = value;
    }
  }

  get level() {
    return this.#level;
  }

  set level(value) {
    if (value >= 1) {
      this.#level = value;
    }
  }
}

module.exports = Equipable;
