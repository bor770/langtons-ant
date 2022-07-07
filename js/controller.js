"use strict";

const controller = {
  delay: 0,
  interval: 0,
  speed: 1,

  setup(speed) {
    this.speed = speed;
  },

  changeDelay(e) {
    if ((e.code === `ArrowLeft` || e.code === `ArrowRight`) && this.speed === 1) {
      clearInterval(this.interval);
      view.showDelay();
    }
  },

  updateDelay(e) {
    switch (e.code) {
      case `ControlLeft`:
        switch (e.type) {
          case `keydown`:
            e.target.step = `100`;
            break;
          case `keyup`: 
            e.target.step = `10`;
            break;
        }
        break;
      case `Enter`:
        this.delay = e.target.value;
        view.hideDelay();
        this.go();
        break;
    }
  },

  speedStep() {
    // step() speed times, but stop at maxPts total, and check border
    for (let i = 0; i < this.speed && model.points <= model.maxPts && !model.border; i++) {
      model.stepEach();
    }

    if (model.points > model.maxPts || model.border) {
      clearInterval(this.interval);
    }

    return this;
  },

  go() {
    this.interval = setInterval(this.speedStep.bind(this), this.delay);

    return this;
  }
}