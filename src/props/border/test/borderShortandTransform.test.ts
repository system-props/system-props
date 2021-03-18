import { borderShorthandTransform } from '../borderShorthandTransform';
import { get } from '../../../core';

test('transform handles rgba', () => {
  expect(
    borderShorthandTransform({ path: '1px solid rgba(0, 0, 0, 0.1)', get })
  ).toEqual('1px solid rgba(0, 0, 0, 0.1)');
});
