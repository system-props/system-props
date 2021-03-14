import { borderShorthandTransform } from '../borderShorthandTransform';

test('transform handles rgba', () => {
  expect(
    borderShorthandTransform('1px solid rgba(0, 0, 0, 0.1)', {}, {}, false)
  ).toEqual('1px solid rgba(0, 0, 0, 0.1)');
});
