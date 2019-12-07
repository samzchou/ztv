/* eslint-disable */
const express = require("express");
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const mineType = require('mime-types');
//const http = require('http');


function getExt(filename) {
    var index = filename.lastIndexOf(".");
    return filename.substr(index + 1);
}
router.post("*", (req, res, next) => {
	res.writeHead(200, {
		"Content-Type": "application/json"
	});
	//console.log(req.body);
	if(req.body.type == "cp"){ // 复制剪切文件
		//console.log('filepath', req.body.filepath);
		let fileList = req.body.fileList;
		//console.log('fileList', fileList);
		let output = [];
		fileList.forEach(item=>{
			let ext = getExt(item.d_docname);
			item.to = './files/'+req.body.topath + '/' + Date.now() + '.' + ext;
			output.push(item);
			let fromFile = fs.readFileSync(item.d_docname);
			fs.writeFileSync(item.to, fromFile);
			if(req.body.act == "cut"){
				fs.unlinkSync(item.d_docname);
			}
		})
		res.end(
			JSON.stringify({
				success: true,
				response: output
			})
		);
		
	}
});

router.get("*", (req, res, next) => {
    try {
        var readStream = fs.createReadStream(req.query.filepath); //得到文件输入流
        if (req.query.type == "download") { // 下载文件
			let ext = getExt(req.query.filepath);
            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                'Content-Disposition': 'attachment; filename=' + encodeURI(req.query.filename) + '.' + ext //告诉浏览器这是一个需要下载的文件
            });
			//console.log(req.query.filepath, encodeURI(req.query.filename))
            readStream.on('data', (chunk) => {
                res.write(chunk, 'binary'); //文档内容以二进制的格式写到response的输出流
            });
            readStream.on('end', () => {
                res.end();
            });
        } else { // 输出base64 文件流
            let filePath = req.query.filepath;
            let data = fs.readFileSync(filePath); //req.query.filepath
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