export const pseudoSelectors = {
  _hover: '&:hover',
  _focus: '&:focus',
  _focusWithin: '&:focus-within',
  _focusVisible: '&:focus-visible',
  _active: '&:active',
  _visited: '&:visited',
  _selection: '&::selection',
  _before: '&::before',
  _after: '&::after',
  _placeholder: '&::placeholder',
  _hoverAndFocus: '&:hover, &:focus',
  _disabled:
    '[disabled], [disabled]:hover, [disabled]:focus, [aria-disabled], [aria-disabled]:hover, [aria-disabled]:focus',
  _readOnly: '[readOnly]',
  _first: '&:first-child',
  _last: '&:last-child',
  _notFirst: '&:not(:first-of-type)',
  _notLast: '&:not(:last-of-type)',
  _checked: '&[aria-checked=true], &[checked]',
  _odd: '&:nth-of-type(odd)',
  _even: '&:nth-of-type(even)',
};

type PseudoSelectors = typeof pseudoSelectors;

// Allow "content" prop within _before or _after
export type PseudoProps<P> = {
  [K in keyof PseudoSelectors]?: K extends '_before' | '_after'
    ? (P & { content?: string }) | PseudoProps<P>
    : P | PseudoProps<P>;
};
