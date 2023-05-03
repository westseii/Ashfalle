"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const cc = require("node-console-colors");
/**
 * The directory path where the game settings file should be located.
 * @type {string}
 */
const settingsPath = path.join(".", "sumigame", "settings");
/**
 * The filename of the game settings file.
 * @type {string}
 */
const fileName = "game_settings.json";
/**
 * The default game settings object, used to write to the game settings file
 * if it does not exist.
 * @type {object}
 */
const defaultGameSettings = {
    game: {
        name: "Unnamed Game",
        maxPlayerLevel: 50,
    },
    lootDefaults: {
        artistryRange: {
            min: 2,
            max: 4,
        },
        levelRange: {
            min: 1,
            max: null,
        },
        itemType: "armor",
    },
};
/**
 * Checks if the game settings file exists, and if not, creates it and
 * writes the default game settings to it.
 */
function setDefaultGameSettings() {
    try {
        if (!fs.existsSync(path.join(settingsPath, fileName))) {
            // does not exist, create the subdirectory and file
            fs.mkdirSync(settingsPath, { recursive: true });
            fs.writeFileSync(path.join(settingsPath, fileName), JSON.stringify(defaultGameSettings));
            console.log(cc.set("fg_dark_cyan", `${fileName} created with defaults\n`));
        }
    }
    catch (err) {
        console.error(err);
    }
}
module.exports = setDefaultGameSettings;
