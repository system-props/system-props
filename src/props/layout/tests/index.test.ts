import { createSystem } from '@/core';
import { layout } from '..';

const system = createSystem();

const parser = system(layout);

test('returns layout styles', () => {
  const style = parser({
    theme: {
      breakpoints: ['40em', '52em'],
    },
    width: ['100%', '50%', '25%'],
    minHeight: 32,
    maxWidth: 768,
  });
  expect(style).toEqual({
    width: '100%',
    maxWidth: 768,
    minHeight: 32,
    '@media screen and (min-width: 40em)': {
      width: '50%',
    },
    '@media screen and (min-width: 52em)': {
      width: '25%',
    },
  });
});

test('returns 0 from theme.sizes', () => {
  const style = parser({
    theme: {
      breakpoints: [],
      sizes: [24, 48, 96],
    },
    width: 0,
    height: 0,
  });
  expect(style).toEqual({
    width: 24,
    height: 24,
  });
});
