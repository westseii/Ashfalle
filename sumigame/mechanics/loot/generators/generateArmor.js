const EquipSlot = require("../EquipSlot");

const { HEAD, CHEST, HANDS, LEGS, FEET, ONE_HAND } = EquipSlot;

function _generateArmor(subtype, rArtistry, rLevel) {
  return `new Armor: ${subtype}, Lv: ${rLevel}, Art: ${rArtistry}`;
}

module.exports = _generateArmor;
