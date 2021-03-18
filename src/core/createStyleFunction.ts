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

const defaultTransform: Transform = ({ path, object, strict, get }) => {
  return get(object, path, strict === true ? undefined : path);
};

export const createStyleFunction: StyleFunction = ({
  properties,
  property,
  scale,
  transform = defaultTransform,
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
    n = transform({
      path: value,
      object: scale,
      props,
      strict: cache.strict,
      get,
    });

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
