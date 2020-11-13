import { shadow, getShadow } from '../index';
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

describe('getShadow', () => {
  const props = {
    theme: {
      colors: {
        gray400: '#e3e3e3',
      },
    },
  };

  test('handles tokens in box-shadow', () => {
    expect(getShadow('10px 5px 1px gray400', {}, props, false)).toEqual(
      '10px 5px 1px #e3e3e3'
    );

    expect(getShadow('1px -16px gray400', {}, props, false)).toEqual('1px -16px #e3e3e3')

    expect(getShadow('inset 1px 1em gray400', {}, props, false)).toEqual('inset 1px 1em #e3e3e3')

    expect(getShadow('60px -16px gray400', {}, props, false)).toEqual('60px -16px #e3e3e3')

    expect(getShadow('60px -16px rgba(0, 242, 42, .24)', {}, props, false)).toEqual('60px -16px rgba(0, 242, 42, .24)')
  });
});
