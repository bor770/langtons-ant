"use strict";

const view = {
  _canvas: {},
  _context: {},
  _palette: [],

  _getPalette(fileName) {
    const url = `maps/${fileName}`;
    const request = new XMLHttpRequest();
    request.open(`GET`, url);
    request.onload = this._parsePalette.bind(this);
    request.send(null);
  },

  _parseColor(color) {
    // Parses a Fractint .map file
    let rgb = color.split(` `).filter(x => !isNaN(Number.parseInt(x)));
    return `rgb(${rgb.slice(0, 3).join(`,`)})`;
  },

  _parsePalette(event) {
    // Parses a Fractint .map file
    this._palette = Array.from(event.target.responseText.split(`\r\n`), this._parseColor);
  },

  set paletteName(name) {
    this._getPalette(name || `default.map`);
  },

  setup(width, height) {
    this._canvas = document.getElementById(`canvas`);
    this._context = this._canvas.getContext(`2d`);

    this._canvas.setAttribute(`width`, width);
    this._canvas.setAttribute(`height`, height);

    this._context.fillRect(0, 0, width, height);
  },

  draw(gridValue, x, y) {
    this._context.fillStyle = this._palette[gridValue % this._palette.length];
    this._context.fillRect(x, y, 1, 1);
  },
};
