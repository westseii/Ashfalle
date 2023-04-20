const { Item, ItemCategory } = require("../../items/Item");
const getRandomIntInclusive = require("../../../utils/getRandomIntInclusive");

const { ONE_HANDED, TWO_HANDED } = require("../EquipSlot");

function genWeapon(subtype, artistry, level) {
  let type;

  if (subtype === "axe" || subtype === "caster" || subtype === "mace" || subtype === "sword")
    type = ONE_HANDED;
  else if (
    subtype === "axe2H" ||
    subtype === "caster2H" ||
    subtype === "mace2H" ||
    subtype === "missile" ||
    subtype === "sword2H"
  )
    type = TWO_HANDED;

  return new Item(
    `${type} ${subtype}`,
    ItemCategory.EQUIPABLE,
    1,
    getRandomIntInclusive(9999, 33333),
    1
  );
}

module.exports = genWeapon;
