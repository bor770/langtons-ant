"use strict";

const view = {
  canvas: {},
  context: {},
  delaySection: {},
  palette: [],

  setup: {
    parsePalette(mapFile) {
      // Parses a Fractint .map file

      function parseColor(color) {
        // Parses a Fractint .map file row
        const rgb = color.split(` `).filter(x => !isNaN(parseInt(x)));
        if (rgb.length === 3) {
          return `rgb(${rgb.join()})`;
        } else {
          return `rgb(0,0,0)`;
        }
      }

      view.palette = Array.from(mapFile.split(`\r\n`), parseColor);

      return this;
    },

    setup(width, height) {
      view.canvas = document.querySelector(`canvas`);

      // Show canvas
      view.canvas.classList.remove(`is-hidden`);

      view.context = view.canvas.getContext(`2d`);

      view.canvas.width = width;
      view.canvas.height = height;

      // Fill Blank
      view.context.fillRect(0, 0, width, height);

      view.delaySection = document.querySelector(`#delay`);

      return this;
    }
  },

  draw: {
    draw(gridValue, x, y) {
      if (gridValue === `white`) {
        view.context.fillStyle = `white`;
      } else {
        view.context.fillStyle = view.palette[gridValue % view.palette.length];
      }

      view.context.fillRect(x, y, 1, 1);

      return this;
    }
  },

  delay: {
    showDelay() {
      const delayInput = document.querySelector(`#delayInput`);

      view.delaySection.classList.remove(`is-hidden`);
      delayInput.focus();

      return this;
    },

    hideDelay() {
      view.delaySection.classList.add(`is-hidden`);

      return this;
    }
  },

  colorCycle() {

  }
};
