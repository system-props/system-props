import { Theme } from '@/types';
import { betterGet } from '@/core/get';

const isNumber = (n: unknown): boolean => typeof n === 'number' && !isNaN(n);

export const positiveOrNegative = (n: unknown, scale: Theme) => {
  if (!isNumber(n)) {
    if (typeof n === 'string' && n.startsWith('-')) {
      const raw = n.slice(1);
      const value = betterGet(scale, raw, raw);
      if (isNumber(value)) {
        return value * -1;
      }
      return `-${value}`;
    }
    return betterGet(scale, n, n);
  }

  const num = n as number;

  const isNegative = num < 0;
  const absolute = Math.abs(num);
  const value = betterGet(scale, absolute, absolute);
  if (isNumber(value)) {
    return value * (isNegative ? -1 : 1);
  }
  return isNegative ? `-${value}` : value;
};
