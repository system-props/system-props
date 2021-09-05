// String.prototype.localeCompare vs Intl.Collator.compare
// https://stackoverflow.com/a/52369951
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

interface SomeObject {
  [x: string]: unknown;
}

// Array.sort an object
export const sort = (obj: SomeObject) => {
  const next: SomeObject = {};
  Object.keys(obj)
    .sort((a, b) => collator.compare(a, b))
    .forEach((key) => {
      next[key] = obj[key];
    });
  return next;
};
