// Maps nationality names to ISO country codes for emoji flag generation.

const COUNTRY_CODE_MAP = {
  Norway: 'NO',
  France: 'FR',
  England: 'GB',
};

function countryCodeToFlag(code) {
  const codePoints = [...code.toUpperCase()].map(
    (char) => 0x1f1e6 + char.charCodeAt(0) - 65,
  );
  return String.fromCodePoint(...codePoints);
}

export function nationalityFlag(nationality) {
  const code = COUNTRY_CODE_MAP[nationality];
  if (!code) return null;
  return countryCodeToFlag(code);
}
