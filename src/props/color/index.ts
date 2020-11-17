import { PropConfigCollection, ResponsiveProp } from '@/types';
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

export interface ColorProps {
  color?: ResponsiveProp<CSS.Property.Color>;
  backgroundColor?: ResponsiveProp<CSS.Property.Color>;
  bg?: ResponsiveProp<CSS.Property.Color>;
  fill?: ResponsiveProp<CSS.Property.Color>;
  stroke?: ResponsiveProp<CSS.Property.Color>;
  opacity?: ResponsiveProp<CSS.Property.Opacity>;
}

export const color = config;

export default color;
