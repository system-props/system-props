import { createSystem } from '../src/createSystem';

const theme = {
  colors: {
    primary: 'rebeccapurple',
    secondary: 'papayawhip',
  },
  fontSize: [0, 4, 8, 16],
  breakpoints: [40, 52, 64].map(n => n + 'em'),
};

const themeWithObjectBPs = {
  ...theme,
  breakpoints: {
    bp40: '40em',
    bp52: '52em',
    bp64: '64em',
  },
};

const system = createSystem({
  pseudoSelectors: { _hover: '&:hover' },
});

const parser = system({
  color: {
    property: 'color',
    scale: 'colors',
  },
  bg: {
    property: 'backgroundColor',
    scale: 'colors',
  },
  fontSize: true,
  border: true,
});

test('parses pseudo selectors', () => {
  const styles = parser({
    theme,
    _hover: {
      color: 'secondary',
      fontSize: [2, 1],
    },
    fontSize: [1, 2, 3],
    color: ['primary', null, 'secondary'],
  });
  expect(styles).toEqual({
    color: 'rebeccapurple',
    fontSize: 4,
    '&:hover': {
      color: 'papayawhip',
      fontSize: 8,
      '@media screen and (min-width: 40em)': {
        fontSize: 4,
      },
    },
    '@media screen and (min-width: 40em)': {
      fontSize: 8,
    },
    '@media screen and (min-width: 52em)': {
      fontSize: 16,
      color: 'papayawhip',
    },
  });
});

test('uses breakpoints', () => {
  const styles = parser({
    theme,
    fontSize: [1, 2, 3],
    color: ['primary', null, 'secondary'],
  });
  expect(styles).toEqual({
    color: 'rebeccapurple',
    fontSize: 4,
    '@media screen and (min-width: 40em)': {
      fontSize: 8,
    },
    '@media screen and (min-width: 52em)': {
      fontSize: 16,
      color: 'papayawhip',
    },
  });
});

// Per default, we expect it to be impossible to override breakpoints
test('does *not* use dynamically changed breakpoints', () => {
  const styles = parser({
    theme: { ...theme, breakpoints: ['11em', '22em', '33em'] },
    fontSize: [1, 2, 3],
    color: ['primary', null, 'secondary'],
  });
  expect(styles).toEqual({
    color: 'rebeccapurple',
    fontSize: 4,
    '@media screen and (min-width: 40em)': {
      fontSize: 8,
    },
    '@media screen and (min-width: 52em)': {
      fontSize: 16,
      color: 'papayawhip',
    },
  });
});

// With caching disabled, we expect it to be possible to change breakpoints
test.skip('uses dynamically changed breakpoints', () => {
  const firstStyles = parser({
    theme: {
      ...theme,
      breakpoints: ['11em', '22em', '33em'],
      disableStyledSystemCache: true,
    },
    fontSize: [1, 2, 3],
    color: ['primary', null, 'secondary'],
  });
  expect(firstStyles).toEqual({
    color: 'rebeccapurple',
    fontSize: 4,
    '@media screen and (min-width: 11em)': {
      fontSize: 8,
    },
    '@media screen and (min-width: 22em)': {
      fontSize: 16,
      color: 'papayawhip',
    },
  });

  const secondStyles = parser({
    theme: {
      ...theme,
      breakpoints: ['9em', '8em', '7em'],
      disableStyledSystemCache: true,
    },
    fontSize: [1, 2, 3],
    color: ['primary', null, 'secondary'],
  });
  expect(secondStyles).toEqual({
    color: 'rebeccapurple',
    fontSize: 4,
    '@media screen and (min-width: 9em)': {
      fontSize: 8,
    },
    '@media screen and (min-width: 8em)': {
      fontSize: 16,
      color: 'papayawhip',
    },
  });

  const thirdStyles = parser({
    theme,
    fontSize: [1, 2, 3],
    color: ['primary', null, 'secondary'],
  });
  expect(thirdStyles).toEqual({
    color: 'rebeccapurple',
    fontSize: 4,
    '@media screen and (min-width: 9em)': {
      fontSize: 8,
    },
    '@media screen and (min-width: 8em)': {
      fontSize: 16,
      color: 'papayawhip',
    },
  });
});

// // Skipped since I moved breakpoints into the createSystem signature
// test.skip('throws an error if no "breakpoints" entry found in theme', () => {
//   expect(() =>
//     parser({
//       theme: {
//         disableStyledSystemCache: true,
//         colors: {
//           primary: 'rebeccapurple',
//           secondary: 'papayawhip',
//         },
//         fontSize: [0, 4, 8, 16],
//       },
//       fontSize: [1, 2, 3],
//       color: ['primary', null, 'secondary'],
//     })
//   ).toThrowErrorMatchingInlineSnapshot(
//     `"The system props parser could not find a \`breakpoints\` property in the theme object, which is required for responsive styles to work. Make sure that the theme object has a breakpoints property."`
//   );
// });

test.only('parses raw function values', () => {
  // flush cache from previous tests
  const styles = parser({
    theme: { ...theme, disableStyledSystemCache: true },
    border(t: any) {
      return `1px solid ${t.colors.primary}`;
    },
    fontSize(t: any) {
      return [t.fontSize[1], t.fontSize[2], t.fontSize[3]];
    },
    _hover: {
      color(t: any) {
        return t.colors.secondary;
      },
      fontSize: 2,
    },
  });
  expect(styles).toEqual({
    border: '1px solid rebeccapurple',
    fontSize: 4,
    '@media screen and (min-width: 40em)': {
      fontSize: 8,
    },
    '@media screen and (min-width: 52em)': {
      fontSize: 16,
    },
    '&:hover': {
      color: 'papayawhip',
      fontSize: 8,
    },
  });
});

test('parses raw function values at each breakpoint', () => {
  const styles = parser({
    theme,
    color: [(t: any) => t.colors.primary, (t: any) => t.colors.secondary],
  });
  expect(styles).toEqual({
    color: 'rebeccapurple',
    '@media screen and (min-width: 40em)': {
      color: 'papayawhip',
    },
  });

  const stylesObjectBPs = parser({
    theme: {
      ...themeWithObjectBPs, // flush cache from previous tests
      disableStyledSystemCache: true,
    },
    color: {
      all: (t: any) => t.colors.primary,
      bp40: (t: any) => t.colors.secondary,
    },
  });
  expect(stylesObjectBPs).toEqual({
    color: 'rebeccapurple',
    '@media screen and (min-width: 40em)': {
      color: 'papayawhip',
    },
  });
});
