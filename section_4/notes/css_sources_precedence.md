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

[Source](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#The_cascade)

> The Cascade
>
> At the highest level the cascade is what controls all css precedence and works as follows.
> 
> 1. Find all css declarations that apply to the element and property in question.
> 2. Sort by origin and weight. Origin refers to the source of the declaration (author styles, user styles, browser defaults) and weight refers to the importance of the declaration. (author has more weight than user which has more weight than default. !importance has more weight than normal declarations)
> 3. Calculate specificity
> 4. If two rules are equal in all of the above, the one declared last wins. CSS embedded in the html always come after external stylesheets regardless of the order in the html
#3 above is likely the one you’ll need to pay attention to most. With #2 just understand that your styles will override how a user sets their browser unless they set their rules to be important.

[Source](https://vanseodesign.com/css/css-specificity-inheritance-cascaade/)