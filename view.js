"use strict";

const view = {
  context: {},
  palette: [],

  parseColor(color) {
    // Parses a Fractint .map file row
    const rgb = color.split(` `).filter(x => !isNaN(Number.parseInt(x)));
    return `rgb(${rgb.slice(0, 3).join()})`;
  },

  parsePalette(mapFile) {
    // Parses a Fractint .map file
    this.palette = Array.from(mapFile.split(`\r\n`), this.parseColor);

    return this;
  },

  setup(width, height) {
    const section = document.querySelector(`section`);
    const canvas = document.querySelector(`canvas`);

    // Hide form, show canvas
    section.classList.add(`d-none`);
    canvas.classList.remove(`d-none`);

    this.context = canvas.getContext(`2d`);

    canvas.width = width;
    canvas.height = height;

    this.context.fillRect(0, 0, width, height);

    return this;
  },

  draw(gridValue, x, y) {
    this.context.fillStyle = this.palette[gridValue % this.palette.length];
    this.context.fillRect(x, y, 1, 1);

    return this;
  },
};
