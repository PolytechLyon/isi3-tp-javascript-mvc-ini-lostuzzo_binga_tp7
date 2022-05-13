import { CELL_SIZE, CELL_STATES
 } from "./constants.js";
export const controller = model => {
  document.getElementById("reset").addEventListener("click", () => {
    model.reset();
  }
  );
  document.getElementById("stop").addEventListener("click", () => {
    model.stop();
  }
  );
  document.getElementById("start").addEventListener("click", () => {
    model.run();
  }
  );
  document.getElementById("size-submit").addEventListener("click", () => {
    const width = parseInt(document.getElementById("width").value);
    const height = parseInt(document.getElementById("height").value);
    model.reset({ width, height });
  }
  );

  document.getElementById("canvas").addEventListener("click", event => {
    const y = Math.floor(event.offsetX / CELL_SIZE);
    const x = Math.floor(event.offsetY / CELL_SIZE);
    model.state[y][x] = model.state[y][x] === CELL_STATES.ALIVE ? CELL_STATES.NONE : CELL_STATES.ALIVE;
    model.updated();
  }
  );
};


