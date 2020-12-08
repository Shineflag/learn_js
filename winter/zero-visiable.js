const zero = [
    '\u200b', //零宽度空格符 (zero-width space) U+200B : 用于较长单词的换行分隔
    '\u200c', //零宽度断字符 (zero-width non-joiner) U+200C : 用于阿拉伯文，德文，印度语系等文字中，阻止会发生连字的字符间的连字效果
    '\u200d', //零宽度连字符 (zero-width joiner) U+200D : 用于阿拉伯文与印度语系等文字中，使不会发生连字的字符间产生连字效果
    '\u200e', //零宽度断字符 (zero-width non-joiner) U+200C : 用于阿拉伯文，德文，印度语系等文字中，阻止会发生连字的字符间的连字效果
    '\u200f', //右至左符 (right-to-left mark) U+200F : 用于在混合文字方向的多种语言文本中，规定排版文字书写方向为右至左
    '\ufefe',//零宽度非断空格符 (zero width no-break space) U+FEFF : 用于阻止特定位置的换行分隔
]


function encoder(text) {
  // 为了代码的简洁与易读性，以下代码会忽略性能方面考量

  // Array.from 能让我们正确读取宽度为2的Unicode字符，例：?
  const textArray = Array.from(text);

  // 用codePointAt读取所有字符的十进制Unicode码
  // 用toString将十进制Unicode码转化成二进制（除了二进制，我们也可以使用更大的进制来缩短加密后的信息长度，以此提升效率）
  const binarify = textArray.map(c => c.codePointAt(0).toString(2));

  // 此时binarify中的值是 ["110001", "110010", "110011", "11111011000000000"]，下一步我们需要将"1"，"0"和分隔符映射到响应的零宽度字符上去

  // 我们用零宽度连字符来代表1，零宽度断字符来代表0，零宽度空格符来代表分隔符
  // 下面的''看上去像是空字符串，但其实都是长度为1，包含零宽度字符的字符串
  const encoded = binarify
    .map(c =>
      Array.from(c)
        .map(b => (b === "1" ? "‍" : "‌"))
        .join("")
    )
    .join("​");

  return encoded;
}

function decoder(text) {
  // 接着上面的encoded
  // 用分隔符（零宽度空格符）提取加密文本中的字符
  const split = text.split("​");

  // 将文本转回成二进制数组
  const binary = split.map(c =>
    Array.from(c)
      .map(z => (z === "‍" ? "1" : "0"))
      .join("")
  );

  // 此时binary中的值再次回到开始的 ["110001", "110010", "110011", "11111011000000000"]

  // 最后一部只需要将二进制文本转回十进制，再使用 String.fromCodePoint 就可以得到原文本了
  return binary;
}

var text = "123?";
var et = encoder(text);
console.log("et",et, et.length);
var dt = decoder(et);
console.log("dt", dt);

var str = dt.map((b)=>{
    i = parseInt(b,2)
    return String.fromCodePoint(i)
}).join('')

console.log(str)
console.log("zero","b" + zero.join("#"),zero.length)