import { createSystem } from '../createSystem';
import { space, color } from '../../props';

const breakpoints = [40, 52, 64].map((n) => n + 'em');

test('returns a style parser', () => {
  const system = createSystem();
  const parser = system({
    color: true,
    backgroundColor: {
      property: 'backgroundColor',
      scale: 'colors',
    },
    mx: {
      scale: 'space',
      properties: ['marginLeft', 'marginRight'],
    },
  });
  expect(typeof parser).toBe('function');
  const styles = parser({
    theme: {
      breakpoints,
      space: ['0px', '4px', '8px', '16px', '32px'],
      colors: {
        primary: 'rebeccapurple',
      },
    },
    color: 'tomato',
    backgroundColor: '$primary',
    mx: ['$2', '$3', '$4'],
  });
  expect(styles).toEqual({
    color: 'tomato',
    backgroundColor: 'rebeccapurple',
    marginLeft: '8px',
    marginRight: '8px',
    '@media screen and (min-width: 40em)': {
      marginLeft: '16px',
      marginRight: '16px',
    },
    '@media screen and (min-width: 52em)': {
      marginLeft: '32px',
      marginRight: '32px',
    },
  });
});

test('merges multiple responsive styles', () => {
  const system = createSystem();
  const parser = system({
    margin: true,
    padding: true,
    width: true,
  });
  const styles = parser({
    theme: {
      breakpoints,
      space: ['0px', '4px', '8px', '16px', '32px'],
      colors: {
        primary: 'rebeccapurple',
      },
    },
    margin: [0, 4, 8],
    padding: ['16px', '32px', '64px'],
    width: ['100%', '50%'],
  });
  expect(styles).toEqual({
    margin: 0,
    padding: '16px',
    width: '100%',
    '@media screen and (min-width: 40em)': {
      margin: 4,
      padding: '32px',
      width: '50%',
    },
    '@media screen and (min-width: 52em)': {
      margin: 8,
      padding: '64px',
    },
  });
});

test('merges multiple responsive object styles', () => {
  const system = createSystem();
  const parser = system({
    margin: true,
    padding: true,
    width: true,
  });
  const styles = parser({
    theme: { breakpoints },
    margin: { _: 0, 0: 4, 1: 8 },
    padding: { _: 16, 0: 32, 1: 64 },
    width: { _: '100%', 0: '50%' },
  });
  expect(styles).toEqual({
    margin: 0,
    padding: 16,
    width: '100%',
    '@media screen and (min-width: 40em)': {
      margin: 4,
      padding: 32,
      width: '50%',
    },
    '@media screen and (min-width: 52em)': {
      margin: 8,
      padding: 64,
    },
  });
});

test('gets values from theme', () => {
  const system = createSystem();
  const parser = system({
    mx: {
      properties: ['marginLeft', 'marginRight'],
      scale: 'space',
    },
    color: {
      property: 'color',
      scale: 'colors',
    },
  });
  const style = parser({
    theme: {
      breakpoints,
      colors: {
        primary: 'tomato',
      },
      space: [0, 6, 12, 24, 48, 96],
    },
    mx: ['$0', '$1', '$2', '$3'],
    color: ['$primary', 'black'],
  });
  expect(style).toEqual({
    color: 'tomato',
    marginLeft: 0,
    marginRight: 0,
    '@media screen and (min-width: 40em)': {
      color: 'black',
      marginLeft: 6,
      marginRight: 6,
    },
    '@media screen and (min-width: 52em)': {
      marginLeft: 12,
      marginRight: 12,
    },
    '@media screen and (min-width: 64em)': {
      marginLeft: 24,
      marginRight: 24,
    },
  });
});

test('if strict, only allows theme values', () => {
  const system = createSystem({ strict: true });
  const parser = system({
    mx: {
      properties: ['marginLeft', 'marginRight'],
      scale: 'space',
    },
    color: {
      property: 'color',
      scale: 'colors',
    },
    bg: {
      property: 'backgroundColor',
      scale: 'colors',
    },
  });
  const style = parser({
    theme: {
      breakpoints,
      colors: {
        primary: 'tomato',
      },
      space: [0, 6, 12, 24],
    },
    mx: ['$0', '$1', '$2', '$3', '$4'],
    color: ['$primary', 'black'],
    bg: 'blue',
  });
  expect(style).toEqual({
    color: 'tomato',
    marginLeft: 0,
    marginRight: 0,
    '@media screen and (min-width: 40em)': {
      marginLeft: 6,
      marginRight: 6,
    },
    '@media screen and (min-width: 52em)': {
      marginLeft: 12,
      marginRight: 12,
    },
    '@media screen and (min-width: 64em)': {
      marginLeft: 24,
      marginRight: 24,
    },
  });
});

test('gets 0 index values from theme', () => {
  const system = createSystem();
  const parser = system({
    width: {
      property: 'width',
      scale: 'sizes',
    },
  });
  const style = parser({
    theme: {
      breakpoints,
      sizes: [24, 48],
    },
    width: '$0',
  });
  expect(style).toEqual({ width: 24 });
});

test('ignores null values', () => {
  const system = createSystem();
  const parser = system({
    color: true,
  });
  const style = parser({ theme: { breakpoints: [] }, color: null });
  expect(style).toEqual({});
});

test('skips null values in arrays', () => {
  const system = createSystem();
  const parser = system({
    fontSize: true,
  });
  const style = parser({
    theme: { breakpoints },
    fontSize: [16, null, null, 18],
  });
  expect(style).toEqual({
    fontSize: 16,
    // omitting these keys cause issues when using multiple
    // responsive props together #561 #551 #549
    '@media screen and (min-width: 40em)': {},
    '@media screen and (min-width: 52em)': {},
    '@media screen and (min-width: 64em)': {
      fontSize: 18,
    },
  });
});

test('includes single property functions', () => {
  const system = createSystem();
  const parser = system({
    color: true,
    backgroundColor: true,
    width: true,
  });
  // Struggling to get this typed correctly
  // We apply the SystemConfig to the Parser at every key in the parser,
  // but not sure how to type it so TS knows about it
  // @ts-ignore
  const a = parser.color({ color: 'tomato', backgroundColor: 'nope' });
  // @ts-ignore
  const b = parser.width({
    width: '100%',
    color: 'tomato',
    backgroundColor: 'nope',
  });
  expect(a).toEqual({ color: 'tomato' });
  expect(b).toEqual({ width: '100%' });
});

test('supports non-array breakpoints object', () => {
  const system = createSystem();
  const parser = system({
    margin: true,
    padding: true,
    width: true,
  });
  const styles = parser({
    theme: {
      systemPropsCacheKey: true,
      breakpoints: {
        sm: '32em',
        md: '40em',
        lg: '64em',
      },
    },
    margin: { _: 0, sm: 4, md: 8 },
    padding: { _: 16, lg: 64 },
  });
  expect(styles).toEqual({
    margin: 0,
    padding: 16,
    '@media screen and (min-width: 32em)': {
      margin: 4,
    },
    '@media screen and (min-width: 40em)': {
      margin: 8,
    },
    '@media screen and (min-width: 64em)': {
      padding: 64,
    },
  });
});

test('sorts media queries when responsive object values are used', () => {
  const system = createSystem();
  const parser = system({
    margin: true,
    padding: true,
    color: true,
  });
  const styles = parser({
    theme: {
      systemPropsCacheKey: true,
      breakpoints: {
        sm: '32em',
        md: '40em',
        lg: '64em',
        xl: '128em',
      },
    },
    padding: { _: 16, lg: 64, xl: 128 },
    margin: { sm: 4, md: 8 },
    color: { lg: 'tomato' },
  });
  expect(Object.keys(styles)).toEqual([
    '@media screen and (min-width: 32em)',
    '@media screen and (min-width: 40em)',
    '@media screen and (min-width: 64em)',
    '@media screen and (min-width: 128em)',
    'padding',
  ]);
});

describe('tokenPrefix', () => {
  test('default (prefix)', () => {
    const system = createSystem();
    const parser = system({
      ...space,
      ...color,
    });
    const styles = parser({
      theme: {
        systemPropsCacheKey: true,
        colors: {
          red: '#ff0000',
          blue: '#0000ff',
          green: '#00ff00',
        },
        space: {
          250: '2px',
          500: '4px',
          1000: '8px',
        },
      },
      color: '$red',
      backgroundColor: '$green',
      margin: 250,
      padding: '$500',
    });
    expect(styles).toStrictEqual({
      color: '#ff0000',
      backgroundColor: '#00ff00',
      margin: 250,
      padding: '4px',
    });
  });

  test('all', () => {
    const system = createSystem({ tokenPrefix: 'all' });
    const parser = system({
      ...space,
      ...color,
    });
    const styles = parser({
      theme: {
        systemPropsCacheKey: true,
        colors: {
          red: '#ff0000',
          blue: '#0000ff',
          green: '#00ff00',
        },
        space: {
          250: '2px',
          500: '4px',
          1000: '8px',
        },
      },
      color: 'red',
      backgroundColor: 'green',
      margin: 250,
      padding: '$500',
    });
    expect(styles).toStrictEqual({
      color: '#ff0000',
      backgroundColor: '#00ff00',
      margin: '2px',
      padding: '4px',
    });
  });

  test('noprefix', () => {
    const system = createSystem({ tokenPrefix: 'noprefix' });
    const parser = system({
      ...space,
      ...color,
    });
    const styles = parser({
      theme: {
        systemPropsCacheKey: true,
        colors: {
          red: '#ff0000',
          blue: '#0000ff',
          green: '#00ff00',
        },
        space: {
          250: '2px',
          500: '4px',
          1000: '8px',
        },
      },
      color: 'red',
      backgroundColor: 'green',
      margin: 1000,
      padding: '$500',
    });
    expect(styles).toStrictEqual({
      color: '#ff0000',
      backgroundColor: '#00ff00',
      margin: '8px',
      padding: '$500',
    });
  });
});
