import { betterGet } from '../get';
import { PropConfigCollection, Transform, Theme } from '../types';

const isNumber = (n: string | number): boolean =>
  typeof n === 'number' && !isNaN(n);

const getMargin = (n: string | number, scale: Theme) => {
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
    const result = getMargin(value, props?.theme?.space);
    if (result) {
      return result;
    }
  }
  if (typeof value === 'string') {
    return value
      .split(' ')
      .reduce((acc: string[], curr: string) => {
        return [...acc, getMargin(curr, props?.theme?.space)];
      }, [])
      .join(' ');
  }
  return value;
};

export const margin: PropConfigCollection = {
  margin: {
    property: 'margin',
    scale: 'space',
    transform: getSpace,
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
    transform: getSpace,
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
    transform: getSpace,
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
    transform: getSpace,
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    transform: getSpace,
  },
  marginX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    transform: getSpace,
  },
  marginY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    transform: getSpace,
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
    transform: getSpace,
  },
  paddingTop: {
    property: 'paddingTop',
    scale: 'space',
    transform: getSpace,
  },
  paddingRight: {
    property: 'paddingRight',
    scale: 'space',
    transform: getSpace,
  },
  paddingBottom: {
    property: 'paddingBottom',
    scale: 'space',
    transform: getSpace,
  },
  paddingLeft: {
    property: 'paddingLeft',
    scale: 'space',
    transform: getSpace,
  },
  paddingX: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
    transform: getSpace,
  },
  paddingY: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
    transform: getSpace,
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
