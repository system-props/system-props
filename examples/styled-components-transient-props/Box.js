import {
  createSystem,
  color,
  border,
  space,
  layout,
  position,
  shadow,
  background,
  flexbox,
  grid,
  shouldForwardProp,
} from 'system-props';
import styled from 'styled-components';

const system = createSystem();

const config = {
  ...color,
  ...border,
  ...background,
  ...flexbox,
  ...grid,
  ...shadow,
  ...position,
  ...layout,
  ...space,
  transform: true,
};

const transientConfig = Object.entries(config).reduce((acc, [prop, value]) => {
  return {
    ...acc,
    [`$${prop}`]: value,
  };
}, {});

console.log(transientConfig);

export const Box = styled('div')(system(transientConfig));
