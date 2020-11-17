import {
  Cache,
  SystemConfig,
  ResponsiveObject,
  ResponsiveArray,
  Theme,
  Props,
} from '@/types';

const createMediaQuery = (n: string) => `@media screen and (min-width: ${n})`;

export const parseResponsiveStyle = ({
  cache,
  systemConfig,
  scale,
  propValue,
  props,
}: {
  cache: Cache;
  systemConfig: SystemConfig;
  scale: string;
  propValue: Array<
    string | number | ((arg0: Theme | undefined) => string | number)
  >;
  props: Props;
}) => {
  let styles = {};
  const mediaQueries = cache.media as ResponsiveArray<string | number>;
  propValue.slice(0, mediaQueries.length).forEach((valueAtQuery, i) => {
    // e.g. <Box color={[theme => theme.colors.primary, theme => theme.colors.secondary]} />
    const value =
      typeof valueAtQuery === 'function'
        ? valueAtQuery(props.theme)
        : valueAtQuery;

    const media = mediaQueries[i];
    // @ts-ignore
    const style: SystemConfig = systemConfig(value, scale, props, cache);

    if (!media) {
      styles = { ...styles, ...style };
    } else {
      styles = {
        ...styles,
        [media]: {
          // @ts-ignore
          ...styles[media],
          ...style,
        },
      };
    }
  });
  return styles;
};

export const parseResponsiveObject = ({
  cache,
  systemConfig,
  scale,
  propValue,
  props,
}: {
  cache: Cache;
  systemConfig: SystemConfig;
  scale: string;
  propValue: {
    [x: string]:
      | string
      | number
      | ((arg0: Theme | undefined) => string | number);
  };
  props: Props;
}) => {
  const breakpoints = cache.breakpoints as ResponsiveObject<string>;
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
    // @ts-ignore
    const style = systemConfig(value, scale, props, cache);
    if (!breakpoint) {
      styles = { ...styles, ...style };
    } else {
      const media = createMediaQuery(breakpoint);
      styles = {
        ...styles,
        [media]: {
          // @ts-ignore
          ...styles[media],
          ...style,
        },
      };
    }
  }
  return styles;
};
