import { propNames } from '../propNames';
import { shouldForwardProp } from '../shouldForwardProp';

describe('does not forward styled-system props', () => {
  test.each(propNames)('%s', (propName) => {
    expect(shouldForwardProp(propName)).toBe(false);
  });
});

test('forwards "children" prop', () => {
  expect(shouldForwardProp('children')).toBe(true);
});

describe('forwards other random props', () => {
  const randomPropNames = ['to', 'passHref', 'maxItems', 'strict'];

  test.each(randomPropNames)('%s', (propName) => {
    expect(shouldForwardProp(propName)).toBe(true);
  });
});
