import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  createSystem,
  color,
  ResponsiveProp,
  PseudoProps,
  SystemProps,
  border,
  space,
  layout,
  position,
  shadow,
  background,
  flexbox,
  grid,
} from 'system-props';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import * as CSS from 'csstype';

const theme = {
  breakpoints: ['42em', '52em', '60em'],
  space: ['0px', '4px', '8px', '12px', '16px', '20px', '24px', '28px', '32px'],
  colors: {
    gray: {
      10: '#333',
      20: '#666',
      30: '#999',
    },
    blue: {
      10: 'skyblue',
      20: 'teal',
      30: 'blue',
    },
  },
} as const;

const system = createSystem();

interface BoxProps extends SystemProps, PseudoProps<SystemProps> {
  transform?: ResponsiveProp<CSS.Property.Transform>;
}

const Box = styled.div<BoxProps>(
  system({
    ...color,
    ...border,
    ...background,
    ...flexbox,
    ...grid,
    ...shadow,
    ...position,
    ...layout,
    ...space,
    transform: true,
  })
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        color="$blue.10"
        bg={(t: typeof theme) => t.colors.gray[10]}
        padding="$2 $8"
        border="1px solid rgba(0, 0, 0, 0.1)"
        mb="$6"
        transform="rotate(1deg)"
      >
        Hello
      </Box>
      <Box bg="$gray.20" marginTop="-$2" mb={4} padding="$2">
        Welcome
      </Box>
      <Box
        bg="blue.20"
        padding="$2"
        boxShadow="0px 1px 3px $blue.10"
        _hover={{ bg: 'blue.10' }}
      >
        Welcome
      </Box>
      <Box p={4} bg="red">
        Welcome
      </Box>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
