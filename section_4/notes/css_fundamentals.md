# CSS (Cascading Style Sheets) fundamentals

- a style sheet language used to style HTML elements

- the anatomy of a CSS rule (or ruleset):
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
## CSS selectors
- universal selector
  - indicated by an asterisk (`*`)
  - selects everything in the document (or inside the parent element)
  - examples:
```css
* {
  color: green;
}
```
```css
select > * {
  color: green;
}
```
- element (tag, type) selector
  - selects an HTML tag/element
  - example:
```css
select {
  color: green;
}
```
- class selector
  - starts with a `.` (period) character, followed by a class name
  - example:
```css
.prettyprint {
  background-color: green;
}
```
- attribute selector
  - matches elements based on the presence or value of a given attribute ([source](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors))
  - examples:
```css
pre[contenteditable] {
  background-color: green;
}
```
```css
pre[contenteditable="true"] {
  background-color: green;
}
```
```css
pre[contenteditable*="ru"] {
  background-color: green;
}
```
```cs
pre[class~="prettyprint"] {
  background-color: green;
}
```
- id selector
## Additional keywords
- Pseudo-classes
- Pseudo-elements
## CSS combinators
## Rule specificity