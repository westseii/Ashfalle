const { Item, ItemCategory } = require("../../items/Item");
const getRandomIntInclusive = require("../../../utils/getRandomIntInclusive");

const { NECK, FINGER } = require("../EquipSlot");

function genJewelry(subtype, artistry, level) {
  let type;

  if (subtype === "necklace") type = NECK;
  else if (subtype === "ring") type = FINGER;

  return new Item(
    `${type} ${subtype}`,
    ItemCategory.EQUIPABLE,
    1,
    getRandomIntInclusive(9999, 33333),
    1
  );
}

module.exports = genJewelry;
