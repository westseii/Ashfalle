const { Item } = require("../mechanics/items/Item");
const { LootPool, ArtistryPool, LootTable } = require("../mechanics/loot/LootTable");

function testLootTable() {
  // Create a new LootTable instance
  const lootTable = new LootTable(0.85);

  // Define some common items
  const commonItems = [new Item("Common Axe"), new Item("Common Mace"), new Item("Common Sword")];

  // Define some uncommon items
  const uncommonItems = [new Item("Uncommon Bow"), new Item("Uncommon Staff")];

  // Define a rare item
  const rareItems = [new Item("Rare Trinket")];

  // Define some options for generating random items
  const artistryLootOptions = {
    artistryRange: { min: 2, max: 4 },
    levelRange: { min: 10, max: 15 },
  };

  // Create a new LootPool for the common items, with a weight of 100
  const lootPoolCommon = new LootPool("Common loot", commonItems, 100);

  // Create a new LootPool for the uncommon items, with a weight of 20
  const lootPoolUncommon = new LootPool("Uncommon loot", uncommonItems, 20);

  // Create a new LootPool for the rare item, with a weight of 4
  const lootPoolRare = new LootPool("Rare loot", rareItems, 4);

  // Create a new ArtistryPool for generating random items, with a weight of 1000
  const lootPoolArtistry = new ArtistryPool("Randomly generated loot", artistryLootOptions, 1000);

  // Add the loot pools to the loot table
  lootTable.addLootPool(lootPoolCommon);
  lootTable.addLootPool(lootPoolUncommon);
  lootTable.addLootPool(lootPoolRare);
  lootTable.addLootPool(lootPoolArtistry);

  // Generate n items from the loot table (n rolls)
  const loot = lootTable.rollMultiple(100);

  // Print out each item to the console
  loot.forEach((item) => console.log(item.toString()));
}

module.exports = testLootTable;
