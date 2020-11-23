import { PropConfigCollection, ResponsiveProp } from '@/types';
import { Property } from 'csstype';

export const layout: PropConfigCollection = {
  width: {
    property: 'width',
    scale: 'sizes',
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
