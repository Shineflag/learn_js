import {access, readdir, copyFile, mkdir } from 'node:fs/promises'
import { constants } from 'fs';

import * as path from 'path'


let count = 0
//讲一个文件夹下的子文件夹和文件复制到另一个文件夹
async function copyDirToOne(srcDir, dstDir) {
    try {
        await access(dstDir, constants.R_OK | constants.W_OK)
    }catch(err){
        console.log("mkdir ", dstDir)
        await mkdir(dstDir)
    }

    try{
        const files = await readdir(srcDir, {withFileTypes:true})
        for (const file of files) {
            if(file.isDirectory()) {
                console.log("dir ", file.name)
                copyDirToOne(path.join(srcDir, file.name), dstDir)
            } else if(file.isFile()){
                await copyFile(path.join(srcDir, file.name), path.join(dstDir, file.name))
                count+=1
                console.log(`copy ${file.name} now count: ${count}`)
            
            }
        }


    } catch( err) {
        console.log(err)
    }

}

// const dir = "D:/迅雷下载/djdldzxb/assets/res/raw-assets"
// const dst = "D:/迅雷下载/djdldzxb/assets/res/raw-assets-one"

const dir = "D:/game_project/cc/asset/羊了个样/assets"
const dst = "D:/game_project/cc/asset/羊了个样/assets-one"
copyDirToOne(dir, dst)