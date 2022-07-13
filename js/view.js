"use strict";

const view = {
  canvas: {},
  context: {},
  delayInput: {},
  delaySection: {},
  palette: [],
  width: 1,
  height: 1,

  setup: {
    parsePalette(mapFile) {
      // Parses a Fractint .map file
      function parseColor(row) {
        // Parses a Fractint .map file row
        const rgb = row.split(` `).filter(x => !isNaN(parseInt(x)));
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

      view.canvas.classList.remove(`is-hidden`);

      view.canvas.width = width;
      view.canvas.height = height;
      
      view.context = view.canvas.getContext(`2d`);

      // Fill Blank
      view.context.fillRect(0, 0, width, height);

      view.delayInput = document.querySelector(`#delayInput`);
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
    }
  },

  delay: {
    show() {
      view.delaySection.classList.remove(`is-hidden`);
      view.delayInput.focus();

      return this;
    },

    hide() {
      view.delaySection.classList.add(`is-hidden`);

      return this;
    }
  },

  cycle: {
    shift: 0,

    colorCycle() {
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
            color = view.palette[(model.grid[i][j] + view.cycle.shift) % view.palette.length];
          }
          img.data[index] = color[0];
          img.data[index + 1] = color[1];
          img.data[index + 2] = color[2];
          img.data[index + 3] = 255;
        }
      }

      view.context.putImageData(img, 0, 0);

      view.cycle.shift++;

      requestAnimationFrame(view.cycle.colorCycle);
    }
  }
}