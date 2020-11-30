import 'styled-components';
import { AppTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
