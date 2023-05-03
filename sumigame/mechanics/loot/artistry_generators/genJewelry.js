const { ItemCategory } = require("../../items/Item");
const { Equipable, EquipSlot } = require("../../items/Equipable");
const getRandomIntInclusive = require("../../../utils/getRandomIntInclusive");

const { NECK, FINGER } = EquipSlot;

function genJewelry(subtype, artistry, level) {
  const slot = _getEquipSlot(subtype);

  const eq = new Equipable(`Equipable ${slot} ${subtype}`);
  eq.value = getRandomIntInclusive(999, 3333) * artistry * level; // TODO: value calculation
  eq.artistry = artistry;
  eq.level = level;

  return eq;
}

function _getEquipSlot(subtype) {
  let slot;

  if (subtype === "necklace") slot = NECK;
  else if (subtype === "ring") slot = FINGER;

  return slot;
}

module.exports = genJewelry;
