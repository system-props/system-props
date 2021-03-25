import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { Box } from './Box';

const Button = (props) => {
  return (
    <Box
      color="white"
      as="a"
      fontFamily="$base"
      backgroundColor="$blue400"
      borderRadius="$pill"
      fontSize="$body"
      fontWeight="600"
      p="$2 $3"
      textDecoration="none"
      transition="all 200ms ease"
      margin="0 $2"
      _hover={{
        boxShadow: '0 5px 15px rgba(0, 0, 0, .12)',
        transform: 'translateY(-2px)',
      }}
      {...props}
    />
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="center" mt="100px">
        <Button as="a" href="/docs/installation">
          Documentation
        </Button>

        <Button
          backgroundColor="transparent"
          color="$gray400"
          as="a"
          href="https://github.com/roginfarrer/system-props"
        >
          GitHub
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default App;