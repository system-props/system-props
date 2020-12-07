import { Property as CSS, Properties as CSSProperties } from 'csstype';

type ThemeBreakpointKey = Theme['breakpoints'] extends object
  ? keyof Theme['breakpoints']
  : never;

export type ResponsiveObject<T> = {
  [K in ThemeBreakpointKey | 'all']?: T;
};
export type ResponsiveArray<T> = Array<T | null>;
export type ResponsiveValue<T> = ResponsiveArray<T> | ResponsiveObject<T>;

export type SystemProp<T> =
  | T
  | ResponsiveValue<T>
  | ((theme: Theme) => T | ResponsiveValue<T>);

type TokenScales =
  | 'colors'
  | 'sizes'
  | 'space'
  | 'borders'
  | 'borderStyles'
  | 'borderWidths'
  | 'letterSpacings'
  | 'zIndices'
  | 'shadows'
  | 'fontWeights'
  | 'fontSizes'
  | 'lineHeights'
  | 'fonts'
  | 'radii'
  | 'breakpoints';

type PrefixOptions = 'all' | 'prefix' | 'noprefix';
type PrefixDefault = 'noprefix';

type TokenLookup<
  Token extends TokenScales,
  PrefixOption extends PrefixOptions,
  TTheme extends Theme = Theme
> = PrefixOption extends 'all'
  ? keyof TTheme[Token] | `$${string & keyof TTheme[Token]}`
  : PrefixOption extends 'prefix'
  ? `$${string & keyof TTheme[Token]}`
  : PrefixOption extends 'noprefix'
  ? keyof TTheme[Token]
  : never;

type SystemPropValue<
  CSSProperty extends any,
  PrefixOption extends PrefixOptions = PrefixDefault,
  Token extends TokenScales | null = null
> = Token extends TokenScales
  ? Theme[Token] extends object
    ? SystemProp<TokenLookup<Token, PrefixOption> | CSSProperty>
    : SystemProp<CSSProperty>
  : SystemProp<CSSProperty>;

// const mapCssToTokenScale: Record<string, TokenScales> = {
//   color: 'colors',
//   textColor: 'colors',
//   backgroundColor: 'colors',
//   bg: 'colors',
//   fill: 'colors',
//   stroke: 'colors',
//   margin:'space',
//   m: 'space',
//   marginTop:'space',
//   marginLeft:'space',
//   marginBottom:'space',
//   marginRight:'space',
//   mt:'space',
//   ml:'space',
//   mb:'space',
//   mr:'space',
//   marginX:'space',
//   marginY:'space',
//   mx:'space',
//   my:'space',
//   p: 'space',
//   paddingTop:'space',
//   paddingLeft:'space',
//   paddingBottom:'space',
//   paddingRight:'space',
//   pt:'space',
//   pl:'space',
//   pb:'space',
//   pr:'space',
//   paddingX:'space',
//   paddingY:'space',
//   px:'space',
//   py:'space',
//   border: 'borders',
//   borderX: 'borders',
//   borderY: 'borders',
//   borderTop: 'borders',
//   borderLeft: 'borders',
//   borderBottom: 'borders',
//   borderRight: 'borders',
//   borderColor: 'colors',
//   borderLeftColor: 'colors',
//   borderRightColor: 'colors',
//   borderTopColor: 'colors',
//   borderBottomColor: 'colors',
//   borderStyle: 'borderStyles',
//   borderLeftStyle: 'borderStyles',
//   borderRightStyle: 'borderStyles',
//   borderTopStyle: 'borderStyles',
//   borderBottomStyle: 'borderStyles',
//   borderWidth: 'borderWidths',
//   borderLeftWidth: 'borderWidths',
//   borderRightWidth: 'borderWidths',
//   borderTopWidth: 'borderWidths',
//   borderBottomWidth: 'borderWidths',
//   borderRadius: 'radii',
//   borderTopLeftRadius: 'radii',
//   borderTopRightRadius: 'radii',
//   borderBottomLeftRadius: 'radii',
//   borderBottomRightRadius: 'radii',
//   gap: 'space',
//   gridGap: 'space',
//   gridColumnGap: 'space',
//   gridRowGap: 'space',
//   height:'space',
//   width:'space',
//   minWidth:'space',
//   minHeight:'space',
//   maxWidth:'space',
//   maxHeight:'space',
//   size:'space',
//   top: 'space',
//   left: 'space',
//   right: 'space',
//   bottom: 'space',
//   zIndex: 'zIndices',
//   fontFamily: 'fonts',
//   fontSize: 'fontSizes',
//   fontWeight: 'fontWeights',
//   lineHeight: 'lineHeights',
//   letterSpacing: 'letterSpacings',
//   boxShadow: 'shadows',
//   textShadow: 'shadows',
// }

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

export interface ColorProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  color?: SystemPropValue<CSS.Color, PrefixOption, 'colors'>;
  textColor?: SystemPropValue<CSS.Color, PrefixOption, 'colors'>;
  backgroundColor?: SystemPropValue<
    CSS.BackgroundColor,
    PrefixOption,
    'colors'
  >;
  bg?: SystemPropValue<CSS.BackgroundColor, PrefixOption, 'colors'>;
  fill?: SystemPropValue<CSS.Fill, PrefixOption, 'colors'>;
  stroke?: SystemPropValue<CSS.Stroke, PrefixOption, 'colors'>;
  opacity?: SystemPropValue<CSS.Opacity>;
}

export interface MarginProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  margin?: SystemPropValue<CSS.Margin, PrefixOption, 'space'>;
  m?: SystemPropValue<CSS.Margin, PrefixOption, 'space'>;
  marginTop?: SystemPropValue<CSS.MarginTop, PrefixOption, 'space'>;
  marginLeft?: SystemPropValue<CSS.MarginLeft, PrefixOption, 'space'>;
  marginBottom?: SystemPropValue<CSS.MarginBottom, PrefixOption, 'space'>;
  marginRight?: SystemPropValue<CSS.MarginRight, PrefixOption, 'space'>;
  mt?: SystemPropValue<CSS.MarginTop, PrefixOption, 'space'>;
  ml?: SystemPropValue<CSS.MarginLeft, PrefixOption, 'space'>;
  mb?: SystemPropValue<CSS.MarginBottom, PrefixOption, 'space'>;
  mr?: SystemPropValue<CSS.MarginRight, PrefixOption, 'space'>;
  marginX?: SystemPropValue<CSS.MarginLeft, PrefixOption, 'space'>;
  marginY?: SystemPropValue<CSS.MarginTop, PrefixOption, 'space'>;
  mx?: SystemPropValue<CSS.MarginLeft, PrefixOption, 'space'>;
  my?: SystemPropValue<CSS.MarginTop, PrefixOption, 'space'>;
}

export interface PaddingProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  padding?: SystemPropValue<CSS.Padding, PrefixOption, 'space'>;
  p?: SystemPropValue<CSS.Padding, PrefixOption, 'space'>;
  paddingTop?: SystemPropValue<CSS.PaddingTop, PrefixOption, 'space'>;
  paddingLeft?: SystemPropValue<CSS.PaddingLeft, PrefixOption, 'space'>;
  paddingBottom?: SystemPropValue<CSS.PaddingBottom, PrefixOption, 'space'>;
  paddingRight?: SystemPropValue<CSS.PaddingRight, PrefixOption, 'space'>;
  pt?: SystemPropValue<CSS.PaddingTop, PrefixOption, 'space'>;
  pl?: SystemPropValue<CSS.PaddingLeft, PrefixOption, 'space'>;
  pb?: SystemPropValue<CSS.PaddingBottom, PrefixOption, 'space'>;
  pr?: SystemPropValue<CSS.PaddingRight, PrefixOption, 'space'>;
  paddingX?: SystemPropValue<CSS.PaddingLeft, PrefixOption, 'space'>;
  paddingY?: SystemPropValue<CSS.PaddingTop, PrefixOption, 'space'>;
  px?: SystemPropValue<CSS.PaddingLeft, PrefixOption, 'space'>;
  py?: SystemPropValue<CSS.PaddingTop, PrefixOption, 'space'>;
}

export interface SpaceProps<PrefixOption extends PrefixOptions = PrefixDefault>
  extends MarginProps<PrefixOption>,
    PaddingProps<PrefixOption> {}

export interface BorderProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  border?: SystemPropValue<CSS.Border, PrefixOption, 'borders'>;
  borderX?: SystemPropValue<CSS.Border, PrefixOption, 'borders'>;
  borderY?: SystemPropValue<CSS.Border, PrefixOption, 'borders'>;
  borderTop?: SystemPropValue<CSS.BorderTop, PrefixOption, 'borders'>;
  borderRight?: SystemPropValue<CSS.BorderRight, PrefixOption, 'borders'>;
  borderBottom?: SystemPropValue<CSS.BorderBottom, PrefixOption, 'borders'>;
  borderLeft?: SystemPropValue<CSS.BorderLeft, PrefixOption, 'borders'>;
  borderColor?: SystemPropValue<CSS.BorderColor, PrefixOption, 'colors'>;
  borderTopColor?: SystemPropValue<CSS.BorderTopColor, PrefixOption, 'colors'>;
  borderRightColor?: SystemPropValue<
    CSS.BorderRightColor,
    PrefixOption,
    'colors'
  >;
  borderBottomColor?: SystemPropValue<
    CSS.BorderBottomColor,
    PrefixOption,
    'colors'
  >;
  borderLeftColor?: SystemPropValue<
    CSS.BorderLeftColor,
    PrefixOption,
    'colors'
  >;
  borderStyle?: SystemPropValue<CSS.BorderStyle, PrefixOption, 'borderStyles'>;
  borderTopStyle?: SystemPropValue<
    CSS.BorderTopStyle,
    PrefixOption,
    'borderStyles'
  >;
  borderRightStyle?: SystemPropValue<
    CSS.BorderRightStyle,
    PrefixOption,
    'borderStyles'
  >;
  borderBottomStyle?: SystemPropValue<
    CSS.BorderBottomStyle,
    PrefixOption,
    'borderStyles'
  >;
  borderLeftStyle?: SystemPropValue<
    CSS.BorderLeftStyle,
    PrefixOption,
    'borderStyles'
  >;
  borderWidth?: SystemPropValue<CSS.BorderWidth, PrefixOption, 'borderWidths'>;
  borderTopWidth?: SystemPropValue<
    CSS.BorderTopWidth,
    PrefixOption,
    'borderWidths'
  >;
  borderRightWidth?: SystemPropValue<
    CSS.BorderRightWidth,
    PrefixOption,
    'borderWidths'
  >;
  borderBottomWidth?: SystemPropValue<
    CSS.BorderBottomWidth,
    PrefixOption,
    'borderWidths'
  >;
  borderLeftWidth?: SystemPropValue<
    CSS.BorderLeftWidth,
    PrefixOption,
    'borderWidths'
  >;
  borderRadius?: SystemPropValue<CSS.BorderRadius, PrefixOption, 'radii'>;
  borderTopLeftRadius?: SystemPropValue<
    CSS.BorderTopLeftRadius,
    PrefixOption,
    'radii'
  >;
  borderTopRightRadius?: SystemPropValue<
    CSS.BorderTopRightRadius,
    PrefixOption,
    'radii'
  >;
  borderBottomRightRadius?: SystemPropValue<
    CSS.BorderBottomRightRadius,
    PrefixOption,
    'radii'
  >;
  borderBottomLeftRadius?: SystemPropValue<
    CSS.BorderBottomLeftRadius,
    PrefixOption,
    'radii'
  >;
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

export interface GridProps<PrefixOption extends PrefixOptions = PrefixDefault> {
  gap?: SystemPropValue<CSS.Gap, PrefixOption, 'space'>;
  gridGap?: SystemPropValue<CSS.GridGap, PrefixOption, 'space'>;
  gridColumnGap?: SystemPropValue<CSS.GridColumnGap, PrefixOption, 'space'>;
  gridRowGap?: SystemPropValue<CSS.GridRowGap, PrefixOption, 'space'>;
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

export interface LayoutProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  height?: SystemPropValue<CSS.Height, PrefixOption, 'sizes'>;
  width?: SystemPropValue<CSS.Width, PrefixOption, 'sizes'>;
  minWidth?: SystemPropValue<CSS.MinWidth, PrefixOption, 'sizes'>;
  minHeight?: SystemPropValue<CSS.MinHeight, PrefixOption, 'sizes'>;
  maxWidth?: SystemPropValue<CSS.MaxWidth, PrefixOption, 'sizes'>;
  maxHeight?: SystemPropValue<CSS.MaxHeight, PrefixOption, 'sizes'>;
  size?: SystemPropValue<CSS.Width, PrefixOption, 'sizes'>;
  overflow?: SystemProp<CSS.Overflow>;
  overflowX?: SystemProp<CSS.OverflowX>;
  overflowY?: SystemProp<CSS.OverflowY>;
  display?: SystemProp<CSS.Display>;
  verticalAlign?: SystemProp<CSS.VerticalAlign>;
}

export interface PositionProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  position?: SystemProp<CSS.Position>;
  top?: SystemPropValue<CSS.Top, PrefixOption, 'space'>;
  left?: SystemPropValue<CSS.Left, PrefixOption, 'space'>;
  right?: SystemPropValue<CSS.Right, PrefixOption, 'space'>;
  bottom?: SystemPropValue<CSS.Bottom, PrefixOption, 'space'>;
  zIndex?: SystemPropValue<CSS.ZIndex, PrefixOption, 'zIndices'>;
}

export interface ShadowProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  boxShadow?: SystemPropValue<CSS.BoxShadow, PrefixOption, 'shadows'>;
  textShadow?: SystemPropValue<CSS.TextShadow, PrefixOption, 'shadows'>;
}

export interface TypographyProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  fontFamily?: SystemPropValue<CSS.FontFamily, PrefixOption, 'fonts'>;
  fontSize?: SystemPropValue<CSS.FontSize, PrefixOption, 'fontSizes'>;
  fontWeight?: SystemPropValue<CSS.FontWeight, PrefixOption, 'fontWeights'>;
  lineHeight?: SystemPropValue<CSS.LineHeight, PrefixOption, 'lineHeights'>;
  letterSpacing?: SystemPropValue<
    CSS.LetterSpacing,
    PrefixOption,
    'letterSpacings'
  >;
  textAlign?: SystemProp<CSS.TextAlign>;
  fontStyle?: SystemProp<CSS.FontStyle>;
}

export interface AllSystemProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> extends ColorProps<PrefixOption>,
    SpaceProps<PrefixOption>,
    BorderProps<PrefixOption>,
    TypographyProps<PrefixOption>,
    LayoutProps<PrefixOption>,
    ShadowProps<PrefixOption>,
    PositionProps<PrefixOption>,
    GridProps<PrefixOption>,
    FlexboxProps {}

export interface Theme {
  [x: string]: any;
}
