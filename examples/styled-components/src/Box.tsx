import React, { ReactNode, ElementType, PropsWithChildren } from 'react';
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
  Theme,
} from 'system-props';
import { CSSProp } from 'styled-components';
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
  cx?: CSSObject | ((theme: Theme) => CSSObject);
  children?: ReactNode;
  css?: CSSProp;
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
}: PropsWithChildren<{ is?: ElementType }>) => {
  const rest = Object.keys(props).reduce((acc, curr) => {
    if (shouldForwardProp(curr)) {
      return { ...acc, [curr]: props[curr] };
    }
    return acc;
  }, {});

  return <Component {...rest} />;
};

export const Box = ({ cx, ...props }: BoxProps) => {
  return (
    <BaseElement
      css={`
        ${styles.css(cx)}
        ${styles}
      `}
      {...props}
    />
  );
};
