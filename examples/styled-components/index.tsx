// @ts-ignore
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createSystem, compose, get } from 'system-propz';
import styled, { ThemeProvider } from 'styled-components';

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
    transform: (value: string, _, props: {}) => {
      const [width, style, color] = value.split(' ');
      return `${width} ${style} ${get(props.theme.colors, color)}`;
    },
  },
});

const Box = styled.div(compose(color, margin));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        color="$blue.30"
        bg="$gray.30"
        padding="$2"
        border="1px solid $gray.10"
      >
        Hello
      </Box>
      <Box bg="$gray.20" margin="-$2" padding="$2">
        Welcome
      </Box>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
