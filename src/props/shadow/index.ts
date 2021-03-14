import { PropConfigCollection } from '../../types';
import { getShadow } from './getShadow';

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
