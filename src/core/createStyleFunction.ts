import { betterGet } from './get';
import { Props, PropertyConfig, SystemConfig, Cache } from '../types';

const getValue = (
  value: unknown,
  scale: {},
  _props: Props,
  strict: boolean,
  undef?: undefined
) => {
  return betterGet(scale, value, strict === true ? undef : value);
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
    const n = transform(value, scale, props, cache.strict);
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
