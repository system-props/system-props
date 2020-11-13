import border, {borderShorthandTransform} from '..';
import { createSystem } from '@/core/createSystem';

const system = createSystem();

const parser = system(border);

test('returns border styles', () => {
  const style = parser({
    theme: {
      breakpoints: [],
      colors: { red500: '#ff0000' },
      borders: { base: '1px solid papayawhip' },
    },
    border: '1px solid $red500',
    borderLeft: '1px solid red500',
    borderRight: 'base',
    borderBottom: '1px solid',
  });
  expect(style).toEqual({
    borderLeft: '1px solid #ff0000',
    border: '1px solid #ff0000',
    borderRight: '1px solid papayawhip',
    borderBottom: '1px solid',
  });
});

test('returns individual border styles', () => {
  const style = parser({
    theme: {
      breakpoints: [],
      borderWidths: { thin: 1 },
      colors: { primary: 'red' },
      borderStyles: { thick: 'solid' },
      radii: { small: 5 },
    },
    borderTopWidth: 'thin',
    borderTopColor: 'primary',
    borderTopStyle: 'thick',
    borderTopLeftRadius: 'small',
    borderTopRightRadius: 'small',
    borderBottomWidth: 'thin',
    borderBottomColor: 'primary',
    borderBottomStyle: 'thick',
    borderBottomLeftRadius: 'small',
    borderBottomRightRadius: 'small',
    borderRightWidth: 'thin',
    borderRightColor: 'primary',
    borderRightStyle: 'thick',
    borderLeftWidth: 'thin',
    borderLeftColor: 'primary',
    borderLeftStyle: 'thick',
    border: 'thin thick primary',
  });
  expect(style).toEqual({
    borderTopColor: 'red',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderRightColor: 'red',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderLeftColor: 'red',
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    border: '1 solid red',
  });
});

test('returns border top and bottom radii', () => {
  const style = parser({
    theme: {
      radii: { small: 5 },
      breakpoints: [],
    },
    borderTopLeftRadius: 'small',
    borderTopRightRadius: 'small',
    borderBottomRightRadius: 'small',
    borderBottomLeftRadius: 'small',
  });
  expect(style).toEqual({
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  });
});

test('transform handles rgba', ()=> {
  expect(borderShorthandTransform('1px solid rgba(0, 0, 0, 0.1)', {}, {}, false)).toEqual('1px solid rgba(0, 0, 0, 0.1)')
})
