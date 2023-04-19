const cc = require("node-console-colors");
const creatureStats = require("../creature/creatureStats");
const creatureEquipped = require("../creature/creatureEquipped");

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
    let addEffects = [];
    let multEffects = [];
    for (const item of Object.values(this.#equippedItems || {})) {
      if (item && item.stats && item.stats[statName]) {
        if (item.stats[statName].additive) {
          addEffects.push(item.stats[statName].value);
        } else if (item.stats[statName].multiplicative) {
          multEffects.push(item.stats[statName].value);
        }
      }
    }
    for (const effect of this.#activeEffects || []) {
      if (effect && effect.stats && effect.stats[statName]) {
        if (effect.stats[statName].additive) {
          addEffects.push(effect.stats[statName].value);
        } else if (effect.stats[statName].multiplicative) {
          multEffects.push(effect.stats[statName].value);
        }
      }
    }
    total += addEffects.reduce((acc, val) => acc + val, 0);
    total *= multEffects.reduce((acc, val) => acc * val, 1);
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

    // Check if the effect already exists
    const existingEffect = this.#activeEffects.find((e) => e.name === effect.name);
    if (existingEffect) {
      console.log(`Effect "${effect.name}" already exists, refreshing duration timer...`);
      clearTimeout(existingEffect.timer);
      existingEffect.duration = effect.duration;
      existingEffect.timer = setTimeout(() => {
        this.removeEffect(existingEffect);
      }, existingEffect.duration);
    } else {
      // Add the new effect
      console.log(`Applying effect "${effect.name}"...`);
      this.#activeEffects.push(effect);
      for (const [statName, statValue] of Object.entries(effect.stats || {})) {
        this.#updateStatTotal(statName);
      }
      if (effect.duration) {
        effect.timer = setTimeout(() => {
          this.removeEffect(effect);
        }, effect.duration);
      }
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
        if (effect.type === "additive") {
          this.#statTotals[statName] -= statValue;
        } else if (effect.type === "multiplicative") {
          this.#statTotals[statName] /= statValue;
        }
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
