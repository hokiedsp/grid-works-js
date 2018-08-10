<!-- [![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![test][test]][test-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url] -->

# grid-works-js
JS Library to make CSS Grid interactive

Intended to be used with Electron.js projects, this front-end package adds mouse interaction to CSS Grids. A border of an enabled grid item can be grabbed by mouse and dragged to resize the adjacent rows / columns.

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

### Javascript to enable mouse interaction on a grid container

Assuming the grid container has an attribute `id="mygrid"`, then the mouse interaction is enabled by executing the script:

```javascript
document.querySelector("#mygrid").gridWorks();
```

This enables all the grid lines to be adjustable as long as there is a grid item border to grab.

The interaction could be customized by providing an option object:

```javascript
document.querySelector("#mygrid").gridWorks({\* Specify your options here *\});
```

See the subsection below for the available options.

### Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`enabled`**|`{Boolean}`| `true` |Enable/disable the interaction|
|**`colLineFixed`**|`{Array<Boolean>}`|`[false]`|`False` if column grid line is adjustable or `true` if fixed|
|**`rowLineFixed`**|`{Array<Boolean>}`|`[false]`|`False` if column grid line is adjustable or `true` if fixed|
|**`colMinWidths`**|`{Array<Number>}`|`[1]`|Narrowest width allowed for the columns in pixels|
|**`colMaxWidths`**|`{Array<Number>}`|`[Infinity]`|Widest width allowed for the columns in pixles|
|**`rowMinHeights`**|`{Array<Number>}`|`[1]`|Shortest height allowed for the rows in pixels|
|**`rowMaxHeights`**|`{Array<Number>}`|`[Infinity]`|Tallest height allowed for the rows in pixels|

If provided arrays does not have enough elements to account for the number of columns or rows, the option array gets automatically extended. For `colLineFixed` and `rowLineFixed`, missing columns/rows are set to `false` while the last value of the given array is used for `colMinWidths`, `colMaxWidths`, `rowMinHeights`, and `rowMaxHeights`.

These option could be accessed/modified after the instantiation via standard object property access. For example,

```javascript
document.querySelector("#mygrid").gridWorks.colLineFixed = [true, false];
document.querySelector("#mygrid").gridWorks.rowMinHeights = [100, 200, 300];
```

### Enable/disable the interaction

The mouse interaction can be enabled or disabled by the following javascript commands:

```javascript
// to enable
document.querySelector("#mygrid").gridWorks.enable();

// to disable
document.querySelector("#mygrid").gridWorks.disable();
```

...To be completed...

# TODO's

- [ ] Complete documentation
- [ ] Add testing
- [X] Support borderless grid cell
- [ ] Hide/Show column/row
- [ ] "Accordion" mode of operation
