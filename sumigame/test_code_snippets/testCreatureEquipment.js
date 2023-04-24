const cc = require("node-console-colors");
const CreatureEquipment = require("../mechanics/creature/CreatureEquipment");
const Equipable = require("../mechanics/items/Equipable");
const { ItemCategory } = require("../mechanics/items/Item");
const EquipSlot = require("../mechanics/loot/EquipSlot");

function testCreatureEquipment() {
  const equipment = new CreatureEquipment();
  const item = new Equipable("item", ItemCategory.EQUIPABLE, 0, 150, 1, 3, 1);
  item.equipSlot = EquipSlot.ONE_HANDED;
  const item2 = new Equipable("item 2", ItemCategory.EQUIPABLE, 0, 450, 1, 3, 1);
  item2.equipSlot = EquipSlot.ONE_HANDED;

  console.log(cc.set("fg_purple", "empty equipment"));
  console.log(equipment.equipped);

  console.log(cc.set("fg_purple", "\nequip item"));
  let replaced = equipment.equipItem(item);
  for (let [key, value] of equipment.equipped.entries()) {
    console.log(key, value.toString());
  }
  console.log(replaced);

  console.log(cc.set("fg_purple", "\nequip another item"));
  replaced = equipment.equipItem(item2);
  for (let [key, value] of equipment.equipped.entries()) {
    console.log(key, value.toString());
  }
  console.log(replaced);

  console.log(cc.set("fg_purple", "\nunequip item by slot"));
  let unequipped = equipment.unequipItemBySlot(EquipSlot.ONE_HANDED);
  for (let [key, value] of equipment.equipped.entries()) {
    console.log(key, value.toString());
  }
  console.log(unequipped.toString());
}

module.exports = testCreatureEquipment;
