import { BaseColorProps } from './props/color';
import * as CSS from 'csstype';

// export type SystemPropValue<T> = T | ((theme: Theme) => T);
export type ResponsiveObject<T> = Record<string | number, T>;
export type ResponsiveArray<T> = Array<T | null>;

// export type ResponsiveObjectValue<T> = SystemPropValue<ResponsiveObject<T>>;
// export type ResponsiveArrayValue<T> = SystemPropValue<ResponsiveArray<T>>;
export type ResponsiveProp<T> =
  | T
  | ResponsiveObject<T>
  | ResponsiveArray<T>
  | ((
      theme: Theme
    ) => string | number | ResponsiveArray<T> | ResponsiveObject<T>);

interface TypeScale {
  [key: string]: string;
}

export interface LooseTheme {
  [key: string]: any;
}

// export interface Theme {
//   [x: string]: any;
//   colors?: {
//     $blue100: string;
//   };
//   sizes?: TypeScale;
//   space?: TypeScale;
//   borders?: TypeScale;
//   borderStyles?: TypeScale;
//   borderWidths?: TypeScale;
//   letterSpacings?: TypeScale;
//   zIndices?: TypeScale;
//   shadows?: TypeScale;
//   fontWeights?: TypeScale;
//   fontSizes?: TypeScale;
//   lineHeights?: TypeScale;
//   fonts?: TypeScale;
//   breakpoints?: TypeScale;
// }

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
  // colors?: any;
  // sizes?: any;
  // space?: any;
  // borders?: any;
  // borderStyles?: any;
  // borderWidths?: any;
  // letterSpacings?: any;
  // zIndices?: any;
  // shadows?: any;
  // fontWeights?: any;
  // fontSizes?: any;
  // lineHeights?: any;
  // fonts?: any;
  // breakpoints?: any;
  // disableSystemPropsCache?: boolean;
}

export interface SomeObject {
  [x: string]: SomeObject | string | number | ((x: Theme) => string | number);
}

export type PropValue = string | number | SomeObject;

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
  properties?: Array<keyof CSS.Properties>;
  property?: keyof CSS.Properties;
  scale?: string;
  defaultScale?: Array<string | number>;
  transform?: Transform;
};

export interface PropConfigCollection {
  [x: string]: true | PropertyConfig;
}

export interface Cache {
  breakpoints?: ResponsiveProp<string | number>;
  media?: (string | null)[];
  strict: boolean;
}

export type ColorProps = {
  [K in keyof BaseColorProps]?: Theme['colors'] extends object
    ? ResponsiveProp<keyof Theme['colors'] | BaseColorProps[K]>
    : ResponsiveProp<BaseColorProps[K]>;
};
