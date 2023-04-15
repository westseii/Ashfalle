const gameSettings = require("../../settings/game_settings.json");
const _generateArmor = require("./generators/generateArmor");
const _generateJewelry = require("./generators/generateJewelry");
const _generateWeapon = require("./generators/generateWeapon");

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

function _getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Validates and returns loot lootOptions.
 * @param {Object} lootOptions - The loot lootOptions to validate.
 * @returns {Object} An object containing the validated loot lootOptions.
 */
function _applyLootOptions(lootOptions) {
  // Override default lootOptions with user-specified lootOptions
  const { artistry, levelGenerateRange } = { ...gameSettings.lootDefaults, ...lootOptions };

  // Set default maximum value for levelGenerateRange if it is null
  if (levelGenerateRange.max === null) {
    levelGenerateRange.max = gameSettings.game.maxPlayerLevel;
  }

  const rArtistry = _getRandomIntInclusive(artistry.min, artistry.max);
  const rLevel = _getRandomIntInclusive(levelGenerateRange.min, levelGenerateRange.max);

  // Return validated loot lootOptions
  return {
    rArtistry,
    rLevel,
  };
}

function _generate(type, subtype) {
  return (lootOptions = {}) => {
    const { rArtistry, rLevel } = _applyLootOptions(lootOptions);

    // use generator
    const generator = {
      armor: () => _generateArmor(subtype, rArtistry, rLevel),
      jewelry: () => _generateJewelry(subtype, rArtistry, rLevel),
      weapon: () => _generateWeapon(subtype, rArtistry, rLevel),
    };

    const item = generator[type]();

    return item;
  };
}

function _getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const itemTypes = Object.keys(equipment);

const lootArmorSubtypes = Object.keys(equipment.armor);
const lootJewelrySubtypes = Object.keys(equipment.jewelry);
const lootWeaponSubtypes = Object.keys(equipment.weapon);

function randomEquipment(lootOptions = {}) {
  const randomEquipmentItemType =
    lootOptions.randomEquipmentItemType || _getRandomElement(itemTypes);

  switch (randomEquipmentItemType) {
    case "armor":
      const armorSubtype = _getRandomElement(lootArmorSubtypes);
      return equipment.armor[armorSubtype](lootOptions);

    case "jewelry":
      const jewelrySubtype = _getRandomElement(lootJewelrySubtypes);
      return equipment.jewelry[jewelrySubtype](lootOptions);

    case "weapon":
      const weaponSubtype = _getRandomElement(lootWeaponSubtypes);
      return equipment.weapon[weaponSubtype](lootOptions);

    default:
      break;
  }
}

module.exports = { equipment, randomEquipment };
