import * as React from 'react';
import { Box } from '../box-styled-components';
import { render as bareRender, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import 'jest-styled-components';

const AllTheProviders = ({ children }: { children?: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const render = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => bareRender(ui, { wrapper: AllTheProviders, ...options });

describe('pseudo selectors', () => {
  it('disabled - see issue #43', () => {
    const { container } = render(
      // @ts-ignore
      <Box _disabled={{ color: '$red200' }} disabled>
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
        color: #f28e8e;
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
