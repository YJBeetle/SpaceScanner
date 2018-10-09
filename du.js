const fs = require('fs');
const path = require('path');

const TYPE = {
    ERR: -1,
    UNKNOW: 0,
    FILE: 1,
    LINK: 2,
    DIR: 3,
}

const STATUS = {
    READY: 1,
    RUN: 2,
    COMPLETE: 3,
}

class Du {
    constructor(filePath) {
        this.status = STATUS.READY;
        this.filePath = filePath;
        this.usageData = {};
    }

    start() {
        this.status = STATUS.RUN;
        return this.du(this.filePath, this.usageData).then(() => {
            this.status = STATUS.COMPLETE;
        });
    }

    /**
     * 文件遍历
     * @param filePath 需要遍历的文件路径
     */
    du(filePath, usageData) {
        return new Promise((resolve, reject) => {
            usageData['/type'] = TYPE.UNKNOW;
            usageData['/size'] = -1;
            fs.lstat(filePath, (err, fileStats) => {
                if (err) {
                    console.warn(filePath, '获取文件stats失败');
                    console.warn(err);
                    // console.log(filePath + "\t" + 0);
                    usageData['/type'] = TYPE.ERR;
                    usageData['/size'] = 0;
                    resolve(0);
                } else {
                    if (fileStats.isFile() || fileStats.isSymbolicLink()) {
                        // console.log(filePath + "\t" + fileStats.size);
                        if (fileStats.isFile())
                            usageData['/type'] = TYPE.FILE;
                        else
                            usageData['/type'] = TYPE.LINK;
                        usageData['/size'] = fileStats.size;
                        resolve(fileStats.size);
                    }
                    else if (fileStats.isDirectory()) {
                        usageData['/type'] = TYPE.DIR;
                        fs.readdir(filePath, (err, files) => {
                            if (err) {
                                console.warn(filePath, 'readdir失败');
                                console.warn(err);
                                // console.log(filePath + "\t" + 0);
                                usageData['/size'] = 0;
                                resolve(0);
                            } else {
                                let dirSize = 0;
                                let result = Promise.resolve();
                                files.forEach((fileName) => {
                                    result = result.then(() => {
                                        return this.du(path.join(filePath, fileName), usageData[fileName] = {})
                                    }).then((size) => {
                                        dirSize += size;
                                        usageData['/size'] = dirSize;
                                        // return Promise.resolve(size);
                                    })
                                });
                                result.then(() => {
                                    // console.log(filePath + "\t" + dirSize);
                                    usageData['/size'] = dirSize;
                                    resolve(dirSize);
                                });
                            }
                        });
                    }
                }
            })
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
