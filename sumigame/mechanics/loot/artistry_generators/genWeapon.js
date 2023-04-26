const { ItemCategory } = require("../../items/Item");
const { Equipable, EquipSlot } = require("../../items/Equipable");
const getRandomIntInclusive = require("../../../utils/getRandomIntInclusive");

const { ONE_HANDED, TWO_HANDED } = EquipSlot;

function genWeapon(subtype, artistry, level) {
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

const subtypes1H = ["axe", "caster", "mace", "sword"];
const subtypes2H = ["axe2H", "caster2H", "mace2H", "missile", "sword2H"];

function _getEquipSlot(subtype) {
  let slot;

  if (subtypes1H.includes(subtype)) slot = ONE_HANDED;
  else if (subtypes2H.includes(subtype)) slot = TWO_HANDED;

  return slot;
}

module.exports = genWeapon;
