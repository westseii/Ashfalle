const EquipSlot = require("../EquipSlot");
const { Item, ItemCategory } = require("../../items/Item");
const getRandomIntInclusive = require("../../../utils/getRandomIntInclusive");
const getRandomElement = require("../../../utils/getRandomElement");

const { HEAD, CHEST, HANDS, LEGS, FEET, ONE_HANDED } = EquipSlot;
const slots = Object.values({
  HEAD,
  CHEST,
  HANDS,
  LEGS,
  FEET,
});

function genArmor(subtype, rArtistry, rLevel) {
  let created;

  if (subtype === "shield") created = ONE_HANDED;
  else created = getRandomElement(slots);

  return new Item(
    `${created} ${subtype}`,
    ItemCategory.EQUIPABLE,
    1,
    getRandomIntInclusive(9999, 33333),
    1
  );
}

module.exports = genArmor;
