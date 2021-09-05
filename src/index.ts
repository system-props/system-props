import {
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  transition,
  typography,
} from './props';
import { createCss } from './core';

export const css = createCss(
  {
    ...background,
    ...border,
    ...color,
    ...flexbox,
    ...grid,
    ...layout,
    ...position,
    ...shadow,
    ...space,
    ...transition,
    ...typography,
  },
  { tokenPrefix: 'prefix' }
);

export { createSystem, createCss, CSSFunction, CSSFunctionArgs } from './core';
export * from './props';
export * from './pseudos';
export * from './propNames';
export * from './shouldForwardProp';
export {
  SystemProp,
  ColorProps,
  PaddingProps,
  MarginProps,
  SpaceProps,
  BorderProps,
  TypographyProps,
  LayoutProps,
  ShadowProps,
  PositionProps,
  GridItemProps,
  GridContainerProps,
  GridProps,
  FlexItemProps,
  FlexContainerProps,
  FlexboxProps,
  TransitionProps,
  AllSystemProps,
  Theme,
} from './types/system-props';
export { PropConfigCollection } from './core/types';
export { CSSObject } from './types/css-prop';
