# CSS (Cascading Style Sheets) fundamentals
- a style sheet language used to style HTML elements
## Applying CSS to HTML
- external stylesheet:
  ```html
  <link rel="stylesheet" href="css/style.css">
  ```
- internal stylesheet:
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