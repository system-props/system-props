import React, { PropsWithChildren } from 'react';
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
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
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
  cx?: CSSObject;
}

const styles = system({
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

const BaseElement = ({
  is: Component = 'div',
  ...props
}: {
  is?: React.ElementType;
  children?: React.ReactNode;
}) => <Component {...props} />;

export const BaseBox = styled(BaseElement, {
  shouldForwardProp: (prop) =>
    typeof prop === 'string' &&
    shouldForwardProp(prop) &&
    isPropValid(prop) &&
    !Object.keys(extraProps).includes(prop),
})<BoxProps>({ boxSizing: 'border-box' }, styles);

export const Box = ({ cx, ...props }: BoxProps) => (
  <BaseBox css={styles.css(cx)} {...props} />
);
