import { background } from './props/background';
import { border } from './props/border';
import { color } from './props/color';
import { grid } from './props/grid';
import { flexbox } from './props/flexbox';
import { layout } from './props/layout';
import { position } from './props/position';
import { shadow } from './props/shadow';
import { space } from './props/space';
import { typography } from './props/typography';
import { pseudoSelectors } from './pseudos';

const allProps = {
  ...pseudoSelectors,
  ...background,
  ...border,
  ...color,
  ...grid,
  ...flexbox,
  ...layout,
  ...position,
  ...shadow,
  ...space,
  ...typography,
};

export const propNames = Object.keys(allProps);
