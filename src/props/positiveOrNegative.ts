import { Transform } from '../core/types';

const isNumber = (n: unknown): boolean => typeof n === 'number' && !isNaN(n);

export const positiveOrNegative: Transform = ({
  path,
  object,
  strict,
  get,
}) => {
  if (!isNumber(path)) {
    if (typeof path === 'string' && path.startsWith('-')) {
      const raw = path.slice(1);
      const value = get(object, raw, raw);
      if (isNumber(value)) {
        return value * -1;
      }
      return `-${value}`;
    }
    return get(object, path, strict ? undefined : path);
  }

  const num = path as number;

  const isNegative = num < 0;
  const absolute = Math.abs(num);
  const value = get(object, absolute, strict ? undefined : absolute);
  if (isNumber(value)) {
    return value * (isNegative ? -1 : 1);
  }

  if (value == null) {
    return;
  }

  return isNegative ? `-${value}` : value;
};
