const { ItemCategory } = require("../items/Item");
const EquipSlot = require("../loot/EquipSlot");

/**
 * Represents the equipment of a creature.
 */
class CreatureEquipment {
  #equipped;

  /**
   * Creates a new CreatureEquipment object with empty slots for each equipment slot.
   */
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

  /**
   * Returns a new Map object containing only the equipped items, without any null values.
   * @returns {Map<EquipSlot, EquipableItem>} A new Map object containing only the equipped items.
   */
  get equipped() {
    // create a new map and copy the values from the original map to the new map
    const equippedCopy = new Map(this.#equipped);

    // filter out any null values from the new map
    for (let [key, value] of equippedCopy.entries()) {
      if (value === null) {
        equippedCopy.delete(key);
      }
    }

    return equippedCopy;
  }

  /**
   * Equips the specified equipable item to the appropriate equipment slot.
   * @param {EquipableItem} equipableItem The item to equip.
   * @returns {EquipableItem | null} The item that was previously equipped in the same slot, or null if no item was equipped in the slot.
   * @throws {Error} Throws an error if the specified item is not an equipable item.
   */
  equipItem(equipableItem) {
    if (equipableItem.category !== ItemCategory.EQUIPABLE) {
      throw new Error("Invalid equipable item");
    }

    const replacedItem = this.#equipped.get(equipableItem.equipSlot);
    this.#equipped.set(equipableItem.equipSlot, equipableItem);

    return replacedItem || null;
  }

  /**
   * Unequips the item in the specified equipment slot.
   * @param {EquipSlot} slot The slot to unequip the item from.
   * @returns {EquipableItem | null} The item that was unequipped, or null if no item was equipped in the specified slot.
   * @throws {Error} Throws an error if the specified slot is not an equip slot.
   */
  unequipItemBySlot(slot = EquipSlot.ONE_HANDED) {
    if (!(slot instanceof EquipSlot)) {
      throw new Error("Invalid slot");
    }

    const equipableItem = this.#equipped.get(slot);
    this.#equipped.set(slot, null);

    return equipableItem || null;
  }

  /**
   * Returns the item that is currently equipped in the specified equipment slot.
   * @param {EquipSlot} slot The slot to get the equipped item from.
   * @returns {EquipableItem | null} The item that is currently equipped in the specified slot, or null if no item is equipped in the slot.
   */
  getEquippedItemBySlot(slot = EquipSlot.ONE_HANDED) {
    return this.#equipped.get(slot) || null;
  }
}

module.exports = CreatureEquipment;
