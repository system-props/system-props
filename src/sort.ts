// String.prototype.localeCompare vs Intl.Collator.compare
// https://stackoverflow.com/a/52369951
// eslint-disable-next-line no-undefined
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

// sort object-value responsive styles
export const sort = (obj: { [x: string]: unknown }) => {
  const next: { [x: string]: unknown } = {};
  Object.keys(obj)
    .sort((a, b) => collator.compare(a, b))
    .forEach(key => {
      next[key] = obj[key];
    });
  return next;
};
