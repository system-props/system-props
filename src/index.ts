function mergeObj(a: {}, b: {}) {
  return { ...a, ...b };
}

interface Props {
  [x: string]: any;
}

interface SomeObj {
  [x: string]: string | number | {};
}

type BreakpointsObject = { [x: string]: string };
type BreakpointsArray = Array<string>;

interface Theme {
  [x: string]: any;
  breakpoints: BreakpointsObject | BreakpointsArray;
}

type PropertyConfig =
  | true
  | {
      property?: string;
      scale?: string;
      defaultScale: any;
      transform: any;
    };

interface Config {
  [x: string]: true | PropertyConfig;
}

interface Cache {
  breakpoints?: BreakpointsArray | BreakpointsObject;
  media?: Array<string>;
}

export const merge = (a: SomeObj, b: SomeObj) => {
  let result = mergeObj(a, b);
  for (const key in a) {
    if (!a[key] || typeof b[key] !== 'object') {
      continue;
    }
    result = mergeObj(result, {
      [key]: mergeObj(a[key], b[key]),
    });
  }
  return result;
};

// String.prototype.localeCompare vs Intl.Collator.compare
// https://stackoverflow.com/a/52369951
// eslint-disable-next-line no-undefined
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

// sort object-value responsive styles
const sort = (obj: SomeObj) => {
  const next = {};
  Object.keys(obj)
    .sort((a, b) => collator.compare(a, b))
    .forEach(key => {
      next[key] = obj[key];
    });
  return next;
};

export const PSEUDO_SELECTORS = {
  _hover: '&:hover',
  _focus: '&:focus',
  _hoverAndFocus: '&:hover, &:focus',
  _focusWithin: '&:focus-within',
  _active: '&:active',
  _visited: '&:visited',
  _disabled: '&:disabled, &:disabled:focus, &:disabled:hover',
  _first: '&:first-of-type',
  _last: '&:last-of-type',
  _even: '&:nth-of-type(even)',
  _odd: '&:nth-of-type(odd)',
  _readOnly: '&[readonly]',
};
const createMediaQuery = (n: string) => `@media screen and (min-width: ${n})`;
const getValue = (n, scale) => get(scale, n, n);

export const get = (
  object: Theme,
  path: string | void,
  defaultValue: string | number | void
) => {
  // e.g., 'colors.blue.3' -> ['colors', 'blue', '4']
  const map = path && path.split ? path.split('.') : [path];
  let result: any = object;
  for (let p = 0; p < map.length; p++) {
    // For the length of the map, dive deeper into the object
    // and return the property at that depth
    result = result ? result[map[p]] : undefined;
  }
  return typeof result === 'undefined' ? defaultValue : result;
};

export const createParser = (config: Config) => {
  const cache: Cache = {};

  const parse = (props: { [x: string]: any }) => {
    let styles = {};
    let shouldSort = false;
    const isCacheDisabled = props.theme && props.theme.disableStyledSystemCache;

    const parseEntry = (obj, key: string) => {
      const systemConfig: PropertyConfig = config[key];
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
          (!isCacheDisabled && cache.breakpoints) ||
          get(props.theme, 'breakpoints');

        if (Array.isArray(propValue)) {
          if (typeof cache.breakpoints === 'undefined') {
            throw new Error(
              'The system props parser could not find a `breakpoints` property in the theme object, which is required for responsive styles to work. Make sure that the theme object has a breakpoints property.'
            );
          }

          cache.media = (!isCacheDisabled && cache.media) || [
            null,
            ...cache.breakpoints.map(createMediaQuery),
          ];

          return parseResponsiveStyle({
            mediaQueries: cache.media,
            systemConfig,
            scale,
            propValue,
            props: obj,
          });
        }

        if (propValue !== null) {
          shouldSort = true;
          return parseResponsiveObject({
            breakpoints: cache.breakpoints,
            systemConfig,
            scale,
            propValue,
            props: obj,
          });
        }
      }

      return systemConfig(propValue, scale, props);
    };

    for (const key in props) {
      // e.g., { _hover: { ... } }
      if (PSEUDO_SELECTORS[key]) {
        const pseudoSelector = PSEUDO_SELECTORS[key];
        const pseudoStyles = props[key];
        for (const pseudoStyleKey in pseudoStyles) {
          styles[pseudoSelector] = merge(
            styles[pseudoSelector],
            parseEntry(pseudoStyles, pseudoStyleKey)
          );

          // sort object-based responsive styles
          if (shouldSort) {
            styles[PSEUDO_SELECTORS[key]] = sort(styles[PSEUDO_SELECTORS[key]]);
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
      parse[key] = createParser({ [key]: config[key] });
    });
  }

  return parse;
};

const parseResponsiveStyle = ({
  mediaQueries,
  systemConfig,
  scale,
  propValue,
  props,
}) => {
  let styles = {};
  propValue.slice(0, mediaQueries.length).forEach((valueAtQuery, i) => {
    // e.g. <Box color={[theme => theme.colors.primary, theme => theme.colors.secondary]} />
    const value =
      typeof valueAtQuery === 'function'
        ? valueAtQuery(props.theme)
        : valueAtQuery;

    const media = mediaQueries[i];
    const style = systemConfig(value, scale, props);
    if (!media) {
      styles = mergeObj(styles, style);
    } else {
      styles = mergeObj(styles, {
        [media]: mergeObj(styles[media], style),
      });
    }
  });
  return styles;
};

const parseResponsiveObject = ({
  breakpoints,
  systemConfig,
  scale,
  propValue,
  props,
}: {
  breakpoints: BreakpointsArray | BreakpointsObject;
  scale: any;
  propValue: any;
  props: Props;
}) => {
  let styles = {};
  for (const key in propValue) {
    const breakpoint = breakpoints[key];
    const valueAtQuery = propValue[key];
    // e.g.
    // <Box
    //   color={{
    //     [bp.bp320]: t => t.colors.primary,
    //     [bp.bp640]: t => t.colors.secondary
    //   }}
    // />
    const value =
      typeof valueAtQuery === 'function'
        ? valueAtQuery(props.theme)
        : valueAtQuery;
    const style = systemConfig(value, scale, props);
    if (!breakpoint) {
      styles = mergeObj(styles, style);
    } else {
      const media = createMediaQuery(breakpoint);
      styles = mergeObj(styles, {
        [media]: mergeObj(styles[media], style),
      });
    }
  }
  return styles;
};

export const createStyleFunction = ({
  properties,
  property,
  scale,
  transform = getValue,
  defaultScale,
}) => {
  const _properties = properties || [property];
  const systemConfig = (value, scale, props) => {
    const result = {};
    const n = transform(value, scale, props);
    if (n === null) {
      return result;
    }
    _properties.forEach(prop => {
      result[prop] = n;
    });
    return result;
  };
  systemConfig.scale = scale;
  systemConfig.defaults = defaultScale;
  return systemConfig;
};

// new v5 API
export const system = (args = {}) => {
  const config = {};
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

  const parser = createParser(config);
  return parser;
};

export const compose = (...parsers) => {
  const config = parsers.reduce((acc, parser) => {
    if (!parser || !parser.config) {
      return acc;
    }
    return { ...acc, ...parser.config };
  }, {});
  const parser = createParser(config);

  return parser;
};
