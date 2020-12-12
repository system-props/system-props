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
import styled from 'styled-components';
import * as CSS from 'csstype';

const system = createSystem();

interface BaseProps extends AllSystemProps<'prefix'> {
  transform?: SystemProp<CSS.Property.Transform>;
}

interface BoxProps extends BaseProps, PseudoProps<BaseProps> {}

export const Box = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    shouldForwardProp(prop) && defaultValidatorFn(prop),
})<BoxProps>(
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