import { getShadow } from '../getShadow';
import { tokenGet } from '../../../core';

describe('getShadow', () => {
  const props = {
    theme: {
      colors: {
        gray400: '#e3e3e3',
      },
    },
  };

  const _getShadow = (path: string) =>
    getShadow({ path, object: {}, get: tokenGet, props });

  test('handles tokens in box-shadow', () => {
    expect(_getShadow('10px 5px 1px $gray400')).toEqual('10px 5px 1px #e3e3e3');

    expect(_getShadow('1px -16px $gray400')).toEqual('1px -16px #e3e3e3');

    expect(_getShadow('inset 1px 1em $gray400')).toEqual(
      'inset 1px 1em #e3e3e3'
    );

    expect(_getShadow('60px -16px $gray400')).toEqual('60px -16px #e3e3e3');

    expect(_getShadow('60px -16px rgba(0, 242, 42, .24)')).toEqual(
      '60px -16px rgba(0, 242, 42, .24)'
    );
  });
});
