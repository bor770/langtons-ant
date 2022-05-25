"use strict";

const controller = {
  atATime: 0,

  step() {
    for (let i = 0; i < this.atATime; i++) {
      model.step();
    }
    return this;
  },

  init() {
    model.initGrid();
    setInterval(this.step.bind(this), 0);
    return this;
  },
};
