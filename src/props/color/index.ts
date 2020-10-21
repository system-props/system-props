import { PropConfigCollection } from '@/types';

const config: PropConfigCollection = {
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
config.bg = config.backgroundColor;

export const color = config;

export default color;
