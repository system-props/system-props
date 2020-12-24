import { propNames } from './propNames';

const allPropNames = new Set(propNames);

console.log({ allPropNames });

export const shouldForwardProp = (prop: string): boolean =>
  !allPropNames.has(prop);
