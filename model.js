"use strict";

const model = {
  ANTUP: 0,
  ANTRIGHT: 1,
  ANTDOWN: 2,
  ANTLEFT: 3,
  dir: 0,
  grid: [],
  interval: null,
  max: 1,
  points: 0,
  rule: [],
  speed: 1,
  width: 0,
  height: 0,
  x: 0,
  y: 0,

  modulo(a, n) {
    return ((a % n) + n) % n;
  },

  turnLeft() {
    this.dir = this.modulo(this.dir - 1, 4);

    return this;
  },

  turnRight() {
    this.dir = this.modulo(this.dir + 1, 4);

    return this;
  },

  moveForward() {
    switch (this.dir) {
      case this.ANTUP:
        this.y = this.modulo(this.y - 1, this.height);
        break;
      case this.ANTRIGHT:
        this.x = this.modulo(this.x + 1, this.width);
        break;
      case this.ANTDOWN:
        this.y = this.modulo(this.y + 1, this.height);
        break;
      case this.ANTLEFT:
        this.x = this.modulo(this.x - 1, this.width);
        break;
    }

    return this;
  },

  step() {
    this.points++;
    // Check maxPts
    if (this.points <= this.max) {
      // Make a step
      if (this.rule[this.grid[this.x][this.y] % this.rule.length] === `1`) {
        this.turnRight();
      } else {
        this.turnLeft();
      }
      this.grid[this.x][this.y]++;
      this.moveForward();
      // Draw it
      view.draw(this.grid[this.x][this.y], this.x, this.y);
    } else { // maxPts exceeded
      clearInterval(this.interval);
    }
    return this;
  },

  speedStep() {
    for (let i = 0; i < this.speed; i++) {
      this.step();
    }

    return this;
  },

  setup(parameters) {
    this.rule = parameters.rule;
    this.max = parameters.max;
    this.width = parameters.width;
    this.height = parameters.height;
    this.grid =
      Array.from(new Array(parameters.width), () => Array.from(new Array(parameters.height), () => 0));
    this.x = Math.floor(parameters.width / 2);
    this.y = Math.floor(parameters.height / 2);
    this.speed = parameters.speed;
    this.dir = this.ANTUP;

    view.setup(parameters.width, parameters.height);

    return this;
  },

  go() {
    this.interval = setInterval(this.speedStep.bind(this), 0);
  }
};
