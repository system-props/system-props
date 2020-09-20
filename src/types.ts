export type BreakpointsObject = { [x: string]: string };
export type BreakpointsArray = string[] | number[];
export type Breakpoints = BreakpointsObject | BreakpointsArray;

export interface Theme {
  [x: string]: any;
  breakpoints: Breakpoints;
}

export type Props = {
  theme: Theme;
  [x: string]: any;
};

export type SystemConfig = (value: unknown, scale: string, props: Props) => {};

type Transform = (a: unknown, scale: {}, props?: Props) => unknown;

export type PropertyConfig = {
  properties?: Array<string>;
  property?: string;
  scale?: string;
  defaultScale?: Array<unknown>;
  transform?: Transform;
};

export interface Config {
  [x: string]: true | PropertyConfig;
}

export interface Parser {
  (props: Props): {
    [x: string]: unknown;
  };
  config: Config;
  propNames: string[];
}
