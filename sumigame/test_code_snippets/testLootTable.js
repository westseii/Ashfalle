const Equipable = require("../mechanics/items/Equipable");
const { ArtistryPool, LootPool, LootTable } = require("../mechanics/loot/LootTable");

function testLootTable() {
  //

  //
  // create a new LootTable instance
  // this loot table has a chance of 85% to drop nothing and a chance of 15% to drop something (per roll)
  const lootTable = new LootTable(0.85);

  //
  // create some arrays of items
  // define three common items
  const commonItems = [
    new Equipable("Common Axe"),
    new Equipable("Common Mace"),
    new Equipable("Common Sword"),
  ];

  // define two uncommon items
  const uncommonItems = [new Equipable("Uncommon Bow"), new Equipable("Uncommon Staff")];

  // define one rare item
  const rareItems = [new Equipable("Rare Trinket")];

  // define some options for randomly generated artistry items
  const artistryLootOptions = {
    artistryRange: { min: 2, max: 4 },
    levelRange: { min: 10, max: 15 },
  };

  const betterArtistryLootOptions = {
    artistryRange: { min: 1, max: 3 },
    levelRange: { min: 16, max: 20 },
  };

  //
  // create loot pools, then pass in arrays of items and set the weight for each pool
  // create a new loot pool for the common items, with a weight of 100
  const commonPool = new LootPool("Common loot", commonItems, 100);

  // create a new loot pool for the uncommon items, with a weight of 20
  const uncommonPool = new LootPool("Uncommon loot", uncommonItems, 20);

  // create a new loot pool for the rare item, with a weight of 4
  const rarePool = new LootPool("Rare loot", rareItems, 4);

  // create new artistry pools for generating random items, with weights of 1000 and 20
  const artistryPool = new ArtistryPool("Randomly generated loot", artistryLootOptions, 1000);
  const betterArtistryPool = new ArtistryPool(
    "Better randomly generated loot",
    betterArtistryLootOptions,
    200
  );

  //
  // add the loot pools to the loot table
  lootTable.addLootPool(commonPool, uncommonPool, rarePool, artistryPool, betterArtistryPool);

  // randomly select a loot pool based on its weight and then randomly select an item from the chosen pool
  // here we are rolling the loot table n times (85% chance to drop nothing, 15% chance to drop something (per roll))
  const loot = lootTable.rollMultiple(100);

  // print out each item to the console
  loot.forEach((item) => console.log(item.toString()));
}

module.exports = testLootTable;
