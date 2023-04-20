const cc = require("node-console-colors");

/**
 * An enumeration of the possible categories for an Item.
 * @enum {string}
 * @readonly
 * @property {null} GENERAL - The category for general items (default).
 * @property {string} COMPONENT - The category for component items.
 * @property {string} CONSUMABLE - The category for consumable items.
 * @property {string} EQUIPABLE - The category for weapon items.
 * @property {string} REAGENT - The category for reagent items.
 */
const ItemCategory = Object.freeze({
  GENERAL: null,
  COMPONENT: "Component",
  CONSUMABLE: "Consumable",
  EQUIPABLE: "Equipable",
  REAGENT: "Reagent",
});

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
   * @param {string} name - The name of the item.
   * @param {string} category - The category of the item (as defined in ItemCategories).
   * @param {number} carryWeight - The weight of the item.
   * @param {number} value - The value of the item in copper.
   * @param {number} maxQuantity - The maximum quantity of the item that can be stacked in a single slot.
   */
  constructor(name = "Item", category = "general", carryWeight = 0, value = 0, maxQuantity = 1) {
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
    if (quantity < 1) {
      this.#quantity = 1;
    } else if (quantity > this.#maxQuantity) {
      this.#quantity = this.#maxQuantity;
    } else {
      this.#quantity = quantity;
    }
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

  toString() {
    const quantityValueCurrency = this.getQuantityValueCurrencyArray().join(".");
    return `${cc.set("fg_dark_green", this.#name)} (${this.#quantity}) (${
      this.#category
    }), Value: ${cc.set("fg_dark_yellow", quantityValueCurrency)}`;
  }
}

module.exports = {
  Item,
  ItemCategory,
};
