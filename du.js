const fs = require('fs');
const path = require('path');

/**
 * 文件遍历
 * @param filePath 需要遍历的文件路径
 */
let du = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, fileStats) => {
            if (err) {
                console.warn(filePath, '获取文件stats失败');
                console.warn(err);
                console.log(filePath + "\t" + 0);
                resolve(0);
            } else {
                if (fileStats.isFile()) {
                    console.log(filePath + "\t" + fileStats.size);
                    resolve(fileStats.size);
                }
                else if (fileStats.isDirectory()) {
                    fs.readdir(filePath, (err, files) => {
                        if (err) {
                            console.warn(filePath, 'readdir失败');
                            console.warn(err);
                            console.log(filePath + "\t" + 0);
                            resolve(0);
                        } else {
                            let dirSize = 0;
                            let result = Promise.resolve();
                            files.forEach((fileName) => {
                                result = result.then(() => {
                                    return du(path.join(filePath, fileName))
                                    .then((size) => {
                                        dirSize += size;
                                    })
                                })
                            });
                            result.then(() => {
                                console.log(filePath + "\t" + dirSize);
                                resolve(dirSize);
                            });
                        }
                    });
                }
            }
        })
    })
}

module.exports = du;