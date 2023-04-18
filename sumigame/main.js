const gameSettings = require("./settings/game_settings.json");
const { equipment, randomEquipment } = require("./mechanics/loot/artistry");
const { Item, ItemCategory } = require("./mechanics/items/Item");

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

      const lootOptions = {
        artistry: {
          min: 1,
          max: 3,
        },
        levelGenerateRange: {
          min: 43,
          max: 53,
        },
        // randomEquipmentItemType: "armor",
      };

      const numItems = 50;
      const items = [];

      for (let item = 0; item < numItems; item++) {
        items.push(randomEquipment(lootOptions));
      }
      items.forEach((item) => console.log(item.toString()));

      resolve();
    }
  });
}

function onExit(name) {
  // ...

  console.log(`\n${name} exited\n`);
}
