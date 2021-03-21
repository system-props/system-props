import { CSSObject } from './css-prop';
import { Theme } from './types';
import { prefixGet as get } from './core/get';

export const css = (args: CSSObject | ((theme: Theme) => CSSObject)) => ({
  theme,
}: {
  theme: Theme;
}) => {
  let result: CSSObject = {};
  const styles = typeof args === 'function' ? args(theme) : args;

  for (const key in styles) {
    const x = styles[key];
    const val = typeof x === 'function' ? x(theme) : x;

    if (val && typeof val === 'object') {
      result[key] = css(val)({ theme });
      continue;
    }

    const prop = get(aliases, key, key);
    const scaleName = get(scales, prop);
    const scale = get(theme, scaleName, get(theme, prop, {}));
    const transform = get(transforms, prop, get);
    const value = transform(scale, val, val);

    if (multiples[prop]) {
      const dirs = multiples[prop];

      for (let i = 0; i < dirs.length; i++) {
        result[dirs[i]] = value;
      }
    } else {
      result[prop] = value;
    }
  }

  return result;
};
