import * as React from 'react';
import { Box } from '../box-styled-components';
import { render } from '@testing-library/react';
import 'jest-styled-components';

describe('pseudo selectors', () => {
  it('disabled - see issue #43', () => {
    const { container } = render(
      // @ts-ignore
      <Box _disabled={{ color: 'blue' }} disabled>
        foo
      </Box>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        box-sizing: border-box;
      }

      .c0[disabled],
      .c0[disabled]:hover,
      .c0[disabled]:focus,
      .c0[aria-disabled],
      .c0[aria-disabled]:hover,
      .c0[aria-disabled]:focus {
        color: blue;
      }

      <div
        class="c0"
        disabled=""
      >
        foo
      </div>
    `);
  });
});
