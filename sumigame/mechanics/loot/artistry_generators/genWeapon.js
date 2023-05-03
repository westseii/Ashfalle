const { ItemCategory } = require("../../items/Item");
const { Equipable, EquipSlot } = require("../../items/Equipable");
const getRandomIntInclusive = require("../../../utils/getRandomIntInclusive");

const { ONE_HANDED, TWO_HANDED } = EquipSlot;

function genWeapon(subtype, artistry, level) {
  const slot = _getEquipSlot(subtype);

  const eq = new Equipable(`Equipable ${slot} ${subtype}`);
  eq.value = getRandomIntInclusive(999, 3333) * artistry * level; // TODO: value calculation
  eq.artistry = artistry;
  eq.level = level;

  return eq;
}

const subtypes1H = ["axe", "caster", "mace", "sword"];
const subtypes2H = ["axe2H", "caster2H", "mace2H", "missile", "sword2H"];

function _getEquipSlot(subtype) {
  let slot;

  if (subtypes1H.includes(subtype)) slot = ONE_HANDED;
  else if (subtypes2H.includes(subtype)) slot = TWO_HANDED;

  return slot;
}

module.exports = genWeapon;
