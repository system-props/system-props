import { shadow } from '..';
import { createSystem } from '@/core/createSystem';

const system = createSystem();

const parser = system(shadow);

const themedParser = (config: { [x: string]: any }) =>
  parser({
    theme: {
      breakpoints: ['40em', '52em', '64em'],
      space: ['0px', '4px', '8px', '12px', '16px'],
      colors: {
        blue: {
          10: '#FF0000',
        },
      },
      shadows: {
        small: '0 1px 4px rgba(0, 0, 0, .125)',
      },
    },
    ...config,
  });

test('returns shadow styles', () => {
  const style = themedParser({
    textShadow: '0 -1px rgba(255, 255, 255, .25)',
    boxShadow: 'small',
  });
  expect(style).toEqual({
    textShadow: '0 -1px rgba(255, 255, 255, .25)',
    boxShadow: '0 1px 4px rgba(0, 0, 0, .125)',
  });
});

test('uses theme colors if it can', () => {
  const style = themedParser({
    textShadow: '0 -1px blue.10',
    boxShadow: '0 -1px $blue.10',
  });
  expect(style).toEqual({
    textShadow: '0 -1px #FF0000',
    boxShadow: '0 -1px #FF0000',
  });
});
