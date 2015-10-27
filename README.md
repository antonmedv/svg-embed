# Embed SVG code into DOM

```
npm install svg-embed --save
```

## Usage

```css
    .icon-bear {
        background: url("*.svg");
    }

    .icon-elephant {
        background: url("data:image/svg+xml,...");
    }

    .icon-tiger {
        background: url("data:image/svg+xml;base64,...");
    }
    
    .red path {
        fill: red;
    }
```

```html
<i class="icon-bear red" data-svg-embed></i>
```

```js
var svgEmbed = require('svg-embed');

svgEmbed();
```

> If you need IE9 support, include polyfill for [atob](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/atob) function.
> Or don't use base64 encoded SVG. 

## Example

<a href="http://elfet.github.io/svg-embed/example/">Go to example</a>
