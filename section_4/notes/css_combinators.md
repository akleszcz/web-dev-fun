# CSS combinators
>A combinator is a condition of relationship between two elements represented by the compound selectors on either side.

[Source](https://www.w3.org/TR/selectors-4/#selector-combinator)

Combinators are used to define relationships between DOM elements based on their location in an HTML document:

- descendant combinator - represented by a space ( ) character:
```css
#grandparent div {
  border: 1px solid red;
}
```
- child combinator - represented by `>`:
```css
#grandparent > div {
  border: 1px solid red;
}
```
- adjacent sibling combinator - represented by `+`:
```css
#brother-1 + #sister-1 {
  border: 1px solid red;

```
- general sibling combinator - represented by `~`:
```css
#brother-1 ~ #sister-2 {
  border: 1px solid red;
}
```
---
### Note
A sequence of one or more compound selectors separated by combinators is called a **complex selector**.

[Source](https://www.w3.org/TR/selectors-4/#complex)

---
### Note: column combinator
There is an additional, **column** combinator denoted by `||`, but it's experimental and not supported by any major browser at the moment (31.10.2020):

> The column combinator (||) is placed between two CSS selectors. It matches only those elements matched by the second selector that belong to the column elements matched by the first.

```css
/* Table cells that belong to the "selected" column */
col.selected || td {
  background: gray;
}
```
```html
<table border="1">
  <colgroup>
    <col span="2"/>
    <col class="selected"/>
  </colgroup>
  <tbody>
    <tr>
      <td>A
      <td>B
      <td>C
    </tr>
    <tr>
      <td colspan="2">D</td>
      <td>E</td>
    </tr>
    <tr>
      <td>F</td>
      <td colspan="2">G</td>
    </tr>
  </tbody>
</table>
```

[Source](https://developer.mozilla.org/en-US/docs/Web/CSS/Column_combinator)