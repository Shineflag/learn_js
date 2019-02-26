const https = require('https')
const querystring = require('querystring')

const api_key = '36b737c038acf679c337b40513595c06'

const sandbox_url = "sandbox.codapayments.com"


const initRequest = {
    initRequest: {
        apiKey: api_key,
        orderId: "12345567",
        country: 356, // India:356  Vietnam:704
        currency: 356, //Indian rupee
        payType: 1,
        items: {},
        profile: {
            voucher_code: "pid",
            need_mno_id: "customeid",
            user_id: "10010",
            client_ip: "113.89.238.128",
        },
    }
}

let dj = {
    "initRequest": {
        "country": 360,
        "currency": 360,
        "orderId": "1234567",
        "apiKey": api_key,
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
}
const data = JSON.stringify(dj)


const options = {
    host: sandbox_url,
    path: "/airtime/api/restful/v1.0/Payment/init",
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
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.write(data)
req.end()