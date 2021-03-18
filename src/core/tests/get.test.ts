import { get, betterGet, memoize } from '../get';

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
  const a = betterGet([0, 4, 8], '$2');
  expect(a).toBe(8);
});

test('memoize', () => {
  const obj = {
    colors: {
      blue: ['#0cf', '#0be', '#09d', '#07c'],
    },
  };
  const _get = jest.fn(() => true);
  const memoizedGet = memoize(_get);
  expect(memoizedGet(obj, 'colors.blue.3')).toStrictEqual(true);
  expect(memoizedGet(obj, 'colors.blue.3')).toStrictEqual(true);
  expect(memoizedGet(obj, 'colors.blue.3')).toStrictEqual(true);
  expect(_get).toHaveBeenCalledTimes(1);
});
