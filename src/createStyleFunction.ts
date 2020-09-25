import { betterGet } from './get';
import { Props, PropertyConfig, SystemConfig, Cache } from './types';

const getValue = (value: unknown, scale: {}) => {
  return betterGet(scale, value, value);
};

export const createStyleFunction = ({
  properties,
  property,
  scale,
  transform = getValue,
  defaultScale,
}: PropertyConfig): SystemConfig => {
  const _properties = properties || [property];

  const systemConfig = (
    value: unknown,
    scale: string,
    props: Props,
    cache: Cache
  ) => {
    const result: { [key: string]: unknown } = {};
    // @ts-ignore
    let n;
    if (typeof value === 'string' && cache.system[value]) {
      n = cache.system[value];
    } else {
      n = transform(value, scale, props);
      // @ts-ignore
      cache.system[value] = n;
    }
    if (n === null) {
      return result;
    }
    _properties.forEach(prop => {
      if (prop) {
        // @ts-ignore
        result[prop] = n;
      }
    });
    return result;
  };

  Object.assign(systemConfig, { scale, defaultScale });
  return systemConfig;
};
