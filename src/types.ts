import { CSSProperties } from './css-types';

export type KeyOf<T> = T extends Array<any>
  ? number | Exclude<keyof T, keyof []>
  : T extends object
  ? keyof T
  : never;

export type TokenScales =
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
  | 'mediaQueries'
  | 'transitions'
  | 'transitionDurations'
  | 'transitionTimingFunctions'
  | 'breakpoints';

interface PropertiesToScales extends Record<keyof CSSProperties, TokenScales> {
  color: 'colors';
  backgroundColor: 'colors';
  fill: 'colors';
  stroke: 'colors';
  opacity: 'colors';
  margin: 'space';
  marginLeft: 'space';
  marginRight: 'space';
  marginBottom: 'space';
  marginTop: 'space';
  padding: 'space';
  paddingLeft: 'space';
  paddingRight: 'space';
  paddingBottom: 'space';
  paddingTop: 'space';
  top: 'space';
  right: 'space';
  bottom: 'space';
  left: 'space';
  gap: 'space';
  gridGap: 'space';
  gridColumnGap: 'space';
  gridRowGap: 'space';
  fontFamily: 'fonts';
  fontSize: 'fontSizes';
  fontWeight: 'fontWeights';
  lineHeight: 'lineHeights';
  letterSpacing: 'letterSpacings';
  boxShadow: 'shadows';
  textShadow: 'shadows';
  zIndex: 'zIndices';
  height: 'sizes';
  width: 'sizes';
  minWidth: 'sizes';
  minHeight: 'sizes';
  maxWidth: 'sizes';
  maxHeight: 'sizes';
  borderRadius: 'radii';
  borderBottomRightRadius: 'radii';
  borderBottomLeftRadius: 'radii';
  borderTopLeftRadius: 'radii';
  borderTopRightRadius: 'radii';
  borderWidth: 'borderWidths';
  borderTopWidth: 'borderWidths';
  borderRightWidth: 'borderWidths';
  borderBottomWidth: 'borderWidths';
  borderLeftWidth: 'borderWidths';
  borderColor: 'colors';
  borderTopColor: 'colors';
  borderRightColor: 'colors';
  borderBottomColor: 'colors';
  borderLeftColor: 'colors';
  borderStyle: 'borderStyles';
  borderTopStyle: 'borderStyles';
  borderRightStyle: 'borderStyles';
  borderBottomStyle: 'borderStyles';
  borderLeftStyle: 'borderStyles';
  border: 'borders';
  borderTop: 'borders';
  borderRight: 'borders';
  borderBottom: 'borders';
  borderLeft: 'borders';
  transition: 'transitions';
  transitionTimingFunction: 'transitionTimingFunctions';
  transitionDuration: 'transitionDurations';
}

interface AliasPropertiesToScales extends Record<string, TokenScales> {
  textColor: 'colors';
  bg: 'colors';
  size: 'sizes';
  p: 'space';
  pt: 'space';
  pr: 'space';
  pb: 'space';
  pl: 'space';
  px: 'space';
  py: 'space';
  paddingX: 'space';
  paddingY: 'space';
  m: 'space';
  mt: 'space';
  mr: 'space';
  mb: 'space';
  ml: 'space';
  mx: 'space';
  my: 'space';
  marginX: 'space';
  marginY: 'space';
  borderX: 'borders';
  borderY: 'borders';
}

interface AliasToProperties
  extends Record<keyof AliasPropertiesToScales, keyof CSSProperties> {
  /**
   * Alias for the `color` property
   */
  textColor: 'color';
  /**
   * Alias for the `backgroundColor` property
   */
  bg: 'backgroundColor';
  /**
   * Alias for the `padding` property
   */
  p: 'padding';
  /**
   * Alias for the `paddingTop` property
   */
  pt: 'paddingTop';
  /**
   * Alias for the `paddingRight` property
   */
  pr: 'paddingRight';
  /**
   * Alias for the `paddingBottom` property
   */
  pb: 'paddingBottom';
  /**
   * Alias for the `paddingLeft` property
   */
  pl: 'paddingLeft';
  /**
   * Alias for the `margin` property
   */
  m: 'margin';
  /**
   * Alias for the `marginTop` property
   */
  mt: 'marginTop';
  /**
   * Alias for the `marginRight` property
   */
  mr: 'marginRight';
  /**
   * Alias for the `marginBottom` property
   */
  mb: 'marginBottom';
  /**
   * Alias for the `marginLeft` property
   */
  ml: 'marginLeft';
  /**
   * Alias for the `height` and `width` properties
   */
  size: 'width';
  /**
   * Alias for the `paddingLeft` and `paddingRight` properties
   */
  px: 'paddingLeft';
  /**
   * Alias for the `paddingTop` and `paddingBottom` properties
   */
  py: 'paddingTop';
  /**
   * Alias for the `paddingLeft` and `paddingRight` properties
   */
  paddingX: 'paddingLeft';
  /**
   * Alias for the `paddingTop` and `paddingBottom` properties
   */
  paddingY: 'paddingTop';
  /**
   * Alias for the `marginLeft` and `marginRight` properties
   */
  mx: 'marginLeft';
  /**
   * Alias for the `marginTop` and `marginBottom` properties
   */
  my: 'marginTop';
  /**
   * Alias for the `marginLeft` and `marginRight` properties
   */
  marginX: 'marginLeft';
  /**
   * Alias for the `marginTop` and `marginBottom` properties
   */
  marginY: 'marginTop';
  /**
   * Alias for the `borderLeft` and `borderRight` properties
   */
  borderX: 'borderLeft';
  /**
   * Alias for the `borderTop` and `borderBottom` properties
   */
  borderY: 'borderTop';
}

export interface Theme {
  [key: string]: any;
}

type ThemeBreakpointKey = Theme['breakpoints'] extends object
  ? KeyOf<Theme['breakpoints']>
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

export type PrefixOptions = 'all' | 'prefix' | 'noprefix';
export type PrefixDefault = 'prefix';

type ScaleLookup<Token extends TokenScales, TTheme extends Theme = Theme> =
  KeyOf<TTheme[Token]>;

export type PrefixToken<
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
  // This should be the following, but for some reason
  // the performance of the TypeScript process TANKS
  // CSSProperty extends keyof CSSProperties,
  CSSProperty,
  Token extends TokenScales,
  PrefixOption extends PrefixOptions = PrefixDefault
> = SystemProp<PrefixToken<Token, PrefixOption> | CSSProperty>;

export type Props = {
  theme?: Theme;
  [x: string]: any;
};

export interface SystemConfig {
  (value: string | number, scale: string, props: Props, cache?: Cache): {};
  scale?: 'string';
  defaultScale?: unknown;
}

export interface Get {
  (obj?: any, path?: any, fallback?: any): any;
}

export interface StyleFunction {
  (propertyConfig: PropertyConfig): SystemConfig;
}

export interface Transform {
  ({
    path,
    object,
    props,
    strict,
    get,
  }: {
    path?: any;
    object?: any;
    props?: Props;
    strict?: boolean;
    get: Get;
  }): any;
}

export type MaybeCSSProperty = keyof CSSProperties | (string & {});

export type PropertyConfig = {
  properties?: Array<MaybeCSSProperty>;
  property?: MaybeCSSProperty;
  scale?: string;
  defaultScale?: Array<string | number>;
  transform?: Transform;
  tokenPrefix?: 'prefix' | 'noprefix' | 'all';
};

export interface PropConfigCollection {
  [key: string]: true | PropertyConfig;
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

type MakeSystemProp<
  PropNames extends keyof CSSProperties,
  PrefixOption extends PrefixOptions = PrefixDefault
> = {
  [k in keyof Pick<CSSProperties, PropNames>]?: MaybeToken<
    CSSProperties[k],
    PropertiesToScales[k],
    PrefixOption
  >;
};

type MakeAliasSystemProps<
  PropNames extends keyof AliasToProperties,
  PrefixOption extends PrefixOptions = PrefixDefault
> = {
  [k in keyof Pick<AliasToProperties, PropNames>]?: MaybeToken<
    CSSProperties[AliasToProperties[k]],
    AliasPropertiesToScales[k],
    PrefixOption
  >;
};

export interface ColorProps<PrefixOption extends PrefixOptions = PrefixDefault>
  extends MakeSystemProp<
      'color' | 'backgroundColor' | 'fill' | 'stroke' | 'opacity',
      PrefixOption
    >,
    MakeAliasSystemProps<'bg' | 'textColor', PrefixOption> {}

export interface MarginProps<PrefixOption extends PrefixOptions = PrefixDefault>
  extends MakeSystemProp<
      'margin' | 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft',
      PrefixOption
    >,
    MakeAliasSystemProps<
      'm' | 'mt' | 'mr' | 'mb' | 'ml' | 'mx' | 'my' | 'marginX' | 'marginY',
      PrefixOption
    > {}

export interface PaddingProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> extends MakeSystemProp<
      | 'padding'
      | 'paddingTop'
      | 'paddingRight'
      | 'paddingBottom'
      | 'paddingLeft',
      PrefixOption
    >,
    MakeAliasSystemProps<
      'p' | 'pt' | 'pr' | 'pb' | 'pl' | 'px' | 'py' | 'paddingX' | 'paddingY',
      PrefixOption
    > {}

export interface SpaceProps<PrefixOption extends PrefixOptions = PrefixDefault>
  extends MarginProps<PrefixOption>,
    PaddingProps<PrefixOption> {}

export interface BorderProps<PrefixOption extends PrefixOptions = PrefixDefault>
  extends MakeSystemProp<
      | 'border'
      | 'borderTop'
      | 'borderRight'
      | 'borderLeft'
      | 'borderTop'
      | 'borderBottom'
      | 'borderStyle'
      | 'borderTopStyle'
      | 'borderRightStyle'
      | 'borderLeftStyle'
      | 'borderTopStyle'
      | 'borderBottomStyle'
      | 'borderColor'
      | 'borderTopColor'
      | 'borderRightColor'
      | 'borderLeftColor'
      | 'borderTopColor'
      | 'borderBottomColor'
      | 'borderWidth'
      | 'borderTopWidth'
      | 'borderRightWidth'
      | 'borderLeftWidth'
      | 'borderTopWidth'
      | 'borderBottomWidth'
      | 'borderRadius'
      | 'borderTopLeftRadius'
      | 'borderTopRightRadius'
      | 'borderBottomLeftRadius'
      | 'borderBottomRightRadius',
      PrefixOption
    >,
    MakeAliasSystemProps<'borderX' | 'borderY', PrefixOption> {}

export interface FlexContainerProps
  extends MakeSystemProp<
    | 'alignItems'
    | 'alignContent'
    | 'justifyItems'
    | 'justifyContent'
    | 'flexWrap'
    | 'flexDirection'
    | 'flexFlow'
  > {}

export interface FlexItemProps
  extends MakeSystemProp<
    | 'flex'
    | 'flexGrow'
    | 'flexShrink'
    | 'flexBasis'
    | 'justifySelf'
    | 'alignSelf'
    | 'order'
  > {}

export interface FlexboxProps extends FlexItemProps, FlexContainerProps {}

export interface GridContainerProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> extends MakeSystemProp<
    | 'gap'
    | 'gridGap'
    | 'gridColumnGap'
    | 'gridRowGap'
    | 'gridRow'
    | 'gridColumn'
    | 'gridAutoFlow'
    | 'gridAutoColumns'
    | 'gridAutoRows'
    | 'gridTemplateColumns'
    | 'gridTemplateRows'
    | 'gridTemplateAreas',
    PrefixOption
  > {}

export interface GridItemProps
  extends MakeSystemProp<
    | 'gridArea'
    | 'gridColumnStart'
    | 'gridColumnEnd'
    | 'gridRowStart'
    | 'gridRowEnd'
    | 'justifySelf'
    | 'alignSelf'
    | 'placeSelf'
  > {}

export interface GridProps<PrefixOption extends PrefixOptions = PrefixDefault>
  extends GridContainerProps<PrefixOption>,
    GridItemProps {}

export interface LayoutProps<PrefixOption extends PrefixOptions = PrefixDefault>
  extends MakeSystemProp<
      | 'height'
      | 'width'
      | 'minWidth'
      | 'minHeight'
      | 'maxWidth'
      | 'maxHeight'
      | 'overflow'
      | 'overflowX'
      | 'overflowY'
      | 'display'
      | 'verticalAlign',
      PrefixOption
    >,
    MakeAliasSystemProps<'size', PrefixOption> {}

export interface PositionProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> extends MakeSystemProp<
    'position' | 'top' | 'left' | 'right' | 'bottom' | 'zIndex',
    PrefixOption
  > {}

export interface ShadowProps<PrefixOption extends PrefixOptions = PrefixDefault>
  extends MakeSystemProp<'boxShadow' | 'textShadow', PrefixOption> {}

export interface TypographyProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> extends MakeSystemProp<
    | 'fontFamily'
    | 'fontSize'
    | 'fontWeight'
    | 'lineHeight'
    | 'letterSpacing'
    | 'textAlign'
    | 'fontStyle',
    PrefixOption
  > {}

export interface TransitionProps<
  PrefixOption extends PrefixOptions = PrefixDefault
> extends MakeSystemProp<
    | 'transition'
    | 'transitionDelay'
    | 'transitionDuration'
    | 'transitionTimingFunction'
    | 'transitionProperty',
    PrefixOption
  > {}

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
    FlexboxProps,
    TransitionProps<PrefixOption> {}

export type SystemPropsTheme = Partial<
  Record<TokenScales, Record<string, string | number>>
>;
