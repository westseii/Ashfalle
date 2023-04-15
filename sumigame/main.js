const gameSettings = require("./settings/game_settings.json");
const { equipment, randomEquipment } = require("./mechanics/loot/artistry");

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
          min: 3,
          max: 8,
        },
        randomEquipmentItemType: "armor",
      };

      const item = equipment.armor.shield(lootOptions);
      console.log(item);

      resolve(name);
    }
  });
}

function onExit(name) {
  // ...

  console.log(`\n${name} exited\n`);
}
