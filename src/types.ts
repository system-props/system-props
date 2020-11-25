import * as CSS from 'csstype';

export type SystemPropValue<T> = T | ((theme: Theme) => T);
export type ResponsiveObject<T> = Record<string | number, T>;
export type ResponsiveArray<T> = Array<T | null>;

export type ResponsiveObjectValue<T> = SystemPropValue<ResponsiveObject<T>>;
export type ResponsiveArrayValue<T> = SystemPropValue<ResponsiveArray<T>>;
export type ResponsiveProp<T> =
  | T
  | ResponsiveObjectValue<T>
  | ResponsiveArrayValue<T>;

export interface Theme {
  [x: string]: any;
  breakpoints?:
    | ResponsiveObject<string | number>
    | ResponsiveArray<string | number>;
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
