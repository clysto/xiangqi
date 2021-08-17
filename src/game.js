import bylaw from './bylaw';
import { INIT_MAP, MANS } from './constants';
import { arr2Clone, indexOfPosition, reverseColor } from './common';

export class Game {
  constructor() {
    this.map = arr2Clone(INIT_MAP);
    this.mans = this.createMans(this.map);
    this.myColor = 'red';
    this.turn = 'red';
    this.select = null;
    this.lastMove = null;
  }

  createMans(map) {
    const mans = {};
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const key = map[y][x];
        if (key) {
          mans[key] = new Man(key, x, y);
        }
      }
    }
    return mans;
  }

  move(newX, newY) {
    if (!this.select) return false;
    const bl = this.select.bylaw(this.map, this.mans);
    if (indexOfPosition(bl, [newX, newY])) {
      const oldLastMove = this.lastMove;
      let oldMan = null;
      this.lastMove = [
        [this.select.x, this.select.y],
        [newX, newY],
      ];

      if (this.map[newY][newX]) {
        oldMan = this.mans[this.map[newY][newX]];
        delete this.mans[this.map[newY][newX]];
      }
      this.map[newY][newX] = this.select.key;
      delete this.map[this.select.y][this.select.x];
      this.select.x = newX;
      this.select.y = newY;

      if (this.isCheckmate(this.turn)) {
        // 不能送将
        this.select.x = this.lastMove[0][0];
        this.select.y = this.lastMove[0][1];

        this.map[this.select.y][this.select.x] = this.select.key;
        delete this.map[newY][newX];

        if (oldMan) {
          this.map[newY][newX] = oldMan.key;
          this.mans[this.map[newY][newX]] = oldMan;
        }

        this.lastMove = oldLastMove;
        alert('不能送将');
        return false;
      }

      this.select = null;
      this.turn = reverseColor(this.turn);
      return { checkmate: this.isCheckmate(this.turn) };
    } else {
      return false;
    }
  }

  // 检查是否将军
  isCheckmate(color) {
    if (color === 'red') {
      const man = this.mans['j0'];
      const bl0 = bylaw.c(man.x, man.y, this.map, this.mans, 'red');
      const bl1 = bylaw.M(man.x, man.y, this.map, this.mans, 'red');
      const bl2 = bylaw.p(man.x, man.y, this.map, this.mans, 'red');
      const bl3 = bylaw.Z(man.x, man.y, this.map, this.mans, 'red');
      const bl4 = bylaw.j(man.x, man.y, this.map, this.mans, 'red');
      for (let [x, y] of bl0) {
        if (this.map[y][x] && this.map[y][x][0] === 'C') {
          return true;
        }
      }
      for (let [x, y] of bl1) {
        if (this.map[y][x] && this.map[y][x][0] === 'M') {
          return true;
        }
      }
      for (let [x, y] of bl2) {
        if (this.map[y][x] && this.map[y][x][0] === 'P') {
          return true;
        }
      }
      for (let [x, y] of bl3) {
        if (this.map[y][x] && this.map[y][x][0] === 'Z') {
          return true;
        }
      }
      for (let [x, y] of bl4) {
        if (this.map[y][x] && this.map[y][x][0] === 'J') {
          return true;
        }
      }
    } else {
      const man = this.mans['J0'];
      const bl0 = bylaw.c(man.x, man.y, this.map, this.mans, 'black');
      const bl1 = bylaw.M(man.x, man.y, this.map, this.mans, 'black');
      const bl2 = bylaw.p(man.x, man.y, this.map, this.mans, 'black');
      const bl3 = bylaw.Z(man.x, man.y, this.map, this.mans, 'black');
      const bl4 = bylaw.j(man.x, man.y, this.map, this.mans, 'black');
      for (let [x, y] of bl0) {
        if (this.map[y][x] && this.map[y][x][0] === 'c') {
          return true;
        }
      }
      for (let [x, y] of bl1) {
        if (this.map[y][x] && this.map[y][x][1] === 'm') {
          return true;
        }
      }
      for (let [x, y] of bl2) {
        if (this.map[y][x] && this.map[y][x][0] === 'p') {
          return true;
        }
      }
      for (let [x, y] of bl3) {
        if (this.map[y][x] && this.map[y][x][0] === 'z') {
          return true;
        }
      }
      for (let [x, y] of bl4) {
        if (this.map[y][x] && this.map[y][x][0] === 'j') {
          return true;
        }
      }
    }
  }
}

export class Man {
  constructor(key, x, y) {
    const { text, img, bl, color } = MANS[key[0]];
    this.text = text;
    this.img = img;
    this.color = color;
    this.bl = bl;
    this.x = x || 0;
    this.y = y || 0;
    this.key = key;
  }

  bylaw(map, mans) {
    return bylaw[this.bl](this.x, this.y, map, mans, this.color);
  }
}
