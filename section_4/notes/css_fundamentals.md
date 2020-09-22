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
      background-color: red;
    }
    ```
    ```css
    #outer > * {
      background-color: orange;
    }
    ```
- element (tag, type) selector
  - selects an HTML tag/element
  - example:
    ```css
    div {
      background-color: yellow;
    }
    ```
- class selector
  - starts with a `.` (period) character, followed by a class name
  - example:
    ```css
    .cat-container {
      background-color: green;
    }
    ```
- attribute selector 
  - matches elements based on the presence or value of a given attribute ([source](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors))
  - > Attributes are placed inside the start tag, and consist of a name and a value, separated by an "=" character. The attribute value can remain unquoted if it doesn't contain spaces or any of " ' ` = < or >. Otherwise, it has to be quoted using either single or double quotes. The value, along with the "=" character, can be omitted altogether if the value is the empty string.

    [Source](https://www.w3.org/TR/2011/WD-html5-20110525/introduction.html)
  - syntax:
    - presence and value selectors:
      - `[attr]` - example: matches `div` elements with a `class` attribute:
        ```css
        div[class] {
          background-color: blue;
        }
        ```
      - `[attr=value]` - example: matches `div` elements with a `class` attribute whose value is exactly "container":
        ```css
        div[class="container"] {
          background-color: purple;
        }
        ```
      - `[attr~=value]` - example: matches `p` elements with a `class` attribute whose value is a whitespace-separated list of words, one of which is exactly "cat-container":
        ```css
        p[class~="cat-container"] {
          background-color: red;
        }
        ```
      - `[attr|=value]` - example: matches `p` elements with a `class` attribute whose value is exactly "class" or begins with "class" immediately followed by a hyphen:
        ```css
        p[class|="cat"] {
          background-color: pink;
        }
        ```
      - `[attr^=value]` - example: matches `p` elements with a `class` attribute whose value starts with "tr":
        ```p[class^="cat-co"] {
          background-color: purple;
        }
        ```
    - substring matching selectors:
      - `[attr$=value]` - example: matches `p` elements with a `class` attribute whose value ends with "ner":
        ```css
        p[class*="ner"] {
          background-color: blue;
        }
        ```
      - `[attr*=value]` - matches elements with a `class` attribute whose value contains "onta":
        ```css
        p[class*="onta"] {
          background-color: green;
        }
        ```
- id selector:
  - starts with a `#` (hash) character, followed by id name
  - example:
    ```css
      #inner {
        background-color: yellow;
      }
    ```
## Additional keywords
- Pseudo-classes
- Pseudo-elements
## CSS combinators
## Rule specificity