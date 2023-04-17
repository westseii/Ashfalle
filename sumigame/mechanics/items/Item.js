// TODO: documentation and tests

const ItemCategories = Object.freeze({
  ARMOR: "armor",
  CONSUMABLE: "consumable",
  GENERAL: "general",
  WEAPON: "weapon",
});

class Item {
  #name;
  #category;
  #carryWeight;
  #value;
  #maxQuantity;
  #quantity;

  constructor(name, category = "general", carryWeight = 0, value = 0, maxQuantity = 1) {
    // validate arguments
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
    if (Object.values(ItemCategories).includes(category)) {
      this.#category = category;
    } else {
      throw new Error(`Invalid category: ${category}`);
    }
  }

  get carryWeight() {
    return this.#carryWeight;
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

  getUnitValue() {
    return this.#value;
  }

  getQuantityValue() {
    return this.#value * this.#quantity;
  }

  getUnitValueCurrencyArray() {
    return this.#getValueCurrencyArray(this.getUnitValue());
  }

  getQuantityValueCurrencyArray() {
    return this.#getValueCurrencyArray(this.getQuantityValue());
  }

  toString() {
    const quantityValueCurrency = this.getQuantityValueCurrencyArray().join(".");
    return `${this.#name} (${this.#quantity}) (${
      this.#category
    }), QuantityValue: ${quantityValueCurrency}`;
  }
}

module.exports = {
  Item,
  Category: ItemCategories,
};
