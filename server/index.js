/* eslint-disable */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const {
    Nuxt,
    Builder
} = require('nuxt');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
//const path = require('path');
const isDev = !(process.env.NODE_ENV === 'production');

// Import Nuxt.js options
let config = require('../nuxt.config.js');
let host = config.env.HOST;
let port = config.env.PORT;

// req.body解析
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.text({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

// cookie解析
app.use(cookieParser());
app.set('port', port);

if (!isDev) {
    // 生产环境增加gzip压缩
    app.use(compression());
}

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    // 本地数据跨域响应投设置及路由配置
    app.all('/mock/*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    app.use('/mock', require('./apiRoutes'));

    // 文件上传
    app.all('/upload', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    app.use('/upload', require('./apiUpload'));
    // 文件下载
    app.all('/download', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    app.use('/download', require('./apiDownload'));

    // Build only in dev mode
    if (isDev) {
        const builder = new Builder(nuxt);
        await builder.build();
    }

    // Give nuxt middleware to express
    app.use(nuxt.render);

    // Listen the server
    app.listen(port, host);
    console.log(`Server listening on http://${host}:${port}`) // eslint-disable-line no-console

    // websokcet服务
    const server = require('http').createServer(app);
    let io = require('socket.io').listen(server);

    io.on('connection', (socket) => { // socket相关监听都要放在这个回调里
        socket.on("msg", (obj) => {
            setTimeout(() => {
                console.log('websokcet发送的消息=>' + obj);
                io.emit("msg", obj);
            }, 500);
        });
    });
    //开启websokcet端口监听socket
    server.listen(8989, '0.0.0.0');

}
start();