
var b;
void function(){
    var env = {b:1};
    b = 2;
    console.log("In function b:", b);
    with(env) {
        var b = 3;  //注释与不注释的结果不一样
        console.log("In with b:", b);
    }
    console.log(env)
}();
console.log("Global b:", b);