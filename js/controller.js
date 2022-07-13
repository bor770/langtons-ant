"use strict";

const controller = {
  delay: 0,
  interval: 0,
  speed: 1,

  setup(speed) {
    controller.speed = speed;

    return this;
  },

  processKey(e) {
    switch (e.code) {
      case `ArrowLeft`:
      case `ArrowRight`:
        if (controller.speed === 1) {
          clearInterval(controller.interval);
          view.delay.show();
        }
        break;
      case `NumpadAdd`:
        clearInterval(controller.interval);
        view.cycle.colorCycle();
        break;
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
        controller.delay = e.target.value;
        view.delay.hide();
        controller.go();
        break;
    }
  },

  speedStep() {
    // step() speed times, but stop at maxPts total, and check border
    for
      (let i = 0; i < controller.speed && model.points <= model.maxPts && !(model.border && !model.wrap); i++) {
      model.stepEach();
    }

    if (model.points > model.maxPts || (model.border && !model.wrap)) {
      clearInterval(controller.interval);
    }

    return this;
  },

  go() {
    controller.interval = setInterval(controller.speedStep, controller.delay);

    return this;
  }
}