const cc = require("node-console-colors");
const setDefaultGameSettings = require("./setDefaultGameSettings");
const { Item, ItemCategory } = require("./mechanics/items/Item");
const Equipable = require("./mechanics/items/Equipable");
const { LootTable, LootPool, LootPoolArtistry } = require("./mechanics/loot/LootTable");

/**
 * The main function that runs the game.
 * @async
 * @function main
 * @throws {Error} if gameSettings.game.name is not set
 */
(async function main() {
  try {
    // set default game settings if file does not exist
    setDefaultGameSettings();
    const gameSettings = require("./settings/game_settings.json");
    const name = gameSettings.game.name;

    //
    // imports that need game_settings.json to exist
    // const { equipment, randomEquipment } = require("./mechanics/loot/artistry");

    await new Promise((resolve, reject) => {
      if (!name) reject(new Error("Error: gameSettings.game.name not set"));
      else {
        // ...

        const lootTable = new LootTable();

        const commonItems = [
          new Equipable("Common Axe"),
          new Equipable("Common Mace"),
          new Equipable("Common Sword"),
        ];
        const uncommonItems = [new Equipable("Uncommon Bow"), new Equipable("Uncommon Staff")];
        const rareItems = [new Equipable("Rare Trinket")];

        const lootPoolCommon = new LootPool("Common loot", commonItems, 100);
        const lootPoolUncommon = new LootPool("Uncommon loot", uncommonItems, 20);
        const lootPoolRare = new LootPool("Rare loot", rareItems, 4);
        const lootPoolArtistry = new LootPoolArtistry("Rare loot", {}, 1000);
        lootTable.addLootPool(lootPoolCommon);
        lootTable.addLootPool(lootPoolUncommon);
        lootTable.addLootPool(lootPoolRare);
        lootTable.addLootPool(lootPoolArtistry);

        const loot = lootTable.rollMultiple(7);

        loot.forEach((item) => console.log(item.toString()));

        resolve();
      }
    });

    // handle clean up and exit
    onExit(name);
  } catch (error) {
    console.error(cc.set("fg_red", error));
    onExit("main");
  }
})();

/**
 * Handles clean up and exit.
 * @function onExit
 * @param {string} name - The name of the app.
 */
function onExit(name) {
  // ...

  console.log(cc.set("fg_dark_cyan", `\n${name} exited\n`));
}
