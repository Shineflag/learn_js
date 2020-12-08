
12 .toString()
console.log("11\t11\v11\v11")


function f(){
    console.log(arguments);
}

var a = "world"
f`Hello ${a}!`; // [["Hello", "!"], world]