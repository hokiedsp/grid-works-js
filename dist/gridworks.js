!function(e){var t={};function i(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);function o(e,t,i){return(o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()?Reflect.construct:function(e,t,i){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return i&&s(o,i.prototype),o}).apply(null,arguments)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function r(e){return function(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function l(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function u(e,t,i){return t&&l(e.prototype,t),i&&l(e,i),e}var h=function(){function e(t,i){var n=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._colLineFixed=[!1],this._rowLineFixed=[!1],this._colMinWidths=[1],this._colMaxWidths=[1/0],this._rowMinHeights=[1],this._rowMaxHeights=[1/0],this._eGrid=t,this._colLineNames=[],this._colWidths=[],this._colLinePositions=[],this._rowLineNames=[],this._rowHeights=[],this._rowLinePositions=[],this._gridCells=[],this._state=0,this._currentCell,this._activeColLine=-1,this._activeRowLine=-1,this._offsetX0,this._offsetY0,["grid","inline-grid"].every(function(e){return e!==window.getComputedStyle(n._eGrid).display}))throw"Container is not a grid";i&&Object.assign(this,i),this._analyze(),this._configure(),this._onmousehover=this.onMouseHover.bind(this),this._onmousedown=this.onMouseDown.bind(this),this._onwinmousemove=this.onWindowMouseMove.bind(this),this._onwinmouseup=this.onWindowMouseUp.bind(this),this.enable()}return u(e,[{key:"enabled",get:function(){return this._enabled},set:function(e){e?this.enable():this.disable()}},{key:"colLineFixed",get:function(){return this._colLineFixed},set:function(t){t=r(t).map(function(e){return Boolean(e)}),this._colLineFixed=e._pad(t,this._colLinePositions.length,!1)}},{key:"rowLineFixed",get:function(){return this._rowLineFixed},set:function(t){t=r(t).map(function(e){return Boolean(e)}),this._rowLineFixed=e._pad(t,this._rowLinePositions.length,!1)}},{key:"colMinWidths",get:function(){return this._colMinWidths},set:function(t){t=r(t).map(function(e){return isFinite(e)&&e>0?e:1}),this._colMinWidths=e._pad(t,this._colWidths.length)}},{key:"colMaxWidths",get:function(){return this._colMaxWidths},set:function(t){t=r(t).map(function(e){return e>0?e:1/0}),this._colMaxWidths=e._pad(t,this._colWidths.length)}},{key:"rowMinHeights",get:function(){return this._rowMinHeights},set:function(t){t=r(t).map(function(e){return isFinite(e)&&e>0?e:1}),this._rowMinHeights=e._pad(t,this._rowHeights.length)}},{key:"rowMaxHeights",get:function(){return this._rowMaxHeights},set:function(t){t=r(t).map(function(e){return e>0?e:1/0}),this._rowMaxHeights=e._pad(t,this._rowHeights.length)}}],[{key:"_pad",value:function(e,t,i){for(void 0===i&&(i=e[e.length-1]);e.length<t;)e.push(i);return e}}]),u(e,[{key:"enable",value:function(){var e=this;this._enabled||(this._enabled=!0,this._gridCells.forEach(function(t){t.eCell.addEventListener("mouseenter",e._onmousehover),t.eCell.addEventListener("mouseleave",e._onmousehover),t.eCell.addEventListener("mousemove",e._onmousehover),t.eCell.addEventListener("mousedown",e._onmousedown)}))}},{key:"disable",value:function(){var e=this;this._enabled&&(this._enabled=!1,this._gridCells.forEach(function(t){t.eCell.removeEventListener("mouseover",e._onmousehover),t.eCell.removeEventListener("mouseout",e._onmousehover),t.eCell.removeEventListener("mousedown",e._onmousedown)}))}},{key:"_analyze",value:function(){var e=this,t=function(e){return Number(e.match(/\d+(?=px)/))},n=function(e,n){var o="["!=e.template[0],s=[],r=o?[""]:[];e.template.match(/(\[[^\]]+\])|([\d\.]+)/g).forEach(function(e){"["==e[0]?(r.push(e),o=!1):(s.push(Number(e)),o&&r.push(""),o=!0)});var l=s.reduce(function(e,t,i){return e.push(e[i]+t),e},[n+t(e.border)+t(e.padding)]);if(e.gap&&"normal"!=e.gap){var u=t(e.gap);l=l.map(function(e){return e+i*u})}return{names:r,sizes:s,edges:l}},o=function(e){return{top:e.top,left:e.left}}(this._eGrid.getBoundingClientRect()),s=n(function(e){return{template:e.gridTemplateColumns,gap:e.columnGap,border:e.borderLeftWidth,padding:e.paddingLeft}}(window.getComputedStyle(this._eGrid)),o.left);this._colLineNames=s.names,this._colWidths=s.sizes,this._colLinePositions=s.edges;var l=n(function(e){return{template:e.gridTemplateRows,gap:e.rowGap,border:e.borderTopWidth,padding:e.paddingTop}}(window.getComputedStyle(this._eGrid)),o.top);this._rowLineNames=l.names,this._rowHeights=l.sizes,this._rowLinePositions=l.edges,this._gridCells=r(this._eGrid.children).reduce(function(i,n,o){var s=window.getComputedStyle(n),r=n.getBoundingClientRect(),l=function(e,t){return t.map(function(t){return Math.abs(t-e)}).reduce(function(e,t,i,n){return t<n[e]?i:e},0)};return i.push({eCell:n,eCellCSS:s,left:l(r.left-t(s.marginLeft),e._colLinePositions),right:l(r.left+r.width+t(s.marginRight),e._colLinePositions),top:l(r.top-t(s.marginTop),e._rowLinePositions),bottom:l(r.top+r.height+t(s.marginBottom),e._rowLinePositions)}),i},[])}},{key:"_configure",value:function(){this._eGrid.classList.add("grid-works","wrapper"),this._gridCells.forEach(function(e){e.eCell.classList.add("grid-works","cell")}),this.colLineFixed=this._colLineFixed,this.rowLineFixed=this._rowLineFixed,this.colMinWidths=this._colMinWidths,this.colMaxWidths=this._colMaxWidths,this.rowMinHeights=this._rowMinHeights,this.rowMaxHeights=this._rowMaxHeights}},{key:"_is_adjustable",value:function(e,t,i){return!(i[e]||e==t)}},{key:"_on_border",value:function(e){var t={left:!1,right:!1,top:!1,bottom:!1},i=e.target;if(this._currentCell=this._gridCells.find(function(e){return i==e.eCell}),!this._currentCell)return t;var n=i.getBoundingClientRect(),o=e.clientX-n.left,s=n.right-e.clientX-1,r=e.clientY-n.top,l=n.bottom-e.clientY-1,u=Math.max(3,1+Number(getComputedStyle(i).borderLeftWidth.slice(0,-2))),h=Math.max(3,1+Number(getComputedStyle(i).borderRightWidth.slice(0,-2))),a=Math.max(3,1+Number(getComputedStyle(i).borderTopWidth.slice(0,-2))),c=Math.max(3,1+Number(getComputedStyle(i).borderBottomWidth.slice(0,-2)));return o<=u?t.left=this._is_adjustable(this._currentCell.left,0,this._colLineFixed):s<=h&&(t.right=this._is_adjustable(this._currentCell.right,this._colLinePositions.length-1,this._colLineFixed)),r<=a?t.top=this._is_adjustable(this._currentCell.top,0,this._rowLineFixed):l<=c&&(t.bottom=this._is_adjustable(this._currentCell.bottom,this._rowLinePositions.length-1,this._rowLineFixed)),t}},{key:"onMouseHover",value:function(e){var t=e.target;if("mouseleave"==e.type)t.classList.remove("left","right","top","bottom");else{var i=this._on_border(e),n=!0;i.left?t.classList.add("left"):i.right?t.classList.add("right"):n=!1;var o=!0;i.top?t.classList.add("top"):i.bottom?t.classList.add("bottom"):o=!1,n||o||t.classList.remove("left","right","top","bottom")}}},{key:"onMouseDown",value:function(e){this._state=1;var t=this._currentCell,i=this._on_border(e);if(i.left?this._activeColLine=t.left:i.right&&(this._activeColLine=t.right),i.top?this._activeRowLine=t.top:i.bottom&&(this._activeRowLine=t.bottom),this._activeColLine<0&&this._activeRowLine<0)return this._state=0,0;t.eCell.classList.add("grabbed"),this._activeColLine>=0&&(this._offsetX0=this._colLinePositions[this._activeColLine]-e.pageX),this._activeRowLine>=0&&(this._offsetY0=this._rowLinePositions[this._activeRowLine]-e.pageY),t.eCell.removeEventListener("mouseenter",this._onmousehover),t.eCell.removeEventListener("mouseleave",this._onmousehover),t.eCell.removeEventListener("mousemove",this._onmousehover),window.addEventListener("mousemove",this._onwinmousemove),window.addEventListener("mouseup",this._onwinmouseup)}},{key:"onWindowMouseUp",value:function(e){var t=this._currentCell;window.removeEventListener("mousemove",this._onwinmousemove),window.removeEventListener("mouseup",this._onwinmouseup),t.eCell.addEventListener("mouseenter",this._onmousehover),t.eCell.addEventListener("mouseleave",this._onmousehover),t.eCell.addEventListener("mousemove",this._onmousehover),this._state=0,t.eCell.classList.remove("grabbed"),this._activeColLine=-1,this._activeRowLine=-1}},{key:"_update_template",value:function(e,t,i,n,o,s,r,l){var u=t-s[e],h=o[e-1]+u,a=o[e]-u;return h<r[e-1]?(a=h+a-r[e-1],h=r[e-1]):a<r[e]?(h=a+h-r[e],a=r[e]):h>l[e-1]?(a=h+a-l[e-1],h=l[e-1]):a>l[e]&&(h=a+h-l[e],a=l[e]),s[e]=s[e-1]+h,o[e-1]=h,o[e]=a,this._eGrid.style[i]=o.reduce(function(e,t,i){return e.push(t+"px"),e.push(n[i+1]),e},[n[0]]).join(" "),{sizes:o,edges:s}}},{key:"onWindowMouseMove",value:function(e){if(e.preventDefault(),this._activeColLine>=0){var t=this._update_template(this._activeColLine,this._offsetX0+e.pageX,"gridTemplateColumns",this._colLineNames,this._colWidths,this._colLinePositions,this._colMinWidths,this._colMaxWidths);this._colWidths=t.sizes,this._colLinePositions=t.edges}if(this._activeRowLine>=0){var i=this._update_template(this._activeRowLine,this._offsetY0+e.pageY,"gridTemplateRows",this._rowLineNames,this._rowHeights,this._rowLinePositions,this._rowMinHeights,this._rowMaxHeights);this._rowHeights=i.sizes,this._rowLinePositions=i.edges}}}]),e}();Object.defineProperty(HTMLElement.prototype,"gridWorks",{get:function(){var e=this;return function(){try{for(var t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n];return Object.defineProperty(e,"gridWorks",{value:o(h,[e].concat(i))}),e.gridWorks}catch(e){return null}}},configurable:!0,writeable:!1})},function(e,t,i){}]);