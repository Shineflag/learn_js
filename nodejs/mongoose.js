'use strict';

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test');

const con = mongoose.connection 

con.on('error', console.error.bind(console, '链接数据库失败'))

con.once('open', ()=>{
    console.log('连接成功')
})

let kittySchema = mongoose.Schema({
    name:String
})



let Kitten = mongoose.model("Kitten", kittySchema)
let felyne = new Kitten({name:"Felyne"})
console.log(felyne.name)