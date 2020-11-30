import { PropConfigCollection } from '@/types';

export const color: PropConfigCollection = {
  color: {
    property: 'color',
    scale: 'colors',
  },
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors',
  },
  fill: {
    property: 'fill',
    scale: 'colors',
  },
  stroke: {
    property: 'stroke',
    scale: 'colors',
  },
  opacity: true,
};
color.bg = color.backgroundColor;
