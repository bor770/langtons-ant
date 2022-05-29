"use strict";

class Ant {
  constructor(parameters) {
    this.dir = parameters.dir;
    this.rule = parameters.rule;
    this.x = parameters.x;
    this.y = parameters.y;
  }

  modulo(a, n) {
    return ((a % n) + n) % n;
  }

  turnLeft() {
    this.dir = this.modulo(this.dir - 1, 4);
    return this;
  }

  turnRight() {
    this.dir = this.modulo(this.dir + 1, 4);
    return this;
  }

  moveForward() {
    switch (this.dir) {
      case model.ANTUP:
        this.y = this.modulo(this.y - 1, model.height);
        break;
      case model.ANTRIGHT:
        this.x = this.modulo(this.x + 1, model.width);
        break;
      case model.ANTDOWN:
        this.y = this.modulo(this.y + 1, model.height);
        break;
      case model.ANTLEFT:
        this.x = this.modulo(this.x - 1, model.width);
        break;
    }
    return this;
  }
}

const model = {
  ANTUP: 0,
  ANTRIGHT: 1,
  ANTDOWN: 2,
  ANTLEFT: 3,
  ant: {},
  grid: [],
  interval: null,
  max: 1,
  points: 0,
  speed: 1,
  width: innerWidth,
  height: innerWidth,

  step() {
    this.points++;
    // Check maxPts
    if (this.points <= this.max) {
      // Make a step
      if (this.ant.rule[this.grid[this.ant.x][this.ant.y] % this.ant.rule.length] === `1`) {
        this.ant.turnRight();
      } else {
        this.ant.turnLeft();
      }
      this.grid[this.ant.x][this.ant.y]++;
      this.ant.moveForward();
      // Draw it
      view.draw(this.grid[this.ant.x][this.ant.y], this.ant.x, this.ant.y);
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
    const antParameters = {
      dir: this.ANTUP,
      rule: parameters.rule,
      x: Math.floor(parameters.width / 2),
      y: Math.floor(parameters.height / 2)
    }

    this.max = parameters.max;
    this.width = parameters.width;
    this.height = parameters.height;
    this.grid =
      Array.from(new Array(parameters.width), () => Array.from(new Array(parameters.height), () => 0));
    this.speed = parameters.speed;

    this.ant = new Ant(antParameters);

    view.setup(parameters.width, parameters.height);

    return this;
  },

  go() {
    this.interval = setInterval(this.speedStep.bind(this), 0);
  }
};
