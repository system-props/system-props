import { get, memoizedGet } from './get';
import {
  PropConfigCollection,
  Theme,
  SystemConfig,
  PrefixOptions,
} from '../types';
import { CSSObject } from '../css-prop';
import { merge } from './merge';
import * as CSS from 'csstype';
import { createStyleFunction } from './createStyleFunction';

type CSSFunctionArgs<T extends PrefixOptions> =
  | CSSObject<T>
  | ((theme: Theme) => CSSObject<T>);

export type CSSFunction<T extends PrefixOptions> = (
  args?: CSSFunctionArgs<T>
) => (theme: Theme) => CSSObject<T> | undefined;

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
        property: key as keyof CSS.Properties,
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

  const css: CSSFunction<typeof tokenPrefix> = (args) => ({ theme }) => {
    if (typeof args === 'undefined') {
      return;
    }

    let result: CSSObject<typeof tokenPrefix> = {};
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
