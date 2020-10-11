import { createSystem } from '@/core';
import grid from '..';

const system = createSystem();

const parser = system(grid);

test('returns grid styles', () => {
  const style = parser({
    theme: {
      breakpoints: [],
    },
    gridGap: 32,
  });
  expect(style).toEqual({
    gridGap: 32,
  });
});
