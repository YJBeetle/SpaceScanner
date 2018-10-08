const fs = require('fs');
const path = require('path');

/**
 * 文件遍历
 * @param filePath 需要遍历的文件路径
 */
let du = (filePath) => {
    fs.stat(filePath, (err, fileStats) => {
        if (err) {
            console.warn('获取文件stats失败');
        } else {
            if (fileStats.isFile()) {
                console.log(filePath + "\t" + fileStats.size);
            }
            else if (fileStats.isDirectory()) {
                fs.readdir(filePath, (err, files) => {
                    if (err) {
                        console.warn(err)
                    } else {
                        files.forEach((fileName) => {
                            du(path.join(filePath, fileName));
                        });
                    }
                });
            }
        }
    })
}

module.exports = du;