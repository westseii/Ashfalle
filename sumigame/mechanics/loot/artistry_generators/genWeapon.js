const EquipSlot = require("../EquipSlot");
const { Item, ItemCategory } = require("../../items/Item");
const getRandomIntInclusive = require("../../../utils/getRandomIntInclusive");

const { ONE_HANDED, TWO_HANDED } = EquipSlot;

function genWeapon(subtype, rArtistry, rLevel) {
  let created;

  if (subtype === "axe" || subtype === "caster" || subtype === "mace" || subtype === "sword")
    created = ONE_HANDED;
  else if (
    subtype === "axe2H" ||
    subtype === "caster2H" ||
    subtype === "mace2H" ||
    subtype === "missile" ||
    subtype === "sword2H"
  )
    created = TWO_HANDED;

  return new Item(
    `${created} ${subtype}`,
    ItemCategory.EQUIPABLE,
    1,
    getRandomIntInclusive(9999, 33333),
    1
  );
}

module.exports = genWeapon;
