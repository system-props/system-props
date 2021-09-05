import { PropConfigCollection } from '../../core/types';
import { positiveOrNegative } from '../positiveOrNegative';

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
