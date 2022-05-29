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

  // rule, max, width, height, speed
  const parameters = {
    rule: rule.value.split(``),
    max: Number(max.value),
    width: size.value.includes(`x`) ? Number(size.value.split(`x`)[0]) : innerWidth,
    height: size.value.includes(`x`) ? Number(size.value.split(`x`)[1]) : innerHeight,
    speed: Number(speed.value)
  };

  model.setup(parameters);

  // palette
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