import { get, memoizedGet } from './get';
import {
  PropConfigCollection,
  Theme,
  SystemConfig,
  PrefixOptions,
} from '../types';
import { CSSObject as SystemPropsCSSObject } from '../css-prop';
import { merge } from './merge';
import { CSSObject, CSSProperties } from '../css-types';
import { createStyleFunction } from './createStyleFunction';

interface PropsWithTheme {
  theme: Theme;
}

type CSSFunctionArgs<T extends PrefixOptions> =
  | SystemPropsCSSObject<T>
  | ((theme: Theme) => SystemPropsCSSObject<T>);

export interface CSSFunction<T extends PrefixOptions> {
  (args?: CSSFunctionArgs<T>): (props: PropsWithTheme) => CSSObject | undefined;
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

  const css: CSSFunction<typeof tokenPrefix> = (args) => ({ theme }) => {
    if (typeof args === 'undefined') {
      return;
    }

    let result: CSSObject = {};
    const styles = typeof args === 'function' ? args(theme) : args;

    for (let key in styles) {
      const x = styles[key];

      // Nested selectors (pseudo selectors, media query)
      if (x && typeof x === 'object') {
        const nestedStyles = x as SystemPropsCSSObject<typeof tokenPrefix>;

        // If key is a mediaQueries token value
        const _get = memoizedGet[tokenPrefix];
        const maybeQuery = _get(theme.mediaQueries, key);
        if (typeof maybeQuery !== 'undefined') {
          result[maybeQuery] = css(nestedStyles)({ theme });
          continue;
        }

        result[key] = css(nestedStyles)({ theme });
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
