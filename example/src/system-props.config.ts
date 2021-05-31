import { ReactNode } from 'react';
import {
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
  PseudoProps,
  AllSystemProps,
  SystemProp,
  Theme,
  CSSObject,
} from 'system-props';
import * as CSS from 'csstype';

const extraProps = {
  transform: true,
  textDecoration: true,
  transition: true,
} as const;

type PrefixOptions = 'noprefix' | 'prefix' | 'all';

export type BaseProps<Prefix extends PrefixOptions = 'prefix'> =
  AllSystemProps<Prefix> &
    {
      [k in keyof typeof extraProps]?: SystemProp<CSS.Properties[k]>;
    };

export interface BoxProps<Prefix extends PrefixOptions = 'prefix'>
  extends BaseProps<Prefix>,
    PseudoProps<BaseProps<Prefix>> {
  sx?: CSSObject<Prefix> | ((theme: Theme) => CSSObject<Prefix>);
  children?: ReactNode;
}

export const config = {
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
