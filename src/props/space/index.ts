import { memoizedGet } from '@/core/get';
import { PropConfigCollection, Transform } from '@/types';
import { positiveOrNegative } from '../positiveOrNegative';

const getMargin: Transform = (value, _, props, strict) => {
  // Not using shorthand, just a theme value, e.g, m={4}
  if (typeof value === 'number') {
    const result = positiveOrNegative(
      value,
      props?.theme?.space,
      props,
      strict
    );
    if (result) {
      return result;
    }
  }

  if (typeof value === 'string') {
    const arr = value.split(' ');

    // applied to all sides, return a number or string
    // e.g., m="2" or m="$2"
    if (arr.length === 1) {
      return positiveOrNegative(value, props?.theme?.space, props, strict);
    }

    return arr
      .reduce((acc: string[], curr: string) => {
        let value = positiveOrNegative(
          curr,
          props?.theme?.space,
          props,
          strict
        );

        if (typeof value === 'number') {
          // if a number is returned, it's not converted
          // to a pixel value by the css parser in most libraries
          // so we need to make it a string with a pixel value
          value = `${value}px`;
        }
        return [...acc, value];
      }, [])
      .filter(Boolean)
      .join(' ');
  }

  return value;
};

const getPadding: Transform = (value, _, props, strict) => {
  // Not using shorthand, just a theme value, e.g, p={4}
  if (typeof value === 'number') {
    const result = memoizedGet(props?.theme?.space, value);
    if (result) {
      return result;
    }
  }

  if (typeof value === 'string') {
    const arr = value.split(' ');

    // applied to all sides, return a number or string
    // e.g., m="2" or m="$2"
    if (arr.length === 1) {
      return memoizedGet(
        props?.theme?.space,
        value,
        strict ? undefined : value
      );
    }

    return value
      .split(' ')
      .reduce((acc: string[], curr: string) => {
        let value = memoizedGet(
          props?.theme?.space,
          curr,
          strict ? undefined : curr
        );
        if (typeof value === 'number') {
          // if a number is returned, it's not converted
          // to a pixel value by the css parser in most libraries
          // so we need to make it a string with a pixel value
          value = `${value}px`;
        }
        return [...acc, value];
      }, [])
      .filter(Boolean)
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
