import { createSystem } from '../../core';
import flexbox from '..';

const system = createSystem();

const parser = system(flexbox);

test('returns flexbox styles', () => {
  const style = parser({
    theme: {
      breakpoints: [],
    },
    alignItems: 'center',
    flex: '1 1 auto',
  });
  expect(style).toEqual({
    alignItems: 'center',
    flex: '1 1 auto',
  });
});
