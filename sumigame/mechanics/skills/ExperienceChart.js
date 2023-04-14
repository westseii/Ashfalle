/**
 * Class representing an experience chart for a skill
 */
class ExperienceChart {
  /**
   * Create an experience chart
   * @param {number} skillCap - The maximum skill level
   * @param {number} incrementRampBy - The increment ramp value
   * @param {number} adjustFirst - The adjust first value
   * @throws {Error} - Invalid inputs
   */
  constructor(skillCap, incrementRampBy = 5, adjustFirst = 95) {
    if (typeof skillCap !== "number" || skillCap < 1) {
      throw new Error("Invalid skillCap");
    }
    if (typeof incrementRampBy !== "number" || incrementRampBy < 1) {
      throw new Error("Invalid incrementRampBy");
    }
    if (typeof adjustFirst !== "number" || adjustFirst < 0) {
      throw new Error("Invalid adjustFirst");
    }

    /**
     * The experience chart
     * @type {number[]}
     */
    this.experienceChart = [];

    this._buildExperienceChart(skillCap, incrementRampBy, adjustFirst);

    this.experienceChart[this.experienceChart.length - 1] = Infinity;
  }

  /**
   * Builds the experience chart
   * @param {number} skillCap - The maximum skill level
   * @param {number} incrementRampBy - The increment ramp value
   * @param {number} adjustFirst - The adjust first value
   * @private
   */
  _buildExperienceChart(skillCap, incrementRampBy, adjustFirst) {
    const initRamp = [];
    const experienceRamp = [];

    initRamp.push(incrementRampBy);
    experienceRamp.push(incrementRampBy);
    this.experienceChart.push(incrementRampBy + adjustFirst);

    for (let i = 1; i < skillCap; i++) {
      initRamp.push(incrementRampBy + initRamp[i - 1]);
      experienceRamp.push(experienceRamp[i - 1] + initRamp[i]);
      this.experienceChart.push(this.experienceChart[i - 1] + experienceRamp[i]);
    }
  }

  /**
   * Gets the experience chart
   * @returns {number[]} The experience chart
   */
  getExperienceChart() {
    return this.experienceChart;
  }

  /**
   * Gets the cost of the next skill level
   * @param {number} currentSkillLevel - The current skill level
   * @returns {number} The cost of the next skill level
   * @throws {Error} - Invalid skill level
   */
  getNextCost(currentSkillLevel) {
    if (currentSkillLevel > this.experienceChart.length || currentSkillLevel < 1) {
      throw new Error(`Invalid skill level (1 - ${this.experienceChart.length})`);
    }

    return this.experienceChart[currentSkillLevel - 1];
  }

  /**
   * Calculates the total skill up cost up to but not including the current skill level.
   * @param {number} currentSkillLevel - The current skill level.
   * @returns {number} The total skill up cost up to but not including the current skill level.
   */
  getTotalCostForCurrent(currentSkillLevel) {
    if (currentSkillLevel <= 1) {
      return 0;
    }

    const lastIndex = Math.min(currentSkillLevel - 1, this.experienceChart.length - 1);
    return this.experienceChart.slice(0, lastIndex).reduce((acc, expCost) => acc + expCost, 0);
  }
}

module.exports = ExperienceChart;
