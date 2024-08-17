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
