export type BreakpointsObject = { [x: string]: string };
export type BreakpointsArray = string[];
export type Breakpoints = BreakpointsObject | BreakpointsArray;

type SystemPropsId = string | boolean;

export interface Theme {
  [x: string]: any;
  breakpoints: Breakpoints;
  systemPropsId?: SystemPropsId;
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

type Transform = (a: unknown, scale: {}, props: Props) => unknown;

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
  config: PropConfigCollection;
  propNames: string[];
  cache: {
    media?: (string | null)[];
  };
}

export interface Cache {
  systemPropsId: SystemPropsId;
  breakpoints?: Breakpoints;
  media?: (string | null)[];
  system: {
    [key: string]: unknown;
  };
}
