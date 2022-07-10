"use strict";

const view = {
  context: {},
  delaySection: {},
  palette: [],

  parseColor(color) {
    // Parses a Fractint .map file row
    const rgb = color.split(` `).filter(x => !isNaN(parseInt(x)));
    if (rgb.length === 3) {
      return `rgb(${rgb.join()})`;
    } else {
      return `rgb(0,0,0)`;
    }
  },

  parsePalette(mapFile) {
    // Parses a Fractint .map file
    this.palette = Array.from(mapFile.split(`\r\n`), this.parseColor);

    return this;
  },

  setup(width, height) {
    const canvas = document.querySelector(`canvas`);

    // Show canvas
    canvas.classList.remove(`is-hidden`);

    this.context = canvas.getContext(`2d`);

    canvas.width = width;
    canvas.height = height;

    // Fill Blank
    this.context.fillRect(0, 0, width, height);

    this.delaySection = document.querySelector(`#delay`);

    return this;
  },

  draw(gridValue, x, y) {
    this.context.fillStyle = this.palette[gridValue % this.palette.length];
    this.context.fillRect(x, y, 1, 1);

    return this;
  },

  drawWhite(x, y) {
    this.context.fillStyle = `white`;
    this.context.fillRect(x, y, 1, 1);

    return this;
  },

  showDelay() {
    const delayInput = document.querySelector(`#delayInput`);
    this.delaySection.classList.remove(`is-hidden`);
    delayInput.focus();

    return this;
  },

  hideDelay() {
    this.delaySection.classList.add(`is-hidden`);

    return this;
  }
};
