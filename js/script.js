"use strict";

addEventListener(`load`, () => {
  const formRule = document.querySelector(`#formRule`);
  const formMax = document.querySelector(`#formMax`);
  const formNum = document.querySelector(`#formNum`);
  const formWrap = document.querySelector(`#formWrap`);
  const formSize = document.querySelector(`#formSize`);
  const formPalette = document.querySelector(`#formPalette`);
  const formSpeed = document.querySelector(`#formSpeed`);
  const formGo = document.querySelector(`#formGo`);
  const delayInput = document.querySelector(`#delayInput`);

  function setModel() {
    const modelParameters = {
      rule: formRule.value ? [...formRule.value] : [...String((1e20 * Math.random()))],
      maxPts: +formMax.value,
      numAnts: formNum.value ? +formNum.value : Math.floor(256 * Math.random()) + 1,
      wrap: formWrap.checked,
      width: formSize.value.includes(`x`) ? +formSize.value.split(`x`)[0] : innerWidth,
      height: formSize.value.includes(`x`) ? +formSize.value.split(`x`)[1] : innerHeight
    };

    model.setup(modelParameters);
  }

  async function setView() {
    function readFile(file) {
      return new Promise(resolve => {
        const fileReader = new FileReader();

        fileReader.addEventListener(`load`, e => {
          resolve(e.target.result);
        });

        fileReader.readAsText(file);
      });
    }

    if (formPalette.value) {
      view.parsePalette(await readFile(formPalette.files[0]));
    } else {
      view.parsePalette(await fetch(`maps/default.map`).then(response => response.text()));
    }
  }

  function setController() {
    controller.setup(+formSpeed.value);

    document.addEventListener(`keydown`, controller.changeDelay.bind(controller));
    delayInput.addEventListener(`keydown`, controller.updateDelay.bind(controller));
    delayInput.addEventListener(`keyup`, controller.updateDelay.bind(controller));
  }

  formGo.addEventListener(`click`, async e => {
    e.target.disabled = true;

    setModel();
    setController();
    await setView();

    controller.go();
  });

});