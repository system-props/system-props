interface Theme {
  [x: string]: any;
}

export const get = (
  object: Theme,
  path?: unknown,
  // Not used, should be undefined
  // To make sure we get a true undefined
  undef?: undefined
) => {
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

  return result;
};

const REGEX_$ = /\$(\S*)/gi;

function getParseableValues(theme: Theme, str: string) {
  const results = str.match(REGEX_$);
  let values: { [x: string]: string } | undefined;

  if (!results) {
    return values;
  }

  for (const result of results) {
    const [, path] = result.split('$');
    const found = get(theme, path);
    if (found) {
      values = values || {};
      values[result] = get(theme, path);
    }
  }

  return values;
}

export const systemValueParser = (theme: Theme, value: string) => {
  const parsedMap = getParseableValues(theme, value);

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
  scale: Theme,
  value?: unknown,
  defaultValue?: unknown,
  theme?: Theme,
  undef?: undefined
) => {
  let result;

  if (typeof value === 'string' && value.includes('$')) {
    result = systemValueParser(scale, value);
    if (result === undef && theme) {
      result = systemValueParser(theme, value);
    }
  } else {
    result = get(scale, value);
  }

  return result === undef ? defaultValue : result;
};
