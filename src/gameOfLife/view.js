import { GAME_SIZE, CELL_SIZE } from "./constants.js";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const drawCell = (x, y, value) => {
  context.fillStyle = value;
  context.fillRect(x + CELL_SIZE * x, y + CELL_SIZE * y, CELL_SIZE, CELL_SIZE);
};

export const initView = (size={width: GAME_SIZE, height: GAME_SIZE}) => {
  console.log("initView with size", size);
  document.getElementById("game").appendChild(canvas);
  canvas.setAttribute("height", size.height * CELL_SIZE + size.height - 1);
  canvas.setAttribute("width", size.width * CELL_SIZE + size.width - 1);
  canvas.setAttribute("id", "canvas");
  canvas.addEventListener("click", console.log); 
};

export const drawGame = model => {
  model.state.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      //console.log("drawing cell", {rowIndex, columnIndex, value});
      drawCell(rowIndex, columnIndex, value);
    });
  });
};

export const changeSize = model => {
  if (model.width !== GAME_SIZE || model.height !== GAME_SIZE) {
    console.log("changing size with new size", model.width, model.height);
    initView({width: model.width, height: model.height});
  }
}


