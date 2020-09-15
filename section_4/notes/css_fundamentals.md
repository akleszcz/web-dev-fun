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
  - > Attributes are placed inside the start tag, and consist of a name and a value, separated by an "=" character. The attribute value can remain unquoted if it doesn't contain spaces or any of " ' ` = < or >. Otherwise, it has to be quoted using either single or double quotes. The value, along with the "=" character, can be omitted altogether if the value is the empty string.

    [Source](https://www.w3.org/TR/2011/WD-html5-20110525/introduction.html)
  - syntax:
    - `[attr]` - example: matches elements with a `contenteditable` attribute:
      ```css
      pre[contenteditable] {
        background-color: green;
      }
      ```
    - `[attr=value]` - example: matches elements with a `contenteditable` attribute whose value is exactly "true":
      ```css
      pre[contenteditable="true"] {
        background-color: green;
      }
      ```
    - `[attr|=value]` - @TODO
    - `[attr^=value]` - example: matches elements with a `contenteditable` attribute whose value is prefixed (preceded) by "tr":
      ```css
      pre[contenteditable^="tr"] {
        background-color: green;
      }
      ```
    - `[attr$=value]` - example: matches elements with a `contenteditable` attribute whose value is suffixed (followed) by "tr":
      ```css
      pre[contenteditable$="tr"] {
        background-color: green;
      }
      ```
    - `[attr*=value]` - matches elements with a `contenteditable` attribute whose value contains at least one occurrence of "ru" within the string:
      ```css
      pre[contenteditable*="ru"] {
        background-color: green;
      }
      ```
    - `[attr~=value]` - matches elements with a `contenteditable` attribute whose value is a whitespace-separated list of words, one of which is exactly "prettyprint":
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