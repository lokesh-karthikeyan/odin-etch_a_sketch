let selectedColor = "#000000";
let iterator = 0;

document.addEventListener("DOMContentLoaded", isDOMLoaded);

function isDOMLoaded() {
  let drawContent = document.querySelector("input[type = 'radio']:checked");

  if (drawContent.className.includes("fill")) {
    createGrids(16);

    let enableMode = [
      ...document.getElementsByClassName("trail-mode-indicator"),
    ];
    let disableMode = [
      ...document.getElementsByClassName("rgb-mode-indicator"),
    ];
    setMode(enableMode);
    unsetMode(disableMode);
  }
}

function createGrids(size) {
  for (let row = 0; row < size; row++) {
    let rows = document.createElement("div");
    rows.classList.add("rows");

    for (let column = 0; column < size; column++) {
      let columns = document.createElement("div");
      columns.classList.add("columns");
      rows.appendChild(columns);
    }
    let gridContainer = document.querySelector(".container-box");
    gridContainer.appendChild(rows);
  }
}

let topOuterContainer = document.querySelector(".outer-container-top");

topOuterContainer.addEventListener("click", getClickedTarget);

function getClickedTarget(e) {
  let clickedElement = e.target;

  if (clickedElement.className.includes("trail-mode")) {
    compareModeStatus(clickedElement);
  }

  if (clickedElement.className.includes("rgb-mode")) {
    compareModeStatus(clickedElement);
  }
}

function compareModeStatus(targetElement) {
  let trailModeIndicator = [
    ...document.getElementsByClassName("trail-mode-indicator"),
  ];
  let rgbModeIndicator = [
    ...document.getElementsByClassName("rgb-mode-indicator"),
  ];

  let classOfTrailMode;
  let classOfRgbMode;

  for (index = 0; index < 1; index++) {
    classOfTrailMode = trailModeIndicator[index].className;
    classOfRgbMode = rgbModeIndicator[index].className;
  }

  if (targetElement.className.includes("trail-mode")) {
    if (classOfTrailMode.includes("mode-on")) {
      unsetMode(trailModeIndicator);
    }

    if (classOfTrailMode.includes("mode-off")) {
      if (classOfRgbMode.includes("mode-on")) {
        unsetMode(rgbModeIndicator);
      }
      setMode(trailModeIndicator);
    }
  }

  if (targetElement.className.includes("rgb-mode")) {
    if (classOfRgbMode.includes("mode-on")) {
      unsetMode(rgbModeIndicator);
    }

    if (classOfRgbMode.includes("mode-off")) {
      if (classOfTrailMode.includes("mode-on")) {
        unsetMode(trailModeIndicator);
      }
      setMode(rgbModeIndicator);
    }
  }
}

function setMode(targetElement) {
  for (let elem of targetElement) {
    elem.style.transform = "scale(0.0)";
    elem.classList.add("mode-on");
    elem.classList.remove("mode-off");
  }

  setTimeout(() => {
    for (let elem of targetElement) {
      elem.style = "";
    }
  }, 400);
}

function unsetMode(targetElement) {
  for (let elem of targetElement) {
    elem.style.transform = "scale(0.0)";
    elem.classList.add("mode-off");
    elem.classList.remove("mode-on");
  }

  setTimeout(() => {
    for (let elem of targetElement) {
      elem.style = "";
    }
  }, 400);
}

let gridContainer = document.querySelector(".container-box");

gridContainer.addEventListener("mouseover", drawContent);

function drawContent(e) {
  let targetElement = e.target;

  if (!targetElement.className.includes("columns")) {
    return;
  }

  let currentMode = [...document.querySelectorAll(".mode-on")];
  let disabledMode = [...document.querySelectorAll(".mode-off")];
  let currentSelection;

  if (disabledMode.length === 4) {
    let radioOption = document.querySelector("input[type = 'radio']:checked");

    switch (radioOption.className) {
      case "fill":
        isFill(targetElement);
        break;
      case "erase":
        isErase(targetElement);
        break;
    }
    // isFill(targetElement);
  } else {
    for (index = 0; index < 1; index++) {
      currentSelection = currentMode[index].className;
    }

    if (currentSelection.includes("trail-mode")) {
      isTrailMode(targetElement);
    } else {
      isRgbMode(targetElement);
    }
  }
}

function isTrailMode(element) {
  let opacityHexValues = [
    "FF",
    "F2",
    "E6",
    "D9",
    "CC",
    "BF",
    "B3",
    "A6",
    "99",
    "8C",
    "80",
    "73",
    "66",
    "59",
    "4D",
    "40",
    "33",
    "26",
    "1A",
    "0D",
    "00",
  ];

  element.style.backgroundColor = selectedColor + opacityHexValues[iterator];
  iterator++;

  if (iterator === opacityHexValues.length) {
    iterator = 0;
  }
}

function isRgbMode(element) {
  let hexColorCharacters = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  let hashForHexColor = "#";

  for (let index = 0; index < 6; index++) {
    let position = randomNumberGenerator(hexColorCharacters.length);
    hashForHexColor += hexColorCharacters[position];
  }

  element.style.backgroundColor = hashForHexColor;
}

function randomNumberGenerator(length) {
  let randomNumber = Math.floor(Math.random() * length);
  return randomNumber;
}

let resizeGrid = document.querySelector(".container-button-left");

resizeGrid.addEventListener("click", getGridSize);

let inputOptions = [...document.getElementsByName("draw")];

for (let input of inputOptions) {
  input.addEventListener("change", selectRadioOption);
}

function selectRadioOption(e) {
  let targetElemClass = e.target.className;

  if (targetElemClass === "erase") {
    let enabledMode = [...document.getElementsByClassName("mode-on")];

    if (enabledMode.length > 0) {
      // for (let mode of enabledMode) {
      unsetMode(enabledMode);
      console.log(enabledMode);
      // }
    }
  }

  if (targetElemClass === "reset") {
    isReset();
  }
}

function getGridSize() {
  let size = getPromptInput();

  let gridContainer = document.querySelector(".container-box");
  let gridContainerRows = document.querySelectorAll(".rows");

  if (size === undefined) {
    return;
  }

  gridContainer.style.backgroundColor = "hsl(0, 0%, 0%)";
  gridContainer.style.transform = "scale(0.0)";

  setTimeout(() => {
    gridContainer.style = "";
  }, 500);

  for (let row of gridContainerRows) {
    gridContainer.removeChild(row);
  }

  createGrids(size);
}

function getPromptInput() {
  let size = prompt("Enter the size: ");

  if (size === null) {
    return;
  }

  if (isNaN(size)) {
    alert("Enter the valid size (1 to 100)");
    size = getPromptInput();
    return size;
  }

  if (Number(size) < 1 || Number(size) > 100) {
    alert("Enter the valid size (1 to 100)");
    size = getPromptInput();
    return size;
  }

  if (Number(size) >= 1 || Number(size) <= 100) {
    return size;
  }
}

function isErase(element) {
  element.style.backgroundColor = "hsl(360, 100%, 100%)";
}

function isFill(element) {
  element.style.backgroundColor = "coral";
}

function isReset() {
  let gridContainer = document.querySelector(".container-box");
  let columns = [...document.querySelectorAll(".columns")];

  gridContainer.style.transform = "rotateY(90deg)";

  setTimeout(() => {
    gridContainer.style = "";
    for (let col of columns) {
      col.style.backgroundColor = "hsl(360, 100%, 100%)";
    }
    let fillMode = document.querySelector(".fill");
    fillMode.checked = true;
  }, 500);
}

function isChooseColor(e) {
  let targetElement = e.target;

  if (targetElement.value === undefined || targetElement.value === null) {
    return;
  }
  selectedColor = targetElement.value;

  let colorPalette = document.querySelector(".color-picker-icon");

  colorPalette.style.backgroundColor = selectedColor;
}

let sliderContainer = document.querySelector(".container-button-slider");

sliderContainer.addEventListener("mouseenter", setHoverEffect);
sliderContainer.addEventListener("mouseleave", unsetHoverEffect);

function setHoverEffect() {
  let slider = document.querySelector(".slider");

  slider.style.boxShadow = "0 0 0 15px #82ff62";
}

function unsetHoverEffect() {
  let slider = document.querySelector(".slider");

  slider.style = "";
}
