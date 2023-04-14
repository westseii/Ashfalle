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
 * Validates and returns loot options.
 * @param {Object} options - The loot options to validate.
 * @returns {Object} An object containing the validated loot options.
 */
function _checkLootOptions(options) {
  const defaultOptions = JSON.parse(JSON.stringify(gameSettings.lootDefaults));

  // Override default options with user-specified options
  const checkedOptions = { ...defaultOptions, ...options };

  // Set default maximum value for levelGenerateRange if it is null
  if (checkedOptions.levelGenerateRange.maximumValue === null) {
    checkedOptions.levelGenerateRange.maximumValue = gameSettings.game.maxPlayerLevel;
  }

  const rArtistry = _getRandomIntInclusive(
    checkedOptions.artistry.minimumValue,
    checkedOptions.artistry.maximumValue
  );
  const rLevelGenerateRange = _getRandomIntInclusive(
    checkedOptions.levelGenerateRange.minimumValue,
    checkedOptions.levelGenerateRange.maximumValue
  );

  // Return validated loot options
  return {
    artistry: rArtistry,
    levelGenerateRange: rLevelGenerateRange,
    itemType: checkedOptions.itemType,
  };
}

function _generate(type, subtype) {
  let item;

  return (options = {}) => {
    const { artistry, levelGenerateRange } = _checkLootOptions(options);

    // use generator
    const generator = {
      armor: {
        cloth: _generateArmor("cloth", levelGenerateRange, artistry),
        leather: _generateArmor("leather", levelGenerateRange, artistry),
        mail: _generateArmor("mail", levelGenerateRange, artistry),
        plate: _generateArmor("plate", levelGenerateRange, artistry),
      },
      jewelry: {
        necklace: _generateJewelry("necklace", levelGenerateRange, artistry),
        ring: _generateJewelry("ring", levelGenerateRange, artistry),
      },
      weapon: {
        axe: _generateWeapon("axe", levelGenerateRange, artistry),
        axe2H: _generateWeapon("axe2H", levelGenerateRange, artistry),
        caster: _generateWeapon("caster", levelGenerateRange, artistry),
        caster2H: _generateWeapon("caster2H", levelGenerateRange, artistry),
        mace: _generateWeapon("mace", levelGenerateRange, artistry),
        mace2H: _generateWeapon("mace2H", levelGenerateRange, artistry),
        missile: _generateWeapon("missile", levelGenerateRange, artistry),
        sword: _generateWeapon("sword", levelGenerateRange, artistry),
        sword2H: _generateWeapon("sword2H", levelGenerateRange, artistry),
      },
    };

    item = generator[type][subtype];

    return item;
  };
}

//
//
//
function _getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function _getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const itemTypes = Object.keys(equipment);

const lootArmorSubtypes = Object.keys(equipment.armor);
const lootJewelrySubtypes = Object.keys(equipment.jewelry);
const lootWeaponSubtypes = Object.keys(equipment.weapon);

function randomEquipment(options = {}) {
  const itemType = options.itemType ? options.itemType : _getRandomElement(itemTypes);

  switch (itemType) {
    case "armor":
      const armorSubtype = _getRandomElement(lootArmorSubtypes);
      return equipment.armor[armorSubtype](options);

    case "jewelry":
      const jewelrySubtype = _getRandomElement(lootJewelrySubtypes);
      return equipment.jewelry[jewelrySubtype](options);

    case "weapon":
      const weaponSubtype = _getRandomElement(lootWeaponSubtypes);
      return equipment.weapon[weaponSubtype](options);

    default:
      break;
  }
}

module.exports = { equipment, randomEquipment };
