# box-sizing
- defines how the total width and height of an element is calculated,
- not inherited,
- values:
  - `content-box`:
    - the default value,
    - makes the width and height properties include:
      - `content`
    - makes the width and height properties exclude:
      - `padding`,
      - `border`,
      - `margin`
  - `border-box`:
    - used commonly in [CSS resets](https://dev.to/hankchizljaw/a-modern-css-reset-6p3):
    ```css
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    ```
    - makes the width and height properties include:
      - `content`,
      - `padding`,
      - `border`
    - makes the width and height properties exclude:
      - `margin`
- example:
```css
.box-sizing {
  border: 10px solid;
  height: 100px;
  margin: 5px;
  padding: 15px;
  width: 300px;
}

.border-box {
  box-sizing: border-box;
}

.content-box {
  box-sizing: content-box;
}
```
```html
<div class="box-sizing border-box">
  box-sizing: border-box
</div>
<div class="box-sizing content-box">
  box-sizing: content-box
</div>
```
  
Sources:
- 'box-sizing', https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
- 'A Modern CSS Reset
#css', https://dev.to/hankchizljaw/a-modern-css-reset-6p3