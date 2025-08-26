// Central life expectancy dataset.
// Sources approximate (WHO / national stats circa 2022). Synthetic entry included for "100 years".
// Fields: code (stable key), label (UI), average, male, female, year, source, synthetic?

export const LIFE_EXPECTANCY_DATA = Object.freeze([
  { code: 'GLOBAL', label: 'Global average', average: 73, male: 70, female: 76, year: 2022, source: 'WHO' },
  { code: 'ZA', label: 'South Africa', average: 65, male: 59, female: 65, year: 2022, source: 'WHO' },
  { code: 'NG', label: 'Nigeria', average: 53, male: 53, female: 54, year: 2022, source: 'WHO' },
  { code: 'US', label: 'United States', average: 79, male: 76, female: 81, year: 2022, source: 'WHO / CDC' },
  { code: 'HK', label: 'Hong Kong', average: 85, male: 83, female: 88, year: 2022, source: 'GovHK' },
  { code: 'CUSTOM_100', label: '100 years', average: 100, male: 100, female: 100, synthetic: true },
]);

// Map (label -> entry) for O(1) lookup using the Dropdown's label value.
export const LIFE_EXPECTANCY_BY_LABEL = Object.freeze(
  LIFE_EXPECTANCY_DATA.reduce((acc, item) => {
    acc[item.label] = item;
    return acc;
  }, {})
);

export const LIFE_EXPECTANCY_LABELS = Object.freeze(LIFE_EXPECTANCY_DATA.map(d => d.label));

// Helper to safely get average by label (returns 0 if not found).
export function getAverageByLabel(label) {
  return LIFE_EXPECTANCY_BY_LABEL[label]?.average ?? 0;
}
