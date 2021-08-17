import { getDomXY } from './common';
import { CANVAS_STYLE, MANS } from './constants';
import clickWav from '../assets/click.wav';
import selectWav from '../assets/select.wav';
import killWav from '../assets/kill.wav';
import checkmateWav from '../assets/checkmate.wav';
const images = import.meta.globEager('../assets/*.png');

export class GameCanvas {
  constructor(selector, game) {
    const dom = document.querySelector(selector);
    const canvas = document.createElement('canvas');

    this.clickAudio = document.createElement('audio');
    this.selectAudio = document.createElement('audio');
    this.killAudio = document.createElement('audio');
    this.checkmateAudio = document.createElement('audio');
    this.clickAudio.src = clickWav;
    this.selectAudio.src = selectWav;
    this.killAudio.src = killWav;
    this.checkmateAudio.src = checkmateWav;

    canvas.width = CANVAS_STYLE.width;
    canvas.height = CANVAS_STYLE.height;
    dom.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resources = {};
    this.game = game;
    this.canvas.onclick = (e) => this.handleClickCanvas(e);
    this.loadAllImages().then(() => {
      this.update();
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
    this.resources.boxImg = await this.loadImage(
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

  showBox(x, y, newX, newY) {
    this.ctx.drawImage(
      this.resources.boxImg,
      CANVAS_STYLE.spaceX * x + CANVAS_STYLE.pointStartX,
      CANVAS_STYLE.spaceY * y + CANVAS_STYLE.pointStartY
    );
    this.ctx.drawImage(
      this.resources.boxImg,
      CANVAS_STYLE.spaceX * newX + CANVAS_STYLE.pointStartX,
      CANVAS_STYLE.spaceY * newY + CANVAS_STYLE.pointStartY
    );
  }

  handleClickCanvas(e) {
    const key = this.getClickMan(e);
    const point = this.getClickPoint(e);
    if (key) {
      // 点击棋子
      const man = this.game.mans[key];
      if (this.game.select && man.color !== this.game.turn) {
        // 吃子
        const result = this.game.move(man.x, man.y);
        if (result) {
          this.update();
          this.clickAudio.play();
          if (result.checkmate) {
            this.checkmateAudio.play();
          } else {
            this.killAudio.play();
          }
        }
      } else if (this.game.turn == man.color) {
        // 选子
        this.game.select = man;
        this.update();
        this.selectAudio.play();
      }
    } else {
      // 点击空白
      if (this.game.select) {
        const { x, y } = point;
        const result = this.game.move(x, y);
        if (result) {
          this.update();
          this.clickAudio.play();
          if (result.checkmate) {
            this.checkmateAudio.play();
          }
        }
      }
    }
  }

  // 获取点击的棋子
  getClickMan(e) {
    const clickXY = this.getClickPoint(e);
    const x = clickXY.x;
    const y = clickXY.y;
    if (x < 0 || x > 8 || y < 0 || y > 9) return false;
    return this.game.map[y][x] && this.game.map[y][x] != '0'
      ? this.game.map[y][x]
      : false;
  }

  // 获取点击的点位
  getClickPoint(e) {
    const domXY = getDomXY(this.canvas);
    const x = Math.round(
      (e.pageX - domXY.x - CANVAS_STYLE.pointStartX - 20) / CANVAS_STYLE.spaceX
    );
    const y = Math.round(
      (e.pageY - domXY.y - CANVAS_STYLE.pointStartY - 20) / CANVAS_STYLE.spaceY
    );
    return { x, y };
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
    for (let y = 0; y < this.game.map.length; y++) {
      for (let x = 0; x < this.game.map[y].length; x++) {
        const key = this.game.map[y][x];
        if (key) {
          if (this.game.select === this.game.mans[key]) {
            this.showMan(this.game.mans[key], true);
          } else {
            this.showMan(this.game.mans[key]);
          }
        }
      }
    }
    // 渲染方框
    if (this.game.lastMove) {
      this.showBox(
        this.game.lastMove[0][0],
        this.game.lastMove[0][1],
        this.game.lastMove[1][0],
        this.game.lastMove[1][1]
      );
    }
  }
}
