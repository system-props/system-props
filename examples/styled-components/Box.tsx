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

const extraProps = {
  transform: true,
  textDecoration: true,
  transition: true,
} as const;

type BaseProps = AllSystemProps<'prefix'> &
  {
    [k in keyof typeof extraProps]?: SystemProp<CSS.Properties[k]>;
  };

interface BoxProps extends BaseProps, PseudoProps<BaseProps> {}

export const Box = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    shouldForwardProp(prop) &&
    defaultValidatorFn(prop) &&
    !Object.keys(extraProps).includes(prop),
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
    ...extraProps,
  })
);
