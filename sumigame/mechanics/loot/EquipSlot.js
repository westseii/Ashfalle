class EquipSlot {
  static CHEST = new EquipSlot("CHEST", "Chest");
  static FEET = new EquipSlot("FEET", "Feet");
  static FINGER = new EquipSlot("FINGER", "Finger");
  static HANDS = new EquipSlot("HANDS", "Hands");
  static HEAD = new EquipSlot("HEAD", "Head");
  static LEGS = new EquipSlot("LEGS", "Legs");
  static NECK = new EquipSlot("NECK", "Neck");
  static ONE_HANDED = new EquipSlot("ONE_HANDED", "One-handed");
  static RELIC = new EquipSlot("RELIC", "Relic");
  static TRINKET = new EquipSlot("TRINKET", "Trinket");
  static TWO_HANDED = new EquipSlot("TWO_HANDED", "Two-handed");

  constructor(key, value) {
    this.key = key;
    this.value = value;

    Object.freeze(this);
  }

  toString() {
    return `${this.key} ${this.value}`;
  }
}

module.exports = EquipSlot;
