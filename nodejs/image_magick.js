/**
 * *
 * desc nodejs 处理图片相关
 * @see https://www.npmjs.com/package/images
 * 
 * run: node nodejs/image_magick.js
 * 
 */

const fs = require("fs")
const path = require("path")
const images = require("images");
const im = require('imagemagick');
const { exec } = require('child_process');

//遍历某个目录下的图片，每个图片处理
function process_dir_images(dpath, callback) {
    fs.readdir(dpath, (err, files) => {
        if (err) return console.log(err)
        files.forEach((file, index) => {
            let fpath = path.resolve(dpath, file)
            fs.stat(fpath, (err, stats) => {
                if (stats.isDirectory()) {
                    process_dir_images(fpath, callback)
                } else {
                    if (/(\.jpg|\.png)$/i.test(fpath)) {
                        console.log(fpath)
                        callback(fpath, index)
                    }
                }
            })
        })
    })
}

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}


function save_image_size(fpath, index) {

    let img = images(fpath)
    let dir = `heads/size_${img.width()}x${img.height()}`
    mkdirsSync(dir)
    let fname = path.resolve(dir, `head-${index}.jpg`)
    console.log("width:" + img.width() + "height:" + img.height())
    img.save(fname)
}
// image_size("asserts/gm.jpg")

// let dpath = path.resolve("C:/Users/shineflag/Desktop/books/icon_files")
// process_dir_images(dpath,save_image_size)

/**
 * desc 将头像转存
 * @param {*} fpath 
 * @param {*} index 
 */
function rename_image(fpath, index) {

    let img = images(fpath)
    let rdir = 'heads/robot_icons'
    mkdirsSync(rdir)
    let fname = path.resolve(rdir, `head-${index}.jpg`)
    console.log("width:" + img.width() + "height:" + img.height())
    img.save(fname)
}
// let dpath = path.resolve("E:/Seafile/产品/头像/机器人头像")
// process_dir_images(dpath,rename_image)

function change_operation(fpath, index) {
    let dir = 'heads/opt'
    mkdirsSync(dir)
    let fname = path.resolve(dir, `head-${index}.jpg`)

    exec(`magick ${fpath} -strip -quality 75%  ${fname}`,(error, stdout, stderr) => {
        if(error) {
            console.error(`exec error: ${error}`);
            return;
        }
          console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    })
}
// dpath = "heads/size_200x200"
// process_dir_images(dpath, change_operation)




//将json数组以 lua table的形式写到 文件中
function write_array_to_luatable( array, fname ){
    const fs = require('fs');
    let arr_str = ["return {"]
    for(var i=0;i<array.length;i++){
        arr_str.push('  \"'+array[i] + '\",')
    }
    arr_str.push("}")
    fs.writeFile(fname,arr_str.join("\n"),function (err){
        if (err) {
            console.log("write failed:",err)
        }else{
            console.log("write success")
        }
    }) 
}
// let names = chance_names(100000)
// write_array_to_luatable(names, "names.lua")


/**
 * @desc  查找文件夹的文件名
 * @param startPath  起始目录文件夹路径
 * @param rname 是否
 * @returns {Array}
 */
function findSync(path, rname) {
    let  fs = require('fs');
    let  join = require('path').join;
    let result=[];
    let files = fs.readdirSync(path)
    files.forEach( fname =>{
        let fpath = join(path,fname)
        let stats = fs.statSync(fpath)
        if (stats.isFile()) result.push(fname)
    })
    return result;
}
let fnames = findSync('E:/Seafile/产品/头像/机器人头像');
console.log( fnames )
write_array_to_luatable(fnames, "robot_icons.lua")



