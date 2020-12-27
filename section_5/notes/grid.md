# CSS Grid
## Basics and Terminology

- CSS Grid can be used to create a two-dimensional layout system, optimized for user interface design.
- A **grid container** is an element with `display` property set to `grid` or `inline-grid`. Its children become **grid items**.
- Other important elements:
  - grid line
  - grid cell
  - grid track (grid row or grid column)
  - grid area - defined by an intersection of grid columns and rows

    ![grid layout box model](../assets/grid.png)

    ![gli lines](../assets/grid-lines.png)
  *Source: https://www.w3.org/TR/css-grid-1/#grid-concepts*

## CSS properties
### Grid container properties
- `display`:
  - values:
    - `grid`:
      > generates a block-level grid

      [Source](https://css-tricks.com/snippets/css/complete-guide-grid/)
    - `inline-grid`:
      > generates an inline-level grid

      [Source](https://css-tricks.com/snippets/css/complete-guide-grid/)
- `grid-template-columns`, `grid-template-rows`:
    - > Defines the columns and rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line.

    [Source](https://css-tricks.com/snippets/css/complete-guide-grid/)

    - values can be defined e.g. with the following units:
      - `fr` - defines a *flexible length*, which represents a fraction of the leftover space in the grid container
      ([Source](https://www.w3.org/TR/css-grid-1/#fr-unit)).
      The free space is calculated after any non-flexible items ([Source](https://css-tricks.com/snippets/css/complete-guide-grid/#fr-unit)).

      - absolute length units, like pixels (`px`)
      - percentage values

        ---
        ### Note: flexible (`fr`) vs percentage (`%`) values
        The differences between `fr` and `%` units are that:
        - percentage values should sum up to max 100%. There are no similar restrictions for `fr` values. For example, if you had 4 columns of equal width defined like this:
        ```css
        grid-template-columns: 25% 25% 25% 25%;
        ```
        and wanted to add another one, you'd have to redefine values for all the columns to 20%. With `fr`, you could just add another value of `1fr`.
        - Unline `%`, values expressed in `fr` are calculated as a fraction of the *leftover space* (i.e. *the space to fill minus the base sizes of the non-flexible grid tracks.* - [source](https://www.w3.org/TR/css-grid-1/#leftover-space)). 

        ---
        ### Note
        If `display` is set to `grid` for a grid container, then the container takes up all the available horizontal space by default. 
        This means that with a rule like this:
        ```css
        .parent {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }
        ```
        every column of the `.parent` element will occupy 1/3 of the available space.

        With `display` set to `inline-grid`, the container's width will depend on its  and its descendants content, padding, border and margin. If none of them is set, you may need to define grid container (or its children) width explicitly - otherwise it will be 0.
    
    - example:
      ```css
      .parent {
        display: grid;
        grid-template-columns: 2fr 1fr 3fr 1fr;
        grid-template-rows: repeat(5, 3fr) 1fr;
        height: 300px;
        width: 400px;
      }
      ``` 
   

- `grid-template-areas`:
- `grid-template`:
- `column-gap`, `row-gap`, `grid-column-gap`, `grid-row-gap`
- `gap`, 
`grid-gap`

### Grid items properties
- `grid-column-start`, 
`grid-column-end`, 
`grid-row-start`, 
`grid-row-end`
- `grid-column`, 
`grid-row`
- `grid-area`

## Inspect CSS Grid with Chrome DevTools
@TODO: https://developers.google.com/web/tools/chrome-devtools/css/grid
