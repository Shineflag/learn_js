
// @see https://time.geekbang.org/column/article/83719

//
console.log("###################普通函数####################")
function showThis(){
    console.log(this);
}

var o = {
    showThis: showThis
}

showThis(); // global
o.showThis(); // o


//箭头函数
console.log("###################箭头函数####################")
const showThis1 = () => {
    console.log(this);
}

var o = {
    showThis1: showThis1
}

showThis1(); // global
o.showThis1(); // global


//方法函数
console.log("###################方法函数####################")
class C {
    showThis2() {
        console.log(this);
    }
}
var o = new C();
var showThis2 = o.showThis2;

showThis2(); // undefined
o.showThis2(); // o


//上下文
console.log("###################上下文####################")
var a = 1;
foo();

//在别处定义了foo：

var b = 2;
function foo(){
    console.log(b); // 2
    console.log(a); // error
}
foo()


//箭头函数
console.log("###################箭头函数 this 指向外层this####################")

var o = {a:'hello world'}
o.foo = function foo(){
    console.log(this);
    return () => {
        console.log(this);
        return () => console.log(this);
    }
}

o.foo()()(); // o, o, o
console.log("################### OD ####################")
var od = {d:"od"}
od.foo = o.foo()()
od.foo()


var ob = {a:'hello bar'}
ob.foo = function(){
    console.log("直接调用",this);
    return function() {
        console.log("中间返回",this);
        return function(){ console.log("最后返回",this)}
    }
}

ob.foo()()(); // 
console.log("###################OC ####################")
var oc = {c:"oc"}
oc.foo = ob.foo()
oc.foo()()


//箭头函数
console.log("###################操作 this 的内置函数####################")

function foo1(a, b, c){
    console.log(this);
    console.log(a, b, c);
}
foo1.call({a:"foo1"}, 1, 2, 3);
