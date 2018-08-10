"use strict";

import "./gridworks.css";

// Javascript function to enable user interaction on CSS-Grid
// - enable/disable mouse interaction to resize
// - remember default size
// - programatically adjust size
// - reset to default
//
// - grid layout may change depending on its brwoser window size

// action commands:
//    enable      -
//    disable     -
//    freeze
//    melt
//    hide        -
//    show        -
//    reconfigure -
//    restore     -
//    save        -
//    load

class gridWorks {
  static _pad(values, len, default_value) {
    if (default_value === undefined) default_value = values[values.length - 1];
    while (values.length < len) values.push(default_value);
    return values;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    if (value) this.enable();
    else this.disable();
  }
  // get colHidden() {
  //   return this._colHidden;
  // }
  // set colHidden(values) {
  //   values = [...values].map(value => Boolean(value));
  //   this._colHidden = gridWorks._pad(values, this._colWidths.length, false);
  // }
  // get rowHidden() {
  //   return this._colMinWidths;
  // }
  // set rowHidden(values) {
  //   values = [...values].map(value => Boolean(value));
  //   this._rowHidden = gridWorks._pad(values, this._rowHeights.length, false);
  // }
  get colLineFixed() {
    return this._colLineFixed;
  }
  set colLineFixed(values) {
    values = [...values].map(value => Boolean(value));
    this._colLineFixed = gridWorks._pad(
      values,
      this._colLinePositions.length,
      false
    );
  }
  get rowLineFixed() {
    return this._rowLineFixed;
  }
  set rowLineFixed(values) {
    values = [...values].map(value => Boolean(value));
    this._rowLineFixed = gridWorks._pad(
      values,
      this._rowLinePositions.length,
      false
    );
  }
  get colMinWidths() {
    return this._colMinWidths;
  }
  set colMinWidths(values) {
    values = [...values].map(
      value => (isFinite(value) && value > 0 ? value : 1)
    );
    this._colMinWidths = gridWorks._pad(values, this._colWidths.length);
  }
  get colMaxWidths() {
    return this._colMaxWidths;
  }
  set colMaxWidths(values) {
    values = [...values].map(value => (value > 0 ? value : Infinity));
    this._colMaxWidths = gridWorks._pad(values, this._colWidths.length);
  }
  get rowMinHeights() {
    return this._rowMinHeights;
  }
  set rowMinHeights(values) {
    values = [...values].map(
      value => (isFinite(value) && value > 0 ? value : 1)
    );
    this._rowMinHeights = gridWorks._pad(values, this._rowHeights.length);
  }
  get rowMaxHeights() {
    return this._rowMaxHeights;
  }
  set rowMaxHeights(values) {
    values = [...values].map(value => (value > 0 ? value : Infinity));
    this._rowMaxHeights = gridWorks._pad(values, this._rowHeights.length);
  }

  constructor(eGrid, opts) {
    this._colLineFixed = [false]; // elem true to make the column edge unadjustable, default: false
    this._rowLineFixed = [false]; // elem true make the row edge unadjustable, default: false
    // this._colHidden = [false]; // elem true to make the column edge unadjustable, default: false
    // this._rowHidden = [false]; // elem true make the row edge unadjustable, default: false

    this._colMinWidths = [1]; // elem sets minimum column width in pixels
    this._colMaxWidths = [Infinity]; // elem sets maximum column width in pixels
    this._rowMinHeights = [1]; // elem sets minimum row height in pixels
    this._rowMaxHeights = [Infinity]; // elem sets maximum row height in pixels

    this._eGrid = eGrid;
    this._colLineNames = [];
    this._colWidths = [];
    this._colLinePositions = [];
    this._rowLineNames = [];
    this._rowHeights = [];
    this._rowLinePositions = [];
    this._gridCells = [];
    this._state = 0; // 0:idle|1:adjust
    this._currentCell;
    this._activeColLine = -1;
    this._activeRowLine = -1;
    this._offsetX0;
    this._offsetY0;

    // HTML elem must have its display CSS property set to "grid"
    if (
      ["grid", "inline-grid"].every(
        value => value !== window.getComputedStyle(this._eGrid).display
      )
    )
      throw "Container is not a grid";

    // if options are given, set'em
    if (opts) Object.assign(this, opts);

    // analyze & configure the grid interactivity
    this._analyze(); // get grid lines and layout of its items
    this._configure(); // set callbacks on its items

    // create object-bound callback functions
    this._onmousehover = this.onMouseHover.bind(this);
    this._onmousedown = this.onMouseDown.bind(this);
    this._onwinmousemove = this.onWindowMouseMove.bind(this);
    this._onwinmouseup = this.onWindowMouseUp.bind(this);

    // enable the grid interactiveness
    this.enable();
  }

  enable() {
    if (this._enabled) return; // nothing to do
    this._enabled = true;
    this._gridCells.forEach(cell => {
      // add mouse event listeners
      cell.eCell.addEventListener("mouseenter", this._onmousehover);
      cell.eCell.addEventListener("mouseleave", this._onmousehover);
      cell.eCell.addEventListener("mousemove", this._onmousehover);
      cell.eCell.addEventListener("mousedown", this._onmousedown);
    });
  }
  disable() {
    if (!this._enabled) return; // nothing to do
    this._enabled = false;
    this._gridCells.forEach(cell => {
      // add mouse event listeners
      cell.eCell.removeEventListener("mouseover", this._onmousehover);
      cell.eCell.removeEventListener("mouseout", this._onmousehover);
      cell.eCell.removeEventListener("mousedown", this._onmousedown);
    });
  }
  // hide() {}
  // show() {}
  // reconfigure() {}
  // restore() {}
  // save() {}
  // load() {}

  /**
   * Analyzes the grid container's attributes and populates the following "private" properties:
      _colLineNames
      _colWidths
      _colLinePositions
      _rowLineNames
      _rowHeights
      _rowLinePositions
      _gridCells
   */
  _analyze() {
    // "##px" -> ## converter
    const cssPxSize = str => Number(str.match(/\d+(?=px)/));

    // identify the (relative) position of the grid lines
    const parseTemplateDefs = (cssParams, offset) => {
      let wasSize = cssParams.template[0] != "[";
      let sizes = [],
        names = wasSize ? [""] : [];
      cssParams.template.match(/(\[[^\]]+\])|([\d\.]+)/g).forEach(token => {
        if (token[0] == "[") {
          // edge names
          // names.push(token.slice(1, -1).match(/[^ ]+/g));
          names.push(token);
          wasSize = false;
        } else {
          sizes.push(Number(token));
          if (wasSize) names.push(""); //names.push([]); // no name given
          wasSize = true;
        }
      });

      // calculate the line positions
      let edges = sizes.reduce((r, a, i) => (r.push(r[i] + a), r), [
        offset + cssPxSize(cssParams.border) + cssPxSize(cssParams.padding)
      ]);
      if (cssParams.gap && cssParams.gap != "normal") {
        let gap = cssPxSize(cssParams.gap);
        edges = edges.map(pos => pos + i * gap);
      }

      // template, gap, border, padding
      return {
        names: names,
        sizes: sizes,
        edges: edges
      };
    };

    // getBoundingClientRect() returns the position of outside edges of borders
    let gridPos = (({ top, left }) => ({ top, left }))(
      this._eGrid.getBoundingClientRect()
    );

    // analyze the column configurations
    ({
      names: this._colLineNames,
      sizes: this._colWidths,
      edges: this._colLinePositions
    } = parseTemplateDefs(
      (({ gridTemplateColumns, columnGap, borderLeftWidth, paddingLeft }) => ({
        template: gridTemplateColumns,
        gap: columnGap,
        border: borderLeftWidth,
        padding: paddingLeft
      }))(window.getComputedStyle(this._eGrid)),
      gridPos.left
    ));

    // analyze the row configurations
    ({
      names: this._rowLineNames,
      sizes: this._rowHeights,
      edges: this._rowLinePositions
    } = parseTemplateDefs(
      (({ gridTemplateRows, rowGap, borderTopWidth, paddingTop }) => ({
        template: gridTemplateRows,
        gap: rowGap,
        border: borderTopWidth,
        padding: paddingTop
      }))(window.getComputedStyle(this._eGrid)),
      gridPos.top
    ));

    // collect grid cells' CSS's
    this._gridCells = [...this._eGrid.children].reduce((r, cell, i) => {
      let css = window.getComputedStyle(cell);
      let cellRect = cell.getBoundingClientRect();
      const findLine = (px, lines) => {
        return lines
          .map(line => Math.abs(line - px))
          .reduce((iMin, x, i, arr) => (x < arr[iMin] ? i : iMin), 0);
      };
      return (
        r.push({
          eCell: cell,
          eCellCSS: css,
          left: findLine(
            cellRect.left - cssPxSize(css.marginLeft),
            this._colLinePositions
          ),
          right: findLine(
            cellRect.left + cellRect.width + cssPxSize(css.marginRight),
            this._colLinePositions
          ),
          top: findLine(
            cellRect.top - cssPxSize(css.marginTop),
            this._rowLinePositions
          ),
          bottom: findLine(
            cellRect.top + cellRect.height + cssPxSize(css.marginBottom),
            this._rowLinePositions
          )
        }),
        r
      );
    }, []);
  }

  /**
   *
   */
  _configure() {
    this._eGrid.classList.add("grid-works", "wrapper");
    this._gridCells.forEach(cell => {
      // insert a borderless div between the grid cell and its content
      cell.eCell.classList.add("grid-works", "cell");
    });

    // set configurations
    // this.colHidden = this._colHidden;
    // this.rowHidden = this._rowHidden;
    this.colLineFixed = this._colLineFixed;
    this.rowLineFixed = this._rowLineFixed;
    this.colMinWidths = this._colMinWidths;
    this.colMaxWidths = this._colMaxWidths;
    this.rowMinHeights = this._rowMinHeights;
    this.rowMaxHeights = this._rowMaxHeights;
  }

  _is_adjustable(line, edge, fixed_edges) {
    return !(fixed_edges[line] || line == edge);
  }

  _on_border(e) {
    // initialize return object
    let rval = { left: false, right: false, top: false, bottom: false };

    let elem = e.target;

    // get current cell, exit if not on border
    this._currentCell = this._gridCells.find(cell => elem == cell.eCell);
    if (!this._currentCell) return rval;

    // detect if mouse is on which border
    let rect = elem.getBoundingClientRect();
    let left_offset = e.clientX - rect.left;
    let right_offset = rect.right - e.clientX - 1;
    let top_offset = e.clientY - rect.top;
    let bottom_offset = rect.bottom - e.clientY - 1;
    let left_bd = Math.max(3, 1 + Number(getComputedStyle(elem).borderLeftWidth.slice(0, -2)));
    let right_bd = Math.max(3, 1 + Number(getComputedStyle(elem).borderRightWidth.slice(0, -2)));
    let top_bd = Math.max(3, 1 + Number(getComputedStyle(elem).borderTopWidth.slice(0, -2)));
    let bottom_bd = Math.max(3, 1 + Number(getComputedStyle(elem).borderBottomWidth.slice(0, -2)));

    // then check if the lines are adjustable
    if (left_offset <= left_bd) {
      rval.left = this._is_adjustable(
        this._currentCell.left,
        0,
        this._colLineFixed
      );
    } else if (right_offset <= right_bd) {
      rval.right = this._is_adjustable(
        this._currentCell.right,
        this._colLinePositions.length - 1,
        this._colLineFixed
      );
    }

    if (top_offset <= top_bd) {
      rval.top = this._is_adjustable(
        this._currentCell.top,
        0,
        this._rowLineFixed
      );
    } else if (bottom_offset <= bottom_bd) {
      rval.bottom = this._is_adjustable(
        this._currentCell.bottom,
        this._rowLinePositions.length - 1,
        this._rowLineFixed
      );
    }
    return rval;
  }

  onMouseHover(e) {
    // console.log(e);

    let elem = e.target;

    if (e.type == "mouseleave") {
      elem.classList.remove("left", "right", "top", "bottom");
    } else {
      // detect what could be adjusted: col/row/both
      let on = this._on_border(e);

      // check for hitting vertical border
      let hitCol = true;
      if (on.left) elem.classList.add("left");
      else if (on.right) elem.classList.add("right");
      else hitCol = false;

      // check for hitting horizontal border
      let hitRow = true;
      if (on.top) elem.classList.add("top");
      else if (on.bottom) elem.classList.add("bottom");
      else hitRow = false;

      // clear if none hit
      if (!(hitCol || hitRow))
        elem.classList.remove("left", "right", "top", "bottom");
    }
  }

  onMouseDown(e) {
    this._state = 1;

    let cell = this._currentCell;

    // id which border(s) is hit
    let on = this._on_border(e);
    if (on.left) this._activeColLine = cell.left;
    else if (on.right) this._activeColLine = cell.right;
    if (on.top) this._activeRowLine = cell.top;
    else if (on.bottom) this._activeRowLine = cell.bottom;

    // check for "erroneous" callback
    if (this._activeColLine < 0 && this._activeRowLine < 0) {
      this._state = 0;
      return 0;
    }

    // indicate grabbed state for css
    cell.eCell.classList.add("grabbed");

    // store the current mouse pointer location
    if (this._activeColLine >= 0)
      this._offsetX0 = this._colLinePositions[this._activeColLine] - e.pageX;
    if (this._activeRowLine >= 0)
      this._offsetY0 = this._rowLinePositions[this._activeRowLine] - e.pageY;

    // switch mouse callbacks
    cell.eCell.removeEventListener("mouseenter", this._onmousehover);
    cell.eCell.removeEventListener("mouseleave", this._onmousehover);
    cell.eCell.removeEventListener("mousemove", this._onmousehover);
    window.addEventListener("mousemove", this._onwinmousemove);
    window.addEventListener("mouseup", this._onwinmouseup);
  }

  onWindowMouseUp(e) {
    let cell = this._currentCell;

    // switch the mousemove callbacks
    window.removeEventListener("mousemove", this._onwinmousemove);
    window.removeEventListener("mouseup", this._onwinmouseup);
    cell.eCell.addEventListener("mouseenter", this._onmousehover);
    cell.eCell.addEventListener("mouseleave", this._onmousehover);
    cell.eCell.addEventListener("mousemove", this._onmousehover);

    // turn off grid-adjuster
    this._state = 0;
    cell.eCell.classList.remove("grabbed");

    // clear active line indicators
    this._activeColLine = -1;
    this._activeRowLine = -1;
  }

  _update_template(line, newpos, cssName, names, sizes, edges, mins, maxs) {
    // get the change
    let delta = newpos - edges[line];
    let newSize0 = sizes[line - 1] + delta;
    let newSize1 = sizes[line] - delta;
    if (newSize0 < mins[line - 1]) {
      newSize1 = newSize0 + newSize1 - mins[line - 1];
      newSize0 = mins[line - 1];
    } else if (newSize1 < mins[line]) {
      newSize0 = newSize1 + newSize0 - mins[line];
      newSize1 = mins[line];
    } else if (newSize0 > maxs[line - 1]) {
      newSize1 = newSize0 + newSize1 - maxs[line - 1];
      newSize0 = maxs[line - 1];
    } else if (newSize1 > maxs[line]) {
      newSize0 = newSize1 + newSize0 - maxs[line];
      newSize1 = maxs[line];
    }

    // update the edge position and sizes of adjacent cells
    edges[line] = edges[line - 1] + newSize0;
    sizes[line - 1] = newSize0;
    sizes[line] = newSize1;

    // update the template
    this._eGrid.style[cssName] = sizes
      .reduce(
        (csswords, size, i) => {
          csswords.push(size + "px");
          csswords.push(names[i + 1]);
          return csswords;
        },
        [names[0]]
      )
      .join(" ");

    // return updated edges & sizes
    return {
      sizes: sizes,
      edges: edges
    };
  }

  onWindowMouseMove(e) {
    e.preventDefault();

    if (this._activeColLine >= 0)
      ({
        sizes: this._colWidths,
        edges: this._colLinePositions
      } = this._update_template(
        this._activeColLine,
        this._offsetX0 + e.pageX,
        "gridTemplateColumns",
        this._colLineNames,
        this._colWidths,
        this._colLinePositions,
        this._colMinWidths,
        this._colMaxWidths
      ));

    if (this._activeRowLine >= 0)
      ({
        sizes: this._rowHeights,
        edges: this._rowLinePositions
      } = this._update_template(
        this._activeRowLine,
        this._offsetY0 + e.pageY,
        "gridTemplateRows",
        this._rowLineNames,
        this._rowHeights,
        this._rowLinePositions,
        this._rowMinHeights,
        this._rowMaxHeights
      ));
  }
}

// make gridWorks available to all DOM objects
Object.defineProperty(HTMLElement.prototype, "gridWorks", {
  get: function() {
    let elem = this;
    const attachGridWorks = (...args) => {
      try {
        Object.defineProperty(elem, "gridWorks", {
          value: new gridWorks(elem, ...args)
        });
        return elem.gridWorks;
      } catch (e) {
        return null;
      }
    };
    return attachGridWorks;
  },
  configurable: true,
  writeable: false
});
