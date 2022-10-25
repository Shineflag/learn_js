const dayjs = require('dayjs')

const FORMAT = 'YYYY-MM-DD'

let TODAY = dayjs().format(FORMAT)
let YESTODAY = dayjs().subtract(1, 'day').format(FORMAT)
let MONTH_START = dayjs().startOf('month').format(FORMAT)
let HALF_YEAR = dayjs().subtract(6, 'month').format(FORMAT)
let YEAR_START = dayjs().startOf('year').format(FORMAT)

console.log('TODAY =>', TODAY)
console.log('YESTODAY =>', YESTODAY)
console.log('MONTH_START =>', MONTH_START)
console.log('HALF_YEAR =>', HALF_YEAR)
console.log('YEAR_START =>', YEAR_START)

//生成日期数组
let d = dayjs('2022-06-01')
console.log("d =>", d)
console.log("arr =>", GenerateDates("2022-05-01","2022-07-03"))

function GenerateDates(start, end) {
    let arr = []
    let et = dayjs(end)

    for(let st = dayjs(start); st.isSame(et) || st.isBefore(et); st = st.add(1,'day')){
        arr.push(st.format(FORMAT))
    }
    return arr
}