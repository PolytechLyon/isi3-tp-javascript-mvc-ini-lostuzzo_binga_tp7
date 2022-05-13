import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  SQUARE,
  RENDER_INTERVAL
} from "./constants.js";
import {drawGame} from "./view.js";

export class Model {
  constructor() {
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
    this.observers = [];
  }

  init(size={width:GAME_SIZE, height: GAME_SIZE}) {
    this.width = size.width;
    this.height = size.height;
    console.log("got new size", size);
    this.state = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      if (currentTime - date > RENDER_INTERVAL) {

        for (let i = 0; i < this.height; i++) {
          for (let j = 0; j < this.width; j++) {
            const nbAlive = this.aliveNeighbours(j, i);
            if (this.state[j][i] === CELL_STATES.ALIVE) {
              if (nbAlive < 2 || nbAlive > 3) {
                this.state[j][i] = CELL_STATES.DEAD;
              }
            } else if (nbAlive === 3) {
              this.state[j][i] = CELL_STATES.ALIVE;
            }
          }
        }

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

  reset(size={width:GAME_SIZE, height: GAME_SIZE}) {
    this.stop();
    this.init(size);
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
  aliveNeighbours(x, y) {
    let number = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        number += this.isCellAlive(x + i, y + j);
      }
    }
    return this.isCellAlive(x, y) ?  number - 1 : number;
  }

  updated() {
    // TODO update the view
    this.observers.forEach(observer => observer(this));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }
}
