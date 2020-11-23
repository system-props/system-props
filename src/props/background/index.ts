import { PropConfigCollection, ResponsiveProp } from '@/types';
import { Property } from 'csstype';

export const background: PropConfigCollection = {
  background: true,
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
};

background.bgImage = background.backgroundImage;
background.bgSize = background.backgroundSize;
background.bgPosition = background.backgroundPosition;
background.bgRepeat = background.backgroundRepeat;

export interface BackgroundProps {
  background?: ResponsiveProp<Property.Background>;
  backgroundImage?: ResponsiveProp<Property.BackgroundImage>;
  bgImage?: ResponsiveProp<Property.BackgroundImage>;
  backgroundSize?: ResponsiveProp<Property.BackgroundSize>;
  bgSize?: ResponsiveProp<Property.BackgroundSize>;
  backgroundPosition?: ResponsiveProp<Property.BackgroundPosition>;
  bgPosition?: ResponsiveProp<Property.BackgroundPosition>;
  backgroundRepeat?: ResponsiveProp<Property.BackgroundRepeat>;
  bgRepeat?: ResponsiveProp<Property.BackgroundRepeat>;
}

export default background;
