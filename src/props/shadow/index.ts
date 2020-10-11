import { betterGet } from '@/core/get';
import { Transform, PropConfigCollection } from '@/types';

const getShadow: Transform = (value, _, props) => {
  let result = betterGet(props?.theme?.shadows, value);
  if (result) {
    return result;
  }
  if (typeof value === 'string') {
    const arr = value.split(' ');
    const maybeColor = arr.pop();
    const foundColor = betterGet(props?.theme?.colors, maybeColor);
    if (foundColor) {
      return `${arr.join(' ')} ${foundColor}`;
    }
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

export default shadow;
