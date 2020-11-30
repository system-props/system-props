import { Property as CSS, Properties as CSSProperties } from 'csstype';

type ThemeBreakpointKey = Theme['breakpoints'] extends object
  ? keyof Theme['breakpoints'] | '_' | 'all'
  : never;

type ResponsiveObject<T> = {
  [K in ThemeBreakpointKey]?: T;
};
type ResponsiveArray<T> = Array<T | null>;
type ResponsiveValue<T> = ResponsiveArray<T> | ResponsiveObject<T>;

export type SystemProp<T> =
  | T
  | ResponsiveValue<T>
  | ((theme: Theme) => T | ResponsiveValue<T>);

interface TypeScale {
  [key: string]: string;
}

export interface LooseTheme {
  [key: string]: any;
}

export interface StrictTheme {
  [x: string]: any;
  colors?: TypeScale;
  sizes?: TypeScale;
  space?: TypeScale;
  borders?: TypeScale;
  borderStyles?: TypeScale;
  borderWidths?: TypeScale;
  letterSpacings?: TypeScale;
  zIndices?: TypeScale;
  shadows?: TypeScale;
  fontWeights?: TypeScale;
  fontSizes?: TypeScale;
  lineHeights?: TypeScale;
  fonts?: TypeScale;
  breakpoints?: TypeScale;
}

export interface Theme {
  [x: string]: any;
}

export type Props = {
  theme?: Theme;
  [x: string]: any;
};

export interface SystemConfig {
  (value: unknown, scale: string, props: Props, cache: Cache): {};
  scale?: 'string';
  defaultScale?: unknown;
}

export type Transform = (
  a: any,
  scale: any,
  props: Props,
  strict: boolean,
  undef?: undefined
) => any;

export type PropertyConfig = {
  properties?: Array<keyof CSSProperties>;
  property?: keyof CSSProperties;
  scale?: string;
  defaultScale?: Array<string | number>;
  transform?: Transform;
};

export interface PropConfigCollection {
  [x: string]: true | PropertyConfig;
}

export interface Cache {
  breakpoints?: SystemProp<string | number>;
  media?: (string | null)[];
  strict: boolean;
}

export interface SomeObject {
  [x: string]: SomeObject | string | number | ((x: Theme) => string | number);
}

export type ColorLookup<T> = Theme['colors'] extends object
  ? SystemProp<keyof Theme['colors'] | T>
  : SystemProp<T>;
export type SpaceLookup<T> = Theme['space'] extends object
  ? SystemProp<keyof Theme['space'] | T>
  : Theme['space'] extends any[]
  ? SystemProp<Theme['space'][number] | T>
  : SystemProp<T>;
export type SizeLookup<T> = Theme['sizes'] extends object
  ? SystemProp<keyof Theme['sizes'] | T>
  : SystemProp<T>;

export interface ColorProps {
  color?: ColorLookup<CSS.BackgroundColor>;
  backgroundColor?: ColorLookup<CSS.BackgroundColor>;
  bg?: ColorLookup<CSS.BackgroundColor>;
  fill?: ColorLookup<CSS.Fill>;
  stroke?: ColorLookup<CSS.Stroke>;
  opacity?: SystemProp<CSS.Opacity>;
}

export interface MarginProps {
  margin?: SpaceLookup<CSS.Margin>;
  m?: SpaceLookup<CSS.Margin>;
  marginTop?: SpaceLookup<CSS.MarginTop>;
  marginLeft?: SpaceLookup<CSS.MarginLeft>;
  marginBottom?: SpaceLookup<CSS.MarginBottom>;
  marginRight?: SpaceLookup<CSS.MarginRight>;
  mt?: SpaceLookup<CSS.MarginTop>;
  ml?: SpaceLookup<CSS.MarginLeft>;
  mb?: SpaceLookup<CSS.MarginBottom>;
  mr?: SpaceLookup<CSS.MarginRight>;
  marginX?: SpaceLookup<CSS.MarginLeft>;
  marginY?: SpaceLookup<CSS.MarginTop>;
  mx?: SpaceLookup<CSS.MarginLeft>;
  my?: SpaceLookup<CSS.MarginTop>;
}

export interface PaddingProps {
  padding?: SpaceLookup<CSS.Padding>;
  p?: SpaceLookup<CSS.Padding>;
  paddingTop?: SpaceLookup<CSS.PaddingTop>;
  paddingLeft?: SpaceLookup<CSS.PaddingLeft>;
  paddingBottom?: SpaceLookup<CSS.PaddingBottom>;
  paddingRight?: SpaceLookup<CSS.PaddingRight>;
  pt?: SpaceLookup<CSS.PaddingTop>;
  pl?: SpaceLookup<CSS.PaddingLeft>;
  pb?: SpaceLookup<CSS.PaddingBottom>;
  pr?: SpaceLookup<CSS.PaddingRight>;
  paddingX?: SpaceLookup<CSS.PaddingLeft>;
  paddingY?: SpaceLookup<CSS.PaddingTop>;
  px?: SpaceLookup<CSS.PaddingLeft>;
  py?: SpaceLookup<CSS.PaddingTop>;
}

export interface SpaceProps extends MarginProps, PaddingProps {}

export interface BorderProps {
  border?: Theme['borders'] extends object
    ? SystemProp<keyof Theme['borders'] | CSS.Border>
    : SystemProp<CSS.Border>;
  borderX?: Theme['borders'] extends object
    ? SystemProp<keyof Theme['borders'] | CSS.BorderLeft>
    : SystemProp<CSS.BorderLeft>;
  borderY?: Theme['borders'] extends object
    ? SystemProp<keyof Theme['borders'] | CSS.BorderLeft>
    : SystemProp<CSS.BorderLeft>;
  borderTop?: Theme['borders'] extends object
    ? SystemProp<keyof Theme['borders'] | CSS.BorderTop>
    : SystemProp<CSS.BorderTop>;
  borderLeft?: Theme['borders'] extends object
    ? SystemProp<keyof Theme['borders'] | CSS.BorderLeft>
    : SystemProp<CSS.BorderLeft>;
  borderRight?: Theme['borders'] extends object
    ? SystemProp<keyof Theme['borders'] | CSS.BorderRight>
    : SystemProp<CSS.BorderRight>;
  borderBottom?: Theme['borders'] extends object
    ? SystemProp<keyof Theme['borders'] | CSS.BorderBottom>
    : SystemProp<CSS.BorderBottom>;
  borderColor?: Theme['colors'] extends object
    ? SystemProp<keyof Theme['colors'] | CSS.BorderColor>
    : SystemProp<CSS.BorderColor>;
  borderLeftColor?: Theme['colors'] extends object
    ? SystemProp<keyof Theme['colors'] | CSS.BorderLeftColor>
    : SystemProp<CSS.BorderLeftColor>;
  borderRightColor?: Theme['colors'] extends object
    ? SystemProp<keyof Theme['colors'] | CSS.BorderRightColor>
    : SystemProp<CSS.BorderRightColor>;
  borderBottomColor?: Theme['colors'] extends object
    ? SystemProp<keyof Theme['colors'] | CSS.BorderBottomColor>
    : SystemProp<CSS.BorderBottomColor>;
  borderTopColor?: Theme['colors'] extends object
    ? SystemProp<keyof Theme['colors'] | CSS.BorderTopColor>
    : SystemProp<CSS.BorderTopColor>;
  borderStyle?: Theme['borderStyles'] extends object
    ? SystemProp<keyof Theme['borderStyles'] | CSS.BorderStyle>
    : SystemProp<CSS.BorderStyle>;
  borderLeftStyle?: Theme['borderStyles'] extends object
    ? SystemProp<keyof Theme['borderStyles'] | CSS.BorderLeftStyle>
    : SystemProp<CSS.BorderLeftStyle>;
  borderRightStyle?: Theme['borderStyles'] extends object
    ? SystemProp<keyof Theme['borderStyles'] | CSS.BorderRightStyle>
    : SystemProp<CSS.BorderRightStyle>;
  borderBottomStyle?: Theme['borderStyles'] extends object
    ? SystemProp<keyof Theme['borderStyles'] | CSS.BorderBottomStyle>
    : SystemProp<CSS.BorderBottomStyle>;
  borderTopStyle?: Theme['borderStyles'] extends object
    ? SystemProp<keyof Theme['borderStyles'] | CSS.BorderTopStyle>
    : SystemProp<CSS.BorderTopStyle>;
  borderWidth?: Theme['borderWidths'] extends object
    ? SystemProp<keyof Theme['borderWidths'] | CSS.BorderWidth>
    : SystemProp<CSS.BorderWidth>;
  borderLeftWidth?: Theme['borderWidths'] extends object
    ? SystemProp<keyof Theme['borderWidths'] | CSS.BorderLeftWidth>
    : SystemProp<CSS.BorderLeftWidth>;
  borderRightWidth?: Theme['borderWidths'] extends object
    ? SystemProp<keyof Theme['borderWidths'] | CSS.BorderRightWidth>
    : SystemProp<CSS.BorderRightWidth>;
  borderBottomWidth?: Theme['borderWidths'] extends object
    ? SystemProp<keyof Theme['borderWidths'] | CSS.BorderBottomWidth>
    : SystemProp<CSS.BorderBottomWidth>;
  borderTopWidth?: Theme['borderWidths'] extends object
    ? SystemProp<keyof Theme['borderWidths'] | CSS.BorderTopWidth>
    : SystemProp<CSS.BorderTopWidth>;
  borderRadius?: Theme['radii'] extends object
    ? SystemProp<keyof Theme['radii'] | CSS.BorderRadius>
    : SystemProp<CSS.BorderRadius>;
  borderTopLeftRadius?: Theme['radii'] extends object
    ? SystemProp<keyof Theme['radii'] | CSS.BorderTopLeftRadius>
    : SystemProp<CSS.BorderTopLeftRadius>;
  borderTopRightRadius?: Theme['radii'] extends object
    ? SystemProp<keyof Theme['radii'] | CSS.BorderTopRightRadius>
    : SystemProp<CSS.BorderTopRightRadius>;
  borderBottomRightRadius?: Theme['radii'] extends object
    ? SystemProp<keyof Theme['radii'] | CSS.BorderBottomRightRadius>
    : SystemProp<CSS.BorderBottomRightRadius>;
  borderBottomLeftRadius?: Theme['radii'] extends object
    ? SystemProp<keyof Theme['radii'] | CSS.BorderBottomLeftRadius>
    : SystemProp<CSS.BorderBottomLeftRadius>;
}

export interface FlexboxProps {
  alignItems?: SystemProp<CSS.AlignItems>;
  alignContent?: SystemProp<CSS.AlignContent>;
  justifyItems?: SystemProp<CSS.JustifyItems>;
  justifyContent?: SystemProp<CSS.JustifyContent>;
  flexWrap?: SystemProp<CSS.FlexWrap>;
  flexDirection?: SystemProp<CSS.FlexDirection>;
  flex?: SystemProp<CSS.Flex>;
  flexGrow?: SystemProp<CSS.FlexGrow>;
  flexShrink?: SystemProp<CSS.FlexShrink>;
  flexBasis?: SystemProp<CSS.FlexBasis>;
  justifySelf?: SystemProp<CSS.JustifySelf>;
  alignSelf?: SystemProp<CSS.AlignSelf>;
  order?: SystemProp<CSS.Order>;
}

export interface GridProps {
  gap?: SpaceLookup<CSS.Gap>;
  gridGap?: SpaceLookup<CSS.GridGap>;
  gridColumnGap?: SpaceLookup<CSS.GridColumnGap>;
  gridRowGap?: SpaceLookup<CSS.GridRowGap>;
  gridRow?: SystemProp<CSS.GridRow>;
  gridColumn?: SystemProp<CSS.GridColumn>;
  gridAutoFlow?: SystemProp<CSS.GridAutoFlow>;
  gridAutoColumns?: SystemProp<CSS.GridAutoColumns>;
  gridAutoRows?: SystemProp<CSS.GridAutoRows>;
  gridTemplateColumns?: SystemProp<CSS.GridTemplateColumns>;
  gridTemplateRows?: SystemProp<CSS.GridTemplateRows>;
  gridTemplateAreas?: SystemProp<CSS.GridTemplateAreas>;
  gridArea?: SystemProp<CSS.GridArea>;
}

export interface LayoutProps {
  height?: SizeLookup<CSS.Height>;
  width?: SizeLookup<CSS.Width>;
  minWidth?: SizeLookup<CSS.MinWidth>;
  minHeight?: SizeLookup<CSS.MinHeight>;
  maxWidth?: SizeLookup<CSS.MaxWidth>;
  maxHeight?: SizeLookup<CSS.MaxHeight>;
  size?: SizeLookup<CSS.Width>;
  overflow?: SystemProp<CSS.Overflow>;
  overflowX?: SystemProp<CSS.OverflowX>;
  overflowY?: SystemProp<CSS.OverflowY>;
  display?: SystemProp<CSS.Display>;
  verticalAlign?: SystemProp<CSS.VerticalAlign>;
}

export interface PositionProps {
  position?: SystemProp<CSS.Position>;
  top?: SizeLookup<CSS.Top>;
  left?: SizeLookup<CSS.Left>;
  right?: SizeLookup<CSS.Right>;
  bottom?: SizeLookup<CSS.Bottom>;
  zIndex?: SystemProp<CSS.ZIndex>;
}

export interface ShadowProps {
  boxShadow?: Theme['shadows'] extends object
    ? SystemProp<keyof Theme['shadows'] | CSS.BoxShadow>
    : SystemProp<CSS.BoxShadow>;
  textShadow?: Theme['shadows'] extends object
    ? SystemProp<keyof Theme['shadows'] | CSS.TextShadow>
    : SystemProp<CSS.TextShadow>;
}

export interface TypographyProps {
  fontFamily?: Theme['fonts'] extends object
    ? SystemProp<keyof Theme['fonts'] | CSS.FontFamily>
    : SystemProp<CSS.FontFamily>;
  fontSize?: Theme['fontSizes'] extends object
    ? SystemProp<keyof Theme['fontSizes'] | CSS.FontSize>
    : SystemProp<CSS.FontSize>;
  fontWeight?: Theme['fontWeights'] extends object
    ? SystemProp<keyof Theme['fontWeights'] | CSS.FontWeight>
    : SystemProp<CSS.FontWeight>;
  fontStyle?: SystemProp<CSS.FontStyle>;
  lineHeight?: Theme['lineHeights'] extends object
    ? SystemProp<keyof Theme['lineHeights'] | CSS.LineHeight>
    : SystemProp<CSS.LineHeight>;
  letterSpacing?: Theme['letterSpacings'] extends object
    ? SystemProp<keyof Theme['letterSpacings'] | CSS.LetterSpacing>
    : SystemProp<CSS.LetterSpacing>;
  textAlign?: SystemProp<CSS.TextAlign>;
}

export interface AllSystemProps
  extends ColorProps,
    SpaceProps,
    BorderProps,
    TypographyProps,
    LayoutProps,
    ShadowProps,
    PositionProps,
    GridProps,
    FlexboxProps {}
