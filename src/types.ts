export type BreakpointsObject = { [x: string]: string };
export type BreakpointsArray = string[];
export type Breakpoints = BreakpointsObject | BreakpointsArray;

export interface Theme {
  [x: string]: any;
  breakpoints: Breakpoints;
}

export interface SomeObject {
  [x: string]: SomeObject | string | number | Function;
}

export type Props = {
  theme: Theme;
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
  properties?: string[];
  property?: string;
  scale?: string;
  defaultScale?: Array<unknown>;
  transform?: Transform;
};

export interface PropConfigCollection {
  [x: string]: true | PropertyConfig;
}

export interface Parser {
  (props: Props): {
    [x: string]: unknown;
  };
  config: { [key: string]: SystemConfig };
  propNames: string[];
  cache: Cache;
}

export interface Cache {
  breakpoints?: Breakpoints;
  media?: (string | null)[];
  strict: boolean;
}
