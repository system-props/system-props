import { betterGet } from '@/core/get';
import {
  PropConfigCollection,
  Transform,
  ResponsiveProp,
  Theme,
  StrictTheme,
} from '@/types';
import { positiveOrNegative } from '../positiveOrNegative';
import { Property } from 'csstype';

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
    const result = betterGet(props?.theme?.space, value);
    if (result) {
      return result;
    }
  }

  if (typeof value === 'string') {
    const arr = value.split(' ');

    // applied to all sides, return a number or string
    // e.g., m="2" or m="$2"
    if (arr.length === 1) {
      return betterGet(props?.theme?.space, value, strict ? undefined : value);
    }

    return value
      .split(' ')
      .reduce((acc: string[], curr: string) => {
        let value = betterGet(
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

export interface PaddingProps {
  padding?: ResponsiveProp<Property.Padding>;
  paddingTop?: ResponsiveProp<Property.PaddingTop>;
  paddingRight?: ResponsiveProp<Property.PaddingRight>;
  paddingLeft?: ResponsiveProp<Property.PaddingLeft>;
  paddingBottom?: ResponsiveProp<Property.PaddingBottom>;
  paddingX?: ResponsiveProp<Property.PaddingLeft>;
  paddingY?: ResponsiveProp<Property.PaddingTop>;
  p?: ResponsiveProp<Property.Padding>;
  pt?: ResponsiveProp<Property.PaddingTop>;
  pr?: ResponsiveProp<Property.PaddingRight>;
  pl?: ResponsiveProp<Property.PaddingLeft>;
  pb?: ResponsiveProp<Property.PaddingBottom>;
  px?: ResponsiveProp<Property.PaddingLeft>;
  py?: ResponsiveProp<Property.PaddingTop>;
}

export interface MarginProps {
  margin?: ResponsiveProp<Property.Margin>;
  marginTop?: ResponsiveProp<Property.MarginTop>;
  marginRight?: ResponsiveProp<Property.MarginRight>;
  marginLeft?: ResponsiveProp<Property.MarginLeft>;
  marginBottom?: ResponsiveProp<Property.MarginBottom>;
  marginX?: ResponsiveProp<Property.MarginLeft>;
  marginY?: ResponsiveProp<Property.MarginTop>;
  m?: ResponsiveProp<Property.Margin>;
  mt?: ResponsiveProp<Property.MarginTop>;
  mr?: ResponsiveProp<Property.MarginRight>;
  ml?: ResponsiveProp<Property.MarginLeft>;
  mb?: ResponsiveProp<Property.MarginBottom>;
  mx?: ResponsiveProp<Property.MarginLeft>;
  my?: ResponsiveProp<Property.MarginTop>;
}

// export interface SpaceProps extends MarginProps, PaddingProps {}

type MorePadding = {
  [K in keyof PaddingProps]?: Theme extends StrictTheme
    ? ResponsiveProp<keyof Theme['space']>
    : PaddingProps[K];
};
type MoreMargin = {
  [K in keyof MarginProps]?: Theme extends StrictTheme
    ? ResponsiveProp<keyof Theme['space']>
    : MarginProps[K];
};

export type SpaceProps = MorePadding & MoreMargin;
