// @ts-ignore
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createSystem, compose } from '../../src';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

const theme = {
  breakpoints: ['42em', '52em', '60em'],
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32],
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

const system = createSystem({
  pseudoSelectors: {
    _hover: '&:hover',
  },
});

const margin = system({
  margin: {
    property: 'margin',
    scale: 'space',
  },
  padding: {
    property: 'padding',
    scale: 'space',
  },
});

const color = system({
  color: {
    property: 'color',
    scale: 'colors',
  },
  bg: {
    property: 'background-color',
    scale: 'colors',
  },
  border: {
    property: 'border',
  },
});

const Box = styled.div(compose(color, margin));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        color="blue.30"
        bg="gray.30"
        padding={2}
        border="1px solid $colors.gray.10"
      >
        Hello
      </Box>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
