const cc = require("node-console-colors");
const gameSettings = require("./settings/game_settings.json");
const { equipment, randomEquipment } = require("./mechanics/loot/artistry");
const { Item, ItemCategory } = require("./mechanics/items/Item");
const Creature = require("./mechanics/creature/Creature");
const effBasic = require("./mechanics/game_effects/effBasic");

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

      //
      // item gen test
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
      // items.forEach((item) => console.log(cc.set("fg_dark_green", item.toString())));

      //
      // creature test
      const creature = new Creature("Test Creature");

      creature.updateStat("strength", 33);
      creature.addEffect(effBasic.anger);
      creature.addEffect(effBasic.rage);

      // call printStats and printStatTotals every 1 second for n seconds
      const n = 20; // number of seconds
      let counter = 0;
      const intervalId = setInterval(() => {
        creature.printStatTotals();
        counter++;
        if (counter >= n) {
          clearInterval(intervalId);

          resolve();
        }
      }, 1000);

      // resolve();
    }
  });
}

function onExit(name) {
  // ...

  console.log(`\n${name} exited\n`);
}
