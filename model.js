"use strict";

const model = {
  _ANTUP: 0,
  _ANTRIGHT: 1,
  _ANTDOWN: 2,
  _ANTLEFT: 3,
  _dir: 0,
  _grid: [],
  _interval: null,
  _max: 1,
  _points: 0,
  _rule: [],
  _speed: 1,
  _width: 0,
  _height: 0,
  _x: 0,
  _y: 0,

  _modulo(a, n) {
    return ((a % n) + n) % n;
  },

  _turnLeft() {
    this._dir = this._modulo(this._dir - 1, 4);

    return this;
  },

  _turnRight() {
    this._dir = this._modulo(this._dir + 1, 4);

    return this;
  },

  _moveForward() {
    switch (this._dir) {
      case this._ANTUP:
        this._y = this._modulo(this._y - 1, this._height);
        break;
      case this._ANTRIGHT:
        this._x = this._modulo(this._x + 1, this._width);
        break;
      case this._ANTDOWN:
        this._y = this._modulo(this._y + 1, this._height);
        break;
      case this._ANTLEFT:
        this._x = this._modulo(this._x - 1, this._width);
        break;
    }

    return this;
  },

  _step() {
    // Make a step
    if (this._rule[this._grid[this._x][this._y] % this._rule.length] === `1`) {
      this._turnRight();
    } else {
      this._turnLeft();
    }
    this._grid[this._x][this._y]++;
    this._moveForward();

    // Draw it
    view.draw(this._grid[this._x][this._y], this._x, this._y);

    // Check maxPts
    this._points++;
    if (this._points === this._max) {
      clearInterval(this._interval);
    }

    return this;
  },

  _speedStep() {
    for (let i = 0; i < this._speed; i++) {
      this._step();
    }

    return this;
  },

  setup(parameters) {
    this._rule = parameters.rule;
    this._max = parameters.max;
    this._width = parameters.width;
    this._height = parameters.height;
    this._grid =
      Array.from(new Array(parameters.width), () => Array.from(new Array(parameters.height), () => 0));
    this._x = Math.floor(parameters.width / 2);
    this._y = Math.floor(parameters.height / 2);
    this._speed = parameters.speed;
    this._dir = this._ANTUP;

    view.setup(parameters.width, parameters.height);

    return this;
  },

  go() {
    this._interval = setInterval(this._speedStep.bind(this), 0);
  }
};
