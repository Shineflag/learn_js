const https = require('https');
const querystring = require('querystring');

var data = JSON.stringify({
    "initRequest": {
        "country": 360,
        "currency": 360,
        "orderId": "1234567",
        "apiKey": "36b737c038acf679c337b40513595c06",
        "payType": 1,
        "items": [{
            "code": 39.00,
            "name": "314 coins",
            "price": 60000,
            "type": "1"
        }],
        "profile": {
            "entry": {
                "key": "user_id",
                "value": 123
            }
        }
    }
})

const options = {
    host: 'sandbox.codapayments.com',
    path:'/airtime/api/restful/v1.0/Payment/init/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    res.on('data', (d) => {
        console.log('' + d);//将buffer转为字符串或者使用d.toString()
        let b = JSON.parse('' + d);//将buffer转成JSON
        console.log(b.image_id);
    });
});
req.on('error', (e) => {
    console.error(e);
});
req.write(data);
req.end();
