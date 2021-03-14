import { PropConfigCollection } from '../../types';

export const gridItem: PropConfigCollection = {
  gridArea: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridRowStart: true,
  gridRowEnd: true,
  justifySelf: true,
  alignSelf: true,
  placeSelf: true,
};

export const gridContainer: PropConfigCollection = {
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
};

export const grid: PropConfigCollection = {
  ...gridItem,
  ...gridContainer,
};

export default grid;
