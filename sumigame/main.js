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

    // imports that rely on game_settings.json
    // ...

    await new Promise((resolve, reject) => {
      if (!name) reject(new Error("Error: gameSettings.game.name not set"));
      else {
        // entry point

        resolve();
      }
    });

    // handle clean up and exit
    onExit(name);
  } catch (error) {
    console.error(cc.set("fg_red", error.stack));
    onExit("main");
  }
})();

/**
 * Handles clean up and exit.
 * @function onExit
 * @param {string} name - The name of the app.
 */
function onExit(name) {
  // cleanup

  console.log(cc.set("fg_dark_cyan", `\n${name} exited\n`));
}
