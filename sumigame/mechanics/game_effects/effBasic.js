const effBasic = {
  "Buff 1": {
    name: "Buff 1",
    duration: 3000,
    stats: {
      strength: { value: 10, additive: true },
    },
  },
  "Buff 2": {
    name: "Buff 2",
    duration: 10000,
    stats: {
      strength: { value: 2, multiplicative: true },
    },
  },
};

module.exports = effBasic;
