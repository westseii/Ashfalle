const fs = require("fs");
const path = require("path");

const settingsPath = path.join(".", "sumigame", "settings");
const fileName = "game_settings.json";

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

function setDefaultGameSettings() {
  try {
    if (!fs.existsSync(path.join(settingsPath, fileName))) {
      // does not exist, create the subdirectory and/or write default content
      fs.mkdirSync(settingsPath, { recursive: true });
      fs.writeFileSync(path.join(settingsPath, fileName), JSON.stringify(defaultGameSettings));

      console.log(`${fileName} created with defaults`);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = setDefaultGameSettings;
