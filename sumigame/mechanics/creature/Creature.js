const cc = require("node-console-colors");
const creatureStats = require("../creature/creatureStats");
const creatureEquipped = require("../creature/creatureEquipped");

class Creature {
  #name;
  #baseStats;
  #equippedItems;
  #activeEffects;
  #statTotals;

  constructor(name) {
    if (!name) {
      throw new Error("Invalid name");
    }
    this.#name = name;
    this.#baseStats = JSON.parse(JSON.stringify(creatureStats));
    this.#equippedItems = JSON.parse(JSON.stringify(creatureEquipped));
    this.#activeEffects = [];
    this.#statTotals = Object.assign({}, this.#baseStats);
  }

  updateStat(statName, newValue) {
    if (!this.#baseStats || !statName || !this.#baseStats[statName]) {
      console.error(`Invalid stat name: ${statName}`);
      return;
    }
    this.#baseStats[statName] = newValue;
    this.#updateStatTotal(statName);
  }

  #updateStatTotal(statName) {
    if (!this.#baseStats || !statName || !this.#baseStats[statName]) {
      console.error(`Invalid stat name: ${statName}`);
      return;
    }
    let total = this.#baseStats[statName];
    for (const item of Object.values(this.#equippedItems || {})) {
      if (item && item.stats && item.stats[statName]) {
        total += item.stats[statName];
      }
    }
    for (const effect of this.#activeEffects || []) {
      if (effect && effect.stats && effect.stats[statName]) {
        total += effect.stats[statName];
      }
    }
    this.#statTotals[statName] = total;
  }

  equipItem(item) {
    if (!item || !item.slot) {
      console.error("Invalid item");
      return;
    }
    if (item.slot in this.#equippedItems) {
      this.unequipItem(item.slot);
    }
    this.#equippedItems[item.slot] = item;
    for (const [statName, statValue] of Object.entries(item.stats || {})) {
      this.#updateStatTotal(statName);
    }
  }

  unequipItem(slot) {
    if (!slot) {
      console.error("Invalid slot");
      return;
    }
    if (slot in this.#equippedItems) {
      const item = this.#equippedItems[slot];
      delete this.#equippedItems[slot];
      for (const [statName, statValue] of Object.entries(item.stats || {})) {
        this.#updateStatTotal(statName);
      }
    }
  }

  addEffect(effect) {
    if (!effect) {
      console.error("Invalid effect");
      return;
    }
    this.#activeEffects.push(effect);
    for (const [statName, statValue] of Object.entries(effect.stats || {})) {
      this.#updateStatTotal(statName);
    }
    if (effect.duration) {
      setTimeout(() => {
        this.removeEffect(effect);
      }, effect.duration);
    }
  }

  removeEffect(effect) {
    if (!effect) {
      console.error("Invalid effect");
      return;
    }
    const index = this.#activeEffects.indexOf(effect);
    if (index !== -1) {
      this.#activeEffects.splice(index, 1);
      for (const [statName, statValue] of Object.entries(effect.stats || {})) {
        this.#updateStatTotal(statName);
      }
    }
  }

  printStats() {
    console.log(cc.set("fg_dark_green", `${this.#name}'s stats:`));
    if (!this.#baseStats) {
      console.error("No stats available");
      return;
    }
    Object.entries(this.#baseStats).forEach(([statName, statValue]) => {
      console.log(`${cc.set("fg_cyan", statName)}: ${statValue}`);
    });
  }

  printStatTotals() {
    console.log(cc.set("fg_dark_green", `${this.#name}'s stat totals:`));
    if (!this.#statTotals) {
      console.error("No stat totals available");
      return;
    }
    Object.entries(this.#statTotals).forEach(([statName, statValue]) => {
      console.log(`${cc.set("fg_cyan", statName)}: ${statValue}`);
    });
  }
}

module.exports = Creature;
