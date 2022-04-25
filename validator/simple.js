const Schema = require('async-validator').default
// console.log(Schema)
// Object.keys(Schema).forEach(element => {
//     console.log(element, " ==> ",Schema[element])
// });

const descriptor = {
    name: {
        type: 'string',
        required: true,
        pattern: /^[a-z]+$/,
        transform(value) {
          return value.trim();
        },
    },
    age: {
        type: 'number',
        asyncValidator: (rule, value) => {

            return new Promise( (resolve, reject) => {
                // console.log(rule, "asyncValidator value =>", value)
                if( value < 18) {
                    reject('too young')
                }else {
                    resolve()
                }
            })
        }
    },
    email:[
        { type: 'email', required: true}
    ],
    pat:{
        pattern: /haha/,
    }
}


const validator = new Schema(descriptor);
// let params = {
//     name:'muji'
// }
// validator.validate(params, (err, fields) => {
//     console.log(params, " validator error", err)
//     console.log(params, " validator fields", fields)
// })

let aparams = {
    name: 'muji   ', 
    age: 18 ,
    email:"hahah@kk.com",
    pat:'hahabbbb'
}
validator.validate(aparams).then( ( data) => {
    console.log(aparams, "validate successs =>", data)
}).catch( ({errors, fields }) => {
    console.log(aparams, " validator error", errors)
    console.log(aparams, " validator fields", fields )
})