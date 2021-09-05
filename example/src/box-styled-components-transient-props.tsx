import { ReactNode } from 'react';
import {
  createSystem,
  shouldForwardProp,
  css,
  CSSFunctionArgs,
} from 'system-props';
import { config, BaseProps } from './system-props.config';
import styled, { CSSObject } from 'styled-components';

const system = createSystem();

const transientConfig = Object.entries(config).reduce((acc, [prop, value]) => {
  return {
    ...acc,
    [`$${prop}`]: value,
  };
}, {});

type TransientBaseProps = {
  [k in keyof BaseProps as `$${k}`]: BaseProps[k];
};

interface TransientBoxProps extends TransientBaseProps {
  sx?: CSSFunctionArgs<'prefix'>;
  children?: ReactNode;
}

export const Box = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidtorFn) =>
    shouldForwardProp(prop) && defaultValidtorFn(prop),
})<TransientBoxProps>(
  { boxSizing: 'border-box' },
  system(transientConfig),
  ({ sx, ...props }) => css(sx)(props) as CSSObject
);
