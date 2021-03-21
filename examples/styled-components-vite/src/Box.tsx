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
  CSSObject,
} from 'system-props';
import styled from 'styled-components';
import * as CSS from 'csstype';

const test: CSSObject = {
  margin: '$5',
  backgroundColor: '$green500',
};

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
  cx?: CSSObject;
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

export const Box = ({ cx, ...props }: BoxProps) => {
  // @ts-ignore
  return <BaseBox {...props} css={foo.css(cx)} />;
};
