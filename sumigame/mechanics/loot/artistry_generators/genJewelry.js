const EquipSlot = require("../EquipSlot");
const { Item, ItemCategory } = require("../../items/Item");
const getRandomIntInclusive = require("../../../utils/getRandomIntInclusive");

const { NECK, FINGER } = EquipSlot;

function genJewelry(subtype, rArtistry, rLevel) {
  let created;

  if (subtype === "necklace") created = NECK;
  else if (subtype === "ring") created = FINGER;

  return new Item(
    `${created} ${subtype}`,
    ItemCategory.EQUIPABLE,
    1,
    getRandomIntInclusive(9999, 33333),
    1
  );
}

module.exports = genJewelry;
