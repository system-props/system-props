import React from 'react';
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
import styled, { CSSProp, ThemeContext, css as scCss } from 'styled-components';
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

interface BoxProps extends BaseProps, PseudoProps<BaseProps> {
  css?: CSSProp;
}

const foo = system({
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
});

const BaseBox = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    shouldForwardProp(prop) &&
    defaultValidatorFn(prop) &&
    !Object.keys(extraProps).includes(prop),
})<BoxProps>({ boxSizing: 'border-box' }, foo);

const BaseBar = styled.div({});

export const Bar = ({ css, ...props }: BoxProps) => {
  // @ts-ignore
  return <BaseBar css="background-color: blue;" />;
};

export const Box = ({ cx, ...props }: BoxProps) => {
  const theme = React.useContext(ThemeContext);
  // @ts-ignore
  // console.log(foo.css(css)({ theme: props.theme }));
  // @ts-ignore
  return <BaseBox {...props} css={foo.css(cx)} />;
};
