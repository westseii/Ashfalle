const EquipSlot = require("../EquipSlot");

const { NECK, FINGER } = EquipSlot;

function _generateJewelry(subtype, level, artistry) {
  return `successful ${subtype}`;
}

module.exports = _generateJewelry;
