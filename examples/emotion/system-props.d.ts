import { AppTheme } from './theme';

declare module 'system-props' {
  export interface Theme extends AppTheme {}
}
