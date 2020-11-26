import { Theme, ResponsiveProp } from './types';
import { ColorProps } from './props/color';
import { SpaceProps } from './props/space';
import { LayoutProps } from './props/layout';

interface LooseTheme {
  [x: string]: any;
}

// interface LocalTheme extends LooseTheme {
//   colors: {
//     blue100: string;
//     blue200: string;
//     blue300: string;
//     blue400: string;
//     blue500: string;
//     blue600: string;
//     blue700: string;
//     blue800: string;
//     blue900: string;
//     reds: [string, string, string];
//   };
//   space: [number, number, number, number];
// }

interface LocalTheme extends Theme {
  colors: {
    blue100: string;
    blue200: string;
    blue300: string;
    blue400: string;
    blue500: string;
    blue600: string;
    blue700: string;
    blue800: string;
    blue900: string;
    red100: string;
    red200: string;
  };
  space: {
    0: string;
    1: string;
    2: string;
  };
}

// const theme: LocalTheme = {
//   colors: {
//     blue100: 'blue',
//     blue200: 'blue',
//     blue300: 'blue',
//     blue400: 'blue',
//     blue500: 'blue',
//     blue600: 'blue',
//     blue700: 'blue',
//     blue800: 'blue',
//     blue900: 'blue',
//     reds: ['one', 'two', 'three'],
//   },
//   space: [0, 4, 8, 12],
// };

type NewColorProps = {
  [K in keyof ColorProps]?: LocalTheme extends Theme
    ? ResponsiveProp<keyof LocalTheme['colors']>
    : ColorProps[K];
};

type NewSpaceProps = {
  [K in keyof SpaceProps]?: LocalTheme extends Theme
    ? ResponsiveProp<keyof LocalTheme['space']>
    : SpaceProps[K];
};

interface Props extends NewSpaceProps, NewColorProps {}

const bar: Props = {
  bg: 'red100',
  color: 'red100',
  fill: 'blue100',
  margin: 1,
};
