"use strict";

class Ant {
  constructor(parameters) {
    this.type = parameters.type;
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

  step() {
    // Make a step
    if (this.rule[model.grid[this.x][this.y] % this.rule.length] === `1`) {
      this.turnRight();
    } else {
      this.turnLeft();
    }
    model.grid[this.x][this.y]++;
    this.moveForward();
    // Draw it
    view.draw(model.grid[this.x][this.y], this.x, this.y);
    // Keep track for maxPts
    model.points++;
    return this;
  }
}

const model = {
  ANTUP: 0,
  ANTRIGHT: 1,
  ANTDOWN: 2,
  ANTLEFT: 3,
  ants: [],
  points: 0,

  speedStep() {
    // step() speed times, but stop at this.maxPts total
    let i = 0;
    while (i < this.speed && this.points <= this.maxPts) {
      this.ants.forEach(ant => ant.step());
      i++;
    }
    if (this.points >= this.maxPts) {
      clearInterval(this.interval);
    }
    return this;
  },

  setup(parameters) {
    const antParameters = {
      type: parameters.antType,
      dir: this.ANTUP,
      rule: parameters.rule,
      x: Math.floor(parameters.width / 2),
      y: Math.floor(parameters.height / 2)
    };

    this.maxPts = parameters.maxPts;
    this.numAnts = parameters.numAnts;
    this.width = parameters.width;
    this.height = parameters.height;
    this.grid =
      Array.from(new Array(parameters.width), () => Array.from(new Array(parameters.height), () => 0));
    this.speed = parameters.speed;

    for (let i = 0; i < this.numAnts; i++) {
      this.ants.push(new Ant(antParameters));
    }

    view.setup(parameters.width, parameters.height);

    return this;
  },

  go() {
    this.interval = setInterval(this.speedStep.bind(this), 0);
  }
};
