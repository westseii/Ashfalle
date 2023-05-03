const cc = require("node-console-colors");
const { Equipable } = require("../Equipable");

/**
 * An enumeration type for types of weapons for a Weapon.
 * @readonly
 */
class WeaponType {
  static CASTER = new WeaponType("CASTER", "Caster");
  static HEAVY = new WeaponType("HEAVY", "Heavy Weapon");
  static LIGHT = new WeaponType("LIGHT", "Light Weapon");
  static MISSILE = new WeaponType("MISSILE", "Missile Weapon");

  /**
   * @constructor
   * @param {string} key The unique identifier for the weapon type.
   * @param {string} value The human-readable name for the weapon type.
   */
  constructor(key, value) {
    if (!key || !value) {
      throw new Error("Both key and value arguments are required");
    }

    this.key = key.toUpperCase();
    this.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    Object.freeze(this);
  }

  static values() {
    return Object.values(this).filter((value) => value instanceof this);
  }

  toString() {
    return `${this.value}`;
  }
}

/**
 * An enumeration type for types of damage that can be dealt.
 * @readonly
 */
class DamageType {
  static PHYSICAL = new WeaponType("PHYSICAL", "Physical");

  /**
   * @constructor
   * @param {string} key The unique identifier for the damage type.
   * @param {string} value The human-readable name for the damage type.
   */
  constructor(key, value) {
    if (!key || !value) {
      throw new Error("Both key and value arguments are required");
    }

    this.key = key.toUpperCase();
    this.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    Object.freeze(this);
  }

  static values() {
    return Object.values(this).filter((value) => value instanceof this);
  }

  toString() {
    return `${this.value}`;
  }
}

class Weapon extends Equipable {
  #damageRating;
  #attackSpeed;
  #weaponType;

  #damageVariance = 0.1; // balanced
  #damageMin;
  #damageMax;
  #damageType = DamageType.PHYSICAL;
  #dps;

  constructor(
    name = "Unnamed Weapon",
    damageRating = 10,
    attackSpeed = 1.5,
    weaponType = WeaponType.LIGHT
  ) {
    super(name);

    this.#damageRating = damageRating;
    this.#attackSpeed = attackSpeed;
    this.#weaponType = weaponType;
  }

  get damageRating() {
    return this.#damageRating;
  }

  set damageRating(damageRating) {
    this.#damageRating = damageRating;
  }

  get attackSpeed() {
    return this.#attackSpeed;
  }

  set attackSpeed(attackSpeed) {
    this.#attackSpeed = Math.min(Math.max(attackSpeed, 1), 5);
  }

  get weaponType() {
    return this.#weaponType;
  }

  set weaponType(weaponType) {
    if (weaponType instanceof WeaponType && WeaponType.values().includes(weaponType)) {
      this.#weaponType = weaponType;
    } else {
      throw new Error(`Invalid WeaponType: ${slot.toString()}`);
    }
  }

  get damageVariance() {
    return this.#damageVariance;
  }

  set damageVariance(damageVariance) {
    this.#damageVariance = damageVariance;
  }

  get damageType() {
    return this.#damageType;
  }

  set damageType(damageType) {
    this.#damageType = damageType;
  }

  get dps() {
    return this.#dps;
  }

  // dps cannot be set

  setDamageVarianceModel(model = "balanced") {
    const models = {
      precise: 0.05,
      balanced: 0.1,
      sporadic: 0.25,
    };

    if (Object.keys(models).includes(model)) {
      this.#damageVariance = models[model];
    }
  }

  toString(asQuantity = true) {
    // TODO: same as Equipable for now
    return `${super.toString(asQuantity)} Art: ${artistry} Lv: ${level}`;
  }

  toConsole(asQuantity = true) {
    console.log(this.toString(asQuantity));
  }

  display() {
    super.display();
    console.log("---");
    console.log(`damageRating: ${this.#damageRating}`);
    console.log(`attackSpeed: ${this.#attackSpeed}`);
    console.log(`weaponType: ${this.#weaponType}`);
    console.log(`damageVariance: ${this.#damageVariance}`);
    console.log(`damageType: ${this.#damageType}`);
    console.log(`dps: ${this.#dps}`);
  }
}

module.exports = { Weapon, WeaponType };
