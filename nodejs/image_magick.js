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
const { exec, execSync } = require('child_process');

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


    let rdir = 'heads/opt_inst'

    fs.rename(fpath, path.join(rdir, `head-${index}.jpg`))
}
// dpath = "asserts/heads/opt_inst"
// process_dir_images(dpath,rename_image)

function change_operation(fpath, index) {
    let dir = 'asserts/heads/opt_inst'
    mkdirsSync(dir)
    let fname = path.resolve(dir, `inst-${index}.jpg`)

    exec(`magick ${fpath} -strip -quality 75%  ${fname}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`magick ${fpath} -strip -quality 75%  ${fname}`);
        //   console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
    })
}
// dpath = "asserts/heads/inst"
// process_dir_images(dpath, change_operation)




//将json数组以 lua table的形式写到 文件中
function write_array_to_luatable(array, fname) {
    const fs = require('fs');
    let arr_str = ["return {"]
    for (var i = 0; i < array.length; i++) {
        arr_str.push('  \"' + array[i] + '\",')
    }
    arr_str.push("}")
    fs.writeFile(fname, arr_str.join("\n"), function (err) {
        if (err) {
            console.log("write failed:", err)
        } else {
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
    let fs = require('fs');
    let join = require('path').join;
    let result = [];
    let files = fs.readdirSync(path)
    files.forEach(fname => {
        let fpath = join(path, fname)
        let stats = fs.statSync(fpath)
        if (stats.isFile()) result.push(fname)
    })
    return result;
}
// let fnames = findSync('E:/Seafile/产品/头像/robot head');
// console.log(fnames)
// write_array_to_luatable(fnames, 'asserts/inst_icons.lua')

//将json数组以 lua table的形式写到 文件中
function create_array_to_luatable(fname) {
    let rpath = 'C:/Users/shineflag/Desktop/books/error'
    let rmfile = {};
    let files = fs.readdirSync(rpath)
    files.forEach(fname => {
        rmfile[fname] = true
    })

    let arr_str = ["return {"]
    const count = 4795
    for (let i = 0; i <= count; i++) {
        let fname = `inst-${i}.jpg`
        if (rmfile[fname]) {
            console.log(fname)
        } else {
            arr_str.push('  \"' + fname + '\",')
        }

    }
    arr_str.push("}")
    fs.writeFile(fname, arr_str.join("\n"), function (err) {
        if (err) {
            console.log("write failed:", err)
        } else {
            console.log("write success")
        }
    })
}
// create_array_to_luatable('asserts/inst_icons.lua')


/**
 * @desc 根据 创建一个poker的图片
 * @param {*} v 
 */
function create_poker(v) {
    const dir = "asserts/replay"
    const dst = "asserts/replay/poker"
    const suit_big_file = [
        "suit/poker_big_diamond.png",
        "suit/poker_big_club.png",
        "suit/poker_big_heart.png",
        "suit/poker_big_spade.png",
    ]
    const suit_face_dir = [
        "suit/poker_red_num",
        "suit/poker_black_num",
        "suit/poker_red_num",
        "suit/poker_black_num",
    ]
    const face_str = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
    ]

    let suit = (v & 0xF0) >> 4
    let face = v & 0x0F

    console.log(suit, face)
    const face_file = path.resolve(dir, suit_face_dir[suit], face_str[face] + '.png')
    const suit_file = path.resolve(dir, suit_big_file[suit])
    const bg_file = path.resolve(dir, 'pai1.png')
    const dst_file = path.resolve(dst, v + '.png')

    const convert = `magick convert ${bg_file} ${face_file} -geometry +4+4 -composite ${suit_file} -geometry +13+28 -composite ${dst_file}`
    console.log(convert)
    exec(convert)
}

/**
 * @desc 根据 创建一个poker的图片
 * @param {*} v 
 */
function create_small_poker(v) {
    const dir = "asserts/replay"
    const dst = "asserts/replay/spoker"
    const suit_big_file = [
        "suit/ssuit/poker_big_diamond.png",
        "suit/ssuit/poker_big_club.png",
        "suit/ssuit/poker_big_heart.png",
        "suit/ssuit/poker_big_spade.png",
    ]
    const suit_face_dir = [
        "suit/poker_red_num",
        "suit/poker_black_num",
        "suit/poker_red_num",
        "suit/poker_black_num",
    ]
    const face_str = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
    ]

    let suit = (v & 0xF0) >> 4
    let face = v & 0x0F

    console.log(suit, face)
    const face_file = path.resolve(dir, suit_face_dir[suit], face_str[face] + '.png')
    const suit_file = path.resolve(dir, suit_big_file[suit])
    const bg_file = path.resolve(dir, 'pai2.png')
    const dst_file = path.resolve(dst, v + '.png')

    const convert = `magick convert ${bg_file} ${face_file} -geometry +1+4 -composite ${suit_file} -geometry +21+4 -composite ${dst_file}`
    console.log(convert)
    exec(convert)
}

function create_all_poker() {
    let cards = [
        0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e,   //方块 6 - A
        0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e,   //梅花 6 - A
        0x26, 0x27, 0x28, 0x29, 0x2a, 0x2b, 0x2c, 0x2d, 0x2e,   //红桃 6 - A
        0x36, 0x37, 0x38, 0x39, 0x3a, 0x3b, 0x3c, 0x3d, 0x3e,   //黑桃 6 - A
    ]
    cards.forEach(v => {
        // create_poker(v)
        create_small_poker(v)
    })
}

// create_all_poker()

function create_image(id, name, icon, win, hcards, pcards) {
    // return "http://cdn.pokaa.fun/h5/img/replay_icon.png"
    const root_dir = "asserts/replay"
    const dst_dir = "asserts/replay/preview"


    //
    const dst_file = path.resolve(dst_dir, `${id}.jpg`)
    //背景
    const bg_file = path.resolve(root_dir, 'hall_newyear_bg.png')
    const font_file = path.resolve(root_dir, 'RobotoCondensed-Bold.ttf')
    const play_file = path.resolve(root_dir, 'play.png')


    //下栽图牌 
    const dst_icon_file = path.resolve(dst_dir, `${id}-icon.png`)
    const down_icon = `curl ${icon} -s -o ${dst_icon_file}`
    execSync(down_icon)
    execSync(`magick convert ${dst_icon_file} -resize 320x320! ${dst_icon_file}`)


    if (hcards) {
        //手牌
        name = formatName(name)
        const hands_bg = path.resolve(root_dir, 'di1.png')
        const dst_hands_file = path.resolve(dst_dir, `${id}-hands.png`)
        const covert_hards = `magick convert ${hands_bg} -font ${font_file} -fill white -pointsize 24 -annotate +10+30 "${name}" \
         ${path.resolve(root_dir, 'spoker', hcards[0] + '.png')} -geometry +12+40 -composite  \
         ${path.resolve(root_dir, 'spoker', hcards[1] + '.png')} -geometry +62+40 -composite ${dst_hands_file}`
        let result = execSync(covert_hards)


        const public_bg = path.resolve(root_dir, 'di2.png')
        const dst_public_file = path.resolve(dst_dir, `${id}-public.png`)
        const covert_public = `magick convert  -size 260x80 xc:none ${public_bg} -geometry +0+40 -composite \
            ${path.resolve(root_dir, 'poker', pcards[0] + '.png')} -geometry +10+10 -composite  \
            ${path.resolve(root_dir, 'poker', pcards[1] + '.png')} -geometry +58+10 -composite  \
            ${path.resolve(root_dir, 'poker', pcards[2] + '.png')} -geometry +106+10 -composite  \
            ${path.resolve(root_dir, 'poker', pcards[3] + '.png')} -geometry +154+10 -composite  \
            ${path.resolve(root_dir, 'poker', pcards[4] + '.png')} -geometry +202+10 -composite  ${dst_public_file}`

        execSync(covert_public)

        const convert_preview = `magick convert ${bg_file}  \
        ${dst_icon_file} -geometry +280+150 -composite  \
        ${dst_hands_file} -geometry +35+286 -composite  \
        ${dst_public_file} -geometry +35+366 -composite \
        ${play_file} -geometry +200+200 -composite ${dst_file}`

        execSync(convert_preview)


    } else {
        win = formatMoney(win)
        const convert_preview = `magick convert ${bg_file}  \
        ${dst_icon_file} -geometry +280+150 -composite  \
        -font ${font_file} -fill #f2e325 -pointsize 64 -annotate +34+300 WIN  \
        -font ${font_file} -fill #f2e325 -pointsize 60 -annotate +34+392 $${win} \
        ${play_file} -geometry +200+200 -composite ${dst_file}`

        execSync(convert_preview)
    }

}

function formatMoney(v){
    const k = 1000
    const m = k*k 

    if (v > 10*m) {
        v = (v/m).toFixed(2) + 'M'
    }else if(v > 10*k){
        v = (v/k).toFixed(2) + 'K'
    }
    return v 
}

let v = 188
for (i = 0; i<9; i++){
    v = v*10 + 8 
    console.log(v, formatMoney(v))
}


function formatName(v){
    if (v.length > 8) {
        v = v.substr(0,8) + '...'
    }
    return v 
}

console.log( formatName('1234567890'))

// create_image('234', 'NerverGo', "cdn.pokaa.fun/public/heads/inst-3241.jpg", 18880000, null, [0x0D, 0x1B, 0x3C, 0x2A, 0x39])
create_image('123', 'Nerv erGogaga', "cdn.pokaa.fun/public/heads/inst-3241.jpg", 100, [0x0E, 0x3E], [0x0D, 0x1B, 0x3C, 0x2A, 0x39])





