const f = function(flag) {
    return new Promise( (resolve, reject) => {
        console.log("Promise")
        if (flag) {
            console.log("resolve")
            resolve(1)
        } else {
            console.log("reject")
            resolve(2)
        }
    })
}

f(false).then((arg)=>{
    console.log("then", arg)
}).catch((arg)=>{
    console.log("catch", arg)
})


const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});