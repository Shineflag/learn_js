

setTimeout(()=>console.log("d"), 0)
var r = new Promise(function(resolve, reject){
    resolve()
});
r.then(() => { 
    var begin = Date.now();
    var count = 0
    while(Date.now() - begin < 3000)count++;
    console.log("c1",count) 
    new Promise(function(resolve, reject){
        resolve()
    }).then(() => console.log("c2"))
});

    
function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}
async function foo(name){
    console.log("before",name,Date())
    await sleep(2000).then( ()=>{
        console.log("after sleep",name, Date())
    })
    console.log("after",name,Date())
}
async function foo2(){
    foo("a");
    // await foo("a");
    console.log("after foo(a)")
    await foo("b");
}

foo2()