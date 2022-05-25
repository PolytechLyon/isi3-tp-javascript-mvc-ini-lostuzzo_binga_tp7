import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  SQUARE,
  RENDER_INTERVAL
} from "./constants.js";
import {drawGame, changeSize} from "./view.js";

export class Model {
  constructor() {
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
    this.observers = [];
  }

  init(width=GAME_SIZE, height=GAME_SIZE) {
    this.width = width;
    this.height = height;
    console.log("got new size", {width, height, classWidth: this.width, classHeight: this.height});
    this.state = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();
    console.log({state: this.state});
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      if (currentTime - date > RENDER_INTERVAL) {
        const newMap = Array.from(new Array(this.height), () =>
          Array.from(new Array(this.width), () => CELL_STATES.NONE)
        );
        for (let i = 0; i < this.height; i++) {
          for (let j = 0; j < this.width; j++) {
            const nbAlive = this.aliveNeighbours(j, i);
            if (this.state[j][i] === CELL_STATES.ALIVE) {
              newMap[j][i] = CELL_STATES.ALIVE;
              if (nbAlive < 2 || nbAlive > 3) {
                newMap[j][i] = CELL_STATES.DEAD;
              }
            } else if (nbAlive === 3) {
              newMap[j][i] = CELL_STATES.ALIVE;
            }
          }
        }
        this.state = newMap;
        this.updated();
        this.run(currentTime);
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    console.log("trying to stop");
    cancelAnimationFrame(this.raf);
    this.raf = null;
    this.updated();
  }

  reset(width, height) {
    this.stop();
    this.init(width, height);
    this.updated()
  }

  isCellAlive(x, y) {
    return x >= 0 &&
      y >= 0 &&
      y < this.height &&
      x < this.width &&
      this.state[y][x] === CELL_STATES.ALIVE
      ? 1
      : 0;
  }
  aliveNeighbours(y, x) {
    let number = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        console.log({x, y, i, j, isCellAlive: this.isCellAlive(x + j, y + i)});
        number += this.isCellAlive(x + i, y + j);
      }
    }
    return number
  }

  updated() {
    // TODO update the view
    this.observers.forEach(observer => observer(this));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }
}
