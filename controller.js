"use strict";

const controller = {
  _atATime: 0,

  set stepsAtATime(steps) {
    this._atATime = +steps || 1;
  },

  step() {
    for (let i = 0; i < this._atATime; i++) {
      model.step();
    }
  },

  init() {
    model.initGrid();
    setInterval(this.step.bind(this), 0);
  },
};
