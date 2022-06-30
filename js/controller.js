"use strict";

const controller = {
  delay: 0,
  interval: 0,

  changeDelay(e) {
    if ((e.code === `ArrowLeft` || e.code === `ArrowRight`) && model.speed === 1) {
      clearInterval(this.interval);
      view.showDelay();
    }
  },

  updateDelay(e) {
    if (e.code === `Enter`) {
      this.delay = e.target.value;
      view.hideDelay();
      this.go();
    }
  },

  speedStep() {
    // step() speed times, but stop at maxPts total
    let i = 0;
    while (i < model.speed && model.points <= model.maxPts && !model.border) {
      model.ants.forEach(ant => ant.step());
      i++;
    }
    if (model.points >= model.maxPts || model.border) {
      clearInterval(this.interval);
    }

    return this;
  },

  go() {
    this.interval = setInterval(this.speedStep.bind(this), this.delay);

    return this;
  }
}