import { createSystem } from '../createSystem';

const theme = {
  colors: {
    primary: 'rebeccapurple',
    secondary: 'papayawhip',
  },
  fontSize: [0, 4, 8, 16],
  space: [0, 4, 8, 16],
  breakpoints: [40, 52, 64].map((n) => n + 'em'),
  systemPropsId: false,
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
  mx: { properties: ['marginLeft', 'marginRight'], scale: 'space' },
  marginLeft: { property: 'marginLeft', scale: 'space' },
});

test('parses pseudo selectors', () => {
  const styles = parser({
    theme,
    _hover: {
      color: '$secondary',
      fontSize: ['$2', '$1'],
    },
    fontSize: ['$1', '$2', '$3'],
    color: ['$primary', null, '$secondary'],
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
    fontSize: ['$1', '$2', '$3'],
    color: ['$primary', null, '$secondary'],
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
    fontSize: ['$1', '$2', '$3'],
    color: ['$primary', null, '$secondary'],
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
      systemPropsCacheKey: 'foo',
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
      systemPropsCacheKey: 'bar',
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

test('parses raw function values', () => {
  // flush cache from previous tests
  const styles = parser({
    theme: { ...theme, systemPropsId: 'bar', systemPropsCacheKey: 'baz' },
    border(t: typeof theme) {
      return `1px solid ${t.colors.primary}`;
    },
    fontSize(t: typeof theme) {
      return [t.fontSize[1], t.fontSize[2], t.fontSize[3]];
    },
    _hover: {
      color(t: typeof theme) {
        return t.colors.secondary;
      },
      fontSize: '$2',
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
    color: [
      (t: typeof theme) => t.colors.primary,
      (t: typeof theme) => t.colors.secondary,
    ],
  });
  expect(styles).toEqual({
    color: 'rebeccapurple',
    '@media screen and (min-width: 40em)': {
      color: 'papayawhip',
    },
  });

  const stylesObjectBPs = parser({
    theme: {
      ...themeWithObjectBPs,
      // flush cache from previous tests
      systemPropsCacheKey: 'oof',
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

test('ignores undefined values - issue #35', () => {
  const styles = parser({
    theme,
    color: undefined,
    mx: '$2',
    marginLeft: undefined,
  });
  expect(styles).toMatchObject({ marginLeft: 8, marginRight: 8 });
});
