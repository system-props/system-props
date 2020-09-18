export type BreakpointsObject = { [x: string]: string };
export type BreakpointsArray = Array<string>;

export interface Theme {
  [x: string]: any;
  breakpoints: BreakpointsObject | BreakpointsArray;
}
