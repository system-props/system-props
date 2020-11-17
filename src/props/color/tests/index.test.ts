import { createSystem } from '@/core';
import { color } from '..';

const system = createSystem();

const parser = system(color);

test('returns colors styles', () => {
  const style = parser({
    color: 'gold',
    bg: 'tomato',
  });
  expect(style).toEqual({
    color: 'gold',
    backgroundColor: 'tomato',
  });
});
