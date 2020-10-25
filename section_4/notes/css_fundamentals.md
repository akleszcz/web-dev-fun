# CSS (Cascading Style Sheets) fundamentals
- a style sheet language used to style HTML elements

## The anatomy of a CSS rule
```css
selector {
  property: value;
}
```
  Example rule:
```css
select {
  color: green;
}
```
Find more about CSS selectors [here](css_selectors).

Sources:
- 'How CSS is structured', https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_is_structured

## Applying CSS to HTML
- external stylesheet:
  ```html
  <link rel="stylesheet" href="css/style.css">
  ```
- internal (embedded) stylesheet:
  - styles are defined with rules placed inside a `<style>` element in the `<head>` section of a page:
  ```html
  <style>
    #js-snippet-pre,
    #html-src-pre,
    #try-it-ifr {
      height: 300px;
      overflow-y: scroll;
    }
  </style>
  ```
  - placing a `<style>` element in the `<body>` may still work, but is considered an invalid HTML markup. 
  
    Example: go to [The W3C Markup Validation Service](https://validator.w3.org/#validate_by_input) and validate the following code:
  ```html
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div>First div</div>
      <style>
        div {
          background-color: brown;
        }
      </style>
      <div>Second div</div>
    </body>
    </html>
  ```
  The style `background-color: brown` is applied to both `<div>` elements (checked on Chrome v85.0.4183.121, Firefox v80.0.1 and Edge v86.0.622.38 on Windows 10), but the validator returns the following error:
  > Error: Element style not allowed as child of element body in this context.

- inline styles:
  - defined with a `style` attribute on an HTML element
  - example:
  ```html
  <div style="background: linear-gradient(to  left, #9198e5, #e66465);">
    inline-styled
  </div>
  ```
## CSS precedence order
CSS styles are applied in the following order:
- inline styles marked as `!important`
- internal/external rules marked as `!important` in the order of their specificity. Rules of the same specificity are applied in the order in which they appear in stylesheets
- inline styles
- internal and external styles in the order of their specificity. Rules of the same specificity are applied in the order in which they appear in stylesheets:
> If you include multiple \<style\> and \<link\> elements in your document, they will be applied to the DOM in the order they are included in the document — make sure you include them in the correct order, to avoid unexpected cascade issues.

Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style

More on CSS specificity coming soon.

### Notes on inheritance

> (...) directly targeted elements will always take precedence over rules which an element inherits from its ancestor.

Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity