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
  typography,
  shouldForwardProp,
} from 'system-props';
import styled from 'styled-components';
import * as CSS from 'csstype';

const system = createSystem();

interface BaseProps extends AllSystemProps<'all'> {
  transform?: SystemProp<CSS.Property.Transform>;
  textDecoration?: SystemProp<CSS.Property.TextDecoration>;
  transition?: SystemProp<CSS.Property.Transition>;
}

interface BoxProps extends BaseProps, PseudoProps<BaseProps> {}

export const Box = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    shouldForwardProp(prop) && defaultValidatorFn(prop),
})<BoxProps>(
  { boxSizing: 'border-box' },
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
    ...typography,
    transform: true,
    textDecoration: true,
    transition: true,
  })
);
