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
      "grid",
      "gridContainer",
      "gridItem",
      "layout",
      "margin",
      "padding",
      "position",
      "propNames",
      "pseudoSelectors",
      "shadow",
      "shouldForwardProp",
      "space",
      "styledSystemLayout",
      "transition",
      "typography",
    ]
  `);
});
