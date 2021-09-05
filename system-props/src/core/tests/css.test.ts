import { createCss } from '../createCss';
import { space, color } from '../../props';

const breakpoints = [40, 52, 64].map((n) => n + 'em');

test('createCss returns a css parser', () => {
  const testCss = createCss({ ...space, ...color });
  expect(typeof testCss).toBe('function');
  // @ts-ignore
  const styles = testCss({
    color: 'tomato',
    backgroundColor: '$primary',
    mx: '$2',
    opacity: 1,
    ':hover': {
      opacity: 0.5,
    },
    $bp1: {
      color: 'green',
    },
    '@media and (min-width: 300px)': {
      mx: '$3',
    },
  })({
    theme: {
      breakpoints,
      mediaQueries: breakpoints.reduce((acc, bp, index) => {
        return { ...acc, [`bp${index + 1}`]: `@media and (min-width: ${bp})` };
      }, {}),
      space: ['0px', '4px', '8px', '16px', '32px'],
      colors: {
        primary: 'rebeccapurple',
      },
    },
  });
  expect(styles).toEqual({
    color: 'tomato',
    backgroundColor: 'rebeccapurple',
    marginLeft: '8px',
    marginRight: '8px',
    opacity: 1,
    ':hover': {
      opacity: 0.5,
    },
    '@media and (min-width: 40em)': {
      color: 'green',
    },
    '@media and (min-width: 300px)': {
      marginLeft: '16px',
      marginRight: '16px',
    },
  });
});

test('createCss takes option to change token prefix', () => {
  const testCss = createCss(
    { ...space, ...color },
    { tokenPrefix: 'noprefix' }
  );
  expect(typeof testCss).toBe('function');
  // @ts-ignore
  const styles = testCss({
    color: 'tomato',
    backgroundColor: 'primary',
    mx: 2,
    opacity: 1,
    ':hover': {
      opacity: 0.5,
    },
    bp1: {
      color: 'green',
    },
    '@media and (min-width: 300px)': {
      mx: '3',
    },
  })({
    theme: {
      breakpoints,
      mediaQueries: breakpoints.reduce((acc, bp, index) => {
        return { ...acc, [`bp${index + 1}`]: `@media and (min-width: ${bp})` };
      }, {}),
      space: ['0px', '4px', '8px', '16px', '32px'],
      colors: {
        primary: 'rebeccapurple',
      },
    },
  });
  expect(styles).toEqual({
    color: 'tomato',
    backgroundColor: 'rebeccapurple',
    marginLeft: '8px',
    marginRight: '8px',
    opacity: 1,
    ':hover': {
      opacity: 0.5,
    },
    '@media and (min-width: 40em)': {
      color: 'green',
    },
    '@media and (min-width: 300px)': {
      marginLeft: '16px',
      marginRight: '16px',
    },
  });
});
