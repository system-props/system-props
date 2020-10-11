import { PropConfigCollection, Transform } from '../types';
import { get } from '../core';

const isNumber = (n: unknown) => typeof n === 'number' && !isNaN(n);

const getWidth: Transform = (
  value: unknown,
  scale: { [x: string]: unknown }
) => {
  let defaultValue = value;
  if (isNumber(value)) {
    const n = value as number;
    defaultValue = n > 1 ? value : `${n * 100}%`;
  }
  return get(scale, value, defaultValue);
  // return get(scale, n, !isNumber(n) || n > 1 ? n : n * 100 + '%');
};

export const layout: PropConfigCollection = {
  width: {
    property: 'width',
    scale: 'sizes',
    transform: getWidth,
  },
  height: {
    property: 'height',
    scale: 'sizes',
  },
  minWidth: {
    property: 'minWidth',
    scale: 'sizes',
  },
  minHeight: {
    property: 'minHeight',
    scale: 'sizes',
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'sizes',
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'sizes',
  },
  size: {
    properties: ['width', 'height'],
    scale: 'sizes',
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
};

export default layout;
