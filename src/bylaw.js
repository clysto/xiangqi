// 车
function c(x, y, map, mans, color) {
  const d = [];
  // 左侧检索
  for (let i = x - 1; i >= 0; i--) {
    if (map[y][i]) {
      if (mans[map[y][i]].color != color) d.push([i, y]);
      break;
    } else {
      d.push([i, y]);
    }
  }
  // 右侧检索
  for (let i = x + 1; i <= 8; i++) {
    if (map[y][i]) {
      if (mans[map[y][i]].color != color) d.push([i, y]);
      break;
    } else {
      d.push([i, y]);
    }
  }
  // 上检索
  for (let i = y - 1; i >= 0; i--) {
    if (map[i][x]) {
      if (mans[map[i][x]].color != color) d.push([x, i]);
      break;
    } else {
      d.push([x, i]);
    }
  }
  // 下检索
  for (let i = y + 1; i <= 9; i++) {
    if (map[i][x]) {
      if (mans[map[i][x]].color != color) d.push([x, i]);
      break;
    } else {
      d.push([x, i]);
    }
  }
  return d;
}

// 马
function m(x, y, map, mans, color) {
  const d = [];
  // 1点
  if (
    y - 2 >= 0 &&
    x + 1 <= 8 &&
    !map[y - 1][x] &&
    (!mans[map[y - 2][x + 1]] || mans[map[y - 2][x + 1]].color != color)
  )
    d.push([x + 1, y - 2]);
  // 2点
  if (
    y - 1 >= 0 &&
    x + 2 <= 8 &&
    !map[y][x + 1] &&
    (!mans[map[y - 1][x + 2]] || mans[map[y - 1][x + 2]].color != color)
  )
    d.push([x + 2, y - 1]);
  // 4点
  if (
    y + 1 <= 9 &&
    x + 2 <= 8 &&
    !map[y][x + 1] &&
    (!mans[map[y + 1][x + 2]] || mans[map[y + 1][x + 2]].color != color)
  )
    d.push([x + 2, y + 1]);
  // 5点
  if (
    y + 2 <= 9 &&
    x + 1 <= 8 &&
    !map[y + 1][x] &&
    (!mans[map[y + 2][x + 1]] || mans[map[y + 2][x + 1]].color != color)
  )
    d.push([x + 1, y + 2]);
  // 7点
  if (
    y + 2 <= 9 &&
    x - 1 >= 0 &&
    !map[y + 1][x] &&
    (!mans[map[y + 2][x - 1]] || mans[map[y + 2][x - 1]].color != color)
  )
    d.push([x - 1, y + 2]);
  // 8点
  if (
    y + 1 <= 9 &&
    x - 2 >= 0 &&
    !map[y][x - 1] &&
    (!mans[map[y + 1][x - 2]] || mans[map[y + 1][x - 2]].color != color)
  )
    d.push([x - 2, y + 1]);
  // 10点
  if (
    y - 1 >= 0 &&
    x - 2 >= 0 &&
    !map[y][x - 1] &&
    (!mans[map[y - 1][x - 2]] || mans[map[y - 1][x - 2]].color != color)
  )
    d.push([x - 2, y - 1]);
  // 11点
  if (
    y - 2 >= 0 &&
    x - 1 >= 0 &&
    !map[y - 1][x] &&
    (!mans[map[y - 2][x - 1]] || mans[map[y - 2][x - 1]].color != color)
  )
    d.push([x - 1, y - 2]);

  return d;
}

// 马腿相反的马
function M(x, y, map, mans, color) {
  const d = [];
  // 1点
  if (
    y - 2 >= 0 &&
    x + 1 <= 8 &&
    !map[y - 1][x + 1] &&
    (!mans[map[y - 2][x + 1]] || mans[map[y - 2][x + 1]].color != color)
  )
    d.push([x + 1, y - 2]);
  // 2点
  if (
    y - 1 >= 0 &&
    x + 2 <= 8 &&
    !map[y - 1][x + 1] &&
    (!mans[map[y - 1][x + 2]] || mans[map[y - 1][x + 2]].color != color)
  )
    d.push([x + 2, y - 1]);
  // 4点
  if (
    y + 1 <= 9 &&
    x + 2 <= 8 &&
    !map[y + 1][x + 1] &&
    (!mans[map[y + 1][x + 2]] || mans[map[y + 1][x + 2]].color != color)
  )
    d.push([x + 2, y + 1]);
  // 5点
  if (
    y + 2 <= 9 &&
    x + 1 <= 8 &&
    !map[y + 1][x + 1] &&
    (!mans[map[y + 2][x + 1]] || mans[map[y + 2][x + 1]].color != color)
  )
    d.push([x + 1, y + 2]);
  // 7点
  if (
    y + 2 <= 9 &&
    x - 1 >= 0 &&
    !map[y + 1][x - 1] &&
    (!mans[map[y + 2][x - 1]] || mans[map[y + 2][x - 1]].color != color)
  )
    d.push([x - 1, y + 2]);
  // 8点
  if (
    y + 1 <= 9 &&
    x - 2 >= 0 &&
    !map[y + 1][x - 1] &&
    (!mans[map[y + 1][x - 2]] || mans[map[y + 1][x - 2]].color != color)
  )
    d.push([x - 2, y + 1]);
  // 10点
  if (
    y - 1 >= 0 &&
    x - 2 >= 0 &&
    !map[y - 1][x - 1] &&
    (!mans[map[y - 1][x - 2]] || mans[map[y - 1][x - 2]].color != color)
  )
    d.push([x - 2, y - 1]);
  // 11点
  if (
    y - 2 >= 0 &&
    x - 1 >= 0 &&
    !map[y - 1][x - 1] &&
    (!mans[map[y - 2][x - 1]] || mans[map[y - 2][x - 1]].color != color)
  )
    d.push([x - 1, y - 2]);

  return d;
}

// 相
function x(x, y, map, mans, color) {
  const d = [];
  if (color === 'red') {
    //红方
    //4点半
    if (
      y + 2 <= 9 &&
      x + 2 <= 8 &&
      !map[y + 1][x + 1] &&
      (!mans[map[y + 2][x + 2]] || mans[map[y + 2][x + 2]].color != color)
    )
      d.push([x + 2, y + 2]);
    //7点半
    if (
      y + 2 <= 9 &&
      x - 2 >= 0 &&
      !map[y + 1][x - 1] &&
      (!mans[map[y + 2][x - 2]] || mans[map[y + 2][x - 2]].color != color)
    )
      d.push([x - 2, y + 2]);
    //1点半
    if (
      y - 2 >= 5 &&
      x + 2 <= 8 &&
      !map[y - 1][x + 1] &&
      (!mans[map[y - 2][x + 2]] || mans[map[y - 2][x + 2]].color != color)
    )
      d.push([x + 2, y - 2]);
    //10点半
    if (
      y - 2 >= 5 &&
      x - 2 >= 0 &&
      !map[y - 1][x - 1] &&
      (!mans[map[y - 2][x - 2]] || mans[map[y - 2][x - 2]].color != color)
    )
      d.push([x - 2, y - 2]);
  } else {
    //4点半
    if (
      y + 2 <= 4 &&
      x + 2 <= 8 &&
      !map[y + 1][x + 1] &&
      (!mans[map[y + 2][x + 2]] || mans[map[y + 2][x + 2]].color != color)
    )
      d.push([x + 2, y + 2]);
    //7点半
    if (
      y + 2 <= 4 &&
      x - 2 >= 0 &&
      !map[y + 1][x - 1] &&
      (!mans[map[y + 2][x - 2]] || mans[map[y + 2][x - 2]].color != color)
    )
      d.push([x - 2, y + 2]);
    //1点半
    if (
      y - 2 >= 0 &&
      x + 2 <= 8 &&
      !map[y - 1][x + 1] &&
      (!mans[map[y - 2][x + 2]] || mans[map[y - 2][x + 2]].color != color)
    )
      d.push([x + 2, y - 2]);
    //10点半
    if (
      y - 2 >= 0 &&
      x - 2 >= 0 &&
      !map[y - 1][x - 1] &&
      (!mans[map[y - 2][x - 2]] || mans[map[y - 2][x - 2]].color != color)
    )
      d.push([x - 2, y - 2]);
  }
  return d;
}

// 士
function s(x, y, map, mans, color) {
  var d = [];
  if (color === 'red') {
    //红方
    //4点半
    if (
      y + 1 <= 9 &&
      x + 1 <= 5 &&
      (!mans[map[y + 1][x + 1]] || mans[map[y + 1][x + 1]].color != color)
    )
      d.push([x + 1, y + 1]);
    //7点半
    if (
      y + 1 <= 9 &&
      x - 1 >= 3 &&
      (!mans[map[y + 1][x - 1]] || mans[map[y + 1][x - 1]].color != color)
    )
      d.push([x - 1, y + 1]);
    //1点半
    if (
      y - 1 >= 7 &&
      x + 1 <= 5 &&
      (!mans[map[y - 1][x + 1]] || mans[map[y - 1][x + 1]].color != color)
    )
      d.push([x + 1, y - 1]);
    //10点半
    if (
      y - 1 >= 7 &&
      x - 1 >= 3 &&
      (!mans[map[y - 1][x - 1]] || mans[map[y - 1][x - 1]].color != color)
    )
      d.push([x - 1, y - 1]);
  } else {
    //4点半
    if (
      y + 1 <= 2 &&
      x + 1 <= 5 &&
      (!mans[map[y + 1][x + 1]] || mans[map[y + 1][x + 1]].color != color)
    )
      d.push([x + 1, y + 1]);
    //7点半
    if (
      y + 1 <= 2 &&
      x - 1 >= 3 &&
      (!mans[map[y + 1][x - 1]] || mans[map[y + 1][x - 1]].color != color)
    )
      d.push([x - 1, y + 1]);
    //1点半
    if (
      y - 1 >= 0 &&
      x + 1 <= 5 &&
      (!mans[map[y - 1][x + 1]] || mans[map[y - 1][x + 1]].color != color)
    )
      d.push([x + 1, y - 1]);
    //10点半
    if (
      y - 1 >= 0 &&
      x - 1 >= 3 &&
      (!mans[map[y - 1][x - 1]] || mans[map[y - 1][x - 1]].color != color)
    )
      d.push([x - 1, y - 1]);
  }
  return d;
}

// 将
function j(x, y, map, mans, color) {
  var d = [];
  var isNull = (function (y1, y2) {
    var y1 = mans['j0'].y;
    var x1 = mans['J0'].x;
    var y2 = mans['J0'].y;
    for (var i = y1 - 1; i > y2; i--) {
      if (map[i][x1]) return false;
    }
    return true;
  })();

  if (color === 'red') {
    // 红方
    // 下
    if (
      y + 1 <= 9 &&
      (!mans[map[y + 1][x]] || mans[map[y + 1][x]].color != color)
    )
      d.push([x, y + 1]);
    // 上
    if (
      y - 1 >= 7 &&
      (!mans[map[y - 1][x]] || mans[map[y - 1][x]].color != color)
    )
      d.push([x, y - 1]);
    // 老将对老将的情况
    if (mans['j0'].x == mans['J0'].x && isNull)
      d.push([mans['J0'].x, mans['J0'].y]);
  } else {
    //下
    if (
      y + 1 <= 2 &&
      (!mans[map[y + 1][x]] || mans[map[y + 1][x]].color != color)
    )
      d.push([x, y + 1]);
    //上
    if (
      y - 1 >= 0 &&
      (!mans[map[y - 1][x]] || mans[map[y - 1][x]].color != color)
    )
      d.push([x, y - 1]);
    // 老将对老将的情况
    if (mans['j0'].x == mans['J0'].x && isNull)
      d.push([mans['j0'].x, mans['j0'].y]);
  }
  //右
  if (
    x + 1 <= 5 &&
    (!mans[map[y][x + 1]] || mans[map[y][x + 1]].color != color)
  )
    d.push([x + 1, y]);
  //左
  if (
    x - 1 >= 3 &&
    (!mans[map[y][x - 1]] || mans[map[y][x - 1]].color != color)
  )
    d.push([x - 1, y]);
  return d;
}

// 炮
function p(x, y, map, mans, color) {
  const d = [];
  //左侧检索
  var n = 0;
  for (var i = x - 1; i >= 0; i--) {
    if (map[y][i]) {
      if (n == 0) {
        n++;
        continue;
      } else {
        if (mans[map[y][i]].color != color) d.push([i, y]);
        break;
      }
    } else {
      if (n == 0) d.push([i, y]);
    }
  }
  //右侧检索
  var n = 0;
  for (var i = x + 1; i <= 8; i++) {
    if (map[y][i]) {
      if (n == 0) {
        n++;
        continue;
      } else {
        if (mans[map[y][i]].color != color) d.push([i, y]);
        break;
      }
    } else {
      if (n == 0) d.push([i, y]);
    }
  }
  //上检索
  var n = 0;
  for (var i = y - 1; i >= 0; i--) {
    if (map[i][x]) {
      if (n == 0) {
        n++;
        continue;
      } else {
        if (mans[map[i][x]].color != color) d.push([x, i]);
        break;
      }
    } else {
      if (n == 0) d.push([x, i]);
    }
  }
  //下检索
  var n = 0;
  for (var i = y + 1; i <= 9; i++) {
    if (map[i][x]) {
      if (n == 0) {
        n++;
        continue;
      } else {
        if (mans[map[i][x]].color != color) d.push([x, i]);
        break;
      }
    } else {
      if (n == 0) d.push([x, i]);
    }
  }
  return d;
}

// 卒
function z(x, y, map, mans, color) {
  var d = [];
  if (color === 'red') {
    //红方
    //上
    if (
      y - 1 >= 0 &&
      (!mans[map[y - 1][x]] || mans[map[y - 1][x]].color != color)
    )
      d.push([x, y - 1]);
    //右
    if (
      x + 1 <= 8 &&
      y <= 4 &&
      (!mans[map[y][x + 1]] || mans[map[y][x + 1]].color != color)
    )
      d.push([x + 1, y]);
    //左
    if (
      x - 1 >= 0 &&
      y <= 4 &&
      (!mans[map[y][x - 1]] || mans[map[y][x - 1]].color != color)
    )
      d.push([x - 1, y]);
  } else {
    //下
    if (
      y + 1 <= 9 &&
      (!mans[map[y + 1][x]] || mans[map[y + 1][x]].color != color)
    )
      d.push([x, y + 1]);
    //右
    if (
      x + 1 <= 8 &&
      y >= 6 &&
      (!mans[map[y][x + 1]] || mans[map[y][x + 1]].color != color)
    )
      d.push([x + 1, y]);
    //左
    if (
      x - 1 >= 0 &&
      y >= 6 &&
      (!mans[map[y][x - 1]] || mans[map[y][x - 1]].color != color)
    )
      d.push([x - 1, y]);
  }

  return d;
}

// 相反卒
function Z(x, y, map, mans, color) {
  var d = [];
  if (color === 'black') {
    //红方
    //上
    if (
      y - 1 >= 0 &&
      (!mans[map[y - 1][x]] || mans[map[y - 1][x]].color != color)
    )
      d.push([x, y - 1]);
    //右
    if (
      x + 1 <= 8 &&
      y <= 4 &&
      (!mans[map[y][x + 1]] || mans[map[y][x + 1]].color != color)
    )
      d.push([x + 1, y]);
    //左
    if (
      x - 1 >= 0 &&
      y <= 4 &&
      (!mans[map[y][x - 1]] || mans[map[y][x - 1]].color != color)
    )
      d.push([x - 1, y]);
  } else {
    //下
    if (
      y + 1 <= 9 &&
      (!mans[map[y + 1][x]] || mans[map[y + 1][x]].color != color)
    )
      d.push([x, y + 1]);
    //右
    if (
      x + 1 <= 8 &&
      y >= 6 &&
      (!mans[map[y][x + 1]] || mans[map[y][x + 1]].color != color)
    )
      d.push([x + 1, y]);
    //左
    if (
      x - 1 >= 0 &&
      y >= 6 &&
      (!mans[map[y][x - 1]] || mans[map[y][x - 1]].color != color)
    )
      d.push([x - 1, y]);
  }

  return d;
}

const bylaw = {
  c,
  m,
  p,
  s,
  x,
  j,
  z,
  M,
  Z,
};

export default bylaw;
