import { Transform } from '../../core/types';
import { tokenizeValue } from '../tokenizeValue';

export const borderShorthandTransform: Transform = ({
  path,
  object,
  props,
  strict,
  get,
}) => {
  if (typeof path !== 'string') {
    return path;
  }
  let border = get(props?.theme?.borders || object, path);
  if (border) {
    return border;
  }
  const [[width, style, color]] = tokenizeValue(path);

  const borderWidth = get(
    props?.theme?.borderWidths,
    width,
    strict && !!object ? undefined : width
  );
  const borderStyle = get(
    props?.theme?.borderStyles,
    style,
    strict && !!object ? undefined : style
  );
  const borderColor = get(
    props?.theme?.colors,
    color,
    strict && !!object ? undefined : color
  );
  return [borderWidth, borderStyle, borderColor].filter(Boolean).join(' ');
};
