document.addEventListener("DOMContentLoaded", createGrids);

function createGrids(size = 16) {
  if (typeof size !== "Number") {
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

  let trailIndicatorClass;
  let rgbIndicatorClass;

  for (index = 0; index < 1; index++) {
    trailIndicatorClass = trailModeIndicator[index].className;
    rgbIndicatorClass = rgbModeIndicator[index].className;
  }

  console.log(rgbIndicatorClass);
  console.log(trailIndicatorClass);

  if (targetElement.className.includes("trail-mode")) {
  }
}
