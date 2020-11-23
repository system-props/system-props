import { createSystem } from '@/core';
import { typography } from '..';

const system = createSystem();

const parser = system(typography);

test('returns typography styles', () => {
  const style = parser({
    theme: {
      breakpoints: [],
    },
    fontSize: 32,
    fontWeight: 'bold',
  });
  expect(style).toEqual({
    fontSize: 32,
    fontWeight: 'bold',
  });
});
