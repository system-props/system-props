import { parseResponsiveStyle, parseResponsiveObject } from './parseResponsive';
import { createStyleFunction } from './createStyleFunction';
import { get } from './get';
import {
  Breakpoints,
  SystemConfig,
  PropConfigCollection,
  // BreakpointsObject,
  Props,
  Parser,
  SomeObject,
  Cache,
} from '@/types';
import { sort } from './sort';
import { merge } from './merge';

const createMediaQuery = (n: string) => `@media screen and (min-width: ${n})`;

function parseBreakpoints(breakpoints: Breakpoints) {
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
): Parser => {
  // console.log(config);
  const cache: Cache = { strict };

  const parse: Parser = (props: Props) => {
    let styles: { [x: string]: unknown } = {};
    let shouldSort = false;
    const isCacheDisabled = Boolean(props.theme?.disableStyledSystemCache);

    const parseEntry = (obj: SomeObject, key: string) => {
      const systemConfig = config[key];
      let propValue: any = obj[key];
      const scale = get(
        props.theme,
        systemConfig.scale,
        systemConfig.defaultScale
      );

      if (typeof propValue === 'function') {
        // e.g.,
        // <Box border={t => `1px solid ${t.colors.primary}`} />
        propValue = propValue(props.theme);
      }

      if (typeof propValue === 'object') {
        cache.breakpoints =
          (!isCacheDisabled && cache.breakpoints) || props?.theme?.breakpoints;

        if (Array.isArray(propValue)) {
          if (typeof cache.breakpoints === 'undefined') {
            throw new Error(
              'The system props parser could not find a `breakpoints` property in the theme object, which is required for responsive styles to work. Make sure that the theme object has a breakpoints property.'
            );
          }

          cache.media = (!isCacheDisabled && cache.media) || [
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
          // const bp = cache.breakpoints as BreakpointsObject;
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

  const keys = Object.keys(config).filter(k => k !== 'config');
  if (keys.length > 1) {
    keys.forEach(key => {
      Object.assign(parse, { [key]: createParser({ [key]: config[key] }) });
    });
  }

  return parse;
};

export const createSystem = ({
  pseudoSelectors,
  strict = false,
}: {
  pseudoSelectors?: { [x: string]: string };
  strict?: boolean;
} = {}) => {
  const system = (args: PropConfigCollection) => {
    const config: { [x: string]: SystemConfig } = {};
    Object.keys(args).forEach(key => {
      const conf = args[key];
      if (conf === true) {
        // shortcut definition
        config[key] = createStyleFunction({
          property: key,
          scale: key,
        });
        return;
      }
      if (typeof conf === 'function') {
        return;
      }
      config[key] = createStyleFunction(conf);
    });

    const parser = createParser(config, pseudoSelectors, strict);
    return parser;
  };

  return system;
};

export const compose = (...parsers: Parser[]): Parser => {
  const config = parsers.reduce((acc, parser) => {
    if (!parser || !parser.config) {
      return acc;
    }
    return { ...acc, ...parser.config };
  }, {});
  const parser = createParser(config);

  return parser;
};
