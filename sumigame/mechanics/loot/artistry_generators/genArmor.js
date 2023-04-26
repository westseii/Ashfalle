const { ItemCategory } = require("../../items/Item");
const { Equipable, EquipSlot } = require("../../items/Equipable");
const getRandomIntInclusive = require("../../../utils/getRandomIntInclusive");
const getRandomElement = require("../../../utils/getRandomElement");

const { HEAD, CHEST, HANDS, LEGS, FEET, ONE_HANDED } = EquipSlot;
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
    `Equipable ${slot} ${subtype}`, // TODO: name generator
    ItemCategory.EQUIPABLE,
    1,
    getRandomIntInclusive(999, 3333) * artistry * level, // TODO: value calculation
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
