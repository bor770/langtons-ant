"use strict";

const model = {
  _ANTUP: 0,
  _ANTRIGHT: 1,
  _ANTDOWN: 2,
  _ANTLEFT: 3,
  _grid: [],
  _dir: 0,
  _x: 0,
  _y: 0,
  width: 0,
  height: 0,
  ruleString: ``,

  _make2DArray(cols, rows) {
    return Array.from(new Array(+cols), () => Array.from(new Array(+rows), () => 0));
  },

  _turnLeft() {
    this._dir++;
    if (this._dir > this._ANTLEFT) {
      this._dir = this._ANTUP;
    }
    return this;
  },

  _turnRight() {
    this._dir--;
    if (this._dir < this._ANTUP) {
      this._dir = this._ANTLEFT;
    }
    return this;
  },

  _moveForward() {
    if (this._dir === this._ANTUP) {
      this._y--;
    } else if (this._dir === this._ANTRIGHT) {
      this._x++;
    } else if (this._dir === this._ANTDOWN) {
      this._y++;
    } else if (this._dir === this._ANTLEFT) {
      this._x--;
    }

    if (this._x < 0) {
      this._x = this.width - 1;
    }
    if (this._y > this.height - 1) {
      this._y = 0;
    }
    if (this._x > this.width - 1) {
      this._x = 0;
    }
    if (this._y < 0) {
      this._y = this.height - 1;
    }
    return this;
  },

  initGrid() {
    this._grid = this._make2DArray(this.width, this.height);
    this._x = Math.floor(this.width / 2);
    this._y = Math.floor(this.height / 2);
    this._dir = this._ANTUP;
    view.setup(this.width, this.height);
    return this;
  },

  step() {
    const rule = [...this.ruleString];
    if (rule[this._grid[this._x][this._y] % rule.length] === `1`) {
      this._turnRight();
    } else {
      this._turnLeft();
    }
    this._grid[this._x][this._y]++;
    this._moveForward();
    view.draw(this._grid[this._x][this._y], this._x, this._y);
    return this;
  },
};
