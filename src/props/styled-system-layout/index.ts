import { PropConfigCollection, Transform } from '../../types';
import { get } from '../../core/get';
import { Property } from 'csstype';

const isNumber = (n: unknown) => typeof n === 'number' && !isNaN(n);

const getWidth: Transform = (value, scale) => {
  let defaultValue = value;
  if (isNumber(value)) {
    const n = value as number;
    defaultValue = n > 1 ? value : `${n * 100}%`;
  }
  return get(scale, value, defaultValue);
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

export interface LayoutProps {
  height?: Property.Height;
  width?: Property.Width;
  minWidth?: Property.MinWidth;
  minHeight?: Property.MinHeight;
  maxWidth?: Property.MaxWidth;
  maxHeight?: Property.MaxHeight;
  size?: Property.Width;
  overflow?: Property.Overflow;
  overflowX?: Property.OverflowX;
  overflowY?: Property.OverflowY;
  display?: Property.Display;
  verticalAlign?: Property.VerticalAlign;
}
