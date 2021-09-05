import { PropConfigCollection } from '../../core/types';

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

export default background;
