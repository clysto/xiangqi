import bylaw from './bylaw';
import { INIT_MAP, MANS } from './constants';
import { arr2Clone } from './common';

export class Game {
  constructor() {
    this.map = arr2Clone(INIT_MAP);
    this.mans = this.createMans(this.map);
    this.myColor = 'red';
    this.select = null;
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
}

export class Man {
  constructor(key, x, y) {
    const { text, img, bl, color } = MANS[key.slice(0, 1)];
    this.text = text;
    this.img = img;
    this.color = color;
    this.bl = bl;
    this.x = x || 0;
    this.y = y || 0;
    this.key = key;
    this.isShow = true;
    this.alpha = 1;
    this.ps = [];
  }

  bylaw(map, mans) {
    return bylaw[this.bl](this.x, this.y, map, mans, this.color);
  }
}
