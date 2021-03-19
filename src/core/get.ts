import { Get } from '../types';

/**
 * Generic "get" function
 * Used with 'noprefix' tokenPrefix value
 */
export const get: Get = (object, path, defaultValue) => {
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
      result = undefined;
    }
  }

  return result === undefined ? defaultValue : result;
};

/**
 * Requires path to have '$' prefixing the value
 * Used with 'prefix' tokenPrefix value
 */
export const prefixGet: Get = (object, path, defaultValue) => {
  let result;

  if (typeof path === 'string' && path.startsWith('$')) {
    result = get(object, path.slice(1));
  }

  return result === undefined ? defaultValue : result;
};

/**
 * Supports '$' prefix or not
 * Used with 'all' tokenPrefix value
 */
export const allGet: Get = (object, path, defaultValue) => {
  let result = get(object, path);

  if (typeof path === 'string' && path.startsWith('$')) {
    result = get(object, path.slice(1));
  }

  return result === undefined ? defaultValue : result;
};

export const memoizeGet = (fn: Get) => {
  let cache = new WeakMap();

  const memoizedFn: Get = (obj, path, fallback) => {
    if (typeof obj === 'undefined') {
      return fn(obj, path, fallback);
    }

    if (!cache.has(obj)) {
      cache.set(obj, new Map());
    }

    const map = cache.get(obj);

    if (map.has(path)) {
      return map.get(path);
    }

    const value = fn(obj, path, fallback);

    map.set(path, value);

    return value;
  };


  return memoizedFn;
};

export const memoizedGet = {
  all: memoizeGet(allGet),
  prefix: memoizeGet(prefixGet),
  noprefix: memoizeGet(get),
};
