const os = require("os")
const netface = os.networkInterfaces()
console.log(netface)
console.log(netface.WLAN)


function getLocalIP() {
    let ip = ""
    netface.WLAN.forEach(item => {
        console.log(`family ${item.family} ip: ${item.address}`)
        if (item.family == "IPv4") {
            ip =  item.address
        }
    })
    console.log("not found ip")
    return ip
}
let ip = getLocalIP()
console.log("ip =>", ip)