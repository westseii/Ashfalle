const gameSettings = require("./settings/game_settings.json");
const { equipment, randomEquipment } = require("./mechanics/loot/artistry");
const { LootPool, LootTable } = require("./mechanics/loot/LootTable");

(async function () {
  await main();

  onExit();
})();

async function main() {
  await new Promise((resolve, reject) => {
    const lootTable = new LootTable();

    const commonItems = ["common item"];
    const uncommonItems = ["uncommon item"];
    const rareItems = ["rare item"];

    lootTable.addLootPool(new LootPool("common pool", commonItems, 333));
    lootTable.addLootPool(new LootPool("uncommon pool", uncommonItems, 50));
    lootTable.addLootPool(new LootPool("rare pool", rareItems, 10));

    const droppedItems = lootTable.rollMultiple(3);

    console.log(droppedItems);

    resolve();
  });
}

function onExit() {
  console.log(`\n${gameSettings.game.name} exited\n`);
}
