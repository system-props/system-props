import * as React from 'react';
import { Box } from '../box-emotion';
import { createSerializer, matchers } from '@emotion/jest';
import { render as bareRender, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../theme';

const AllTheProviders = ({ children }: { children?: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const render = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => bareRender(ui, { wrapper: AllTheProviders, ...options });

// configures @emotion/jest to ignore DOM elements
expect.addSnapshotSerializer(createSerializer());
// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

describe('pseudo selectors', () => {
  it('disabled - see issue #43', () => {
    const { container } = render(
      // @ts-ignore
      <Box _disabled={{ color: '$red200' }} disabled>
        foo
      </Box>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      .emotion-0 {
        box-sizing: border-box;
      }

      .emotion-0[disabled],
      .emotion-0[disabled]:hover,
      .emotion-0[disabled]:focus,
      .emotion-0[aria-disabled],
      .emotion-0[aria-disabled]:hover,
      .emotion-0[aria-disabled]:focus {
        color: #f28e8e;
      }

      <div
        class="emotion-0"
        disabled=""
      >
        foo
      </div>
    `);
  });
});
