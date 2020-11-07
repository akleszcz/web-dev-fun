# CSS `display` property
- defines how the element behaves in the layout alongside other elements and, sometimes, how the direct children of the element behave
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
    - elements displayed by default as `inline` by popular browsers include: `<a>`, `<b>`, `<button>`, `<em>`, `<iframe>` (surprisingly), `<i>`, `<img>`, `<label>`, `<span>`, `<strong>`, `<video>`
    - by default, does not force a new line to begin in the document flow
    - doesn’t break the flow of a text
    - inline elements accept margin and padding, but they push other elements away horizontally and not vertically
    - `height` and `width` properties have no effect on inline, non-replaced elements:
    > #### 10.3.1 Inline, non-replaced elements
    > The 'width' property does not apply. 
    >
    > (...)
    >
    > #### 10.6.1 Inline, non-replaced elements
    >
    >  The 'height' property does not apply.

    [Source](https://www.w3.org/TR/CSS21/visudet.html#the-height-property)

    ---
    ### Note: replaced elements
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

    ---
    - examples:
  - `block`:
    - elements displayed by default as `block` by popular browsers include: `<article>`,  `<aside>`, `<div>`, `<footer>`, `<form>`, `<h1>` - `<h6>`, `<header>`, `<p>`, `<pre>`
    - inline elements should not contain block elements. Try validating the following code:
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
  - `inline-block`
  - `list-item`
  - `none`
  - `table`
  - `inline-table`
  - other table-related values: `table-row-group`, `table-column`, `table-column-group`, `table-header-group`, `table-footer-group`, `table-row`, `table-cell`, `table-caption`


  [Source](https://www.w3.org/TR/CSS2/visuren.html)

- some of the new values introduced in CSS3:
  - `flex`
  - `inline-flex`
  - `grid`
  - `inline-grid`
  
[Source](https://www.w3.org/TR/css-display-3) 

Sources: 
- 'display', https://developer.mozilla.org/en-US/docs/Web/CSS/display
- 'display', https://css-tricks.com/almanac/properties/d/display/
