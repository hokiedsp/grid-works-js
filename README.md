<!-- [![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![test][test]][test-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url] -->

# grid-works-js
JS Library to make CSS Grid interactive

Intended to be used with Electron.js projects, this front-end package adds mouse interaction to CSS Grids. A border of an enabled grid cell can be grabbed by mouse and dragged to resize the adjacent rows / columns.

## Install

```bash
npm i grid-works
```

## Usage

### Include in Your HTML

Include CSS and Javascript in `dist` folder for use in your project. Just link to these files in your HTML.

```html
<link rel="stylesheet" type="text/css" href="./dist/gridworks.css">
<script src="./dist/gridworks.js"></script>
```

Note: Modify the paths according to the location of the HTML file.

### Javascript to enable mouse interaction

Assuming the grid container has an attribute `id="mygrid"`, then the mouse interaction is enabled by executing the script:

```javascript
document.querySelector("#mygrid").gridWorks();
```

...To be completed...

<!-- **webpack.config.js**
```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  //...
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  }
}
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`test`**|`{RegExp\|Array<RegExp>}`| <code>/\\.js$/i</code>|Test to match files against|
|**`include`**|`{RegExp\|Array<RegExp>}`|`undefined`|Files to `include`|
|**`exclude`**|`{RegExp\|Array<RegExp>}`|`undefined`|Files to `exclude`|
|**`cache`**|`{Boolean\|String}`|`false`|Enable file caching|
|**`cacheKeys`**|`{Function(defaultCacheKeys, file) -> {Object}}`|`defaultCacheKeys => defaultCacheKeys`|Allows you to override default cache keys|
|**`parallel`**|`{Boolean\|Number}`|`false`|Use multi-process parallel running to improve the build speed|
|**`sourceMap`**|`{Boolean}`|`false`|Use source maps to map error message locations to modules (This slows down the compilation) ⚠️ **`cheap-source-map` options don't work with this plugin**|
|**`minify`**|`{Function}`|`undefined`|Allows you to override default minify function|
|**`uglifyOptions`**|`{Object}`|[`{...defaults}`](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/tree/master#uglifyoptions)|`uglify` [Options](https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options)|
|**`extractComments`**|`{Boolean\|RegExp\|Function<(node, comment) -> {Boolean\|Object}>}`|`false`|Whether comments shall be extracted to a separate file, (see [details](https://github.com/webpack/webpack/commit/71933e979e51c533b432658d5e37917f9e71595a) (`webpack >= 2.3.0`)|
|**`warningsFilter`**|`{Function(source) -> {Boolean}}`|`() => true`|Allow to filter uglify warnings| -->

# TODO's

- [ ] Complete documentation
- [ ] Add testing
- [ ] Support borderless grid cell
- [ ] Hide/Show column/row
- [ ] "Accordion" mode of operation
