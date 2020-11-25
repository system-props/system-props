import { Theme, ResponsiveProp } from './types';
import { ColorProps } from './props/color';
import { SpaceProps } from './props/space';

interface LocalTheme extends Theme {
  colors: {
    blue100: 'blue';
    blue200: 'blue';
    blue300: 'blue';
    blue400: 'blue';
    blue500: 'blue';
    blue600: 'blue';
    blue700: 'blue';
    blue800: 'blue';
  };
  space: {
    250: '2px';
    500: '4px';
    1000: '8px';
  };
  breakpoints: {
    320: '320px';
    640: '640px';
  };
}

type NewColorProps = {
  [K in keyof ColorProps]?:
    | ResponsiveProp<keyof LocalTheme['colors']>
    | ColorProps[K];
};

type NewSpaceProps = {
  [K in keyof SpaceProps]?: SpaceProps[K] | keyof LocalTheme['space'];
};

interface Props extends NewSpaceProps, NewColorProps {}

const foo: Props = {
  px: (theme) => theme.colors.blue100,
  backgroundColor: {
    320: 'blue100',
    640: 'blue200',
  },
  bg: ['blue100', 'blue200', 'blue900'],
  mx: 1000,
};
