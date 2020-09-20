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

const parserCache = {};
function getParseableValues(object: Theme, str: string) {
  const results = str.match(/\$(\S*)/gi);
  if (!results) {
    return parserCache;
  }

  for (const result of results) {
    // @ts-ignore
    if (parserCache[result]) {
      continue;
    }
    const [, path] = result.split('$');
    // @ts-ignore
    parserCache[result] = get(object, path);
  }

  return parserCache;
}

export const systemValueParser = (
  object: Theme,
  value: string
  // defaultValue?: unknown
) => {
  const parsedMap = getParseableValues(object, value);

  let newString = value;
  for (let systemValue in parsedMap) {
    // @ts-ignore
    const replacement = parsedMap[systemValue];
    newString = newString.replace(systemValue, replacement);
  }

  return newString;
};

export const betterGet = (
  object: Theme,
  value?: unknown,
  defaultValue?: unknown,
  undef?: undefined
) => {
  let result;

  if (typeof value === 'string' && value.includes('$')) {
    result = systemValueParser(object, value);
  } else {
    result = get(object, value);
  }

  return result === undef ? defaultValue : result;
};
