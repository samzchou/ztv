/* eslint-disable */
/**
 * mongoDB数据处理后台接口
 */
const fs = require('fs');
const path = require('path');

const dbFun = {
    getFullPath(fielpath) {
        return path.resolve(__dirname, "../config/opts/" + fielpath);
    },
    getDirPath(fielpath) {
        return path.resolve(__dirname, "../files/" + fielpath);
    },

    // 上传文件
    async uploadFile() {
        return {
            success: true,
            response: true
        }
    }

}

module.exports = ({ data }) => {
    return new Promise((resolve, reject) => {
        console.log('files', data)
        dbFun[data.type](data).then(result => {
            resolve(result);
        });
    });
}