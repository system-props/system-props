import React, { useState } from 'react';
import logo from './logo.svg';
import { Box } from './Box';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box
          cx={{
            fontSize: '$4',
            bg: '$neutral400',
            size: '400px',
            ':hover': { bg: '$blue400', m: '20px' },
            $bp640: {
              bg: '$purple400',
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
