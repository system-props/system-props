import { createSystem, compose } from '../createSystem';

const system = createSystem();

const color = system({
  color: true,
  bg: {
    property: 'backgroundColor',
  },
});

const fontSize = system({
  fontSize: true,
});

test('compose combines style parsers', () => {
  const parser = compose(color, fontSize);
  expect(typeof parser).toBe('function');
  const styles = parser({
    theme: { breakpoints: [] },
    color: 'tomato',
    bg: 'black',
    fontSize: 32,
  });
  expect(styles).toEqual({
    fontSize: 32,
    color: 'tomato',
    backgroundColor: 'black',
  });
});
