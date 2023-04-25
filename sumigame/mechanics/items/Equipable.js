const cc = require("node-console-colors");
const { Item, ItemCategory } = require("./Item");
const EquipSlot = require("../creature/EquipSlot");

class Equipable extends Item {
  #artistry;
  #level;

  #equipSlot;

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

    this.equipSlot = EquipSlot.ONE_HANDED;
  }

  get artistry() {
    return this.#artistry;
  }

  set artistry(value) {
    this.#artistry = Math.min(Math.max(value, 1), 5);
  }

  get level() {
    return this.#level;
  }

  set level(value) {
    if (value >= 1) {
      this.#level = value;
    }
  }

  get equipSlot() {
    return this.#equipSlot;
  }

  set equipSlot(slot) {
    this.#equipSlot = slot;
  }

  toString(isQuantity = true) {
    // set console colors
    const artistry = cc.set("fg_dark_yellow", this.artistry);
    const level = cc.set("fg_dark_yellow", this.level);

    return `${super.toString(isQuantity)} Art: ${artistry} Lv: ${level}`;
  }
}

module.exports = Equipable;
