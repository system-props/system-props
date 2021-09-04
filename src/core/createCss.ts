import { get, memoizedGet } from './get';
import { PropConfigCollection, SystemConfig } from './types';
import { Theme, PrefixOptions } from '../types/system-props';
import { merge } from './merge';
import { CSSObject } from '../types/css-prop';
import { CSSProperties } from '../types/css';
import { createStyleFunction } from './createStyleFunction';

interface PropsWithTheme {
  theme: Theme;
}

export type CSSFunctionArgs<T extends PrefixOptions> =
  | CSSObject<T>
  | ((theme: Theme) => CSSObject<T>);

export interface CSSFunction<T extends PrefixOptions> {
  (args?: CSSFunctionArgs<T>): (props: PropsWithTheme) => CSSObject;
}

export const createCss = (
  propConfig: PropConfigCollection,
  options: { tokenPrefix: PrefixOptions } = { tokenPrefix: 'prefix' }
) => {
  const { tokenPrefix } = options;
  const config: { [x: string]: SystemConfig } = {};

  Object.keys(propConfig).forEach((key) => {
    const conf = propConfig[key];
    if (conf === true) {
      // shortcut definition
      config[key] = createStyleFunction({
        property: key as keyof CSSProperties,
        scale: key,
        tokenPrefix,
      });
      return;
    }
    if (typeof conf === 'function') {
      return;
    }
    config[key] = createStyleFunction({ ...conf, tokenPrefix });
  });

  const css: CSSFunction<typeof tokenPrefix> =
    (args) =>
    ({ theme }) => {
      if (typeof args === 'undefined') {
        return {};
      }

      let result: CSSObject = {};
      const styles = typeof args === 'function' ? args(theme) : args;

      for (let key in styles) {
        const x = styles[key];

        // Nested selectors (pseudo selectors, media query)
        if (x && typeof x === 'object') {
          const nestedStyles = x;

          // If key is a mediaQueries token value
          const _get = memoizedGet[tokenPrefix];
          const maybeQuery = _get(theme.mediaQueries, key);
          if (typeof maybeQuery !== 'undefined') {
            // result[maybeQuery] = css(nestedStyles)({ theme });
            Object.assign(result, {
              [maybeQuery]: css(nestedStyles)({ theme }),
            });
            continue;
          }

          Object.assign(result, {
            [key]: css(nestedStyles)({ theme }),
          });
          continue;
        }

        const systemConfig = config[key];

        // Not a token in the config, let pass through
        if (!systemConfig) {
          // result[key] = x;
          Object.assign(result, { [key]: x });
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
