import { PropConfigCollection } from '../../core/types';
import { borderShorthandTransform } from './borderShorthandTransform';

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
