import { createSystem, shouldForwardProp, css } from 'system-props';
import { config, BoxProps } from './system-props.config';
import styled from 'styled-components';

const system = createSystem();

export const Box = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidtorFn) =>
    shouldForwardProp(prop) && defaultValidtorFn(prop),
})<BoxProps<'noprefix'>>(
  { boxSizing: 'border-box' },
  system(config),
  ({ sx, ...props }) => css(sx)(props)
);
