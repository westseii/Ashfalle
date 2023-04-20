const { Item, ItemCategory } = require("../../items/Item");
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
  let type;

  if (subtype === "shield") type = ONE_HANDED;
  else type = getRandomElement(possible);

  return new Item(
    `${type} ${subtype}`,
    ItemCategory.EQUIPABLE,
    1,
    getRandomIntInclusive(9999, 33333),
    1
  );
}

module.exports = genArmor;
