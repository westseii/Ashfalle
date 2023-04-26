const cc = require("node-console-colors");
const creatureStats = require("./CreatureStats");
const CreatureEquipment = require("./CreatureEquipment");

class Creature {
  #name;
  #baseStats;
  #equippedItems;
  #activeEffects;
  #statTotals;

  constructor(name = "Creature") {
    if (!name) {
      throw new Error("Invalid name");
    }

    this.#name = name;
    this.#baseStats = new creatureStats();
    this.#equippedItems = new CreatureEquipment();
    this.#activeEffects = [];
    this.#statTotals = Object.assign({}, this.#baseStats.base); // TODO: recalculate
  }

  get name() {
    return this.#name;
  }

  get baseStats() {
    return this.#baseStats;
  }

  get equippedItems() {
    return this.#equippedItems.equipped;
  }

  get activeEffects() {
    return this.#activeEffects;
  }

  get statTotals() {
    return this.#statTotals;
  }

  equipItem(item) {
    if (!item) return; // TODO:
    else {
      const replacedItem = this.#equippedItems.equipItem(item);

      // return the replaced item
      return replacedItem;
    }
  }

  unequipItem(slot) {
    if (!slot) return; // TODO:
    else {
      const unequippedItem = this.#equippedItems.unequipItemBySlot(slot);

      // return the unequipped item
      return unequippedItem;
    }
  }

  addEffect(effect) {
    if (!effect) return;
    else {
      return;
    }
  }

  removeEffect(effect) {
    if (!effect) return;
    else {
      return;
    }
  }

  printBaseStats() {
    console.log(cc.set("fg_dark_green", `${this.#name}'s base stats:`));

    Object.entries(this.#baseStats).forEach(([statName, statValue]) => {
      console.log(`${cc.set("fg_cyan", statName)}: ${statValue}`);
    });
  }

  printTotalStats() {
    console.log(cc.set("fg_dark_green", `${this.#name}'s stat totals:`));

    Object.entries(this.#statTotals).forEach(([statName, statValue]) => {
      console.log(`${cc.set("fg_cyan", statName)}: ${statValue}`);
    });
  }

  // other
  updateStat(statName, newValue) {}

  #updateStatTotal(statName) {}
}

module.exports = Creature;
