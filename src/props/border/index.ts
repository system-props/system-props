import { betterGet } from '@/core/get';
import { PropConfigCollection, Transform, ResponsiveProp } from '@/types';
import { tokenizeValue } from '../tokenizeValue';
import { Property } from 'csstype';

export const borderShorthandTransform: Transform = (
  value,
  scale,
  props,
  strict
) => {
  if (typeof value !== 'string') {
    return value;
  }
  let border = betterGet(props?.theme?.borders || scale, value);
  if (border) {
    return border;
  }
  const [[width, style, color]] = tokenizeValue(value);
  const borderWidth = betterGet(
    props?.theme?.borderWidths,
    width,
    strict ? undefined : width
  );
  const borderStyle = betterGet(
    props?.theme?.borderStyles,
    style,
    strict ? undefined : style
  );
  const borderColor = betterGet(
    props?.theme?.colors,
    color,
    strict ? undefined : color
  );
  return [borderWidth, borderStyle, borderColor].filter(Boolean).join(' ');
};

const config: PropConfigCollection = {
  border: {
    property: 'border',
    scale: 'borders',
    transform: borderShorthandTransform,
  },
  borderWidth: {
    property: 'borderWidth',
    scale: 'borderWidths',
  },
  borderStyle: {
    property: 'borderStyle',
    scale: 'borderStyles',
  },
  borderColor: {
    property: 'borderColor',
    scale: 'colors',
  },
  borderRadius: {
    property: 'borderRadius',
    scale: 'radii',
  },
  borderTop: {
    property: 'borderTop',
    scale: 'borders',
    transform: borderShorthandTransform,
  },
  borderTopLeftRadius: {
    property: 'borderTopLeftRadius',
    scale: 'radii',
  },
  borderTopRightRadius: {
    property: 'borderTopRightRadius',
    scale: 'radii',
  },
  borderRight: {
    property: 'borderRight',
    scale: 'borders',
    transform: borderShorthandTransform,
  },
  borderBottom: {
    property: 'borderBottom',
    scale: 'borders',
    transform: borderShorthandTransform,
  },
  borderBottomLeftRadius: {
    property: 'borderBottomLeftRadius',
    scale: 'radii',
  },
  borderBottomRightRadius: {
    property: 'borderBottomRightRadius',
    scale: 'radii',
  },
  borderLeft: {
    property: 'borderLeft',
    scale: 'borders',
    transform: borderShorthandTransform,
  },
  borderX: {
    properties: ['borderLeft', 'borderRight'],
    scale: 'borders',
    transform: borderShorthandTransform,
  },
  borderY: {
    properties: ['borderTop', 'borderBottom'],
    scale: 'borders',
    transform: borderShorthandTransform,
  },
};

config.borderTopWidth = {
  property: 'borderTopWidth',
  scale: 'borderWidths',
};

config.borderTopColor = {
  property: 'borderTopColor',
  scale: 'colors',
};
config.borderTopStyle = {
  property: 'borderTopStyle',
  scale: 'borderStyles',
};
config.borderTopLeftRadius = {
  property: 'borderTopLeftRadius',
  scale: 'radii',
};
config.borderTopRightRadius = {
  property: 'borderTopRightRadius',
  scale: 'radii',
};
config.borderBottomWidth = {
  property: 'borderBottomWidth',
  scale: 'borderWidths',
};
config.borderBottomColor = {
  property: 'borderBottomColor',
  scale: 'colors',
};
config.borderBottomStyle = {
  property: 'borderBottomStyle',
  scale: 'borderStyles',
};
config.borderBottomLeftRadius = {
  property: 'borderBottomLeftRadius',
  scale: 'radii',
};
config.borderBottomRightRadius = {
  property: 'borderBottomRightRadius',
  scale: 'radii',
};
config.borderLeftWidth = {
  property: 'borderLeftWidth',
  scale: 'borderWidths',
};
config.borderLeftColor = {
  property: 'borderLeftColor',
  scale: 'colors',
};
config.borderLeftStyle = {
  property: 'borderLeftStyle',
  scale: 'borderStyles',
};
config.borderRightWidth = {
  property: 'borderRightWidth',
  scale: 'borderWidths',
};
config.borderRightColor = {
  property: 'borderRightColor',
  scale: 'colors',
};
config.borderRightStyle = {
  property: 'borderRightStyle',
  scale: 'borderStyles',
};

export const border = config;

export interface BorderProps {
  border?: ResponsiveProp<Property.Border>;
  borderX?: ResponsiveProp<Property.Border>;
  borderY?: ResponsiveProp<Property.Border>;
  borderRight?: ResponsiveProp<Property.BorderRight>;
  borderLeft?: ResponsiveProp<Property.BorderLeft>;
  borderTop?: ResponsiveProp<Property.BorderTop>;
  borderColor?: ResponsiveProp<Property.BorderColor>;
  borderRightColor?: ResponsiveProp<Property.BorderRightColor>;
  borderLeftColor?: ResponsiveProp<Property.BorderLeftColor>;
  borderTopColor?: ResponsiveProp<Property.BorderTopColor>;
  borderStyle?: ResponsiveProp<Property.BorderColor>;
  borderRightStyle?: ResponsiveProp<Property.BorderRightColor>;
  borderLeftStyle?: ResponsiveProp<Property.BorderLeftColor>;
  borderTopStyle?: ResponsiveProp<Property.BorderTopColor>;
  borderWidth?: ResponsiveProp<Property.BorderWidth>;
  borderRightWidth?: ResponsiveProp<Property.BorderRightWidth>;
  borderLeftWidth?: ResponsiveProp<Property.BorderLeftWidth>;
  borderTopWidth?: ResponsiveProp<Property.BorderTopWidth>;
  borderRadius?: ResponsiveProp<Property.BorderRadius>;
  borderTopLeftRadius?: ResponsiveProp<Property.BorderTopLeftRadius>;
  borderTopRightRadius?: ResponsiveProp<Property.BorderTopRightRadius>;
  borderBottomLeftRadius?: ResponsiveProp<Property.BorderBottomLeftRadius>;
  borderBottomRightRadius?: ResponsiveProp<Property.BorderBottomRightRadius>;
}
