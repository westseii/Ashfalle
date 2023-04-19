const cc = require("node-console-colors");
const gameSettings = require("./settings/game_settings.json");
const Creature2 = require("./mechanics/creature/Creature2");

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

      const creature2 = new Creature2("Test Creature2");
      creature2.printBaseStats();

      resolve();
    }
  });
}

function onExit(name) {
  // ...

  console.log(`\n${name} exited\n`);
}
