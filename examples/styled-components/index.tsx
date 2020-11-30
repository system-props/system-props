import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { Box } from './Box';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
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
