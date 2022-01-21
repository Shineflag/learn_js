

const ws_url = "ws://127.0.0.1:6800/jsonrpc"

function connect() {
    let ws = new WebSocket(ws_url)
    ws.onpen= function(){
        console.log("connect")
    }

}
connect()