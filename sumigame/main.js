const cc = require("node-console-colors");
const setDefaultGameSettings = require("./setDefaultGameSettings");

setDefaultGameSettings();
const gameSettings = require("./settings/game_settings.json");

const { equipment, randomEquipment } = require("./mechanics/loot/artistry");

(async function (name = gameSettings.game.name) {
  try {
    await main(name);

    onExit(name);
  } catch (error) {
    console.error(cc.set("fg_red", error));

    onExit("main");
  }
})();

async function main(name) {
  await new Promise((resolve, reject) => {
    if (!name) reject("Error: gameSettings.game.name not set");
    else {
      // ...

      const equipables = [];
      const numItemsToGenerate = 5;
      for (let i = 0; i < numItemsToGenerate; i++) {
        const item = randomEquipment({
          itemType: null,
        });
        equipables.push(item);
      }
      equipables.forEach((item) => console.log(item.toString()));

      resolve();
    }
  });
}

function onExit(name) {
  // ...

  console.log(`\n${name} exited\n`);
}
