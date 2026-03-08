/**
 * Run the Privacy Exposure Index on example profiles.
 * Usage: node examples/run.js
 */

const { calculateExposureIndex, getExposureLevel } = require('../index.js');
const profiles = require('./profiles.js');
const relationships = require('./relationships.js');

const ids = Object.keys(profiles);

console.log('Privacy Exposure Index — example run\n');
console.log('Service ID        | Score | Level');
console.log('------------------|-------|----------');

for (const id of ids) {
  const riskProfile = profiles[id];
  const relationship = relationships[id] || null;
  const category = relationship?.category || 'productivity';
  const score = calculateExposureIndex(riskProfile, relationship, category);
  const { level } = getExposureLevel(score);
  console.log(`${id.padEnd(17)} | ${String(score).padStart(5)} | ${level}`);
}

console.log('\nDone. See METHODOLOGY.md for factor breakdown.');
