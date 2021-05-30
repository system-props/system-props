import { createSystem, shouldForwardProp, css } from 'system-props';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { config, BoxProps } from './system-props.config';

const system = createSystem();

export const Box = styled('div', {
  shouldForwardProp: (prop) =>
    typeof prop === 'string' && shouldForwardProp(prop) && isPropValid(prop),
})<BoxProps>({ boxSizing: 'border-box' }, system(config), ({ sx, ...props }) =>
  css(sx)(props)
);
