import { betterGet } from '@/core/get';
import { PropConfigCollection, Transform, Theme } from '@/types';

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

const getMargin: Transform = (value, _, props) => {
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

const getPadding: Transform = (value, _, props) => {
  if (typeof value === 'string' || typeof value === 'number') {
    const result = betterGet(props?.theme?.space, value);
    if (result) {
      return result;
    }
  }
  if (typeof value === 'string') {
    return value
      .split(' ')
      .reduce((acc: string[], curr: string) => {
        return [...acc, betterGet(props?.theme?.space, curr)];
      }, [])
      .join(' ');
  }
  return value;
};

export const margin: PropConfigCollection = {
  margin: {
    property: 'margin',
    scale: 'space',
    transform: getMargin,
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
    transform: getMargin,
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
    transform: getMargin,
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
    transform: getMargin,
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    transform: getMargin,
  },
  marginX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    transform: getMargin,
  },
  marginY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    transform: getMargin,
  },
};
margin.m = margin.margin;
margin.mt = margin.marginTop;
margin.mr = margin.marginRight;
margin.mb = margin.marginBottom;
margin.ml = margin.marginLeft;
margin.mx = margin.marginX;
margin.my = margin.marginY;

export const padding: PropConfigCollection = {
  padding: {
    property: 'padding',
    scale: 'space',
    transform: getPadding,
  },
  paddingTop: {
    property: 'paddingTop',
    scale: 'space',
    transform: getPadding,
  },
  paddingRight: {
    property: 'paddingRight',
    scale: 'space',
    transform: getPadding,
  },
  paddingBottom: {
    property: 'paddingBottom',
    scale: 'space',
    transform: getPadding,
  },
  paddingLeft: {
    property: 'paddingLeft',
    scale: 'space',
    transform: getPadding,
  },
  paddingX: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
    transform: getPadding,
  },
  paddingY: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
    transform: getPadding,
  },
};
padding.p = padding.padding;
padding.pt = padding.paddingTop;
padding.pr = padding.paddingRight;
padding.pb = padding.paddingBottom;
padding.pl = padding.paddingLeft;
padding.px = padding.paddingX;
padding.py = padding.paddingY;

export const space = { ...padding, ...margin };

export default space;
