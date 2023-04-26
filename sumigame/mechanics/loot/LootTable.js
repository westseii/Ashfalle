const { randomEquipment } = require("./artistry");

/**
 * Represents a loot table containing loot pools and their corresponding weights.
 */
class LootTable {
  /**
   * Initializes a new instance of the LootTable class.
   * @param {number} [nothingChance] - The probability of nothing dropping, expressed as a number between 0 and 1.
   */
  constructor(nothingChance = 0.7) {
    /**
     * An array containing the available LootPools for this loot table.
     * @type {Array<LootPool>}
     */
    this.lootPools = [];
    /**
     * An array containing the chances of dropping the corresponding loot pool.
     * @type {Array<number>}
     */
    this.chances = [];
    /**
     * The probability of nothing dropping, expressed as a number between 0 and 1.
     * @type {number}
     */
    this.nothingChance = nothingChance;
  }

  /**
   * Adds loot pools to the loot table with a specified chance of dropping.
   * @param {...Object} lootPools - The loot pool or pools to add.
   */
  addLootPool(...lootPools) {
    lootPools.forEach((lootPool) => {
      this.lootPools.push(lootPool);
      this.chances.push(lootPool.weight);
    });
  }

  /**
   * Rolls the loot table to determine which item, if any, will be dropped (do not invoke this function directly).
   * @returns {LootPool|null} - The item that was dropped, or null if no item was dropped.
   */
  _roll() {
    // Generate a random number between 0 and 1
    let roll = Math.random();

    // Check if nothing was dropped
    if (roll < this.nothingChance) {
      return null;
    }

    // Calculate the total drop chance for all items in the loot table
    let totalChance = 0;
    let cumulativeChances = [];
    for (let i = 0; i < this.chances.length; i++) {
      totalChance += this.chances[i];
      cumulativeChances.push(totalChance);
    }

    // Generate a random number between 0 and the total drop chance
    roll = Math.random() * totalChance;

    // Find the first item whose cumulative drop chance is greater than or equal to the random number
    for (let i = 0; i < cumulativeChances.length; i++) {
      if (roll <= cumulativeChances[i]) {
        return this.lootPools[i];
      }
    }

    // If no item was found, return null
    return null;
  }

  /**
   * Rolls the loot table multiple times to determine which items, if any, will be dropped.
   * @param {number} [numberOfRolls] - The number of times to roll the loot table.
   * @returns {Array<Item>} - An array of the items that were dropped.
   */
  rollMultiple(numberOfRolls = 3) {
    let droppedItems = [];
    for (let i = 0; i < numberOfRolls; i++) {
      let lootPool = this._roll();
      if (lootPool) {
        droppedItems.push(lootPool.getItem());
      }
    }
    return droppedItems;
  }
}

/**
 * Represents a pool of items that can be dropped from a loot table.
 * If you need randomly generated artistry items, use the ArtistryPool class instead.
 */
class LootPool {
  /**
   * Creates a new instance of the LootPool class.
   * @param {string} name - The name of the loot pool.
   * @param {Array<Item>} pool - The items in the loot pool.
   * @param {number} [weight] - The weight of the loot pool, used to calculate the probability of the pool being chosen.
   */
  constructor(name, pool, weight = 1) {
    this.name = name;
    this.pool = pool;
    this.weight = weight;
  }

  /**
   * Gets a random item from the loot pool.
   * @returns {Loot} - A random item from the loot pool.
   */
  getItem() {
    return this.pool[Math.floor(Math.random() * this.pool.length)];
  }
}

/**
 * Represents randomly generated artistry items that can be dropped from a loot table.
 * If you need a pool of pre-determined items, use the LootPool class instead.
 */
class ArtistryPool {
  /**
   * Creates a new instance of the ArtistryPool class.
   * @param {string} name - The name of the artistry pool.
   * @param {Object} [lootOptions] - An optional object containing loot generation options.
   * @param {string} [lootOptions.itemType] - The type of item to generate (armor, jewelry, or weapon).
   * @param {Object} [lootOptions.artistryRange] - An object containing the minimum and maximum artistry for the item.
   * @param {number} [lootOptions.artistryRange.min] - The minimum artistry for the item.
   * @param {number} [lootOptions.artistryRange.max] - The maximum artistry for the item.
   * @param {Object} [lootOptions.levelRange] - An object containing the minimum and maximum level for the item.
   * @param {number} [lootOptions.levelRange.min] - The minimum level for the item.
   * @param {number} [lootOptions.levelRange.max] - The maximum level for the item.
   * @param {number} [weight] - The weight of the artistry pool, used to calculate the probability of the pool being chosen.
   */
  constructor(name, lootOptions = {}, weight = 1) {
    this.name = name;
    this.lootOptions = lootOptions;
    this.weight = weight;
  }

  /**
   * Gets a randomly generated artistry item.
   * @returns {Loot} - A randomly generated artistry item.
   */
  getItem() {
    return randomEquipment(this.lootOptions);
  }
}

module.exports = {
  LootTable,
  LootPool,
  ArtistryPool,
};
