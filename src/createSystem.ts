import { parseResponsiveStyle, parseResponsiveObject } from './parseResponsive';
import { createStyleFunction } from './createStyleFunction';
import { betterGet as get } from './get';
import {
  Breakpoints,
  SystemConfig,
  Config,
  // BreakpointsObject,
  Props,
  Parser,
  SomeObject,
} from './types';
import { sort } from './sort';
import { merge } from './merge';

interface Cache {
  breakpoints?: Breakpoints;
  media?: Array<string>;
}

const createMediaQuery = (n: string) => `@media screen and (min-width: ${n})`;

function parseBreakpoints(breakpoints: Breakpoints) {
  let bps = breakpoints;
  if (!Array.isArray(breakpoints)) {
    bps = Object.values(breakpoints);
  }
  // @ts-ignore
  return bps.map((str: string) => createMediaQuery(str));
}

export const createParser = (
  config: Config,
  pseudoSelectors: { [x: string]: string } = {}
): Parser => {
  const cache: Cache = {};

  const parse = (props: Props) => {
    let styles: { [x: string]: unknown } = {};
    let shouldSort = false;
    const isCacheDisabled = props?.theme?.disableStyledSystemCache;

    const parseEntry = (obj: SomeObject, key: string) => {
      const systemConfig = config[key];
      let propValue: any = obj[key];
      const scale = get(
        props.theme,
        // @ts-ignore
        systemConfig.scale,
        // @ts-ignore
        systemConfig.defaultScale
      );

      if (typeof propValue === 'function') {
        // e.g.,
        // <Box border={t => `1px solid ${t.colors.primary}`} />
        propValue = propValue(props.theme);
      }

      if (typeof propValue === 'object') {
        if (Array.isArray(propValue)) {
          if (typeof props.theme.breakpoints === 'undefined') {
            throw new Error(
              'The system props parser could not find a `breakpoints` property in the theme object, which is required for responsive styles to work. Make sure that the theme object has a breakpoints property.'
            );
          }

          cache.media = (!isCacheDisabled && cache.media) || [
            null,
            ...parseBreakpoints(props.theme.breakpoints),
          ];

          return parseResponsiveStyle({
            mediaQueries: cache.media,
            // @ts-ignore
            systemConfig,
            scale,
            propValue,
            props: obj,
          });
        }

        if (propValue !== null) {
          shouldSort = true;
          const bp = props.breakpoints;
          return parseResponsiveObject({
            breakpoints: bp,
            // @ts-ignore
            systemConfig,
            scale,
            propValue,
            props: obj,
          });
        }
      }

      // @ts-ignore
      return systemConfig(propValue, scale, props);
    };

    for (const key in props) {
      // e.g., { _hover: { ... } }
      if (pseudoSelectors[key]) {
        // _hover -> '&:hover'
        const pseudoSelector = pseudoSelectors[key];
        const pseudoStyles: SomeObject = props[key];
        // @ts-ignore
        for (const pseudoStyleKey in pseudoStyles) {
          // Object.assign(
          //   styles[pseudoSelector],
          //   parseEntry(pseudoStyles, pseudoStyleKey)
          // );
          styles[pseudoSelector] = {
            // @ts-ignore
            ...styles[pseudoSelector],
            ...parseEntry(pseudoStyles, pseudoStyleKey),
          };

          // sort object-based responsive styles
          if (shouldSort) {
            // @ts-ignore
            styles[pseudoSelectors[key]] = sort(styles[pseudoSelectors[key]]);
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

  // Object.assign(parse, { config, cache, propNames: Object.keys(config) });

  parse.config = config;
  parse.propNames = Object.keys(config);
  parse.cache = cache;

  const keys = Object.keys(config).filter(k => k !== 'config');
  if (keys.length > 1) {
    keys.forEach(key => {
      // Object.assign(parse, { [key]: createParser({ [key]: config[key] }) });
      // @ts-ignore
      parse[key] = createParser({ [key]: config[key] });
    });
  }

  return parse;
};

export const createSystem = ({
  pseudoSelectors,
}: {
  pseudoSelectors?: { [x: string]: string };
} = {}) => {
  const system = (args: Config) => {
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
        config[key] = conf;
        return;
      }
      config[key] = createStyleFunction(conf);
    });

    // @ts-ignore
    const parser = createParser(config, pseudoSelectors);
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
