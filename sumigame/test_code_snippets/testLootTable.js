const { Item } = require("../mechanics/items/Item");
const { LootPool, ArtistryPool, LootTable } = require("../mechanics/loot/LootTable");

function testLootTable() {
  // create a new LootTable instance
  const lootTable = new LootTable(0.85);

  // define some common items
  const commonItems = [new Item("Common Axe"), new Item("Common Mace"), new Item("Common Sword")];

  // define some uncommon items
  const uncommonItems = [new Item("Uncommon Bow"), new Item("Uncommon Staff")];

  // define a rare item
  const rareItems = [new Item("Rare Trinket")];

  // define some options for generating random items
  const artistryLootOptions = {
    artistryRange: { min: 2, max: 4 },
    levelRange: { min: 10, max: 15 },
  };

  // create a new LootPool for the common items, with a weight of 100
  const lootPoolCommon = new LootPool("Common loot", commonItems, 100);

  // create a new LootPool for the uncommon items, with a weight of 20
  const lootPoolUncommon = new LootPool("Uncommon loot", uncommonItems, 20);

  // create a new LootPool for the rare item, with a weight of 4
  const lootPoolRare = new LootPool("Rare loot", rareItems, 4);

  // create a new ArtistryPool for generating random items, with a weight of 1000
  const lootPoolArtistry = new ArtistryPool("Randomly generated loot", artistryLootOptions, 1000);

  // add the loot pools to the loot table
  lootTable.addLootPool(lootPoolCommon);
  lootTable.addLootPool(lootPoolUncommon);
  lootTable.addLootPool(lootPoolRare);
  lootTable.addLootPool(lootPoolArtistry);

  // generate n items from the loot table (n rolls)
  const loot = lootTable.rollMultiple(100);

  // print out each item to the console
  loot.forEach((item) => console.log(item.toString()));
}

module.exports = testLootTable;
