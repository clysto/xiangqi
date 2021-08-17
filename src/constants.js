export const INIT_MAP = [
  ['C0', 'M0', 'X0', 'S0', 'J0', 'S1', 'X1', 'M1', 'C1'],
  [, , , , , , , ,],
  [, 'P0', , , , , , 'P1'],
  ['Z0', , 'Z1', , 'Z2', , 'Z3', , 'Z4'],
  [, , , , , , , ,],
  [, , , , , , , ,],
  ['z0', , 'z1', , 'z2', , 'z3', , 'z4'],
  [, 'p0', , , , , , 'p1'],
  [, , , , , , , ,],
  ['c0', 'm0', 'x0', 's0', 'j0', 's1', 'x1', 'm1', 'c1'],
];

export const MANS = {
  // 红子
  c: { text: '车', img: 'r_c', bl: 'c', color: 'red' },
  m: { text: '马', img: 'r_m', bl: 'm', color: 'red' },
  x: { text: '相', img: 'r_x', bl: 'x', color: 'red' },
  s: { text: '仕', img: 'r_s', bl: 's', color: 'red' },
  j: { text: '将', img: 'r_j', bl: 'j', color: 'red' },
  p: { text: '炮', img: 'r_p', bl: 'p', color: 'red' },
  z: { text: '兵', img: 'r_z', bl: 'z', color: 'red' },

  // 黑子
  C: { text: '俥', img: 'b_c', bl: 'c', color: 'black' },
  M: { text: '馬', img: 'b_m', bl: 'm', color: 'black' },
  X: { text: '象', img: 'b_x', bl: 'x', color: 'black' },
  S: { text: '士', img: 'b_s', bl: 's', color: 'black' },
  J: { text: '帅', img: 'b_j', bl: 'j', color: 'black' },
  P: { text: '炮', img: 'b_p', bl: 'p', color: 'black' },
  Z: { text: '卒', img: 'b_z', bl: 'z', color: 'black' },
};

export const CANVAS_STYLE = {
  width: 523, //画布宽度
  height: 580, //画布高度
  spaceX: 57, //着点X跨度
  spaceY: 57, //着点Y跨度
  pointStartX: 3, //第一个着点X坐标;
  pointStartY: 5, //第一个着点Y坐标;
};
