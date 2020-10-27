import { betterGet } from '@/core/get';
import { PropConfigCollection, Transform } from '@/types';
import { positiveOrNegative } from '../positiveOrNegative';

const getMargin: Transform = (value, _, props) => {
  if (typeof value === 'string' || typeof value === 'number') {
    const result = positiveOrNegative(value, props?.theme?.space);
    if (result) {
      return result;
    }
  }
  if (typeof value === 'string') {
    return value
      .split(' ')
      .reduce((acc: string[], curr: string) => {
        return [...acc, positiveOrNegative(curr, props?.theme?.space)];
      }, [])
      .filter(Boolean)
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
    const result = value
      .split(' ')
      .reduce((acc: string[], curr: string) => {
        return [...acc, betterGet(props?.theme?.space, curr, curr)];
      }, [])
      .filter(Boolean)
      .join(' ');
    console.log(result);
    return result;
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
