import { PropConfigCollection, Theme, Transform } from '../types';
import { betterGet } from '../core/get';

const isNumber = (n: string | number): boolean =>
  typeof n === 'number' && !isNaN(n);

const getPosOrNegMargin = (n: string | number, scale: Theme) => {
  if (!isNumber(n)) {
    return betterGet(scale, n, n);
  }

  const num = n as number;

  const isNegative = n < 0;
  const absolute = Math.abs(num);
  const value = betterGet(scale, absolute, absolute);
  if (!isNumber(value)) {
    return isNegative ? '-' + value : value;
  }
  return value * (isNegative ? -1 : 1);
};

const getSpace: Transform = (value, _, props) => {
  if (typeof value === 'string' || typeof value === 'number') {
    const result = getPosOrNegMargin(value, props?.theme?.space);
    if (result) {
      return result;
    }
  }
  if (typeof value === 'string') {
    return value
      .split(' ')
      .reduce((acc: string[], curr: string) => {
        return [...acc, getPosOrNegMargin(curr, props?.theme?.space)];
      }, [])
      .join(' ');
  }
  return value;
};

export const position: PropConfigCollection = {
  position: true,
  zIndex: {
    property: 'zIndex',
    scale: 'zIndices',
  },
  top: {
    property: 'top',
    scale: 'space',
    transform: getSpace,
  },
  right: {
    property: 'right',
    scale: 'space',
    transform: getSpace,
  },
  bottom: {
    property: 'bottom',
    scale: 'space',
    transform: getSpace,
  },
  left: {
    property: 'left',
    scale: 'space',
    transform: getSpace,
  },
};

export default position;
