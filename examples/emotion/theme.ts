type BaseFontSizes = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];
type FontSizes = { body?: string; rootFontSize?: string } & BaseFontSizes;

interface BaseColors {
  blue50: string;
  blue100: string;
  blue200: string;
  blue300: string;
  blue400: string;
  blue500: string;
  blue600: string;
  blue700: string;
  blue800: string;
  blue900: string;
  cyan50: string;
  cyan100: string;
  cyan200: string;
  cyan300: string;
  cyan400: string;
  cyan500: string;
  cyan600: string;
  cyan700: string;
  cyan800: string;
  cyan900: string;
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  green50: string;
  green100: string;
  green200: string;
  green300: string;
  green400: string;
  green500: string;
  green600: string;
  green700: string;
  green800: string;
  green900: string;
  purple50: string;
  purple100: string;
  purple200: string;
  purple300: string;
  purple400: string;
  purple500: string;
  purple600: string;
  purple700: string;
  purple800: string;
  purple900: string;
  orange50: string;
  orange100: string;
  orange200: string;
  orange300: string;
  orange400: string;
  orange500: string;
  orange600: string;
  orange700: string;
  orange800: string;
  orange900: string;
  red50: string;
  red100: string;
  red200: string;
  red300: string;
  red400: string;
  red500: string;
  red600: string;
  red700: string;
  red800: string;
  red900: string;
  yellow50: string;
  yellow100: string;
  yellow200: string;
  yellow300: string;
  yellow400: string;
  yellow500: string;
  yellow600: string;
  yellow700: string;
  yellow800: string;
  yellow900: string;
  hiContrast?: string;
  loContrast?: string;
}

interface Colors extends BaseColors {
  modes?: {
    dark?: BaseColors;
  };
}

export interface AppTheme {
  colors: Colors;
  fontSizes: FontSizes;
  space: {
    '0': string;
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
    '6': string;
    '7': string;
    '8': string;
    '9': string;
  };
  radii: {
    small: string;
    medium: string;
    large: string;
    round: string;
    pill: string;
  };
  fonts: {
    base: string;
    mono: string;
  };
  breakpoints: {
    bp2: string;
  };
  sizes: [string, string, string, string];
}

const colors: Colors = {
  blue50: '#def0ff',
  blue100: '#afcfff',
  blue200: '#7dafff',
  blue300: '#4b8eff',
  blue400: '#1a6eff',
  blue500: '#0055e6',
  blue600: '#0042b4',
  blue700: '#002f82',
  blue800: '#001c51',
  blue900: '#000921',
  cyan50: '#defdf9',
  cyan100: '#bbf1ec',
  cyan200: '#96e6de',
  cyan300: '#6edad0',
  cyan400: '#49cfc3',
  cyan500: '#30b6aa',
  cyan600: '#208e84',
  cyan700: '#10665e',
  cyan800: '#003e39',
  cyan900: '#001715',
  gray50: '#e8e9ea',
  gray100: '#dadbdc',
  gray200: '#bcbebf',
  gray300: '#a0a2a3',
  gray400: '#858687',
  gray500: '#6a6c6d',
  gray600: '#515353',
  gray700: '#393a3b',
  gray800: '#232425',
  gray900: '#0b0d0e',
  green50: '#e2fbed',
  green100: '#c2ebd4',
  green200: '#9fddb9',
  green300: '#7ccf9e',
  green400: '#58c184',
  green500: '#3ea76a',
  green600: '#2e8251',
  green700: '#1f5d3a',
  green800: '#0f3921',
  green900: '#001506',
  purple50: '#ece7ff',
  purple100: '#c6b9fb',
  purple200: '#a08cf4',
  purple300: '#7a5dee',
  purple400: '#542fe8',
  purple500: '#3c17cf',
  purple600: '#2e11a2',
  purple700: '#200b74',
  purple800: '#130647',
  purple900: '#08011d',
  orange50: '#fff2de',
  orange100: '#fddcb2',
  orange200: '#fac585',
  orange300: '#f6ad55',
  orange400: '#f39627',
  orange500: '#da7c0f',
  orange600: '#aa6109',
  orange700: '#794504',
  orange800: '#4a2800',
  orange900: '#1d0d00',
  red50: '#ffe5e5',
  red100: '#fbbaba',
  red200: '#f28e8e',
  red300: '#eb6161',
  red400: '#e43535',
  red500: '#ca1b1b',
  red600: '#9e1314',
  red700: '#710c0e',
  red800: '#460506',
  red900: '#1e0000',
  yellow50: '#fffadd',
  yellow100: '#fcf1b3',
  yellow200: '#f8e885',
  yellow300: '#f6de56',
  yellow400: '#f3d529',
  yellow500: '#d9bc11',
  yellow600: '#a99209',
  yellow700: '#796804',
  yellow800: '#483f00',
  yellow900: '#1a1500',
};

colors.hiContrast = colors.gray900;
colors.loContrast = '#fff';

Object.assign(colors, {
  modes: {
    dark: [
      'blue',
      'green',
      'yellow',
      'red',
      'purple',
      'orange',
      'cyan',
      'gray',
    ].reduce(
      (acc, curr) => {
        return {
          ...acc,
          [`${curr}50`]: colors[`${curr}900`],
          [`${curr}100`]: colors[`${curr}800`],
          [`${curr}200`]: colors[`${curr}700`],
          [`${curr}300`]: colors[`${curr}600`],
          [`${curr}400`]: colors[`${curr}500`],
          [`${curr}500`]: colors[`${curr}400`],
          [`${curr}600`]: colors[`${curr}300`],
          [`${curr}700`]: colors[`${curr}200`],
          [`${curr}800`]: colors[`${curr}100`],
          [`${curr}900`]: colors[`${curr}50`],
        };
      },
      { hiContrast: colors.gray50, loContrast: '#141719' }
    ),
  },
});
// Corrections for better readability
colors.modes.dark.blue500 = '#6ca2ff';
colors.modes.dark.purple500 = '#8465ff';

const space = {
  '0': '0px',
  '1': '5px',
  '2': '10px',
  '3': '15px',
  '4': '20px',
  '5': '25px',
  '6': '35px',
  '7': '45px',
  '8': '65px',
  '9': '80px',
};

const fontSizes: FontSizes = [
  '0.706rem',
  '0.765rem',
  '0.882rem',
  '1rem',
  '1.118rem',
  '1.235rem',
  '1.588rem',
  '2.0588rem',
  '3.470rem',
];
fontSizes.body = fontSizes[3];
fontSizes.rootFontSize = '17px';

export const theme: AppTheme = {
  colors,
  space,
  fontSizes,
  fonts: {
    base: 'system-ui, apple-system, BlinkMacSystemFont, sans-serif',
    mono: 'menlo, monospace',
  },
  radii: {
    small: '2px',
    medium: '4px',
    large: '8px',
    pill: '50vw',
    round: '100%',
  },
  sizes: ['450px', '550px', '585px', '865px'],
  breakpoints: {
    bp2: '900px',
  },
};

export default theme;
