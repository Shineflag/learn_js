console.log( `${~[]}`)

var color = {r: 186, g: 218, b: 85};

// RGB to HEX
// (1 << 24)的作用为保证结果是6位数
var rgb2hex = function(r, g, b) {
  return '#' + ((r << 16) + (g << 8) + b)
    .toString(16) // 先转成十六进制，然后返回字符串
    // .substr(1);   // 去除字符串的最高位，返回后面六个字符串
}

let str = rgb2hex(color.r, color.g, color.b)
console.log( `${str}`)

console.log( `${-4>>3}`)