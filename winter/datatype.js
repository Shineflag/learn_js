//undefined 是变量 对undefined 赋值不生效
undefined = 1
a = undefined 
console.log(`a=${a} undefined=${undefined}`)

//报错 常不可赋值
const u = 3
// u = 4
console.log(u)

//报错
// null = 2 
// a = null 
// console.log(`a=${a} null=${null}`)

console.log(Number.EPSILON)

a = 3
b = new Number(2)
console.log(typeof a)
console.log(typeof b)


var o = {
    valueOf : () => {console.log("valueOf"); return {}},
    toString : () => {console.log("toString"); return {}}
}

console.log(o * 2)
// valueOf
// toString
// TypeError