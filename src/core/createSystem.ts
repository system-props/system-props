import { parseResponsiveStyle, parseResponsiveObject } from './parseResponsive';
import { createStyleFunction } from './createStyleFunction';
import { get } from './get';
import {
  SystemProp,
  SystemConfig,
  PropConfigCollection,
  Props,
  SomeObject,
  Cache,
  PrefixDefault,
  PrefixOptions,
} from '../types';
import { sort } from './sort';
import { merge } from './merge';
import { pseudoSelectors as defaultPseudos } from '../pseudos';
import * as CSS from 'csstype';
import { createCss, CSSFunction } from './createCss';

export interface Parser<TokenPrefix extends PrefixOptions = PrefixDefault> {
  (...args: any[]): any;
  config: { [key: string]: SystemConfig };
  propNames: string[];
  cache: Cache;
  css?: CSSFunction<TokenPrefix>;
}

const createMediaQuery = (n: string) => `@media screen and (min-width: ${n})`;

function parseBreakpoints(breakpoints: SystemProp<string | number>) {
  let bps = breakpoints;
  if (!Array.isArray(breakpoints)) {
    bps = Object.values(breakpoints);
  }
  return (bps as string[]).map(createMediaQuery);
}

export const createParser = (
  config: { [x: string]: SystemConfig },
  pseudoSelectors: { [x: string]: string } = {},
  strict: boolean = false
) => {
  const cache: Cache = { strict, key: '__systemprops__' };

  const parse: Parser = (props: Props) => {
    let styles: Record<string, any> = {};
    let shouldSort = false;

    // check cache
    let isCacheBusted = false;
    if (
      typeof props.theme?.systemPropsCacheKey !== 'undefined' &&
      props.theme.systemPropsCacheKey !== cache.key
    ) {
      cache.key = props.theme.systemPropsCacheKey;
      isCacheBusted = true;
    }

    const parseEntry = (obj: SomeObject, key: string) => {
      const systemConfig = config[key];
      let propValue: any = obj[key];
      const scale = get(props.theme, systemConfig.scale);

      if (typeof propValue === 'function') {
        // e.g.,
        // <Box border={t => `1px solid ${t.colors.primary}`} />
        propValue = propValue(props.theme);
      }

      if (typeof propValue === 'object') {
        cache.breakpoints =
          (!isCacheBusted && cache.breakpoints) || props?.theme?.breakpoints;

        if (Array.isArray(propValue)) {
          if (typeof cache.breakpoints === 'undefined') {
            throw new Error(
              'The system props parser could not find a `breakpoints` property in the theme object, which is required for responsive styles to work. Make sure that the theme object has a breakpoints property.'
            );
          }

          cache.media = (!isCacheBusted && cache.media) || [
            null,
            ...parseBreakpoints(cache.breakpoints),
          ];

          return parseResponsiveStyle({
            cache,
            systemConfig,
            scale,
            propValue,
            props: obj,
          });
        }

        if (propValue !== null) {
          shouldSort = true;
          return parseResponsiveObject({
            cache,
            systemConfig,
            scale,
            propValue,
            props: obj,
          });
        }
      }

      return systemConfig(propValue, scale, props, cache);
    };

    for (const key in props) {
      // e.g., { _hover: { ... } }
      if (pseudoSelectors[key]) {
        // _hover -> '&:hover'
        const pseudoSelector = pseudoSelectors[key];
        const pseudoStyles: SomeObject = props[key];
        for (const pseudoStyleKey in pseudoStyles) {
          styles[pseudoSelector] = {
            ...(styles[pseudoSelector] as object),
            ...parseEntry(pseudoStyles, pseudoStyleKey),
          };

          // sort object-based responsive styles
          if (shouldSort) {
            styles[pseudoSelectors[key]] = sort(
              styles[pseudoSelectors[key]] as SomeObject
            );
            shouldSort = false;
          }
        }
        continue;
      }

      // the prop is not a system prop, so bail
      if (!config[key]) {
        continue;
      }

      styles = merge(styles, parseEntry(props, key));
    }

    // sort object-based responsive styles
    if (shouldSort) {
      styles = sort(styles);
    }

    return styles;
  };

  parse.config = config;
  parse.propNames = Object.keys(config);
  parse.cache = cache;

  const keys = Object.keys(config).filter((k) => k !== 'config');
  if (keys.length > 1) {
    keys.forEach((key) => {
      Object.assign(parse, { [key]: createParser({ [key]: config[key] }) });
    });
  }

  return parse;
};

export const createSystem = ({
  strict = false,
  pseudoSelectors = defaultPseudos,
  tokenPrefix = 'prefix',
}: {
  pseudoSelectors?: Record<string, string>;
  strict?: boolean;
  tokenPrefix?: 'prefix' | 'noprefix' | 'all';
} = {}) => {
  const system = (arg: PropConfigCollection) => {
    const config: { [x: string]: SystemConfig } = {};
    Object.keys(arg).forEach((key) => {
      const conf = arg[key];
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
    const parser = createParser(config, pseudoSelectors, strict);
    const cssFunction = createCss(config, tokenPrefix);
    parser.css = cssFunction;
    return parser as Required<Parser<typeof tokenPrefix>>;
  };

  return system;
};
