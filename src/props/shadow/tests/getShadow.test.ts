import { getShadow } from '../getShadow';

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

    expect(getShadow('1px -16px gray400', {}, props, false)).toEqual(
      '1px -16px #e3e3e3'
    );

    expect(getShadow('inset 1px 1em gray400', {}, props, false)).toEqual(
      'inset 1px 1em #e3e3e3'
    );

    expect(getShadow('60px -16px gray400', {}, props, false)).toEqual(
      '60px -16px #e3e3e3'
    );

    expect(
      getShadow('60px -16px rgba(0, 242, 42, .24)', {}, props, false)
    ).toEqual('60px -16px rgba(0, 242, 42, .24)');
  });
});
