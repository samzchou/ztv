/* eslint-disable */
const path = require('path');
const express = require('express');
const router = express.Router();

router.all("*", (req, res, next) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    try {
        let module_path = path.posix.join('../mock', req.path);
        let module = require(module_path);

        // 清除该require缓存
        delete require.cache[require.resolve(module_path)];
        if (typeof module === 'function') {
            //console.log('module_path', req)
            module = module(JSON.parse(req.body));
            if (module instanceof Promise) {
                module.then(value => {
                    res.end(JSON.stringify(value));
                }, value => {
                    res.end(JSON.stringify(value));
                });
            } else {
                res.end(JSON.stringify(module));
            }
        } else {
            res.end(JSON.stringify(module));
        }
    } catch (e) {
        res.end(JSON.stringify({
            success: false,
            code: e.code
        }));
    }
});

module.exports = router;
