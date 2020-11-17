import * as CSS from 'csstype';

export type ResponsiveObject<T> = { [x: string]: T };
export type ResponsiveArray<T> = Array<T | null>;
export type ResponsiveProp<T> = T | ResponsiveObject<T> | ResponsiveArray<T>;

export interface Theme {
  [x: string]: any;
  breakpoints?: Record<string, string | number>;
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
  a: unknown,
  scale: {},
  props: Props,
  strict: boolean,
  undef?: undefined
) => unknown;

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
