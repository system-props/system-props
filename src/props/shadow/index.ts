import { betterGet } from '@/core/get';
import { Transform, PropConfigCollection, ResponsiveProp } from '@/types';
import { tokenizeValue } from '../tokenizeValue';
import { Property } from 'csstype';

export const getShadow: Transform = (value, _, props) => {
  let result = betterGet(props?.theme?.shadows, value);
  if (result) {
    return result;
  }
  if (typeof value === 'string') {
    return tokenizeValue(value)
      .map((chain) =>
        chain.map((val) => betterGet(props?.theme?.colors, val, val)).join(' ')
      )
      .join(', ');
  }
  return value;
};

export const shadow: PropConfigCollection = {
  boxShadow: {
    property: 'boxShadow',
    scale: 'shadows',
    transform: getShadow,
  },
  textShadow: {
    property: 'textShadow',
    scale: 'shadows',
    transform: getShadow,
  },
};

export interface ShadowProps {
  boxShadow?: ResponsiveProp<Property.BoxShadow>;
  textShadow?: ResponsiveProp<Property.TextShadow>;
}
