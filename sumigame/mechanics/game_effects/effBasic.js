const effBasic = {
  "Boon of Strength": {
    name: "Boon of Strength",
    type: "additive",
    duration: 3000,
    stats: {
      strength: { value: 10, additive: true },
    },
  },
  "Ultimate Strength": {
    name: "Ultimate Strength",
    type: "multiplicative",
    duration: 3000,
    stats: {
      strength: { value: 2, multiplicative: true },
    },
  },
};

module.exports = effBasic;
