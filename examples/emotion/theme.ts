export interface AppTheme {
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
    $2: string;
    $3: string;
    $4: string;
  };
  breakpoints: {
    small: string;
    medium: string;
    large: string;
  };
}

export const theme: AppTheme = {
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
    $2: '8px',
    $3: '12px',
    $4: '16px',
  },
  breakpoints: {
    small: '42em',
    medium: '52em',
    large: '60em',
  },
};
