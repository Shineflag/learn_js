let _ = require('lodash');
const crypto = require('crypto');

const BASE_64_ENCODED_PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApkXmLlIbh0C11RXZbQn/aRXxm6GKZlOYhgzA8CBwUCTmOrm0ECYkvxkGNiROoBIMo2nEdQJ36XXl866LO3oqvoX67OQzgcgt6pAwocnSWIn8iYwA4qu7oaTicByuR4ZMfqhGpSxjLovpS+UHPeLcC0mTbtlFp5gI9GXDctBFg45kJUazkmLxNbfLLAjqZ08mPTEY6WHxc4RhAPSXrlHUupgPXSAdJqE4DcfurECjamQnMOVOxehey78fGEwvnX/acidBVbLXht/sEb9gHF4yjdheQFsWRPPvkPoqPvqEubL5UErj8o61rAitBGHBdlcCu4CABAY8wm9rPs7wmgwP8QIDAQAB'
 
//一时在node.js没有找到PHP的chunk_split对应函数，就临时写了一个
function chunk_split(paramString, paramLength, paramEnd = '\n') {
    let p = [];
    let s = paramString;
    while(s.length > paramLength) {
        let s1 = s.substr(0, paramLength);
        let s2 = s.substr(paramLength);
        s = s2;
        p.push(s1);
    }
    if(s.length > 0) {
        p.push(s);
    }
    p.push('');
    return p.join(paramEnd);
}
 
 
 
function GooglePlayCheck(params) {
    let verify = crypto.createVerify('RSA-SHA1');//请注意，这里要用RSA-SHA1也就是RSA with sha1等同于php的OPENSSL_ALGO_SHA1，我试了好多，才试出来
 
    let PHP_EOL = '\n';//实际上就是换行符
    //假1
    //let inappPurchaseData = '{"orderId":"GPA.9154-1634-4550-16995","packageName":"com.pokaapoker.texas","productId":"gp_gem_100_pk","purchaseTime":1545661082682,"purchaseState":0,"purchaseToken":"mxcdrqaelnsnfgtdbeifxpcd.eEP9evw_XwKYl8O4jtf-hvaEC1B1qnDEt8JPsMONpVPnA_LIco2sUGuJqQRRxLmYTVsoXQGMXEquR0GGiBN5-6oi_4wM6maA282pp1YKP9JHjE_OmW55NDxmKXE"}';
    
    //真1
    //let inappPurchaseData = '{"orderId":"GPA.3359-0705-5508-98101","packageName":"com.pokaapoker.texas","productId":"gp_gem_001_sp","purchaseTime":1547085215512,"purchaseState":0,"purchaseToken":"abokgobiankioadnbgndiomj.AO-J1Ox3UW0IfHNlRPJkWxq5g-1fof5RfLMlK3kqV-geEcBqkoiTq1kAOXqeTDhIqZnv6T4dRdRSuKf_XxcOwYoitYdPSAo93fNSdMkJim79F4jVtvVQyJLVpzhDw-oLzYxsc0Ne7C_D"}';
    
    //真2 
    //let inappPurchaseData = '{"orderId":"GPA.3354-1174-8793-22388","packageName":"com.pokaapoker.texas","productId":"gp_gem_001_sp","purchaseTime":1547081479600,"purchaseState":0,"purchaseToken":"gibhcekoldekidnbpoealepe.AO-J1Oz0hZh8XVOMUFHzmMPYNwdI8FAAinucdo4YBuTCGQf-Bf5O7SeR7JB8SiiFw73lrSyz3SQBnkMq1UqyIB9-9h3TLkWfK3Z2FO5itZ2_mRulo66-ldtzQGL0hflFYjnl9TtMbs7I"}';

  //假2 
  let inappPurchaseData = '{"orderId":"GPA.0373-9457-7940-36244","packageName":"com.pokaapoker.texas","productId":"gp_gem_100_pk","purchaseTime":1545579178685,"purchaseState":0,"purchaseToken":"wobwyfjqzmcphmeifywtlfac.lIadw-6aBla1j5EsEqBSzI1YiMyp3U7WVWSxM9t_L6bvT-1I27X--xTofHKhOyJq4VvJizlZyyCq3tomh09XVmoLDXJQrJ_2pIiIuwcOBUXzh8a9iFR6n11wXW_AlXuhR2enUALUyg"}';
    
  //let googlePublicKey = 'IIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApkXmLlIbh0C11RXZbQn/aRXxm6GKZlOYhgzA8CBwUCTmOrm0ECYkvxkGNiROoBIMo2nEdQJ36XXl866LO3oqvoX67OQzgcgt6pAwocnSWIn8iYwA4qu7oaTicByuR4ZMfqhGpSxjLovpS+UHPeLcC0mTbtlFp5gI9GXDctBFg45kJUazkmLxNbfLLAjqZ08mPTEY6WHxc4RhAPSXrlHUupgPXSAdJqE4DcfurECjamQnMOVOxehey78fGEwvnX/acidBVbLXht/sEb9gHF4yjdheQFsWRPPvkPoqPvqEubL5UErj8o61rAitBGHBdlcCu4CABAY8wm9rPs7wmgwP8QIDAQAB' //从google play console对应的app设置找出来';
   
    //假1
    //let inappDataSignature = 'kwZLtibvqjP9GQd/79tp4WUkQk2A8ueR/Co2Pmor5I+kcNVPZYAhpmVoQEHpi4MloiUzEPVCZO4RgHnwBkf4x5LVPU5QXqVJJb/K92hH9LA1xjZJ5pUN6FDpgyUhwiitlqZ8ENl6cbab8nybS+RCL6w/O+hdTWFMQBiGn6F+tvTLpw2l4xJpXA4MHzsglBTm3N3Uii36a0KwUWdAEEAehEhv7/FmBDOw41OjdtScJAMYKrCGT9jJUM/k/wMTR6wKRSJ/4wqABpuyXqdzofcaSp6QENHQg0QugUA5QxHgmoEPSkBt7Wp24xdJmiaY1+OYVYa4YXQx84p0fwWd4dK1/Q';
    
    //--真1
    //let inappDataSignature = 'dPiMurQOFUrTXQoU7lZ4IH0HZ79a8tP7/7y55Tx/KfozskckNiWs2TwW8Re9NnejbkBkwr4ObHkJBXgwMw8+wbJ2zaY51f71bSQunE2iO7OpX0FOVYWIkPcx2kLkdAulQMDWHMlyPpMnXUQNB0PMRl64Kb4qO/Wo0t9iowAZt41snAuH2OtqyELddHZs6XvXTNoJ0OHxF4E161+aHtdg/j0xCMRZcOFuw/xIg5cAOpjNY0QXYF1Vb/qQSeZfM62lxQIKwBQvsUgyy9yvZ10zslpGGYnj2/2McyflWFiOUUblaPdX3mSJvMVNbJAxDPuDnvqOJGVbfAbocImItfBXQA=='
   
    //--真2
    //let inappDataSignature = 'PqXw93TJft45328EGeYTS+IUoBMnICxK2f+5WA5u42rK3wPVSP0fDK51dTlNmZ3ztkLk6f9MZQq22S4xhe9ZeMTU7dGpUatyaO2oGf/nX3LwCmEedCzccNi8/lu3czoQreBcZrCvbt9saeJIJj595BDXfYfpnls179h+hCIeHeLaOWPwhEDb6BlkeFOOV0WdulVz/tr1lDis/RCODSeW1US8AaCCJQ7OqZxF1EDceKOTvlJXxNMUv4TvBtpt0mCylzI6RnSsJ3CZNxcq5EBSYUN6D9yj0upOA+Dx9WBEdGUUSHpl3AyPtS6LxHp5qSvYyXTeqRv2PZiUAcLrViW8WQ=='


    //假2
    let inappDataSignature =  'S2h50e0/zmF9eF46UeBDQ4P4UWAstvICcFcRYKEGERc+x97akKoPPHnB3BPoKqDhS5F3D+q0rx19hXUeCxudunNPjxh6wxiEd0qhgVxd29+xvyNq+9VkGEgMEy2TLQ9TTLvHqZvkzMKMLVsK/DN/jhTS5KEbvNZaPKDzHVou+BO3x8pgSollWV+lDfJXAli1f1V+EpGyT4PQmYcLNa5u6kxTzVHnE98r5fabkGDEKWFU8616dz1CvH2mH2NKxLYr/mlJ8UGbJo9xTwBuktvIZrpdc/EVcgd9ZTspN3cKaXjxY1k7Eocesb5l2XabHf/1uiU9r2BY9DA5HI0yO+K88Q'

    let buff = new Buffer(BASE_64_ENCODED_PUBLIC_KEY)
    const googlePublicKey = buff.toString('base64')

    //这里要将公钥转换成64个字符一行的文本块。
    let publicKey = "-----BEGIN PUBLIC KEY-----" + PHP_EOL + chunk_split(BASE_64_ENCODED_PUBLIC_KEY, 64, PHP_EOL) + "-----END PUBLIC KEY-----";
 
    verify.update(inappPurchaseData);//
    let r = verify.verify(publicKey, Buffer.from(inappDataSignature,'base64')); //验证数据
 
    console.log(params + "-->rrrrrrrrrrr:",r);
}

GooglePlayCheck('gaga')
