const cc = require("node-console-colors");
const setDefaultGameSettings = require("./setDefaultGameSettings");

(async function main() {
  try {
    // set default game settings if the file does not exist
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

    // handle cleanup on exit
    onExit(name);
  } catch (error) {
    console.error(cc.set("fg_red", error.stack));
    onExit("main");
  }
})();

/**
 * Handles clean up on exit.
 * @param {string} name The name of the app.
 */
function onExit(name) {
  // cleanup

  console.log(cc.set("fg_dark_cyan", `\n${name} exited\n`));
}
