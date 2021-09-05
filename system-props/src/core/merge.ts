interface SomeObj {
  [x: string]: any;
}

function mergeObj(a: {}, b: {}) {
  return { ...a, ...b };
}

export const merge = (a: SomeObj, b: SomeObj) => {
  let result = mergeObj(a, b);
  for (const key in a) {
    if (!a[key] || typeof b[key] !== 'object') {
      continue;
    }
    result = mergeObj(result, {
      [key]: mergeObj(a[key], b[key]),
    });
  }
  return result;
};
