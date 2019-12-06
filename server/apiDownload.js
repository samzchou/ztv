/* eslint-disable */
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mineType = require('mime-types');
const http = require('http');


function getExt(filename) {
    var index = filename.lastIndexOf(".");
    return filename.substr(index + 1);
}

router.all("*", (req, res, next) => {
    let ext = getExt(req.query.filepath);

    try {
        //console.log(req.query)
        var readStream = fs.createReadStream(req.query.filepath); //得到文件输入流
        if (req.query.type == "download") {
            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                'Content-Disposition': 'attachment; filename=' + encodeURI(req.query.filename) + '.' + ext //告诉浏览器这是一个需要下载的文件
            });

            readStream.on('data', (chunk) => {
                res.write(chunk, 'binary'); //文档内容以二进制的格式写到response的输出流
            });
            readStream.on('end', () => {
                res.end();
            });
        } else {
            /* var url = 'http://image.cache.timepack.cn/nodejs.pdf';
            http.get(url, (result) => {
                var chunks = [];
                var size = 0;
                result.on('data', function(chunk) {
                    chunks.push(chunk);
                    size += chunk.length; //累加缓冲数据的长度
                });
                result.on('end', function(err) {
                    var data = Buffer.concat(chunks, size);
                    var base64Str = data.toString('base64');
                    let base64 = 'data:' + mineType.lookup(url) + ';base64,' + base64Str;
                    res.end(base64);
                });
            }); */

            let filePath = req.query.filepath;
            let data = fs.readFileSync(filePath); //req.query.filepath
            //data = new Buffer(data).toString('base64');
            let bufferData = Buffer.from(data).toString("base64");
            let base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + bufferData;

            res.end(base64);

        }


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