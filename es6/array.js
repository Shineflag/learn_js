
function test_array() {
    const src = [1, 2, 3,4]
    const dstm = src.map( v => {
        if ( v > 2) {
            return v
        }
    })
    console.log(dstm)

    const dstf = src.filter( v=>{
        return v > 2
    })
    console.log(dstf)

}
test_array()