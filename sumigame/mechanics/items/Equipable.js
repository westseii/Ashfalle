const cc = require("node-console-colors");
const { Item, ItemCategory } = require("./Item");

/**
 * An enumeration type for types of equipment slots.
 * @readonly
 */
class EquipSlot {
  static CHEST = new EquipSlot("CHEST", "Chest");
  static FEET = new EquipSlot("FEET", "Feet");
  static FINGER = new EquipSlot("FINGER", "Finger");
  static HANDS = new EquipSlot("HANDS", "Hands");
  static HEAD = new EquipSlot("HEAD", "Head");
  static LEGS = new EquipSlot("LEGS", "Legs");
  static NECK = new EquipSlot("NECK", "Neck");
  static ONE_HANDED = new EquipSlot("ONE_HANDED", "One-handed");
  static RELIC = new EquipSlot("RELIC", "Relic");
  static TRINKET = new EquipSlot("TRINKET", "Trinket");
  static TWO_HANDED = new EquipSlot("TWO_HANDED", "Two-handed");

  /**
   * @constructor
   * @param {string} key - The unique identifier for the equipment slot.
   * @param {string} value - The human-readable name for the equipment slot.
   */
  constructor(key, value) {
    if (!key || !value) {
      throw new Error("Both key and value arguments are required");
    }

    this.key = key.toUpperCase();
    this.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    Object.freeze(this);
  }

  static values() {
    return Object.values(this).filter((value) => value instanceof this);
  }

  /**
   * Returns the human-readable name for the equipment slot as a string.
   * @returns {string} - The name of the equipment slot.
   */
  toString() {
    return `${this.value}`;
  }
}

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
    if (slot instanceof EquipSlot) {
      this.#equipSlot = slot;
    }
  }

  toString(isQuantity = true) {
    // set console colors
    const artistry = cc.set("fg_dark_yellow", this.artistry);
    const level = cc.set("fg_dark_yellow", this.level);

    return `${super.toString(isQuantity)} Art: ${artistry} Lv: ${level}`;
  }
}

module.exports = { Equipable, EquipSlot };
