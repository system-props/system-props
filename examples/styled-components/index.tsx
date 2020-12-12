import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme, AppTheme } from './theme';
import { Box } from './Box';

const alternateTheme: AppTheme = {
  ...theme,
  colors: {
    blue10: 'yellow',
    blue20: 'red',
    blue30: 'green',
    gray10: 'orange',
    gray20: 'blue',
    gray30: 'periwinkle',
  },
};

const App = () => {
  const [activeTheme, setActiveTheme] = useState(theme);
  function handleThemeChange() {
    setActiveTheme((prev: AppTheme) =>
      prev === theme ? alternateTheme : theme
    );
  }
  return (
    <ThemeProvider theme={activeTheme}>
      <label>
        <input
          type="checkbox"
          checked={activeTheme === alternateTheme}
          onChange={handleThemeChange}
        />
        Use alternate theme
      </label>
      <Box
        color="$gray30"
        margin="0"
        position="relative"
        fontStyle="italic"
        fontWeight="bold"
        p="$2 $4"
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
