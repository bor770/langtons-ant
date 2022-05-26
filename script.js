"use strict";

function init() {
  const goButton = document.querySelector(`button`);
  goButton.addEventListener(`click`, go);
}

async function go(e) {
  const rule = document.querySelector(`#formRule`);
  const max = document.querySelector(`#formMax`);
  const size = document.querySelector(`#formSize`);
  const palette = document.querySelector(`#formPalette`);
  const speed = document.querySelector(`#formSpeed`);
  let parameters = {};

  // Rule, Max, Size, Speed
  parameters.rule = rule.value.split(``);
  parameters.max = Number(max.value);
  if (size.value.includes(`x`)) { // Width, Height
    parameters.width = Number(size.value.split(`x`)[0]);
    parameters.height = Number(size.value.split(`x`)[1]);
  } else {
    parameters.width = innerWidth;
    parameters.height = innerHeight;
  }
  parameters.speed = Number(speed.value);
  model.setup(parameters);

  // Palette
  if (palette.value) {
    view.parsePalette(await readFile(palette.files[0]));
  } else { // default.map
    view.parsePalette(await fetch(`maps/default.map`)
      .then(response => response.text()));
  }

  // Go!
  model.go();

  return false;
}

// Helper function 
function readFile(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener(`load`, e => {
      resolve(e.target.result);
    });
    fileReader.readAsText(file);
  });
}

addEventListener(`load`, init);