import { Transform } from '../../types';
import { memoizedGet } from '../../core/get';
import { tokenizeValue } from '../tokenizeValue';

export const borderShorthandTransform: Transform = (
  value,
  scale,
  props,
  strict
) => {
  if (typeof value !== 'string') {
    return value;
  }
  let border = memoizedGet(props?.theme?.borders || scale, value);
  if (border) {
    return border;
  }
  const [[width, style, color]] = tokenizeValue(value);
  const borderWidth = memoizedGet(
    props?.theme?.borderWidths,
    width,
    strict ? undefined : width
  );
  const borderStyle = memoizedGet(
    props?.theme?.borderStyles,
    style,
    strict ? undefined : style
  );
  const borderColor = memoizedGet(
    props?.theme?.colors,
    color,
    strict ? undefined : color
  );
  return [borderWidth, borderStyle, borderColor].filter(Boolean).join(' ');
};
