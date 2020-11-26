import { Theme, StrictTheme } from 'system-props';

interface AppTheme extends StrictTheme {
  colors: {
    gray10: string;
    gray20: string;
    gray30: string;
    blue10: string;
    blue20: string;
    blue30: string;
  };
  space: {
    $0: string;
    $1: string;
    $3: string;
    $4: string;
  };
  breakpoints: {
    small: string;
    medium: string;
    large: string;
  };
}

declare module 'system-props' {
  export interface Theme extends AppTheme {}
}

export const theme: Theme = {
  colors: {
    gray10: '#333',
    gray20: '#666',
    gray30: '#999',
    blue10: 'skyblue',
    blue20: 'teal',
    blue30: 'blue',
  },
  space: {
    $0: '0px',
    $1: '4px',
    $3: '8px',
    $4: '12px',
  },
  breakpoints: {
    small: '42em',
    medium: '52em',
    large: '60em',
  },
};
