import { betterGet } from './get';
import { Props, PropertyConfig, SystemConfig } from './types';

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

  const systemConfig = (value: unknown, scale: string, props: Props) => {
    const result: { [key: string]: unknown } = {};
    const n = transform(value, scale, props);
    if (n === null) {
      return result;
    }
    _properties.forEach(prop => {
      if (prop) {
        result[prop] = n;
      }
    });
    return result;
  };

  Object.assign(systemConfig, { scale, defaultScale });
  return systemConfig;
};
