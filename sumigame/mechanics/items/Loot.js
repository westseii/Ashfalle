const { Item, ItemCategories } = require("./Item");

// TODO: documentation and tests
// TODO: redundant class

class Loot extends Item {
  constructor(name = "Item", category = "general", carryWeight = 0, value = 0, maxQuantity = 1) {
    super(name, category, carryWeight, value, maxQuantity);
  }
}

module.exports = Loot;
