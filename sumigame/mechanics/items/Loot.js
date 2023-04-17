const { Item } = require("./Item");

// TODO: documentation and tests

class Loot {
  constructor(name, category, carryWeight = 0, value = 0, maxStackable = 1) {
    super(name, category, carryWeight, value, maxStackable);
  }
}

module.exports = Loot;
