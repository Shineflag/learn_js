const dayjs = require("dayjs")
const readline = require('readline');
const fs = require('fs');


const log_dir = "asserts/log/"

/**
 *  每日金流数据统计
 */
function data_flow_check(day) {

    const dir = log_dir
    const ct_robot = 'CT_ROBOT'
    const ct_player = 'CT_PLAYER'
    const ct_coin = 'CT_COIN'
    const ct_pot = 'CT_POT'

    let player = {} //玩家的玩牌局数
    let tdata = {
        issue: 0,  //系统总发放(无机器人)
        consume: 0,    //玩家总消耗(无机器人)
        currency: 0,   //总流通(无机器人)
        fee: 0, //总台费(无机器人) 
        player: 0, //玩牌用户的个数
        phands: 0  //玩家玩牌的手数
    }


    let ct = {}  //所有帐号
    parse_index(1)

    //是否是玩家帐号
    function player_ct(key) {
        if (typeof key === 'number' && key > 9999) {
            return true
        }
        return false
    }

    function calc_tdata(info) {

        if (/^CT_COIN/.test(info.credit)) {
            let mid = /\d+$/.exec(info.credit)
            if (mid[0].length > 4) {  //除去机器人
                if (info.rz == "rz_fee") {
                    tdata.fee += info.num
                    tdata.consume += info.num
                    tdata.phands += 1
                    if (!player[mid[0]]) {
                        player[mid[0]] = 1
                        tdata.player += 1
                    } else {
                        player[mid[0]] += 1
                    }
                } else if (info.rz == "rz_bet") {
                    tdata.currency += info.num
                }
            }
        }

        if (player_ct(info.debit)) {
            if (info.rz != "rz_redeem") {
                tdata.issue += info.num
            }
        }
        
        if (player_ct(info.credit)){  //计算非购买筹码的消耗
            if (info.rz != "rz_bcoin") {
                tdata.consume += info.num
            }
        }
    }

    //区别帐号
    function ct_key(key) {
        if (typeof key === 'number') {
            if (key > 9999) {
                return ct_player
            } else {
                return ct_robot
            }
        } else if (/^CT_COIN/.test(key)) {
            return ct_coin
        } else if (/^CT_POT/.test(key)) {
            return ct_pot
        } else {
            return key
        }
    }

    //解释第 index 个日志文件
    function parse_index(index) {
        const fname = `${dir}log_mduplex_${day}_${index}.log`
        if (!fs.existsSync(fname)) {
            ct.date = day
            console.log(fname, ct)
            // ctx.service.pokaalog.save_dataflow(ct)

            tdata.date = day
            console.log("ct:", ct)
            console.log("tdata:", tdata)
            //解释登录数据
            // data_login_check(day,  tdata)

            return
        }
        //创建行可读流
        const rl = readline.createInterface({
            input: fs.createReadStream(fname),
            crlfDelay: Infinity
        });


        //解释文件内容
        rl.on('line', (line) => {
            let info = JSON.parse(line)
            let ckey = ct_key(info.credit)
            //计算付方帐号
            if (!ct[ckey]) {
                ct[ckey] = 0
            }
            ct[ckey] -= info.num

            //计算收方帐号
            let dkey = ct_key(info.debit)
            if (!ct[dkey]) {
                ct[dkey] = 0
            }
            ct[dkey] += info.num

            calc_tdata(info)
        })
        rl.on('close', () => {
            // console.log("over",fname, ct)
            parse_index(index + 1)
        })
    }
}

/**
 * @desc 解释每天登录的日志，计算每天的总结余
 * @param {*} day 
 * @return 
 */
function data_login_check(day, tdata) {
    let players = {}

    tdata.login = 0    //登录人数
    tdata.tlogin = 0   //登录次数
    tdata.balance = 0  //结余 所人玩家每天第一次登录时的金币总和


    const dir = log_dir
    parse_index(1)
    //解释第 index 个日志文件
    function parse_index(index) {
        const fname = `${dir}log_rlogin_${day}_${index}.log`
        if (!fs.existsSync(fname)) {
            console.log(index, fname, players)
            console.log("tdata:", tdata)
            // ctx.service.pokaalog.save_totalflow(tdata)
            return
        }
        //创建行可读流
        const rl = readline.createInterface({
            input: fs.createReadStream(fname),
            crlfDelay: Infinity
        });


        //解释文件内容
        rl.on('line', (line) => {
            info = JSON.parse(line)
            if (info.mid > 9999) {
                if (!players[info.mid]) {
                    players[info.mid] = 1
                    tdata.balance += info.money ? info.money : 0
                    tdata.login += 1
                } else {
                    players[info.mid]++
                }
                tdata.tlogin += 1
            }
        })
        rl.on('close', () => {
            console.log("over", fname, players)
            parse_index(index + 1)
        })
    }
}

const day = dayjs().subtract(1, 'day').format('YYYYMMDD')
data_flow_check(day)
