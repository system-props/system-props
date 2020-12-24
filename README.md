# System Props

Inspired by styled-system, a responsive, theme-based style props for building design systems with React. https://system-props.com

[![Version][]][npm]
![size][]
![MIT License][license]

[version]: https://flat.badgen.net/npm/v/styled-system
[npm]: https://npmjs.com/package/system-props
[size]: https://flat.badgen.net/bundlephobia/minzip/system-props
[license]: https://flat.badgen.net/badge/license/MIT/blue

```sh
yarn add system-props
```

## Features

Functions almost identically to styled-system, but adds the following features:

- Written in TypeScript
- Chakra's PseudoBox inspired pseudo selector props
- Access the theme object at any time by using the function syntax
- Supports common themed shorthand properties, like `border`, `margin`, `padding`, and `box-shadow`
- Strict mode: allow only values that are present in the theme
- Visually distinguish theme values by prefixing system prop values with `$`

## Quick Start

See the [examples](./examples) directory for more.

```tsx
import { createSystem, color, space } from 'system-props';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  space: ['0px', '4px', '8px', '16px', '32px'],
  colors: {
    blue100: 'lightblue',
    blue200: 'blue',
    //...etc
  },
};

const system = createSystem({
  strict, // default: false
  pseudoSelectors, // default: { _hover: '&:hover', ...etc }
});

const Box = styled.div(system({ ...color, ...space }));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        bg="$blue500"
        margin="$1 $2 $3 $4"
        border="1px solid $blue200"
        borderBottom={(theme) => `3px dotted ${theme.colors.blue200}`}
        _hover={{
          bg: 'blue700',
        }}
      />
    </ThemeProvider>
  );
};
```

## Credits

Many of the concepts here come from so many great, existing open-source projects, and they deserve a shout-out!

- [styled-system](https://github.com/styled-system/styled-system), duh
- [Chakra UI](https://chakra-ui.com/) and the PseudoBox
- [Stitches](https://github.com/modulz/stitches)
- [Sprout's System Props documentation](https://seeds.sproutsocial.com/components/system-props/)
