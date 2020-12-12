import { memoizedGet } from '@/core/get';
import { Transform, PropConfigCollection } from '@/types';
import { tokenizeValue } from '../tokenizeValue';

export const getShadow: Transform = (value, _, props) => {
  let result = memoizedGet(props?.theme?.shadows, value);
  if (result) {
    return result;
  }
  if (typeof value === 'string') {
    return tokenizeValue(value)
      .map((chain) =>
        chain
          .map((val) => memoizedGet(props?.theme?.colors, val, val))
          .join(' ')
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
