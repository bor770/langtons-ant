"use strict";

const model = {
  ANT_UP: 0,
  ANT_RIGHT: 1,
  ANT_DOWN: 2,
  ANT_LEFT: 3,
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

      turnBack() {
        this.dir = this.modulo(this.dir + 2, 4);

        return this;
      }
    
      moveForward() {
        switch (this.dir) {
          case model.ANT_UP:
            this.y = this.modulo(this.y - 1, model.height);
            break;
          case model.ANT_RIGHT:
            this.x = this.modulo(this.x + 1, model.width);
            break;
          case model.ANT_DOWN:
            this.y = this.modulo(this.y + 1, model.height);
            break;
          case model.ANT_LEFT:
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
        view.draw.drawPixel(model.grid[this.x][this.y], this.x, this.y);
    
        switch (this.rule[model.grid[this.x][this.y] % this.rule.length]) {
          case '0':
            this.turnLeft();
            break;
          default:
            this.turnRight();
            break;
        }
        model.grid[this.x][this.y]++;
        this.moveForward();
    
        // Draw white
        view.draw.drawPixel(`white`, this.x, this.y);
    
        // Keep track for maxPts
        model.points++;
    
        return this;
      }
    };
    
    const antParameters = {
      dir: this.ANT_UP,
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

    view.setup.setup(parameters.width, parameters.height);

    return this;
  },

  stepEach() {
    this.ants.forEach(ant => ant.step());

    return this;
  }
};
