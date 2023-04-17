const gameSettings = require("./settings/game_settings.json");
const { equipment, randomEquipment } = require("./mechanics/loot/artistry");
const { Item } = require("./mechanics/items/Item");

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
      const item = new Item("Item");
      item.value = 80;
      item.maxQuantity = 10;
      item.quantity = 5;

      console.log(item.getUnitValueCurrencyArray());
      console.log(item.getQuantityValueCurrencyArray());
      console.log(item.toString());

      resolve();
    }
  });
}

function onExit(name) {
  // ...

  console.log(`\n${name} exited\n`);
}
