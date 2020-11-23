import { BackgroundProps } from './background';
import { BorderProps } from './border';
import { ColorProps } from './color';
import { FlexboxProps } from './flexbox';
import { GridProps } from './grid';
import { LayoutProps } from './layout';
import { PositionProps } from './position';
import { ShadowProps } from './shadow';
import { SpaceProps } from './space';
import { TypographyProps } from './typography';

export * from './background';
export * from './border';
export * from './color';
export * from './flexbox';
export * from './grid';
export * from './layout';
export * from './position';
export * from './shadow';
export * from './space';
export * from './typography';
export { layout as styledSystemLayout } from './styled-system-layout';

export interface SystemProps
  extends BackgroundProps,
    BorderProps,
    ColorProps,
    FlexboxProps,
    GridProps,
    LayoutProps,
    PositionProps,
    ShadowProps,
    SpaceProps,
    TypographyProps {}
