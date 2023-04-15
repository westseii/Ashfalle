const EquipSlot = require("../EquipSlot");

const { ONE_HAND, TWO_HAND } = EquipSlot;

function _generateWeapon(subtype, rArtistry, rLevel) {
  return `new Weapon: ${subtype}, Lv: ${rLevel}, Art: ${rArtistry}`;
}

module.exports = _generateWeapon;
