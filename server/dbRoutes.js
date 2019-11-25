/**
 * mongoDB数据处理后台接口
 */
const express = require('express');
const router = express.Router();
const rendDB = require('../config/db/rendDB');

router.all("*", (req, res, next) => {
  	try {
		res.writeHead(200, {
			'Content-Type': 'application/json'
        });
        let params = JSON.parse(req.body);
        let type = params.type;
        rendDB[type](params).then(result=>{
            result = (typeof result)=='string'?result : JSON.stringify(result);
            res.end(result);
        });

  	} catch (e) {
    	res.end(JSON.stringify({
			success: false,
			code: e.code
    	}));
	}
});

module.exports = router;