const gameSettings = require("../../settings/game_settings.json");
const getRandomIntInclusive = require("../../utils/getRandomIntInclusive");
const getRandomElement = require("../../utils/getRandomElement");
const genArmor = require("./artistry_generators/genArmor");
const genJewelry = require("./artistry_generators/genJewelry");
const genWeapon = require("./artistry_generators/genWeapon");

const equipment = {
  armor: {
    cloth: _generate("armor", "cloth"),
    leather: _generate("armor", "leather"),
    mail: _generate("armor", "mail"),
    plate: _generate("armor", "plate"),
    shield: _generate("armor", "shield"),
  },
  jewelry: {
    necklace: _generate("jewelry", "necklace"),
    ring: _generate("jewelry", "ring"),
  },
  weapon: {
    axe: _generate("weapon", "axe"),
    axe2H: _generate("weapon", "axe2H"),
    caster: _generate("weapon", "caster"),
    caster2H: _generate("weapon", "caster2H"),
    mace: _generate("weapon", "mace"),
    mace2H: _generate("weapon", "mace2H"),
    missile: _generate("weapon", "missile"),
    sword: _generate("weapon", "sword"),
    sword2H: _generate("weapon", "sword2H"),
  },
};

/**
 * Validates and returns loot lootOptions.
 * @param {Object} lootOptions - The loot lootOptions to validate.
 * @returns {Object} An object containing the validated loot lootOptions.
 */
function _applyLootOptions(lootOptions) {
  // Override default lootOptions with user-specified lootOptions
  const { artistryRange, levelRange } = { ...gameSettings.lootDefaults, ...lootOptions };

  // Set default maximum value for levelGenerateRange if it is null
  if (levelRange.max === null) {
    levelRange.max = gameSettings.game.maxPlayerLevel;
  }

  const artistry = getRandomIntInclusive(artistryRange.min, artistryRange.max);
  const level = getRandomIntInclusive(levelRange.min, levelRange.max);

  // Return validated loot lootOptions
  return {
    artistry,
    level,
  };
}

/**
 * Generates a function that generates an item of the specified type and subtype with the given artistry and level.
 * @param {string} type - The type of item to generate (armor, jewelry, or weapon).
 * @param {string} subtype - The subtype of item to generate (e.g. cloth, leather, etc. for armor).
 * @returns {function} A function that generates an item with the specified properties.
 */
function _generate(type, subtype) {
  return (lootOptions = {}) => {
    const { artistry, level } = _applyLootOptions(lootOptions);

    // use generator
    const generator = {
      armor: () => genArmor(subtype, artistry, level),
      jewelry: () => genJewelry(subtype, artistry, level),
      weapon: () => genWeapon(subtype, artistry, level),
    };

    const item = generator[type]();

    return item;
  };
}

const itemTypes = Object.keys(equipment);

const armorSubtypes = Object.keys(equipment.armor);
const jewelrySubtypes = Object.keys(equipment.jewelry);
const weaponSubtypes = Object.keys(equipment.weapon);

/**
 * Generates a random piece of equipment based on the provided lootOptions.
 * @param {Object} lootOptions - An optional object containing loot generation options.
 * @param {string} [lootOptions.itemType] - The type of item to generate (armor, jewelry, or weapon).
 * @param {Object} [lootOptions.artistryRange] - An object containing the minimum and maximum artistry for the item.
 * @param {number} [lootOptions.artistryRange.min] - The minimum artistry for the item.
 * @param {number} [lootOptions.artistryRange.max] - The maximum artistry for the item.
 * @param {Object} [lootOptions.levelRange] - An object containing the minimum and maximum level for the item.
 * @param {number} [lootOptions.levelRange.min] - The minimum level for the item.
 * @param {number} [lootOptions.levelRange.max] - The maximum level for the item.
 * @returns {Object} A random piece of equipment with the specified properties.
 */
function randomEquipment(lootOptions = {}) {
  const itemType = lootOptions.itemType || getRandomElement(itemTypes);

  switch (itemType) {
    case "armor":
      const armorSubtype = getRandomElement(armorSubtypes);
      return equipment.armor[armorSubtype](lootOptions);

    case "jewelry":
      const jewelrySubtype = getRandomElement(jewelrySubtypes);
      return equipment.jewelry[jewelrySubtype](lootOptions);

    case "weapon":
      const weaponSubtype = getRandomElement(weaponSubtypes);
      return equipment.weapon[weaponSubtype](lootOptions);

    default:
      // TODO: throw error?
      break;
  }
}

module.exports = { equipment, randomEquipment };
