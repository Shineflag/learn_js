

/**
 * 检测金币文件某个k下玩家重复刷金币的数据
 * @param {*} fname 
 * @param {*} k 
 */
function checkout_duplex(fname, k){
    const readline = require("readline")
    const fs = require("fs")
    const rl = readline.createInterface({
        input: fs.createReadStream(fname),
        crlfDelay: Infinity
    })

    let player = {}
    let dplayer = {}  //刷币玩家
    rl.on('line', (line) => {
        let info = JSON.parse(line)
        if (info.tkey == k) {
            let mid = info.mid 

            if (player[mid]) {
                if (dplayer[mid]) {
                    dplayer[mid].count++
                    dplayer[mid].money += info.num
                }else{
                    dplayer[mid] = {
                        mid,
                        count:1,
                        num:info.num,
                        money:info.num
                    }
                } 
            } else {
                player[mid] = info.num
            } 

        }
    })

    rl.on('close', () => {
        for ( k in dplayer) {
            console.log(JSON.stringify(dplayer[k]))
        }
            

    })
}

// let fname = "asserts/log/log_mdata_20180827_1.log" 
// checkout_duplex(fname, "mjackpot")


function sum_mdata(fname, key){
    const readline = require("readline")
    const fs = require("fs")
    const rl = readline.createInterface({
        input: fs.createReadStream(fname),
        crlfDelay: Infinity
    })

    let total = {}
    rl.on('line', (line) => {
        let info = JSON.parse(line)

        if(total[info.tkey]){
            total[info.tkey] += info.num
        } else {
            total[info.tkey] = info.num
        }
    })

    rl.on('close', () => {
        for ( k in total) {
            console.log( `${k} : ${total[k]}`)
        }
        console.log( `you atten ${key} : ${total[key]}`)
    })
}
// let fname = "asserts/log/log_mdata_20180827_1.log" 
// sum_mdata(fname, "mexp")

function check_order(fname){
    const readline = require("readline")
    const fs = require("fs")
    const dayjs = require("dayjs")
    const rl = readline.createInterface({
        input: fs.createReadStream(fname),
        crlfDelay: Infinity
    })

    rl.on('line', (line) => {
        let info = JSON.parse(line)

        console.log(`${dayjs(info.time*1000).locale('zh-cn').toISOString()} : ${line}`)
    })

    rl.on('close', () => {
    })
}

let fname = "asserts/log/log_shop_order_20180928_1.log" 
check_order(fname)




