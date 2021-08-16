// 二维数组克隆
export function arr2Clone(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = arr[i].slice();
  }
  return newArr;
}

// 获取元素距离页面左侧的距离
export function getDomXY(dom) {
  let left = dom.offsetLeft;
  let top = dom.offsetTop;
  let current = dom.offsetParent;
  while (current !== null) {
    left += current.offsetLeft;
    top += current.offsetTop;
    current = current.offsetParent;
  }
  return { x: left, y: top };
}
