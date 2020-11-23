import { PropConfigCollection, ResponsiveProp } from '@/types';
import { Property } from 'csstype';

export const typography: PropConfigCollection = {
  fontFamily: {
    property: 'fontFamily',
    scale: 'fonts',
  },
  fontSize: {
    property: 'fontSize',
    scale: 'fontSizes',
  },
  fontWeight: {
    property: 'fontWeight',
    scale: 'fontWeights',
  },
  lineHeight: {
    property: 'lineHeight',
    scale: 'lineHeights',
  },
  letterSpacing: {
    property: 'letterSpacing',
    scale: 'letterSpacings',
  },
  textAlign: true,
  fontStyle: true,
};

export interface TypographyProps {
  fontFamily?: ResponsiveProp<Property.FontFamily>;
  fontSize?: ResponsiveProp<Property.FontSize>;
  fontWeight?: ResponsiveProp<Property.FontWeight>;
  fontStyle?: ResponsiveProp<Property.FontStyle>;
  lineHeight?: ResponsiveProp<Property.LineHeight>;
  letterSpacing?: ResponsiveProp<Property.LetterSpacing>;
  textAlign?: ResponsiveProp<Property.TextAlign>;
}
