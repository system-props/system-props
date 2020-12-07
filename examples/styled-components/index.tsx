import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { Box } from './Box';

type Breakpoints = {
  small?: string;
  medium?: string;
  large?: string;
};

type ResponsiveValue = {
  [k in keyof Breakpoints | 'all']: string;
};

const foo: ResponsiveValue = {
  small: 'hey',
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        position="relative"
        fontStyle="italic"
        fontWeight="bold"
        p="$2 $4"
        color="$gray30"
        border="1px solid rgba(0, 0, 0, 0.1)"
        mb="$4"
        transform="rotate(1deg)"
      >
        Hello
      </Box>
      <Box bg="$gray20" marginTop="-$2" mb="$4" padding="$2">
        Welcome
      </Box>
      <Box
        bg="blue20"
        padding="$2"
        boxShadow="0px 1px 3px $blue10"
        _hover={{ bg: 'blue10' }}
      >
        Welcome
      </Box>
      <Box p="$4" bg="red">
        Welcome
      </Box>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
