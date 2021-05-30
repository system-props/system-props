import { Theme as AppTheme } from './theme';
import type {} from 'styled-components/cssprop';

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}

declare module 'system-props' {
  export interface Theme extends AppTheme {}
}

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
