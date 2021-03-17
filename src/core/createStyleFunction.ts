// import { memoizedGet } from './get';
import {
  Props,
  // PropertyConfig,
  // SystemConfig,
  Cache,
  StyleFunction,
  Transform,
} from '../types';
import * as CSS from 'csstype';

const getValue: Transform = (get) => (value, scale, _props, strict) => {
  return get(scale, value, strict === true ? undefined : value);
};

export const createStyleFunction: StyleFunction = ({
  properties,
  property,
  scale,
  transform = getValue,
  defaultScale,
  get,
}) => {
  const _properties = properties || [property];

  if (typeof get !== 'function') {
    throw new Error('');
  }

  const systemConfig = (
    value: number | string,
    scale: any,
    props: Props,
    cache: Cache
  ) => {
    const result: Record<string, any> = {};

    let n = value;
    n = transform(get)(value, scale, props, cache.strict);

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
