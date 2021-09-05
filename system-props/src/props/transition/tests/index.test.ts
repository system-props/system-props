import { transition } from '..';
import { createSystem } from '../../../core';

const system = createSystem();

const parser = system(transition);

test('returns transition styles', () => {
  const style = parser({
    theme: { breakpoints: [] },
    transition: 'color 1.5s ease, background-color .5s ease-out',
  });
  expect(style).toEqual({
    transition: 'color 1.5s ease, background-color .5s ease-out',
  });
});

test('parses theme properties', () => {
  const theme = {
    breakpoints: [],
    transitions: { a: 'color 1.5s ease', b: 'opacity .5s ease-out' },
    transitionDurations: { 100: '100ms', 200: '200ms' },
    transitionTimingFunctions: { standard: 'ease', relaxed: 'ease-out' },
  };
  const styleA = parser({
    theme,
    transition: '$a, $b',
    transitionDuration: '$200',
    transitionTimingFunction: '$standard',
  });
  expect(styleA).toEqual({
    transition: 'color 1.5s ease, opacity .5s ease-out',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease',
  });

  const styleB = parser({
    theme,
    transition: '$a, background-color 2s ease-in-out',
  });
  expect(styleB).toEqual({
    transition: 'color 1.5s ease, background-color 2s ease-in-out',
  });

  const styleC = parser({
    theme,
    transitionProperty: 'color, opacity',
    transitionDuration: '$100',
    transitionTimingFunction: '$relaxed',
    transitionDelay: '1s',
  });
  expect(styleC).toEqual({
    transitionProperty: 'color, opacity',
    transitionDuration: '100ms',
    transitionTimingFunction: 'ease-out',
    transitionDelay: '1s',
  });
});
