# Embed SVG code into DOM

```
npm install svg-embed --save
```
  
Where are a few way to [use SVG](https://css-tricks.com/using-svg/) on page. One of the simpler and convenient ways is to 
use SVG as `background-image` (with url to resource `*.svg` or with data url), but in such way of using SVG, it loses 
ability to change colors and animation of SVG. 

Solution of this problem is to embed SVG from `background-image` to DOM. This is what [svg-embed](https://www.npmjs.com/package/svg-embed) doing.

Support Chrome 11+, Safari 5+, iOS 5.1+, FireFox 4+, Android 4+, IE9+.

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

Require svgEmbed or include [embed.js](src/embed.js) as script on page, and call `svgEmbed` function. It will embed icons 
for all nodes with `data-svg-embed` attribute.
```js
var svgEmbed = require('svg-embed');
svgEmbed();
```

> If you need IE9 support, include polyfill for [atob](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/atob) function.
> Or don't use base64 encoded SVG. 

## Example

<a href="http://antonmedv.github.io/svg-embed/example/">Go to example</a>
