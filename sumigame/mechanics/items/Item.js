const cc = require("node-console-colors");

/**
 * An enumeration type for types of categories for an Item.
 * @readonly
 * @property {null} GENERAL - The category for general items (default).
 * @property {string} COMPONENT - The category for component items.
 * @property {string} CONSUMABLE - The category for consumable items.
 * @property {string} EQUIPABLE - The category for equipable items.
 * @property {string} REAGENT - The category for reagent items.
 */
class ItemCategory {
  static GENERAL = new ItemCategory("GENERAL", "General");
  static COMPONENT = new ItemCategory("COMPONENT", "Component");
  static CONSUMABLE = new ItemCategory("CONSUMABLE", "Consumable");
  static EQUIPABLE = new ItemCategory("EQUIPABLE", "Equipable");
  static REAGENT = new ItemCategory("REAGENT", "Reagent");

  /**
   * @constructor
   * @param {string} key - The unique identifier for the item category.
   * @param {string} value - The human-readable name for the item category.
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

  toString() {
    return `${this.value}`;
  }
}

/**
 * Class representing an item.
 */
class Item {
  #name;
  #category;
  #carryWeight;
  #value;
  #maxQuantity;

  #quantity;

  /**
   * Create a new Item.
   * @param {string} [name] - The name of the item.
   * @param {string} [category] - The category of the item (as defined in ItemCategory).
   * @param {number} [carryWeight] - The weight of the item.
   * @param {number} [value] - The value of the item in copper.
   * @param {number} [maxQuantity] - The maximum quantity of the item that can be stacked in a single slot.
   */
  constructor(
    name = "Unnamed Item",
    category = ItemCategory.GENERAL,
    carryWeight = 0,
    value = 0,
    maxQuantity = 1
  ) {
    // validate arguments on initialization
    this.name = name;
    this.category = category;
    this.carryWeight = carryWeight;
    this.value = value;
    this.maxQuantity = maxQuantity;

    this.quantity = 1;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get category() {
    return this.#category;
  }

  set category(category) {
    if (Object.values(ItemCategory).includes(category)) {
      this.#category = category;
    } else {
      throw new Error(`Invalid category: ${category}`);
    }
  }

  get carryWeight() {
    return this.#carryWeight * this.#quantity;
  }

  set carryWeight(carryWeight) {
    this.#carryWeight = Math.max(0, carryWeight);
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = Math.max(0, value);
  }

  get maxQuantity() {
    return this.#maxQuantity;
  }

  set maxQuantity(maxQuantity) {
    this.#maxQuantity = maxQuantity;
  }

  get quantity() {
    return this.#quantity;
  }

  set quantity(quantity) {
    this.#quantity = Math.min(Math.max(quantity, 1), this.#maxQuantity);
  }

  #getValueCurrencyArray(value) {
    const gold = (value / 10000) | 0;
    const silver = ((value % 10000) / 100) | 0;
    const copper = value % 100 | 0;
    return [gold, silver, copper];
  }

  /**
   * Get the value of a single unit of the item.
   * @returns {number} - The value of a single unit of the item.
   */
  getUnitValue() {
    return this.#value;
  }

  /**
   * Get the total value of the item, taking into account the quantity.
   * @returns {number} - The total value of the item.
   */
  getQuantityValue() {
    return this.#value * this.#quantity;
  }

  /**
   * Get the value of a single unit of the item in an array representing the currency.
   * The array has three elements: the number of gold pieces, the number of silver pieces,
   * and the number of copper pieces, in that order.
   * @returns {Array<number>} - An array representing the value of a single unit of the item in currency.
   */
  getUnitValueCurrencyArray() {
    return this.#getValueCurrencyArray(this.getUnitValue());
  }

  /**
   * Get the total value of the item in an array representing the currency, taking into account the quantity.
   * The array has three elements: the number of gold pieces, the number of silver pieces,
   * and the number of copper pieces, in that order.
   * @returns {Array<number>} - An array representing the total value of the item in currency.
   */
  getQuantityValueCurrencyArray() {
    return this.#getValueCurrencyArray(this.getQuantityValue());
  }

  toString(isQuantity = true) {
    let currency = isQuantity
      ? this.getQuantityValueCurrencyArray().join(".")
      : this.getUnitValueCurrencyArray().join(".");

    // set console colors
    const name = cc.set("fg_dark_green", this.name);
    const category = cc.set("fg_dark_purple", this.category);
    currency = cc.set("fg_dark_yellow", currency);

    return `${name} ${category} - Val: ${currency}`;
  }
}

module.exports = {
  Item,
  ItemCategory,
};
