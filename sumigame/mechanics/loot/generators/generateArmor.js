const EquipSlot = require("../EquipSlot");

const { HEAD, CHEST, HANDS, LEGS, FEET } = EquipSlot;

function _generateArmor(subtype, level, artistry) {
  return `successful ${subtype}`;
}

module.exports = _generateArmor;
