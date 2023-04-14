/**
 * Represents an item that can be found in a loot table.
 */
class Loot {
  constructor(name, slot, level, value) {
    this.name = name;
    this.slot = slot;
    this.level = level;
    this.value = value;
  }
}

module.exports = Loot;
