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

function getParseableValues(theme: Theme, str: string) {
  const results = str.match(/\$(\S*)/gi);
  const values: { [x: string]: string } = {};

  if (!results) {
    return values;
  }

  for (const result of results) {
    const [, path] = result.split('$');
    values[result] = get(theme, path);
  }

  return values;
}

export const systemValueParser = (theme: Theme, value: string) => {
  const parsedMap = getParseableValues(theme, value);

  let newString = value;
  for (let systemValue in parsedMap) {
    const replacement = parsedMap[systemValue];
    newString = newString.replace(systemValue, replacement);
  }

  return newString;
};

export const betterGet = (
  theme: Theme,
  value?: unknown,
  defaultValue?: unknown,
  undef?: undefined
) => {
  let result;

  if (typeof value === 'string' && value.includes('$')) {
    result = systemValueParser(theme, value);
  } else {
    result = get(theme, value);
  }

  return result === undef ? defaultValue : result;
};
