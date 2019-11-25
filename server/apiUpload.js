/* eslint-disable */
const path = require("path");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const multiparty = require("multiparty");

function getExt(filename) {
    var index = filename.lastIndexOf(".");
    return filename.substr(index + 1);
}

router.all("*", (req, res, next) => {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    try {
        //console.log('req', req.file)
        var form = new multiparty.Form();
        var uploadedPath = "./files";
        /* 设置编辑 */
        form.encoding = 'utf-8';
        //设置文件存储路劲
        form.uploadDir = uploadedPath;
        //设置文件大小限制
        form.maxFilesSize = 2 * 1024 * 1024;
        // form.maxFields = 1000;   //设置所有文件的大小总和//上传后处理
        form.parse(req, (err, fields, files) => {
            //console.log('fields', fields)
            //console.log('files', files)
            if (err) {
                //console.log('parse error:' + err);
                res.end(
                    JSON.stringify({
                        success: false
                    })
                );
            } else {
                //if (fields.path) {
                let index = 0,
                    fileArr = [];
                for (let k in files) {
                    index++;
                    let fileObj = files[k][0];
                    let targetPath = fileObj.path; //path.resolve(__dirname, fileObj.path);
                    let ext = getExt(fileObj.originalFilename);
                    let fileName = new Date().getTime() + '-' + index + '.' + ext;

                    let dstPath = uploadedPath + '/' + fileName;
                    if (fields.path) {
                        dstPath = uploadedPath + '/' + fields.path[0] + '/' + fileName;
                    }

                    //console.log('rename', targetPath, dstPath)
                    let err = fs.renameSync(targetPath, dstPath);
                    if (err) {
                        console.log('rename error:' + err);
                    } else {
                        console.log('rename ok');
                        fileObj.filePath = fileName;
                        delete fileObj.fieldName, delete fileObj.path, delete fileObj.headers;
                        fileArr.push(fileObj);
                    }
                    /* fs.rename(targetPath, dstPath, (err) => {
                        if (err) {
                            console.log('rename error:' + err);
                        } else {
                            console.log('rename ok');

                        }
                    }); */
                }
                //}

                res.end(
                    JSON.stringify({
                        success: true,
                        response: fileArr
                    })
                );
            }
        });
    } catch (e) {
        res.end(
            JSON.stringify({
                success: false,
                code: e.code
            })
        );
    }
});

module.exports = router;
