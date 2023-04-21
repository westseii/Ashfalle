const cc = require("node-console-colors");
const setDefaultGameSettings = require("./setDefaultGameSettings");

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
