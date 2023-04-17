const gameSettings = require("./settings/game_settings.json");
const { equipment, randomEquipment } = require("./mechanics/loot/artistry");
const { Item, ItemCategories } = require("./mechanics/items/Item");

(async function (name = gameSettings.game.name) {
  try {
    await main(name);

    onExit(name);
  } catch (error) {
    console.error(error);

    onExit("main");
  }
})();

async function main(name) {
  await new Promise((resolve, reject) => {
    if (!name) reject("Error: gameSettings.game.name not set");
    else {
      // ...
      const item = new Item("Item", ItemCategories.GENERAL, 1, 20, 20);

      resolve();
    }
  });
}

function onExit(name) {
  // ...

  console.log(`\n${name} exited\n`);
}
