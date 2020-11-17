import { Theme } from '@/types';

export const get = (
  object?: Theme,
  path?: unknown,
  defaultValue?: unknown,
  // Not used, should be undefined
  // To make sure we get a true undefined
  undef?: undefined
) => {
  if (!object) {
    return defaultValue;
  }

  const route = typeof path === 'string' ? path.split('.') : [path];

  // Start with theme, that will get narrowed down
  let result: any = object;

  for (let p = 0; p < route.length; p++) {
    // For the length of the map, dive deeper into the object
    // and return the property at that depth
    const next = route[p];
    if (result && (typeof next === 'number' || typeof next === 'string')) {
      result = result[next];
    } else {
      result = undef;
    }
  }

  return result === undef ? defaultValue : result;
};

export const betterGet = (
  scale?: Theme,
  value?: unknown,
  defaultValue?: unknown,
  undef?: undefined
) => {
  let result = get(scale, value);

  if (!result && typeof value === 'string' && value.startsWith('$')) {
    result = get(scale, value.slice(1));
  }

  return result === undef ? defaultValue : result;
};
