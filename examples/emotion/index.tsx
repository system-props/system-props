// @ts-ignore
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  createSystem,
  color,
  border,
  space,
  layout,
  position,
  shadow,
} from 'system-props';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

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
};

const system = createSystem();

const Box = styled.div(
  system({ ...shadow, ...color, ...layout, ...position, ...border, ...space })
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        color="$blue.30"
        bg="$gray.30"
        padding="$2"
        border="1px solid $gray.10"
        mb="$6"
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
