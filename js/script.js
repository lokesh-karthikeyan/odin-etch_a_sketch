let selectedColor = "#000000";
let iterator = 0;

/**************************************************************************************************
 * Event Listener's objective: Calls a helper function to set default actions when page loads.    *
 **************************************************************************************************/

document.addEventListener("DOMContentLoaded", isDOMLoaded);

/*********************************************************************************
 * Function objective: Calls f() to create grids & enable "Trail" mode.          *
 *********************************************************************************/

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

/*****************************************************************************
 * Function objective: It takes size from the parameter & create grids.      *
 *****************************************************************************/

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

/********************************************************************************************
 * Event Listener's objective: Used Event delegation (click) to target the contents         *
 * inside the container.                                                                    *
 ********************************************************************************************/

let topOuterContainer = document.querySelector(".outer-container-top");

topOuterContainer.addEventListener("click", getClickedTarget);

/************************************************************************************
 * Function objective: Capture the target and sends as a parameter                  *
 * to another f(). It also calls another f() to check "Radio" button's status.      *
 ************************************************************************************/

function getClickedTarget(e) {
  let clickedElement = e.target;

  if (
    clickedElement.className.includes("trail-mode") ||
    clickedElement.className.includes("rgb-mode")
  ) {
    if (clickedElement.className.includes("trail-mode")) {
      compareModeStatus(clickedElement);
    }

    if (clickedElement.className.includes("rgb-mode")) {
      compareModeStatus(clickedElement);
    }
    checkRadioSelection();
  }
}

/*******************************************************************************
 * Function objective: It checks the radio button's status when the "Trail"    *
 * (or) "RGB" mode is selected. To toggle it from "Erase" to "Fill" mode.      *
 *******************************************************************************/

function checkRadioSelection() {
  let radioOption = document.querySelector("input[type = 'radio']:checked");
  let enabledMode = [...document.querySelectorAll(".mode-on")];

  if (enabledMode.length > 0) {
    if (radioOption.className === "erase") {
      let fillOption = document.querySelector(".fill");
      fillOption.checked = true;
    }
  }
}

/**************************************************************************
 * Function objective: Compares the selected mode with the other mode.    *
 * It toggles back the other mode if it's active.                         *
 **************************************************************************/

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

/********************************************************************
 * Function objective: Changes the color and scales down & revert   *
 * back to the previous size to indicate it was enabled.            *
 ********************************************************************/

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

/********************************************************************
 * Function objective: Changes the color and scales down & revert   *
 * back to the previous size to indicate it was disabled.           *
 ********************************************************************/

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

/***********************************************************************************
 * Event Listener's objective: It's a "mouseover" event, where it triggers         *
 * an event even for the child elements inside the target container.               *
 ***********************************************************************************/

let gridContainer = document.querySelector(".container-box");

gridContainer.addEventListener("mouseover", drawContent);

/*********************************************************************************
 * Function objective: Look for the mode's status & "radio" button options       *
 * and fill the color with the appropriate colors and effects.                   *
 *********************************************************************************/

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

/**********************************************************************
 * Function objective: Enables the trail mode for the parameter.      *
 **********************************************************************/

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

/********************************************************************
 * Function objective: Enables the RGB mode for the parameter.      *
 ********************************************************************/

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

/********************************************************************************
 * Function objective: Helper f() to generate random numbers for RGB mode.      *
 ********************************************************************************/

function randomNumberGenerator(length) {
  let randomNumber = Math.floor(Math.random() * length);
  return randomNumber;
}

/***********************************************************************************
 * Event Listener's objective: A "click" event on the button's container           *
 * to get the input from the user.                                                 *
 ***********************************************************************************/

let resizeGrid = document.querySelector(".container-button-left");

resizeGrid.addEventListener("click", getGridSize);

/*******************************************************************************
 * Function objective: It prompts the user to enter input via prompt box       *
 * and passes the input to create grid sizes. It removes existing grids.       *
 *******************************************************************************/

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

/*****************************************************************************
 * Function objective: Helper f() to get the valid input from the user.      *
 * If it's invalid it recursively calls this f() to get valid input.         *
 *****************************************************************************/

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

/*****************************************************************************************
 * Event Listener's objective: Look out for any change happens in the input elements     *
 * with the name "draw". It's a "change" event triggers on change.                       *
 *****************************************************************************************/

let inputOptions = [...document.getElementsByName("draw")];

for (let input of inputOptions) {
  input.addEventListener("change", selectRadioOption);
}

/**************************************************************************************
 * Function objective: Helper f() to call other f() based on the "radio" button       *
 * choice selected from the UI.                                                       *
 **************************************************************************************/

function selectRadioOption(e) {
  let targetElemClass = e.target.className;

  if (targetElemClass === "erase") {
    let enabledMode = [...document.getElementsByClassName("mode-on")];

    if (enabledMode.length > 0) {
      unsetMode(enabledMode);
    }
  }

  if (targetElemClass === "reset") {
    isReset();
  }
}

/*********************************************************************************
 * Function objective: Sets the color to white which acts as an Erase mode.      *
 *********************************************************************************/

function isErase(element) {
  element.style.backgroundColor = "hsl(360, 100%, 100%)";
}

/************************************************************************
 * Function objective: Sets the color from the global color value.      *
 ************************************************************************/

function isFill(element) {
  element.style.backgroundColor = selectedColor;
}

/*****************************************************************************
 * Function objective: Removes all existing colors filled in the grids       *
 * and toggles back to the "Fill" option.                                    *
 *****************************************************************************/

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

/*****************************************************************************
 * Event Listener's objective: Look out for any changes happening in the     *
 * "Color" type of input tag. It's a "change" event triggers on change.      *
 *****************************************************************************/

let colorPicker = document.querySelector("input[type = 'color']");

colorPicker.addEventListener("change", isChooseColor);

/********************************************************************
 * Function objective: Gets the color value from the input and      *
 * changes the color of the "Color Picker" icon and also assigns    *
 * the new color value to the global color value.                   *
 ********************************************************************/

function isChooseColor(e) {
  let targetElement = e.target;

  selectedColor = targetElement.value;

  let colorPalette = document.querySelector(".color-picker-icon");

  colorPalette.style.backgroundColor = selectedColor;
}

/********************************************************************************
 * Event Listener's objective: It's to generate an hover like effect on the     *
 * element. It triggers on "mouseenter" to the element and reverts when it      *
 * "mouseleaves" the target.                                                    *
 ********************************************************************************/

let sliderContainer = document.querySelector(".container-button-slider");

sliderContainer.addEventListener("mouseenter", setHoverEffect);
sliderContainer.addEventListener("mouseleave", unsetHoverEffect);

/*********************************************************************************
 * Function objective: Sets hover effect for the border to change its color.     *
 *********************************************************************************/

function setHoverEffect() {
  let slider = document.querySelector(".slider");

  slider.style.boxShadow = "0 0 0 15px #82ff62";
}

/*********************************************************************************
 * Function objective: Unsets hover effect for the border to change its color.   *
 *********************************************************************************/

function unsetHoverEffect() {
  let slider = document.querySelector(".slider");

  slider.style = "";
}
