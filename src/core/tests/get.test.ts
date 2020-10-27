import { betterGet, systemValueParser } from '../get';

const get = betterGet;

test('returns a deeply nested value', () => {
  const a = get(
    {
      colors: {
        blue: ['#0cf', '#0be', '#09d', '#07c'],
      },
    },
    'colors.blue.3'
  );
  expect(a).toBe('#07c');
});

test('returns a $ prefixed value', () => {
  const a = systemValueParser(
    {
      borderWidths: {
        base: '1px',
      },
      colors: {
        blue: {
          10: '#0cf',
          20: '#0be',
        },
      },
    },
    '$borderWidths.base solid $colors.blue.10'
  );
  expect(a).toBe('1px solid #0cf');
});

test('supports fallback values', () => {
  const a = get({}, 'hi', 'nope');
  expect(a).toBe('nope');
});

test('handles number values', () => {
  const a = get([1, 2, 3], 0);
  expect(a).toBe(1);
});

test('handles undefined values', () => {
  const a = get({});
  expect(a).toBeUndefined();
});

test('handles null values', () => {
  const a = get({}, null);
  expect(a).toBeUndefined();
});

test('returns 0 index items', () => {
  const a = get(['a', 'b', 'c'], 0);
  expect(a).toBe('a');
});

test('returns number values with $', () => {
  const a = get([0, 4, 8], '$2');
  expect(a).toBe(8);
});
