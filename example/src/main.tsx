import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ScThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <App />
      </EmotionThemeProvider>
    </ScThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
