/* eslint-disable */
'use strict';
var dbServer = require('./index');
const mongoose = require('mongoose');

// 连接数据库
var myUri = 'mongodb://' + dbServer.dbConect.dataUrl + ':' + dbServer.dbConect.dataPort + '/' + dbServer.dbConect.dataName;
if (dbServer.dbConect.username && dbServer.dbConect.password) {
    myUri = myUri = 'mongodb://' + dbServer.dbConect.username + ':' + dbServer.dbConect.password + '@' + dbServer.dbConect.dataUrl + ':' + dbServer.dbConect.dataPort + '/' + dbServer.dbConect.dataName;
}
//useFindAndModify: false
const optionsMongoose = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

mongoose.Promise = Promise;
mongoose.connect(myUri, optionsMongoose);

// 为这次连接绑定事件
const connect = mongoose.connection;
connect.once('error', (err) => console.log('Mongo connection error', myUri, err));
connect.once('open', () => console.log('Mongo connection successed', myUri));

/**cnpm install mongoose@5.2.8 --save 需要此版本以上 否则会有警告*/
//const autoIncrement = require('mongoose-auto-increment');
//autoIncrement.initialize(connect);
var Schema = mongoose.Schema;

// 循环实例化集合
var collections = Object.keys(dbServer.collections);
collections.forEach(item => {
    var colScheme = new Schema(dbServer.collections[item], {
        "collection": item
    });
    exports[item] = connect.model(item, colScheme);
});
exports.connect = connect;