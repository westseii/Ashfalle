const EquipSlot = require("../EquipSlot");

const { ONE_HAND, TWO_HAND } = EquipSlot;

function _generateWeapon(subtype, level, artistry) {
  return `successful ${subtype}`;
}

module.exports = _generateWeapon;
