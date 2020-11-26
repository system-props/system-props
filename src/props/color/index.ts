import {
  PropConfigCollection,
  ResponsiveProp,
  Theme,
  ResponsiveObjectValue,
  ResponsiveArrayValue,
} from '@/types';
import * as CSS from 'csstype';

const config: PropConfigCollection = {
  color: {
    property: 'color',
    scale: 'colors',
  },
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors',
  },
  fill: {
    property: 'fill',
    scale: 'colors',
  },
  stroke: {
    property: 'stroke',
    scale: 'colors',
  },
  opacity: true,
};
config.bg = config.backgroundColor;

type Colors<T extends Theme> = keyof T['colors'];

export type BaseColorProps = {
  color?: CSS.Property.Color;
  backgroundColor?: CSS.Property.BackgroundColor;
  bg?: CSS.Property.BackgroundColor;
  fill?: CSS.Property.Fill;
  stroke?: CSS.Property.Stroke;
};

// export type BaseColorProps<T extends Theme> = {
//   [K in keyof One]?: ResponsiveProp<keyof T['colors']>;
//   // [K in keyof CoreColorProps]?: Theme extends StrictTheme
//   //   ? keyof Theme['colors']
//   //   : CoreColorProps[K];
// } & { opacity?: ResponsiveProp<CSS.Property.Opacity> };

// export interface BaseColorProps {
//   color?: keyof Theme['colors'];
// }

export const color = config;
