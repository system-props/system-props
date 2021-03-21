import { get, memoizedGet } from './get';
import { Theme, SystemConfig } from '../types';
import { CSSObject } from '../css-prop';
import { merge } from './merge';

export const createCss = (
  config: { [x: string]: SystemConfig },
  tokenPrefix: 'all' | 'prefix' | 'noprefix'
) => {
  const css = (args?: CSSObject | ((theme: Theme) => CSSObject)) => ({
    theme,
  }: {
    theme: Theme;
  }) => {
    if (typeof args === 'undefined') {
      return;
    }

    let result: CSSObject = {};
    const styles = typeof args === 'function' ? args(theme) : args;

    for (let key in styles) {
      const x = styles[key];

      // Nested selectors (pseudo selectors, media query)
      if (x && typeof x === 'object') {
        // If key is a mediaQueries token value
        const _get = memoizedGet[tokenPrefix];
        const maybeQuery = _get(theme.mediaQueries, key);
        if (typeof maybeQuery !== 'undefined') {
          result[maybeQuery] = css(x)({ theme });
          continue;
        }

        result[key] = css(x)({ theme });
        continue;
      }

      const systemConfig = config[key];

      // Not a token in the config, let pass through
      if (!systemConfig) {
        result[key] = x;
        continue;
      }

      const scale = get(theme, systemConfig.scale);

      const propValue = x as string | number;

      result = merge(result, systemConfig(propValue, scale, { theme }));
    }

    return result;
  };

  return css;
};
