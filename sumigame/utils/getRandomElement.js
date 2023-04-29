/**
 * Returns a random element from an array.
 * @param {Array} arr - The array to select a random element from.
 * @returns {*} The randomly selected element from the array.
 */
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = getRandomElement;
