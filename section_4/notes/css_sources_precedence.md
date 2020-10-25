> Conflicting declarations will be applied in the following order, with later ones overriding earlier ones:
>
> 1. Declarations in user agent style sheets (e.g. the browser's default styles, used when no other styling is set).
>
> 2. Normal declarations in user style 
sheets (custom styles set by a user).
>
> 3. Normal declarations in author style sheets (these are the styles set by us, the web developers).
>
> 4. Important declarations in author style sheets
> 
> 5. Important declarations in user style sheets
>
>  It makes sense for web developers' stylesheets to override user stylesheets, so the design can be kept as intended, but sometimes users have good reasons to override web developer styles, as mentioned above — this can be achieved by using !important in their rules.

https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#The_cascade