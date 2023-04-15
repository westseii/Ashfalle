const EquipSlot = require("../EquipSlot");

const { NECK, FINGER } = EquipSlot;

function _generateJewelry(subtype, rArtistry, rLevel) {
  return `new Jewelry: ${subtype}, Lv: ${rLevel}, Art: ${rArtistry}`;
}

module.exports = _generateJewelry;
