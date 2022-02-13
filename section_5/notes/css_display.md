# CSS `display` property
- defines how an element behaves in the layout alongside other elements and, sometimes, how the direct children of the element behave
- syntax (currently single-valued):
  ```css
  selector {
    display: value;
  }
  ```
- values defined in CSS2 specification:
  - `inline`:
    - > The default value for all elements is inline. Most "User Agent Stylesheets" (the default styles the browser applies to all sites) reset many elements to "block".

    [Source](https://css-tricks.com/almanac/properties/d/display/)
    - by default, does not force a new line to begin in the document flow
    - doesn’t break the flow of a text
    - `inline` elements accept `margin` and `padding`, but they push other elements away horizontally and not vertically
    - `height` and `width` properties have no effect on `inline`, non-replaced elements:
      > #### 10.3.1 Inline, non-replaced elements
      > The 'width' property does not apply.
      >
      > (...)
      >
      > #### 10.6.1 Inline, non-replaced elements
      >
      >  The 'height' property does not apply.

      [Source](https://www.w3.org/TR/CSS21/visudet.html#the-height-property)

      See the [note](#replaced-elements) about replaced elements for more details.
    - elements displayed by default as `inline` by popular browsers include: `<a>`, `<b>`, `<button>`, `<em>`, `<iframe>`, `<i>`, `<img>`, `<label>`, `<span>`, `<strong>`, `<video>`
  - `block`:
    - > By default (without setting a width) they take up as much horizontal space as they can

    [Source](https://css-tricks.com/almanac/properties/d/display/)
    - > By default, block-level elements begin on new lines, but inline elements can start anywhere in a line.

    [Source](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)
    - elements displayed by default as `block` by popular browsers include: `<article>`,  `<aside>`, `<div>`, `<footer>`, `<form>`, `<h1>` - `<h6>`, `<header>`, `<p>`, `<pre>`
    - some inline elements, like `<span>`, should not contain block elements. Try validating the following code:
      ```html
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <span>
          <div>Hello world!</div>
        </span>
      </body>
      </html>
      ```
    with [Markup Validation Service](https://validator.w3.org/) from W3C and you should get the following error:
    > Error: Element div not allowed as child of element span in this context.

    For other inline elements it's fine to be wrapped around a block element, e.g. this markup with a `<div>` inside of `<a>` is considered valid:
      ```html
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <a href="https://example.com">
          <div>Hello world!</div>
        </a>
      </body>
      </html>
      ```

  - `inline-block`:
    - similarly to `inline`, doesn’t break the flow of a text
    - respects `height` and `width` properties on an element
    - respects `margin` and `padding` and pushes other elements away both horizontally and vertically
    - elements displayed by default as `inline-block` by popular browsers include `<button>`, `<textarea>`, `<input>` and `<select>`
    - real-life example - social media icons with `display` set to `inline-block`, so they can have `width` and `height` defined:
      ```css
      .widget-share__btn-icon {
        display: inline-block;
      }
      ```
      [Source](https://www.goal.com/en/news/im-disappointed-and-angry-fulham-boss-parker-slams-lookman/ig0z373bvwfd1hdh248irovfl)

  - `list-item`
  - `none`:
    - > Turns off the display of an element so that it has no effect on layout (the document is rendered as though the element did not exist). All descendant elements also have their display turned off.

    [Source](https://developer.mozilla.org/en-US/docs/Web/CSS/display)

    See 'display:none vs visibility:hidden vs opacity:0' in the [Notes](#notes) section for more details.

  - `table`, `inline-table`
  - other table-related values: `table-row`, `table-row-group`, `table-column`, `table-column-group`, `table-header-group`, `table-footer-group`, `table-cell`, `table-caption`


  [Source](https://www.w3.org/TR/CSS2/visuren.html)

- some of the new values introduced in CSS3:
  - `flex`, `inline-flex` - described in more detail [here](flexbox.md)
  - `grid`, `inline-grid` - described in more detail [here](grid.md)

[Source](https://www.w3.org/TR/css-display-3)

## Notes
---
### Replaced elements
> In CSS, a replaced element is an element whose representation is outside the scope of CSS; they're external objects whose representation is independent of the CSS formatting model.
>
> Put in simpler terms, they're elements whose contents are not affected by the current document's styles. The position of the replaced element can be affected using CSS, but not the contents of the replaced element itself.
> (...)
> Typical replaced elements are:
> - `<iframe>`
> - `<video>`
> - `<embed>`
> - `<img>`

[Source](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element)

### display :none vs visibility: hidden vs opacity: 0
|    | display :none | visibility: hidden | opacity: 0 |
|---|---|---|---|
|element affects layout|no|yes|yes|
|descendants property value respected|no| yes|no|
|element consumes pointer events|no|no|yes|

> 1. You know how if you display: ~~hidden;~~ none; an element, even if you display: block; a child, it doesn’t matter — it’s hidden because its parent is hidden.
>
> 2. The same is not true for visibility: hidden;. Children will be hidden because visibility inherits, but if you visibility: visible; them, they become visible again.
> 3. That’s what is happening here with pointer-events. If you pointer-events: none; on a parent and then pointer-events: auto; on a child, you’re re-enabling pointer events. Then a :hover on a parent will be triggered (for example), when hoving the child, but nowhere else inside the parent.

[Source](https://css-tricks.com/stuff-you-can-do-with-css-pointer-events/)

## Sources
- 'display', https://developer.mozilla.org/en-US/docs/Web/CSS/display
- 'display', https://css-tricks.com/almanac/properties/d/display/
- 'Block-level elements', https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements


