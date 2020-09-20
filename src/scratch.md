```javascript
const system = createSystem({
  breakpoints: {
    small: '38em',
    medium: '48em',
    large: '52em',
  },
  pseudoSelectors: {
    _hover: '&:hover',
    _focus: '&:focus',
    _hoverAndFocus: '&:hover, &:focus',
  },
});
```
