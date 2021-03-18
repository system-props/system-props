import * as AllExports from '..';

test('package has expected exports', () => {
  expect(Object.keys(AllExports).sort()).toMatchInlineSnapshot(`
    Array [
      "background",
      "border",
      "color",
      "createSystem",
      "flexContainer",
      "flexItem",
      "flexbox",
      "get",
      "grid",
      "gridContainer",
      "gridItem",
      "layout",
      "margin",
      "memoizeGet",
      "padding",
      "position",
      "propNames",
      "pseudoSelectors",
      "shadow",
      "shouldForwardProp",
      "space",
      "styledSystemLayout",
      "tokenGet",
      "typography",
    ]
  `);
});
