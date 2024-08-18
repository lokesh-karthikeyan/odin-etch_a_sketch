document.addEventListener("DOMContentLoaded", createGrids);

function createGrids(size) {
  if (size.type === "DOMContentLoaded") {
    size = 16;
  }
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
    elem.classList.add("mode-on");
    elem.classList.remove("mode-off");
  }
}

function unsetMode(targetElement) {
  for (let elem of targetElement) {
    elem.classList.add("mode-off");
    elem.classList.remove("mode-on");
  }
}

let iterator = 0;

function isTrailMode(e) {
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

  let targetElement = e.target;

  if (!(targetElement.className === "columns")) {
    return 0;
  }

  targetElement.style.backgroundColor = color + opacityHexValues[iterator];
  iterator++;

  if (iterator === opacityHexValues.length) {
    iterator = 0;
  }
}

function isRgbMode(e) {
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
  let targetElement = e.target;

  if (!(targetElement.className === "columns")) {
    return 0;
  }

  for (let index = 0; index < 6; index++) {
    let position = randomNumberGenerator(hexColorCharacters.length);
    hashForHexColor += hexColorCharacters[position];
  }
  targetElement.style.backgroundColor = hashForHexColor;
}

function randomNumberGenerator(length) {
  let randomNumber = Math.floor(Math.random() * length);
  return randomNumber;
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

function isErase(e) {
  let color = "hsl(360, 100%, 100%)";

  let targetElement = e.target;

  if (!targetElement.className.includes("columns")) {
    return;
  }
  targetElement.style.backgroundColor = color;
}

function isFill(e) {
  let targetElement = e.target;

  if (!targetElement.className.includes("columns")) {
    return;
  }
  targetElement.style.backgroundColor = "black";
}
