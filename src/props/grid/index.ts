import { PropConfigCollection } from '../../types';

export const grid: PropConfigCollection = {
  gap: {
    property: 'gap',
    scale: 'space',
  },
  gridGap: {
    property: 'gridGap',
    scale: 'space',
  },
  gridColumnGap: {
    property: 'gridColumnGap',
    scale: 'space',
  },
  gridRowGap: {
    property: 'gridRowGap',
    scale: 'space',
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  // Grid Item props
  gridArea: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridRowStart: true,
  gridRowEnd: true,
  justifySelf: true,
  alignSelf: true,
  placeSelf: true
};

export default grid;
