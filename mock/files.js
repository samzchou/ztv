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
	// 创建目录
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
	// 写入文件
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
	// 打开文件
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
    },
	// 删除文件
	async removeFile(params){
		params.filepath.forEach(path=>{
			fs.unlink(path, (err)=>{
				if(err){
					throw err;
				}
				console.log('文件:'+path+'删除成功！');
			})
		})
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
