"use strict";

const view = {
  canvas: {},
  context: {},
  delaySection: {},
  palette: [],
  shift: 0,

  setup: {
    parsePalette(mapFile) {
      // Parses a Fractint .map file

      function parseColor(color) {
        // Parses a Fractint .map file row
        const rgb = color.split(` `).filter(x => !isNaN(parseInt(x)));
        if (rgb.length === 3) {
          return rgb;
        } else {
          return [0, 0, 0];
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
    drawPixel(gridValue, x, y) {
      if (gridValue === `white`) {
        view.context.fillStyle = `white`;
      } else {
        view.context.fillStyle = `rgb(${view.palette[gridValue % view.palette.length].join(`,`)})`;
      }

      view.context.fillRect(x, y, 1, 1);

      return this;
    },

    drawEntire() {
      const width = view.canvas.width;
      const height = view.canvas.height;
      const img = new ImageData(width, height);

      for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
          const index = 4 * (j * width + i);
          let color;
          if (!(model.grid[i][j] % view.palette.length)) {
            color = view.palette[0];
          } else {
            color = view.palette[(model.grid[i][j] + view.shift) % view.palette.length];
          }
          img.data[index] = color[0];
          img.data[index + 1] = color[1];
          img.data[index + 2] = color[2];
          img.data[index + 3] = 255;
        }
      }

      view.context.putImageData(img, 0, 0);

      view.shift++;

      requestAnimationFrame(view.draw.drawEntire);
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

  cycle: {
    colorCycle() {
      view.draw.drawEntire();
    }
  }
};
