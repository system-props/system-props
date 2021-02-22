import { memoizedGet } from './get';
import { Props, PropertyConfig, SystemConfig, Cache } from '../types';
import * as CSS from 'csstype';

const getValue = (
  value: string | number,
  scale: any,
  _props: Props,
  strict: boolean
) => {
  return memoizedGet(scale, value, strict === true ? undefined : value);
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
    value: number | string,
    scale: any,
    props: Props,
    cache: Cache
  ) => {
    const result: Record<string, any> = {};

    let n = value;
    n = transform(value, scale, props, cache.strict);

    if (n === null) {
      return result;
    }
    _properties.forEach((prop: keyof CSS.Properties | undefined) => {
      if (prop) {
        result[prop] = n;
      }
    });
    return result;
  };

  Object.assign(systemConfig, { scale, defaultScale });
  return systemConfig;
};
