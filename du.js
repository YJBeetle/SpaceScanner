const fs = require('fs');
const path = require('path');

class Du {
    constructor() {
        this.usageData = {};
    }

    start(filePath) {
        return this.du(filePath, this.usageData[filePath] = {});
    }

    /**
     * 文件遍历
     * @param filePath 需要遍历的文件路径
     */
    du(filePath, usageData) {
        return new Promise((resolve, reject) => {
            fs.lstat(filePath, (err, fileStats) => {
                if (err) {
                    console.warn(filePath, '获取文件stats失败');
                    console.warn(err);
                    console.log(filePath + "\t" + 0);
                    resolve(0);
                } else {
                    if (fileStats.isFile() || fileStats.isSymbolicLink()) {
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
                                        return this.du(path.join(filePath, fileName), usageData[fileName] = {})
                                    }).then((size) => {
                                        dirSize += size;
                                        // return Promise.resolve(size);
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
        }).then((size) => {
            usageData['/size'] = size;
            return Promise.resolve(size);
        })
    }

    getStats() {
        return this.stats;
    }

    getUsage(filePath) {
        // filePath.split()
        return this.usageData
    }
}


module.exports = Du;
