

const BASE_64_ENCODED_PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApkXmLlIbh0C11RXZbQn/aRXxm6GKZlOYhgzA8CBwUCTmOrm0ECYkvxkGNiROoBIMo2nEdQJ36XXl866LO3oqvoX67OQzgcgt6pAwocnSWIn8iYwA4qu7oaTicByuR4ZMfqhGpSxjLovpS+UHPeLcC0mTbtlFp5gI9GXDctBFg45kJUazkmLxNbfLLAjqZ08mPTEY6WHxc4RhAPSXrlHUupgPXSAdJqE4DcfurECjamQnMOVOxehey78fGEwvnX/acidBVbLXht/sEb9gHF4yjdheQFsWRPPvkPoqPvqEubL5UErj8o61rAitBGHBdlcCu4CABAY8wm9rPs7wmgwP8QIDAQAB'

function base_test() {
    const NodeRSA = require('node-rsa');
    const key = new NodeRSA({ b: 512 });

    const text = 'Hello RSA!';
    const encrypted = key.encrypt(text, 'base64');
    console.log('encrypted: ', encrypted);
    const decrypted = key.decrypt(encrypted, 'utf8');
    console.log('decrypted: ', decrypted);
}

base_test()

const signature = 'WW0JxX/Ub8Qc3Zuw+yisxuABctSewhAJwdJX6HFjE1x076zYcLOPTd6+59+Jxn+8bQ472hRUkTJ6ZJQOniPPIip0W3cjtywFyfs6wsqIKqeDFCwW7ZffUCBUeNCp+k0+xQQLgH3rGw0QZvihV9MRbwsVLMPm3cizZ6oRqZxDRKsOSDHP3\/rsCcTs95kcpiSZDNyf9HTe2wA11PAHY1KJ4fy\/08ZOVtbO+M\/4TNsKVJH\/Gr3y0T5708PyClvl6rXDAHfm5xGzmc9L3P3/gOW72X/oSwpAr/foqK7XdCXabpoA3kJQP4Fa63FaSZSARc9tv0J6buhbwA4ljWxOHivEJg=='

let buff = new Buffer(BASE_64_ENCODED_PUBLIC_KEY)
const public_key = buff.toString('base64')
console.log(public_key)



