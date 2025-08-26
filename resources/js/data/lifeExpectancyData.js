// Central life expectancy dataset.
// Source: Worldometer "Countries ranked by life expectancy (2025)" (UN / Worldometer 2025 estimates)
// URL: https://www.worldometers.info/demographics/life-expectancy/
// Fields: code (stable key), label (UI), average (both sexes), male, female, year, source, synthetic?
// NOTE: Source values had decimals; per request they've been rounded to nearest whole number for display simplicity.

export const LIFE_EXPECTANCY_DATA = Object.freeze([
  { code: "GLOBAL", label: "Global average", average: 74, male: 71, female: 76, year: 2025, source: "Worldometer 2025" },
  { code: "ZA", label: "South Africa", average: 66, female: 70, male: 63, year: 2025, source: "Worldometer 2025" },
  { code: "CUSTOM_100", label: "100 years", average: 100, male: 100, female: 100, synthetic: true, source: "Synthetic", year: 0 },
  // Top-ranking / high life expectancy examples
  { code: "HK", label: "Hong Kong", average: 86, female: 88, male: 83, year: 2025, source: "Worldometer 2025" },
  { code: "JP", label: "Japan", average: 85, female: 88, male: 82, year: 2025, source: "Worldometer 2025" },
  { code: "KR", label: "South Korea", average: 85, female: 87, male: 81, year: 2025, source: "Worldometer 2025" },
  { code: "CH", label: "Switzerland", average: 84, female: 86, male: 82, year: 2025, source: "Worldometer 2025" },
  { code: "AU", label: "Australia", average: 84, female: 86, male: 82, year: 2025, source: "Worldometer 2025" },
  { code: "IT", label: "Italy", average: 84, female: 86, male: 82, year: 2025, source: "Worldometer 2025" },
  { code: "SG", label: "Singapore", average: 84, female: 86, male: 82, year: 2025, source: "Worldometer 2025" },
  { code: "ES", label: "Spain", average: 84, female: 87, male: 81, year: 2025, source: "Worldometer 2025" },
  // High mid-tier
  { code: "CA", label: "Canada", average: 83, female: 85, male: 81, year: 2025, source: "Worldometer 2025" },
  { code: "IL", label: "Israel", average: 83, female: 85, male: 81, year: 2025, source: "Worldometer 2025" },
  { code: "FR", label: "France", average: 84, female: 86, male: 81, year: 2025, source: "Worldometer 2025" },
  { code: "SE", label: "Sweden", average: 84, female: 85, male: 82, year: 2025, source: "Worldometer 2025" },
  { code: "GB", label: "United Kingdom", average: 82, female: 83, male: 80, year: 2025, source: "Worldometer 2025" },
  { code: "DE", label: "Germany", average: 82, female: 84, male: 79, year: 2025, source: "Worldometer 2025" },
  { code: "US", label: "United States", average: 80, female: 82, male: 77, year: 2025, source: "Worldometer 2025" },
  // Emerging / large populations
  { code: "CN", label: "China", average: 78, female: 81, male: 76, year: 2025, source: "Worldometer 2025" },
  { code: "BR", label: "Brazil", average: 76, female: 79, male: 73, year: 2025, source: "Worldometer 2025" },
  { code: "IN", label: "India", average: 72, female: 74, male: 71, year: 2025, source: "Worldometer 2025" },
  // Africa (range of values)
  { code: "NG", label: "Nigeria", average: 55, female: 55, male: 54, year: 2025, source: "Worldometer 2025" },
  { code: "ET", label: "Ethiopia", average: 68, female: 71, male: 65, year: 2025, source: "Worldometer 2025" },
  { code: "GH", label: "Ghana", average: 66, female: 68, male: 63, year: 2025, source: "Worldometer 2025" },
  { code: "NE", label: "Niger", average: 62, female: 63, male: 61, year: 2025, source: "Worldometer 2025" },
  { code: "TD", label: "Chad", average: 55, female: 57, male: 54, year: 2025, source: "Worldometer 2025" },
  { code: "LS", label: "Lesotho", average: 58, female: 61, male: 55, year: 2025, source: "Worldometer 2025" },
]);

// Map (label -> entry) for O(1) lookup using the Dropdown's label value.
export const LIFE_EXPECTANCY_BY_LABEL = Object.freeze(
  LIFE_EXPECTANCY_DATA.reduce((acc, item) => {
    acc[item.label] = item;
    return acc;
  }, {})
);

export const LIFE_EXPECTANCY_LABELS = Object.freeze(LIFE_EXPECTANCY_DATA.map((d) => d.label));

// Helper to safely get average by label (returns 0 if not found).
export function getAverageByLabel(label) {
  return LIFE_EXPECTANCY_BY_LABEL[label]?.average ?? 0;
}

export const LIFE_EXPECTANCY_SEX_OPTIONS = Object.freeze(["Average", "Female", "Male"]);

export function getLifeExpectancyByLabelAndSex(label, sex) {
  const entry = LIFE_EXPECTANCY_BY_LABEL[label];
  if (!entry) return 0;
  switch (sex) {
    case "Female":
      return entry.female ?? entry.average ?? 0;
    case "Male":
      return entry.male ?? entry.average ?? 0;
    default:
      return entry.average ?? 0;
  }
}
