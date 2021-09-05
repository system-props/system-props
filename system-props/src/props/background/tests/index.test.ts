import background from '..';
import { createSystem } from '../../../core';

const system = createSystem();

const parser = system(background);

test('returns background styles', () => {
  const style = parser({
    theme: { breakpoints: [] },
    backgroundImage: 'url(kitten.gif)',
  });
  expect(style).toEqual({ backgroundImage: 'url(kitten.gif)' });
});
