import {
  createSystem,
  color,
  PseudoProps,
  AllSystemProps,
  SystemProp,
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
import styled from '@emotion/styled';
import * as CSS from 'csstype';

const system = createSystem();

interface BoxProps extends AllSystemProps, PseudoProps<AllSystemProps> {
  transform?: SystemProp<CSS.Property.Transform>;
}

export const Box = styled('div', { shouldForwardProp })<BoxProps>(
  system({
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
  })
);
