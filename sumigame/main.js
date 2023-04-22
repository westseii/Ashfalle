const cc = require("node-console-colors");
const setDefaultGameSettings = require("./setDefaultGameSettings");
const { Item, ItemCategory } = require("./mechanics/items/Item");
const Equipable = require("./mechanics/items/Equipable");

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

        const item = new Item("Item", ItemCategory.GENERAL, 0, 999, 10);
        item.quantity = 100;

        const equipable = new Equipable("Equipable Item", ItemCategory.EQUIPABLE, 0, 499, 5);
        equipable.quantity = 100;

        console.log(item.toString(false));
        console.log(equipable.toString(false));

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
