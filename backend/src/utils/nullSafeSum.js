// Null-safe aggregation helpers — skip null/undefined values when summing stint fields.

/**
 * Sum a numeric field across stints, ignoring null/undefined entries.
 * Returns 0 when no stints are provided or every value is null.
 */
function sumField(stints, field) {
  let total = 0;
  for (const stint of stints) {
    const value = stint[field];
    if (value !== null && value !== undefined) {
      total += value;
    }
  }
  return total;
}

/**
 * Build a totals object for the standard summary fields.
 */
function sumStandardFields(stints) {
  return {
    goals: sumField(stints, 'goals'),
    assists: sumField(stints, 'assists'),
    appearances: sumField(stints, 'appearances'),
    starts: sumField(stints, 'starts'),
  };
}

module.exports = { sumField, sumStandardFields };
