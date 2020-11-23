import { PropConfigCollection, Transform, ResponsiveProp } from '@/types';
import { get } from '@/core';
import { Property } from 'csstype';

const isNumber = (n: unknown) => typeof n === 'number' && !isNaN(n);

const getWidth: Transform = (
  value: unknown,
  scale: { [x: string]: unknown }
) => {
  let defaultValue = value;
  if (isNumber(value)) {
    const n = value as number;
    defaultValue = n > 1 ? value : `${n * 100}%`;
  }
  return get(scale, value, defaultValue);
};

export const layout: PropConfigCollection = {
  width: {
    property: 'width',
    scale: 'sizes',
    transform: getWidth,
  },
  height: {
    property: 'height',
    scale: 'sizes',
  },
  minWidth: {
    property: 'minWidth',
    scale: 'sizes',
  },
  minHeight: {
    property: 'minHeight',
    scale: 'sizes',
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'sizes',
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'sizes',
  },
  size: {
    properties: ['width', 'height'],
    scale: 'sizes',
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
};

export interface LayoutProps {
  height?: ResponsiveProp<Property.Height>;
  width?: ResponsiveProp<Property.Width>;
  minWidth?: ResponsiveProp<Property.MinWidth>;
  minHeight?: ResponsiveProp<Property.MinHeight>;
  maxWidth?: ResponsiveProp<Property.MaxWidth>;
  maxHeight?: ResponsiveProp<Property.MaxHeight>;
  size?: ResponsiveProp<Property.Width>;
  overflow?: ResponsiveProp<Property.Overflow>;
  overflowX?: ResponsiveProp<Property.OverflowX>;
  overflowY?: ResponsiveProp<Property.OverflowY>;
  display?: ResponsiveProp<Property.Display>;
  verticalAlign?: ResponsiveProp<Property.VerticalAlign>;
}
