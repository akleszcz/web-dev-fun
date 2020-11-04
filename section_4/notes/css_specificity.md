# Specificity
- a weight that is applied to a given CSS declaration
- used by browsers to decide which CSS property values are the most relevant to an element and, therefore, will be applied
- specificity can be thought of as an lexicographical order based on the following four categories (ordered from the most to the least specific):
  - inline styles
  - id selector
  - class, attribute, pseudo-class (except for `:not`) selector
  - element and pseudo-element selectors
- the following elements have no effect on specificity:
  - universal selector (`*`)
  - combinators (`+`, `>`, `~`, ' ')
  - negation pseudo-class (`:not`) - but the selectors inside `:not()` do have an effect

Formal definition from [w3.org](https://www.w3.org/TR/CSS22/cascade.html):
> ### Calculating a selector's specificity
> A selector's specificity is calculated as follows:
> * count 1 if the declaration is from is a 'style' attribute rather than a rule with a selector, 0 otherwise (= a) (In HTML, values of an element's "style" attribute are style sheet rules. These rules have no selectors, so a=1, b=0, c=0, and d=0.)
> * count the number of ID attributes in the selector (= b)
> * count the number of other attributes and pseudo-classes in the selector (= c)
> * count the number of element names and pseudo-elements in the selector (= d)
> 
> (...)
>
> Concatenating the four numbers a-b-c-d (...) gives the specificity.
> 
> Some examples:
> ```css
> * {}  /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
> li {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
> li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
> ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
> ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
> h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
> ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
> li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
> #x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
> style=""          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */
> ```

### Notes
* each selector type has its own level of specificity that cannot be overwritten by selectors with a lower specificity level. For example, a million class selectors combined would not be able to overwrite the rules of one id selector.

  [Source](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#Specificity_2)
- when multiple declarations have equal specificity, the last declaration found in the CSS is applied to the element
- specificity only applies when the same element is targeted by multiple declarations. As per CSS rules, directly targeted elements will always take precedence over rules which an element inherits from its ancestor.
- proximity of elements in the document tree has no effect on the specificity

  [Source](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)

* the specificity is based only on the form of the selector. In particular, a selector of the form "[id=p33]" is counted as an attribute selector (a=0, b=0, c=1, d=0), even if the id attribute is defined as an "ID" in the source document's DTD

  [Source](https://www.w3.org/TR/CSS2/cascade.html#specificity)
- you can calculate specificity of any CSS rule [here](https://specificity.keegan.st/)
