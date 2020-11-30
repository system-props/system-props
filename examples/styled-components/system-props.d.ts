import 'system-props';
import { AppTheme } from './theme';

declare module 'system-props' {
  export interface DefaultTheme extends AppTheme {}
}
