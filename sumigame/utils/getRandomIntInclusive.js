/**
 * Returns a random integer between the specified minimum (inclusive) and maximum (inclusive) values.
 * @param {number} min - The minimum value of the random integer.
 * @param {number} max - The maximum value of the random integer.
 * @returns {number} A random integer between the specified minimum (inclusive) and maximum (inclusive) values.
 */
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = getRandomIntInclusive;
