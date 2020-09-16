export interface SomeObj {
  [x: string]: string | number | {};
}

export interface Theme {
  [x: string]: string | number | Theme;
}
