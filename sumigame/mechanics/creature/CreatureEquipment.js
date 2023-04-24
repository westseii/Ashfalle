const EquipSlot = require("../loot/EquipSlot");

class CreatureEquipment {
  #equipped;

  constructor() {
    this.#equipped = new Map();

    this.#equipped.set(EquipSlot.CHEST, null);
    this.#equipped.set(EquipSlot.FEET, null);
    this.#equipped.set(EquipSlot.FINGER1, null);
    this.#equipped.set(EquipSlot.FINGER2, null);
    this.#equipped.set(EquipSlot.HANDS, null);
    this.#equipped.set(EquipSlot.HEAD, null);
    this.#equipped.set(EquipSlot.LEGS, null);
    this.#equipped.set(EquipSlot.NECK, null);
    this.#equipped.set(EquipSlot.ONE_HANDED, null);
    this.#equipped.set(EquipSlot.RELIC1, null);
    this.#equipped.set(EquipSlot.RELIC2, null);
    this.#equipped.set(EquipSlot.RELIC3, null);
    this.#equipped.set(EquipSlot.TRINKET, null);
    this.#equipped.set(EquipSlot.TWO_HANDED, null);
  }

  get equipped() {
    // create a new map and copy the values from the original map to the new map
    const equippedCopy = new Map(this.#equipped);

    // filter out any null values from the new Map
    for (let [key, value] of equippedCopy.entries()) {
      if (value === null) {
        equippedCopy.delete(key);
      }
    }

    return equippedCopy;
  }

  equipItem(item) {
    if (!item || !item.equipSlot) {
      throw new Error("Invalid item");
    }

    const replacedItem = this.#equipped.get(item.equipSlot);
    this.#equipped.set(item.equipSlot, item);

    return replacedItem || null;
  }

  unequipItemBySlot(slot = EquipSlot.ONE_HANDED) {
    if (!Object.values(EquipSlot).includes(slot)) {
      throw new Error("Invalid slot");
    }

    const item = this.#equipped.get(slot);
    this.#equipped.set(slot, null);

    return item || null;
  }

  getEquippedItemBySlot(slot = EquipSlot.ONE_HANDED) {
    return this.#equipped.get(slot) || null;
  }
}

module.exports = CreatureEquipment;
