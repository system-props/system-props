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

const REGEX_$ = /\$(\S*)/gi;

function getDollaValues(theme?: Theme, str?: string, undef?: undefined) {
  if (!str) {
    return undef;
  }

  const results = str.match(REGEX_$);
  let values: { [x: string]: string } | undefined;

  if (!results) {
    return values;
  }

  for (const result of results) {
    const [, path] = result.split('$');
    // If we haven't already get'd the path
    if (!values?.[result]) {
      const found = get(theme, path);
      if (found) {
        values = values || {};
        values[result] = get(theme, path);
      }
    }
  }

  return values;
}

export const systemValueParser = (
  theme?: Theme,
  value?: string,
  undef?: undefined
) => {
  if (!theme || !value) {
    return undef;
  }

  const parsedMap = getDollaValues(theme, value);

  if (!parsedMap) {
    return;
  }

  let newString = value;
  for (let systemValue in parsedMap) {
    const replacement = parsedMap[systemValue];
    newString = newString.replace(systemValue, replacement);
  }

  return newString;
};

export const betterGet = (
  scale?: Theme,
  value?: unknown,
  defaultValue?: unknown,
  undef?: undefined
) => {
  let result;

  if (typeof value === 'string' && value.includes('$')) {
    result = systemValueParser(scale, value);
  } else {
    result = get(scale, value);
  }

  return result === undef ? defaultValue : result;
};
