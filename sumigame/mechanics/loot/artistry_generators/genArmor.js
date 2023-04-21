const { ItemCategory } = require("../../items/Item");
const Equipable = require("../../items/Equipable");
const getRandomIntInclusive = require("../../../utils/getRandomIntInclusive");
const getRandomElement = require("../../../utils/getRandomElement");

const { HEAD, CHEST, HANDS, LEGS, FEET, ONE_HANDED } = require("../EquipSlot");
const possible = Object.values({
  HEAD,
  CHEST,
  HANDS,
  LEGS,
  FEET,
});

function genArmor(subtype, artistry, level) {
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

  if (subtype === "shield") slot = ONE_HANDED;
  else slot = getRandomElement(possible);

  return slot;
}

module.exports = genArmor;
