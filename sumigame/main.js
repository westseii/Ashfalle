"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cc = require("node-console-colors");
const setDefaultGameSettings = require("./setDefaultGameSettings");
const getErrorMessage_1 = require("./utils/getErrorMessage");
(async function main() {
    try {
        // set default game settings if the file does not exist
        setDefaultGameSettings();
        const gameSettings = require("./settings/game_settings.json");
        const name = gameSettings.game.name;
        // imports that rely on game_settings.json
        // ...
        await new Promise((resolve, reject) => {
            if (!name)
                reject(new Error("Error: gameSettings.game.name not set"));
            else {
                // entry point
                const testLootTable = require("./test_code_snippets/testLootTable");
                testLootTable(0.85, 15);
                resolve();
            }
        });
        // handle cleanup on exit
        onExit(name);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(cc.set("fg_red", (0, getErrorMessage_1.getErrorMessage)(error.stack)));
        }
        else {
            console.error(cc.set("fg_red", (0, getErrorMessage_1.getErrorMessage)("Unknown Error")));
        }
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
