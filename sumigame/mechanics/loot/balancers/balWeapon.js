const { EquipSlot } = require("../../items/Equipable");

const { ONE_HANDED, TWO_HANDED } = EquipSlot;

function balWeapon(slot, level) {
  let damageRating = 10;

  if (slot === ONE_HANDED) {
    damageRating *= 1;
  } else if (slot === TWO_HANDED) {
    damageRating *= 2;
  }

  return damageRating;
}

module.exports = balWeapon;
