import React, { useState } from 'react';
import logo from './logo.svg';
import { Box } from './Box';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import * as CSS from 'csstype';
import { CSSObject } from 'system-props';

const test2: CSSObject = {
  background: 'lavender',
  color: '$blue100',
  paddingX: '$4',
};

type Pseudos = {
  [K in CSS.Pseudos]?: CSS.Properties;
};

const test: CSS.Properties & Pseudos = {
  color: 'red',
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box
          cx={{
            color: '$cyan50',
            ':focus': {
              color: 'lavender',
            },
          }}
        />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello Vite + React!</p>
          <p>
            <button onClick={() => setCount((count) => count + 1)}>
              count is: {count}
            </button>
          </p>
          <p>
            Edit <code>App.tsx</code> and save to test HMR updates.
          </p>
          <p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            {' | '}
            <a
              className="App-link"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vite Docs
            </a>
          </p>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
