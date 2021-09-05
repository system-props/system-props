import {
  Theme,
  PrefixToken,
  PrefixOptions,
  PrefixDefault,
  TokenScales,
} from './system-props';
import { CSSProperties } from './css';
import { Pseudos } from 'csstype';

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

interface AliasPropertiesToScales {
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
}

interface AliasToProperties {
  textColor: 'color';
  bg: 'backgroundColor';
  p: 'padding';
  pt: 'paddingTop';
  pr: 'paddingRight';
  pb: 'paddingBottom';
  pl: 'paddingLeft';
  m: 'margin';
  mt: 'marginTop';
  mr: 'marginRight';
  mb: 'marginBottom';
  ml: 'marginLeft';
  // Multiple Property Aliases
  size: 'width';
  px: 'paddingLeft';
  py: 'paddingTop';
  paddingX: 'paddingLeft';
  paddingY: 'paddingTop';
  mx: 'marginLeft';
  my: 'marginTop';
  marginX: 'marginLeft';
  marginY: 'marginTop';
}

type InternalCss<
  PrefixOption extends PrefixOptions = PrefixDefault,
  TTheme extends Theme = Theme
> = {
  // All regular CSS Property Keys to theme values & csstype
  [K in keyof CSSProperties]?:
    | (PropertiesToScales[K] extends TokenScales
        ? PrefixToken<PropertiesToScales[K], PrefixOption, TTheme>
        : never)
    | CSSProperties[K];
} &
  // Alias properties to theme values & csstype
  {
    [K in keyof AliasPropertiesToScales]?:
      | (AliasPropertiesToScales[K] extends TokenScales
          ? PrefixToken<AliasPropertiesToScales[K], PrefixOption, TTheme>
          : never)
      | CSSProperties[AliasToProperties[K]];
  } & {
    [k: string]:
      | InternalCss<PrefixOption, TTheme>
      | string
      | undefined
      | number;
  };

export type CSSObject<
  PrefixOption extends PrefixOptions = PrefixDefault,
  TTheme extends Theme = Theme
> = InternalCss<PrefixOption, TTheme> &
  // Pseudo Selectors
  {
    [K in Pseudos]?:
      | CSSObject<PrefixOption, TTheme>
      | string
      | number
      | undefined;
  } &
  // Theme Media Queries
  {
    [K in PrefixToken<'mediaQueries', PrefixOption, TTheme>]?:
      | CSSObject<PrefixOption, TTheme>
      | string
      | number
      | undefined;
  } & {
    [k: string]: CSSObject<PrefixOption, TTheme> | string | number | undefined;
  };
