const { ItemCategory } = require("../../items/Item");
const Equipable = require("../../items/Equipable");
const getRandomIntInclusive = require("../../../utils/getRandomIntInclusive");

const { NECK, FINGER } = require("../EquipSlot");

function genJewelry(subtype, artistry, level) {
  const slot = _getEquipSlot(subtype);

  return new Equipable(
    `${slot} ${subtype}`,
    ItemCategory.EQUIPABLE,
    1,
    getRandomIntInclusive(9999, 33333),
    1,
    artistry,
    level
  );
}

function _getEquipSlot(subtype) {
  let slot;

  if (subtype === "necklace") slot = NECK;
  else if (subtype === "ring") slot = FINGER;

  return slot;
}

module.exports = genJewelry;
