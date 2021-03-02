import { AppTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}

declare module 'system-props' {
  export interface Theme extends AppTheme {}
}
