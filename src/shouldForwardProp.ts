import { propNames } from './propNames';

const allPropNames = new Set(propNames);

export const shouldForwardProp = (prop: string): boolean =>
  !allPropNames.has(prop);
