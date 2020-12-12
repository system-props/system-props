import { Property as P, Properties as CSSProperties } from 'csstype';

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

type ScaleLookup<
  Token extends TokenScales,
  TTheme extends Theme = Theme
> = TTheme[Token] extends object
  ? keyof TTheme[Token]
  : TTheme[Token] extends Array<string | number>
  ? TTheme[Token][number]
  : never;

type PrefixToken<
  Token extends TokenScales,
  PrefixOption extends PrefixOptions,
  TTheme extends Theme = Theme
> = PrefixOption extends 'all'
  ? ScaleLookup<Token, TTheme> | `$${string & ScaleLookup<Token, TTheme>}`
  : PrefixOption extends 'prefix'
  ? `$${string & ScaleLookup<Token, TTheme>}`
  : PrefixOption extends 'noprefix'
  ? ScaleLookup<Token, TTheme>
  : never;

type MaybeToken<
  CSSProperty extends any,
  PrefixOption extends PrefixOptions = PrefixDefault,
  Token extends TokenScales | null = null
> = Token extends TokenScales
  ? SystemProp<PrefixToken<Token, PrefixOption> | CSSProperty>
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
  (value: string | number, scale: string, props: Props, cache: Cache): {};
  scale?: 'string';
  defaultScale?: unknown;
}

export type Transform = (
  path: any,
  object: any,
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
  breakpoints?: Record<string, string> | string[];
  media?: (string | null)[];
  strict: boolean;
  key: string;
}

export interface SomeObject {
  [x: string]: SomeObject | string | number | ((x: Theme) => string | number);
}

export interface ColorProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  color?: MaybeToken<P.Color, PrefixOption, 'colors'>;
  textColor?: MaybeToken<P.Color, PrefixOption, 'colors'>;
  backgroundColor?: MaybeToken<P.BackgroundColor, PrefixOption, 'colors'>;
  bg?: MaybeToken<P.BackgroundColor, PrefixOption, 'colors'>;
  fill?: MaybeToken<P.Fill, PrefixOption, 'colors'>;
  stroke?: MaybeToken<P.Stroke, PrefixOption, 'colors'>;
  opacity?: MaybeToken<P.Opacity>;
}

export interface MarginProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  margin?: MaybeToken<P.Margin, PrefixOption, 'space'>;
  m?: MaybeToken<P.Margin, PrefixOption, 'space'>;
  marginTop?: MaybeToken<P.MarginTop, PrefixOption, 'space'>;
  marginLeft?: MaybeToken<P.MarginLeft, PrefixOption, 'space'>;
  marginBottom?: MaybeToken<P.MarginBottom, PrefixOption, 'space'>;
  marginRight?: MaybeToken<P.MarginRight, PrefixOption, 'space'>;
  mt?: MaybeToken<P.MarginTop, PrefixOption, 'space'>;
  ml?: MaybeToken<P.MarginLeft, PrefixOption, 'space'>;
  mb?: MaybeToken<P.MarginBottom, PrefixOption, 'space'>;
  mr?: MaybeToken<P.MarginRight, PrefixOption, 'space'>;
  marginX?: MaybeToken<P.MarginLeft, PrefixOption, 'space'>;
  marginY?: MaybeToken<P.MarginTop, PrefixOption, 'space'>;
  mx?: MaybeToken<P.MarginLeft, PrefixOption, 'space'>;
  my?: MaybeToken<P.MarginTop, PrefixOption, 'space'>;
}

export interface PaddingProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  padding?: MaybeToken<P.Padding, PrefixOption, 'space'>;
  p?: MaybeToken<P.Padding, PrefixOption, 'space'>;
  paddingTop?: MaybeToken<P.PaddingTop, PrefixOption, 'space'>;
  paddingLeft?: MaybeToken<P.PaddingLeft, PrefixOption, 'space'>;
  paddingBottom?: MaybeToken<P.PaddingBottom, PrefixOption, 'space'>;
  paddingRight?: MaybeToken<P.PaddingRight, PrefixOption, 'space'>;
  pt?: MaybeToken<P.PaddingTop, PrefixOption, 'space'>;
  pl?: MaybeToken<P.PaddingLeft, PrefixOption, 'space'>;
  pb?: MaybeToken<P.PaddingBottom, PrefixOption, 'space'>;
  pr?: MaybeToken<P.PaddingRight, PrefixOption, 'space'>;
  paddingX?: MaybeToken<P.PaddingLeft, PrefixOption, 'space'>;
  paddingY?: MaybeToken<P.PaddingTop, PrefixOption, 'space'>;
  px?: MaybeToken<P.PaddingLeft, PrefixOption, 'space'>;
  py?: MaybeToken<P.PaddingTop, PrefixOption, 'space'>;
}

export interface SpaceProps<PrefixOption extends PrefixOptions = PrefixDefault>
  extends MarginProps<PrefixOption>,
    PaddingProps<PrefixOption> {}

export interface BorderProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  border?: MaybeToken<P.Border, PrefixOption, 'borders'>;
  borderX?: MaybeToken<P.Border, PrefixOption, 'borders'>;
  borderY?: MaybeToken<P.Border, PrefixOption, 'borders'>;
  borderTop?: MaybeToken<P.BorderTop, PrefixOption, 'borders'>;
  borderRight?: MaybeToken<P.BorderRight, PrefixOption, 'borders'>;
  borderBottom?: MaybeToken<P.BorderBottom, PrefixOption, 'borders'>;
  borderLeft?: MaybeToken<P.BorderLeft, PrefixOption, 'borders'>;
  borderColor?: MaybeToken<P.BorderColor, PrefixOption, 'colors'>;
  borderTopColor?: MaybeToken<P.BorderTopColor, PrefixOption, 'colors'>;
  borderRightColor?: MaybeToken<P.BorderRightColor, PrefixOption, 'colors'>;
  borderBottomColor?: MaybeToken<P.BorderBottomColor, PrefixOption, 'colors'>;
  borderLeftColor?: MaybeToken<P.BorderLeftColor, PrefixOption, 'colors'>;
  borderStyle?: MaybeToken<P.BorderStyle, PrefixOption, 'borderStyles'>;
  borderTopStyle?: MaybeToken<P.BorderTopStyle, PrefixOption, 'borderStyles'>;
  borderRightStyle?: MaybeToken<
    P.BorderRightStyle,
    PrefixOption,
    'borderStyles'
  >;
  borderBottomStyle?: MaybeToken<
    P.BorderBottomStyle,
    PrefixOption,
    'borderStyles'
  >;
  borderLeftStyle?: MaybeToken<P.BorderLeftStyle, PrefixOption, 'borderStyles'>;
  borderWidth?: MaybeToken<P.BorderWidth, PrefixOption, 'borderWidths'>;
  borderTopWidth?: MaybeToken<P.BorderTopWidth, PrefixOption, 'borderWidths'>;
  borderRightWidth?: MaybeToken<
    P.BorderRightWidth,
    PrefixOption,
    'borderWidths'
  >;
  borderBottomWidth?: MaybeToken<
    P.BorderBottomWidth,
    PrefixOption,
    'borderWidths'
  >;
  borderLeftWidth?: MaybeToken<P.BorderLeftWidth, PrefixOption, 'borderWidths'>;
  borderRadius?: MaybeToken<P.BorderRadius, PrefixOption, 'radii'>;
  borderTopLeftRadius?: MaybeToken<
    P.BorderTopLeftRadius,
    PrefixOption,
    'radii'
  >;
  borderTopRightRadius?: MaybeToken<
    P.BorderTopRightRadius,
    PrefixOption,
    'radii'
  >;
  borderBottomRightRadius?: MaybeToken<
    P.BorderBottomRightRadius,
    PrefixOption,
    'radii'
  >;
  borderBottomLeftRadius?: MaybeToken<
    P.BorderBottomLeftRadius,
    PrefixOption,
    'radii'
  >;
}

export interface FlexboxProps {
  alignItems?: SystemProp<P.AlignItems>;
  alignContent?: SystemProp<P.AlignContent>;
  justifyItems?: SystemProp<P.JustifyItems>;
  justifyContent?: SystemProp<P.JustifyContent>;
  flexWrap?: SystemProp<P.FlexWrap>;
  flexDirection?: SystemProp<P.FlexDirection>;
  flex?: SystemProp<P.Flex>;
  flexGrow?: SystemProp<P.FlexGrow>;
  flexShrink?: SystemProp<P.FlexShrink>;
  flexBasis?: SystemProp<P.FlexBasis>;
  justifySelf?: SystemProp<P.JustifySelf>;
  alignSelf?: SystemProp<P.AlignSelf>;
  order?: SystemProp<P.Order>;
}

export interface GridProps<PrefixOption extends PrefixOptions = PrefixDefault> {
  gap?: MaybeToken<P.Gap, PrefixOption, 'space'>;
  gridGap?: MaybeToken<P.GridGap, PrefixOption, 'space'>;
  gridColumnGap?: MaybeToken<P.GridColumnGap, PrefixOption, 'space'>;
  gridRowGap?: MaybeToken<P.GridRowGap, PrefixOption, 'space'>;
  gridRow?: SystemProp<P.GridRow>;
  gridColumn?: SystemProp<P.GridColumn>;
  gridAutoFlow?: SystemProp<P.GridAutoFlow>;
  gridAutoColumns?: SystemProp<P.GridAutoColumns>;
  gridAutoRows?: SystemProp<P.GridAutoRows>;
  gridTemplateColumns?: SystemProp<P.GridTemplateColumns>;
  gridTemplateRows?: SystemProp<P.GridTemplateRows>;
  gridTemplateAreas?: SystemProp<P.GridTemplateAreas>;
  gridArea?: SystemProp<P.GridArea>;
}

export interface LayoutProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  height?: MaybeToken<P.Height, PrefixOption, 'sizes'>;
  width?: MaybeToken<P.Width, PrefixOption, 'sizes'>;
  minWidth?: MaybeToken<P.MinWidth, PrefixOption, 'sizes'>;
  minHeight?: MaybeToken<P.MinHeight, PrefixOption, 'sizes'>;
  maxWidth?: MaybeToken<P.MaxWidth, PrefixOption, 'sizes'>;
  maxHeight?: MaybeToken<P.MaxHeight, PrefixOption, 'sizes'>;
  size?: MaybeToken<P.Width, PrefixOption, 'sizes'>;
  overflow?: SystemProp<P.Overflow>;
  overflowX?: SystemProp<P.OverflowX>;
  overflowY?: SystemProp<P.OverflowY>;
  display?: SystemProp<P.Display>;
  verticalAlign?: SystemProp<P.VerticalAlign>;
}

export interface PositionProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  position?: SystemProp<P.Position>;
  top?: MaybeToken<P.Top, PrefixOption, 'space'>;
  left?: MaybeToken<P.Left, PrefixOption, 'space'>;
  right?: MaybeToken<P.Right, PrefixOption, 'space'>;
  bottom?: MaybeToken<P.Bottom, PrefixOption, 'space'>;
  zIndex?: MaybeToken<P.ZIndex, PrefixOption, 'zIndices'>;
}

export interface ShadowProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  boxShadow?: MaybeToken<P.BoxShadow, PrefixOption, 'shadows'>;
  textShadow?: MaybeToken<P.TextShadow, PrefixOption, 'shadows'>;
}

export interface TypographyProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> {
  fontFamily?: MaybeToken<P.FontFamily, PrefixOption, 'fonts'>;
  fontSize?: MaybeToken<P.FontSize, PrefixOption, 'fontSizes'>;
  fontWeight?: MaybeToken<P.FontWeight, PrefixOption, 'fontWeights'>;
  lineHeight?: MaybeToken<P.LineHeight, PrefixOption, 'lineHeights'>;
  letterSpacing?: MaybeToken<P.LetterSpacing, PrefixOption, 'letterSpacings'>;
  textAlign?: SystemProp<P.TextAlign>;
  fontStyle?: SystemProp<P.FontStyle>;
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
