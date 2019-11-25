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
    async mkdir(params) {
        let fileFullPath = this.getDirPath(params.path);
        try {
            let res = fs.mkdirSync(fileFullPath);
            return {
                success: true,
                response: true
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                msgDesc: '目录创建失败！'
            }
        }
    },

    async writeFile(params) {
        let opts = {
            cwd: __dirname,
            encoding: 'utf8',
            stdio: [process.stdin, process.stdout, process.stderr]
        }
        let fileFullName = this.getFullPath(params.path); //"../config/db/collections.js"
        try {
            fs.writeFileSync(fileFullName, params.data, opts); //c:\\demo\a.txt
            return {
                success: true,
                response: true
            }
        } catch (error) {
            // 文件夹不存在，或者权限错误(须可读写)
            console.log(error);
            return {
                success: false,
                msgDesc: '保存数据失败！'
            }
        }
    },
    async openFile(params) {
        let fileFullName = this.getFullPath(params.path);
        try {
            let filedata = fs.readFileSync(fileFullName, 'utf-8');
            return {
                success: true,
                response: filedata
            }
        } catch (error) {
            console.log(error);
            return {
                success: true,
                response: false
            }
        }

    }
}

module.exports = ({ data }) => {
    console.log('files', data)
    return new Promise((resolve, reject) => {

        dbFun[data.type](data).then(result => {
            resolve(result);
        });
    });
}
