import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  createSystem,
  color,
  ResponsiveProp,
  PseudoProps,
  SystemProps,
  border,
  space,
  layout,
  position,
  shadow,
  background,
  flexbox,
  grid,
  shouldForwardProp,
} from 'system-props';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import * as CSS from 'csstype';

const system = createSystem();

interface BoxProps extends SystemProps, PseudoProps<SystemProps> {
  transform?: ResponsiveProp<CSS.Property.Transform>;
}

const Box = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    shouldForwardProp(prop) && defaultValidatorFn(prop),
})<BoxProps>(
  system({
    ...color,
    ...border,
    ...background,
    ...flexbox,
    ...grid,
    ...shadow,
    ...position,
    ...layout,
    ...space,
    transform: true,
  })
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        color="$blue.10"
        bg={(theme) => theme.colors.yellow}
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
