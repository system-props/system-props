import { PropConfigCollection, ResponsiveProp } from '@/types';
import { positiveOrNegative } from '../positiveOrNegative';
import { Property } from 'csstype';

export const position: PropConfigCollection = {
  position: true,
  zIndex: {
    property: 'zIndex',
    scale: 'zIndices',
  },
  top: {
    property: 'top',
    scale: 'space',
    transform: positiveOrNegative,
  },
  right: {
    property: 'right',
    scale: 'space',
    transform: positiveOrNegative,
  },
  bottom: {
    property: 'bottom',
    scale: 'space',
    transform: positiveOrNegative,
  },
  left: {
    property: 'left',
    scale: 'space',
    transform: positiveOrNegative,
  },
};

export interface PositionProps {
  position?: ResponsiveProp<Property.Position>;
  top?: ResponsiveProp<Property.Top>;
  left?: ResponsiveProp<Property.Left>;
  right?: ResponsiveProp<Property.Right>;
  bottom?: ResponsiveProp<Property.Bottom>;
  zIndex?: ResponsiveProp<Property.ZIndex>;
}
