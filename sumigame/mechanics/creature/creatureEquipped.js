const EquipSlot = require("../loot/EquipSlot");

class CreatureEquipped {
  #equipped;

  constructor() {
    this.#equipped = {
      chest: {
        slot: EquipSlot.CHEST,
        item: {},
      },
      feet: {
        slot: EquipSlot.FEET,
        item: {},
      },
      finger1: {
        slot: EquipSlot.FINGER,
        item: {},
      },
      finger2: {
        slot: EquipSlot.FINGER,
        item: {},
      },
      hands: {
        slot: EquipSlot.HANDS,
        item: {},
      },
      head: {
        slot: EquipSlot.HEAD,
        item: {},
      },
      legs: {
        slot: EquipSlot.LEGS,
        item: {},
      },
      neck: {
        slot: EquipSlot.NECK,
        item: {},
      },
      oneHanded: {
        slot: EquipSlot.ONE_HANDED,
        item: {},
      },
      relic1: {
        slot: EquipSlot.RELIC,
        item: {},
      },
      relic2: {
        slot: EquipSlot.RELIC,
        item: {},
      },
      relic3: {
        slot: EquipSlot.RELIC,
        item: {},
      },
      trinket: {
        slot: EquipSlot.TRINKET,
        item: {},
      },
      twoHanded: {
        slot: EquipSlot.TWO_HANDED,
        item: {},
      },
    };
  }

  getEquippedItem(slot) {
    if (this.#equipped.hasOwnProperty(slot)) {
      return this.#equipped[slot].item;
    } else {
      throw new Error(`Invalid slot: ${slot}`);
    }
  }

  equipItem(item) {
    const equipSlot = item.equipSlot;

    // TODO: nyi
  }
}

module.exports = CreatureEquipped;
