const cc = require("node-console-colors");
const creatureStats = require("./CreatureStats");
const CreatureEquipped = require("./creatureEquipped");

class Creature2 {
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
    this.#equippedItems = new CreatureEquipped();
    this.#activeEffects = [];
    this.#statTotals = Object.assign({}, this.#baseStats);
  }

  async equipItem(item) {
    await new Promise((resolve, reject) => {
      if (!item) reject();
      else {
        resolve();
      }
    });
  }

  async unequipItem(slot) {
    await new Promise((resolve, reject) => {
      if (!slot) reject();
      else {
        resolve();
      }
    });
  }

  async addEffect(effect) {
    await new Promise((resolve, reject) => {
      if (!effect) reject();
      else {
        resolve();
      }
    });
  }

  async removeEffect(effect) {
    await new Promise((resolve, reject) => {
      if (!effect) reject();
      else {
        resolve();
      }
    });
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

module.exports = Creature2;
