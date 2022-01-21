
//匹配标签名称：<div>hello,world</div>

let rdiv = /<([^>]+)>/i
console.log(rdiv.exec("<div>hello,world</div>"))

//贪婪与懒惰
let str= "I want you to (match the content) between the bracket)"

let r1 = /((.*))/
console.log(r1.exec(str))


let r2 = /((.*?))/
console.log(r2.exec(str))

let r3 = /(([^(]*))/
console.log(r3.exec(str))

//零宽断言
let a = '1234567890.34'
let reg0 = /(\d)(?=(\d{3})+\.)/g
console.log(reg0.exec(a))
console.log("零宽断言 =>",a.replace(reg0, '$1,'))
console.log("零宽断言 =>",'1234567890'.replace(/(\d)(?=(\d{3}))/g, '$1,'))


let snum = "5+(4/(9+1))"
let reg_brackets = /\(([^()]*)\)/
console.log(reg_brackets.exec(snum))
let reg_cal = /(\d+)[\+\-](\d+)/
snum.replace(reg_brackets, function($0,$1){
    console.log($0,$1)
    
})

