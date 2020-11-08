# CSS selectors
## Terminology
> A selector represents a particular pattern of element(s) in a tree structure. The term selector can refer to a simple selector, compound selector, complex selector, or selector list. The subject of a selector is any element that selector is defined to be about; that is, any element matching that selector.

[Source](https://www.w3.org/TR/selectors-4/#complex)

## Simple selectors
> A simple selector is a single condition on an element. A type selector, universal selector, attribute selector, class selector, ID selector, or pseudo-class is a simple selector. 

[Source](https://www.w3.org/TR/selectors-4/#simple)

- universal selector
  - indicated by an asterisk (`*`)
  - > matches the name of any element type. (...) If the universal selector is not the only component of a simple selector, the "*" may be omitted. For example:
    > - `*[lang=fr]` and `[lang=fr]` are equivalent.
    > - `*.warning` and `.warning` are equivalent.
    > - `*#myid` and `#myid` are equivalent.

    [Source](https://www.w3.org/TR/CSS2/selector.html#universal-selector)
  - does not affect pseudo-elements
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
      - `[attr~=value]` - example: matches elements with a `class` attribute whose value is a whitespace-separated list of words, one of which is exactly "container":
        ```css
        [class~="container"] {
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
        ```css
        p[class^="cat-co"] {
          background-color: purple;
        }
        ```
    - substring matching selectors:
      - `[attr$=value]` - example: matches `p` elements with a `class` attribute whose value ends with "ner":
        ```css
        p[class$="ner"] {
          background-color: blue;
        }
        ```
      - `[attr*=value]` - example: matches elements with a `class` attribute whose value contains "onta":
        ```css
        p[class*="onta"] {
          background-color: green;
        }
        ```
    - case-sensitivity:
      - `[attr operator value i/I]` - causes the value to be compared case-insensitively. Example:
        ```css
        p[class*="NER" i] {
          background-color: blue;
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
# 'Pseudo-' keywords
- Pseudo-classes
  - specify a special state of an element
  - syntax:
    ```css
    selector:pseudo-class {
      property: value;
    }
    ```
  - examples:
    - focus-related:
      - `:focus`:
        ```css
        .cat-input:focus {
          background-color: purple;
        }
        ```
      - `:focus-within`:
        ```css
        form:focus-within {
          background-color: purple;
        }
        ```
      - `:focus-visible` (experimental):
        ```css
        #cat-submit:focus-visible {
          background-color: purple;
        }
        ```

    - link-related:
      - `:link`:
        - > matches every unvisited \<a>, \<area>, or \<link> element that has an href attribute.

        [Source](https://developer.mozilla.org/en-US/docs/Web/CSS/:link)
        - example:
          ```css
          a:link {
            color: blue;
          }
          ```
      - `:visited`:
        - example:
          ```css
          a:visited {
            color: green;
          }
          ```
      - `:focus` (again):
        - can be used for other elements, like e.g. buttons, too
        - example:
          ```css
          a:focus {
            color: yellow;   
          }
          ```
      - `:hover`:
        - can be used for other elements, like e.g. buttons, too
        - example:
          ```css
          a:hover {
            color: orange;
          }
          ```
      - `:active`:
        - can be used for other elements, like e.g. buttons, too
        - example:
          ```css
          a:active {
            color: red;
          }
          ```

      Note:
      > This order is important because the link styles build on one another, for example the styles in the first rule will apply to all the subsequent ones, and when a link is being activated, it is also being hovered over. If you put these in the wrong order, things won't work properly. To remember the order, you could try using a mnemonic like LoVe Fears HAte.
      
      Source: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_links

      Try moving the rule with `:visited` pseudoclass after the one with `:hover`, visit the link and check which color is applied.

      Try moving the rule with `:hover` pseudoclass after the one with `:active` and check which color is applied when the link is clicked.

    - input-related:
      - `:checked`
      - `:disabled`
      - `:enabled`

    - DOM structure-related:
      - `:first-child`:
        ```css
        label:first-child {
          background-color: purple;
        }
        ```
      - `:first-of-type`:
        ```css
        input:first-of-type {
          background-color: purple;
        }
        ```
      - `:not()`:
        ```css
        :not(button) {
          color: purple;
        }
        ```
      - `:nth-of-type()`:
        ```css
        li:nth-child(2n) {
          background-color: purple;
        }
        ```
      - `:last-child`
      - `:last-of-type`
      - `:nth-child()`
      - `:nth-last-child()`
      - `:nth-last-of-type()`
      - `:only-child`
      - `:only-of-type`

- Pseudo-elements
  - used to style a specific part of an element
  - neither pseudo-elements nor pseudo-classes appear in the document source or document tree

  [Source](https://www.w3.org/TR/CSS2/selector.html#pseudo-elements)
  - syntax:
    ```css
    selector::pseudo-element {
      property: value;
    }
    ```
  - examples:
    - `::before (:before)`:
      - creates a pseudo-element that is the first child of the selected element
      - doesn't apply to some elements, e.g.: `<iframe>`, `<video>`, `<img>`, `<br>`
      - used for presentational elements to separate them from content structure:
      >  In some cases, authors may want user agents to render content that does not come from the document tree. One familiar example of this is a numbered list; the author does not want to list the numbers explicitly, he or she wants the user agent to generate them automatically. Similarly, authors may want the user agent to insert the word "Figure" before the caption of a figure, or "Chapter 7" before the seventh chapter title. For audio or braille in particular, user agents should be able to insert these strings.

      https://www.w3.org/TR/CSS21/generate.html
      - not selectable
      - example 1:
      ```css
      .ad-topbanner:before {
        content: 'Advertisement';
      }
      ```
      - example 2 (user agent stylesheet on Chrome):
      ```css
      q::before {
      content: open-quote;
      }
      ```
      ---
      ### Note: `quotes` property
      > The quotes CSS property sets how the browser should render quotation marks that are added using the open-quotes or close-quotes values of the CSS content property.

      [Source](https://developer.mozilla.org/en-US/docs/Web/CSS/quotes)

      Example:
      ```css
      q {
        quotes: "«" "»" "‹" "›"; /* Set two levels of quotation marks */
      }
      ```
      - `::after (:after)`:
        - example:
        ```css
        q::after {
            content: close-quote;
        }
        ```
      - `::first-line (:first-line)`:
        - >applies styles to the first line of a block-level element. Note that the length of the first line depends on many factors, including the width of the element, the width of the document, and the font size of the text.
        - example:
        ```css
        .diet-and-predation::first-line {
          background-color: pink;
          color: red;
          font-size: 16px;
          text-decoration: underline;
          text-transform: capitalize;
        }
        ```

        [Source](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-line)
      - `::first-letter (:first-letter)`
      - `::selection`:
        - example:
        ```css
        .diet-and-predation::selection {
          color: pink;
          background-color: red;
        } 
        ```
# Compound selectors
- one element can be selected based on multiple characteristics
- to achieve this, we can use multiple selectors **with no space between them**
  - example 1 - select all elements with an id `outer` that also have a class `container`:
    ```css
    #outer.container {
      border: 5px double green;
    }
    ```
  - example 2 - select all elements of type `p` that also have a class `cat-container`:
    ```css
    p.cat-container {
      border: 5px double blue;
    }
    ```
  - Formal definition from [w3.org](https://www.w3.org/TR/selectors-4/#compound):
  > A **compound selector** is a sequence of simple selectors that are not separated by a combinator, and represents a set of simultaneous conditions on a single element. If it contains a type selector or universal selector, that selector must come first in the sequence. Only one type selector or universal selector is allowed in the sequence.
---
### Note:
The rules above would have a different meaning with a space between the selectors. E.g.
```css
#outer .container {
  border: 5px double red;
}
```
would mean: *select all elements with a class `container` that are decendents of an element with an id `outer`*. The reason is that the space character is a *descendant combinator* in CSS syntax. Find more about CSS combinators [here](css_combinators.md).

# Selector list
- CSS selectors can be grouped in comma-separated lists
- >A given element is said to match a selector list when it matches any (at least one) of the selectors in that selector list.

  [Source](https://www.w3.org/TR/selectors-4/#complex)
- syntax:
  ```css
  element, element, element {
    style properties 
  }
  ```
- example:
  ```css
  #inner, #outer {
    border: 5px double red;
  }
  ```

# Sources:
- *CSS basics*, https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics
- *CSS selectors*, https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors
- *CSS selectors*, https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
- *Type, class, and ID selectors*, https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors
- *Attribute selectors*, https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
- *Attribute selectors*, https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors
- *Pseudo-classes*, https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
- *Pseudo-elements*, https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
- *::before (:before)*, https://developer.mozilla.org/en-US/docs/Web/CSS/::before

@TOREAD:
https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_and_edit_CSS
https://css-tricks.com/almanac/selectors/f/focus-visible/#:~:text=%3Afocus%2Dvisible%20is%20used%20similarly,that%20currently%20has%20the%20focus.&text=%3Afocus%2Dvisible%20is%20part%20of,ahead%20of%20a%20formal%20specification.
