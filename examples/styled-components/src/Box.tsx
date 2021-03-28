import { ReactNode } from 'react';
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
  typography,
  shouldForwardProp,
  createCss,
  PseudoProps,
  AllSystemProps,
  SystemProp,
  Theme,
  CSSObject,
} from 'system-props';
import styled, { CSSProp } from 'styled-components';
import * as CSS from 'csstype';

const system = createSystem();

const extraProps = {
  transform: true,
  textDecoration: true,
  transition: true,
} as const;

type BaseProps = AllSystemProps<'all'> &
  {
    [k in keyof typeof extraProps]?: SystemProp<CSS.Properties[k]>;
  };

interface BoxProps extends BaseProps, PseudoProps<BaseProps> {
  cx?: CSSObject<'all'> | ((theme: Theme) => CSSObject<'all'>);
  children?: ReactNode;
  css?: CSSProp;
}

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
  ...typography,
  ...extraProps,
};

export const css = createCss(config);

export const Box = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidtorFn) =>
    shouldForwardProp(prop) &&
    defaultValidtorFn(prop) &&
    !Object.keys(extraProps).includes(prop),
})<BoxProps>({ boxSizing: 'border-box' }, system(config));
