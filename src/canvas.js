import { getDomXY } from './common';
import { Game } from './game';
import { CANVAS_STYLE, MANS } from './constants';
const images = import.meta.globEager('../assets/*.png');

export class GameCanvas {
  constructor(selector, game) {
    const dom = document.querySelector(selector);
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_STYLE.width;
    canvas.height = CANVAS_STYLE.height;
    dom.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resources = {};
    this.game = game;
    this.canvas.onclick = (e) => this.handleClickCanvas(e);
    this.loadAllImages().then(() => {
      this.ctx.drawImage(this.resources.bgImg, 0, 0);
      // 渲染所棋子
      for (let key in this.game.mans) {
        this.showMan(this.game.mans[key]);
      }
    });
  }

  // 加载所有图片资源
  async loadAllImages() {
    this.resources.bgImg = await this.loadImage(
      images['../assets/bg.png'].default
    );
    this.resources.dotImg = await this.loadImage(
      images['../assets/dot.png'].default
    );
    this.resources.paneImg = await this.loadImage(
      images['../assets/r_box.png'].default
    );
    for (let key in MANS) {
      this.resources[key] = await this.loadImage(
        images['../assets/' + MANS[key].img + '.png'].default
      );
    }
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  showMan(man, alpha) {
    alpha = alpha || false;
    this.ctx.save();
    if (alpha) {
      this.ctx.globalAlpha = 0.8;
    }
    this.ctx.drawImage(
      this.resources[man.key[0]],
      CANVAS_STYLE.spaceX * man.x + CANVAS_STYLE.pointStartX,
      CANVAS_STYLE.spaceY * man.y + CANVAS_STYLE.pointStartY
    );
    this.ctx.globalAlpha = 1;
    this.ctx.restore();
  }

  handleClickCanvas(e) {
    const key = this.getClickMan(e);
    if (key) {
      const man = this.game.mans[key];
      if (this.game.myColor == man.color) {
        this.game.select = man;
        this.update();
      }
    }
  }

  getClickMan(e) {
    const clickXY = this.getClickPoint(e);
    const x = clickXY.x;
    const y = clickXY.y;
    if (x < 0 || x > 8 || y < 0 || y > 9) return false;
    return this.game.map[y][x] && this.game.map[y][x] != '0'
      ? this.game.map[y][x]
      : false;
  }

  getClickPoint(e) {
    const domXY = getDomXY(this.canvas);
    const x = Math.round(
      (e.pageX - domXY.x - CANVAS_STYLE.pointStartX - 20) / CANVAS_STYLE.spaceX
    );
    const y = Math.round(
      (e.pageY - domXY.y - CANVAS_STYLE.pointStartY - 20) / CANVAS_STYLE.spaceY
    );
    return { x: x, y: y };
  }

  update() {
    this.ctx.clearRect(0, 0, CANVAS_STYLE.width, CANVAS_STYLE.height);
    // 渲染背景
    this.ctx.drawImage(this.resources.bgImg, 0, 0);
    // 渲染着法
    if (this.game.select) {
      const dots = this.game.select.bylaw(this.game.map, this.game.mans);
      for (let i = 0; i < dots.length; i++) {
        this.ctx.drawImage(
          this.resources.dotImg,
          CANVAS_STYLE.spaceX * dots[i][0] + 10 + CANVAS_STYLE.pointStartX,
          CANVAS_STYLE.spaceY * dots[i][1] + 10 + CANVAS_STYLE.pointStartY
        );
      }
    }
    // 渲染棋子
    for (let key in this.game.mans) {
      if (this.game.select === this.game.mans[key]) {
        this.showMan(this.game.mans[key], true);
      } else {
        this.showMan(this.game.mans[key]);
      }
    }
  }
}
