

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

function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}
async function foo(name){
    console.log("before",name,Date())
    await sleep(2000)
    console.log("after",name,Date())
}
async function foo2(){
    await foo("a");
    await foo("b");
}

foo2()