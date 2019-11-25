/**
 * 封装WebSocket
 */
import io from 'socket.io-client';

class WS {
    constructor(success) {
        this.times = 0;
        this.intervalId;
        this.connectFailed = false;
        this.main();
        this.success = success;
    }
    connect() {
        var url = '127.0.0.1:8989';
        this.webSocket = io("ws://127.0.0.1:8989");
    }
    reconnect() {
        this.webSocket.on('reconnect', (attempt) => {
            console.log('%c%s', 'color:blue;', '=============正在尝试重新连接SOCKET=============' + attempt + '次');
        });
    }
    onopen() {
        this.webSocket.on('connect', (socket) => {
            console.log('%c%s', 'color:purple;', '=============SOCKET服务器已连接=============');
            this.connectFailed = false;
        });
    }

    onclose() {
        this.webSocket.on('disconnect', (reason) => {
            console.log('%c%s', 'color:red;', '=============SOCKET网络连接已断开,正在重新连接=============' + reason);
            socket.connect();
        });
    }

    onerror() {
        this.webSocket.on('error', (socket) => {
            this.connectFailed = true;
            console.log('%c%s', 'color:red;', '=============SOCKET连接异常=============');
        });
    }

    onmessage(callback) {
        this.webSocket.on('msg', (obj) => {
            callback && callback(obj);
        });
    }

    send(info) {
        this.webSocket.emit('msg', info);
    }

    main() {
        this.connect();
        this.onopen();
        this.onclose();
        this.onerror();
    }
}

export default WS;