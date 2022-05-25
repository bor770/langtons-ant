"use strict";

window.onload = function () {
  const section = document.getElementById(`section`);
  const rule = document.getElementById(`form-rule`);
  const size = document.getElementById(`form-size`);
  const palette = document.getElementById(`form-palette`);
  const speed = document.getElementById(`form-speed`);
  const go = document.getElementById(`form-go`);
  const canvas = document.getElementById(`canvas`);
  go.onclick = function (e) {

    // Rule
    model.ruleString = rule.value || `10`; 

    // Canvas Size
    model.width = size.value.includes(`x`) ? size.value.split(`x`)[0] : innerWidth;
    model.height = size.value.includes(`x`) ? size.value.split(`x`)[1] : innerHeight;

    // Palette
    view.paletteName = palette.value.substring(12); 

    // Speed 
    controller.atATime = +speed.value || 1;

    // Hide Form
    section.setAttribute(`class`, `d-none`);

    // Display Canvas
    canvas.removeAttribute(`class`);

    // Go!
    controller.init();

    return false;
  };
}