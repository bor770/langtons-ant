"use strict";

const model = {
  ANTUP: 0,
  ANTRIGHT: 1,
  ANTDOWN: 2,
  ANTLEFT: 3,
  ants: [],
  border: false,
  grid: [],
  maxPts: 1,
  numAnts: 1,
  points: 0,
  width: 1,
  height: 1,
  wrap: true,

  setup(parameters) {
    class Ant {
      dir;
      rule;
      x;
      y;

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
    
        // Check border reach
        if (!model.wrap && (this.x === 0 || this.y === 0)) {
          model.border = true;
        }
        
        return this;
      }
    
      step() {
        // Draw current
        view.draw(model.grid[this.x][this.y], this.x, this.y);
    
        // Make a step
        if (this.rule[model.grid[this.x][this.y] % this.rule.length] === `1`) {
          this.turnRight();
        } else {
          this.turnLeft();
        }
        model.grid[this.x][this.y]++;
        this.moveForward();
    
        // Draw white
        view.draw(`white`, this.x, this.y);
    
        // Keep track for maxPts
        model.points++;
    
        return this;
      }
    };
    
    const antParameters = {
      dir: this.ANTUP,
      rule: parameters.rule,
      x: Math.floor(parameters.width / 2),
      y: Math.floor(parameters.height / 2)
    };

    this.maxPts = parameters.maxPts;
    this.numAnts = parameters.numAnts;
    this.wrap = parameters.wrap;
    this.width = parameters.width;
    this.height = parameters.height;
    this.grid =
      Array.from(new Array(parameters.width), () => Array.from(new Array(parameters.height), () => 0));

    for (let i = 0; i < this.numAnts; i++) {
      this.ants.push(new Ant(antParameters));
    }

    view.setup(parameters.width, parameters.height);

    return this;
  },

  stepEach() {
    this.ants.forEach(ant => ant.step());

    return this;
  }
};
