import { Transform } from '../../types';
import { tokenizeValue } from '../tokenizeValue';

export const getShadow: Transform = ({ path, object, get, props }) => {
  let result = get(object, path);
  if (result) {
    return result;
  }
  if (typeof path === 'string') {
    return tokenizeValue(path)
      .map((chain) =>
        chain.map((val) => get(props?.theme?.colors, val, val)).join(' ')
      )
      .join(', ');
  }
  return path;
};
