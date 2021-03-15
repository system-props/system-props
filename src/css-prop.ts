import * as CSS from 'csstype';
import {
  AllSystemProps,
  Theme,
  PrefixToken,
  PrefixOptions,
  PrefixDefault,
  TokenScales,
} from './types';
import { ConditionalKeys } from 'type-fest';

// All of the alias props from AllSystemProps,
// e.g., "bgColor", "mx", "size", etc
type AliasProps = Exclude<keyof AllSystemProps, keyof CSS.Properties>;

type TrimmedCSSProperties = Exclude<keyof CSS.Properties, keyof AllSystemProps>;
type VanillaCSSProperties = {
  [K in TrimmedCSSProperties]?: CSS.Properties<string | number>[K];
};

interface PropertiesToScales extends Record<keyof CSS.Properties, TokenScales> {
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
}

// type Something<
//   Property extends keyof CSS.Properties,
//   PrefixOption extends PrefixOptions = PrefixDefault,
//   TTheme extends Theme = Theme
// > = PropertiesToScales[Property] extends TokenScales
//   ? PrefixToken<PropertiesToScales[Property], PrefixOption, TTheme>
//   : never;

type TokenProperties<
  PrefixOption extends PrefixOptions = PrefixDefault,
  TTheme extends Theme = Theme
> = {
  [K in keyof PropertiesToScales]?: PropertiesToScales[K] extends TokenScales
    ?
        | CSS.Properties[K]
        | PrefixToken<PropertiesToScales[K], PrefixOption, TTheme>
    : CSS.Properties[K];
};

type CSSPseudos<PrefixOption extends PrefixOptions = PrefixDefault> = {
  [K in CSS.Pseudos]?: CSSObject<PrefixOption>;
};

// type PrefixQuery<K, PrefixOption> = PrefixOption extends 'all'
//   ? `$${(string | number) & K}` | ((string | number) & K)
//   : PrefixOption extends 'prefix'
//   ? `$${(string | number) & K}`
//   : PrefixOption extends 'noprefix'
//   ? (string | number) & K
//   : never;

// type Queries<PrefixOption, TTheme extends Theme = Theme> = PrefixQuery<
//   keyof TTheme['mediaQueries'],
//   PrefixOption
// >;

// Creates key values for theme "mediaQueries"
// Observes the PrefixOption parameter passed
type ThemeMediaQueries<
  PrefixOption extends PrefixOptions = PrefixDefault,
  TTheme extends Theme = Theme
> = {
  [K in keyof TTheme['mediaQueries']]?:
    | CSSObject<PrefixOption>
    | string
    | number
    | undefined;
};

export type CSSObject<
  PrefixOption extends PrefixOptions = PrefixDefault,
  TTheme extends Theme = Theme
> = CSSProperties<PrefixOption> &
  CSSPseudos<PrefixOption> &
  ThemeMediaQueries<PrefixOption, TTheme> & {
    [key: string]: CSSObject<PrefixOption> | string | number | undefined;
  };

type CSSProperties<
  PrefixOption extends PrefixOptions = PrefixDefault,
  TTheme extends Theme = Theme
> = VanillaCSSProperties &
  TokenProperties<PrefixOption> &
  {
    [K in keyof PropertiesToScales]?: PropertiesToScales[K] extends TokenScales
      ?
          | CSS.Properties[K]
          | PrefixToken<PropertiesToScales[K], PrefixOption, TTheme>
      : CSS.Properties[K];
  };
