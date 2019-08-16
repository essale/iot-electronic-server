"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var app_1 = require("./app");
var onChange = false;
var wsUsers = [];
var sendClientList = function () {
    // build users list
    var users = [];
    wsUsers.forEach(function (wsUser) {
        users.push({
            _id: wsUser.id,
            email: wsUser.email,
            username: wsUser.username,
            role: wsUser.role
        });
    });
    wsUsers.forEach(function (client) {
        // send message to all admins
        if (client.role === 'admin' && client.ws.readyState == 1 /* OPEN */) {
            client.ws.send(JSON.stringify({
                type: 'list',
                message: users
            }));
        }
    });
};
var sendSigList = function (ws) {
    setInterval(function () {
        userSigOnChange(ws);
    }, 10000);
};
var userSigOnChange = function (ws) {
    console.log(ws.readyState);
    if (ws.readyState == 1 /* OPEN */) {
        ws.send(JSON.stringify({
            type: 'sig',
            message: app_1.app.userSig
        }));
    }
};
function convertToSigUserList(userSig) {
    var userSigList = [];
    app_1.app.userSig.forEach(function (value, key) {
        userSig = { username: key, amount: value };
        userSigList.push(userSig);
    });
    return userSigList;
}
var keepalive = function (ws) {
    if (ws.readyState == 1 /* OPEN */) {
        var sigUsers = convertToSigUserList(app_1.app.userSig);
        console.log(sigUsers);
        ws.send(JSON.stringify({
            type: 'keepalive',
            message: sigUsers
        }));
    }
    else {
        handleLogout(ws);
    }
};
var ping = function (ws) {
    if (ws.readyState == 1 /* OPEN */) {
        ws.send(JSON.stringify({
            type: 'ping',
            message: 'pong'
        }));
    }
};
var handleLogout = function (ws) {
    wsUsers.forEach(function (client) {
        // remove disconnected users
        if (client.ws.readyState != 1 /* OPEN */ || ws === client.ws) {
            clearInterval(client.keepalive);
            wsUsers.splice(wsUsers.indexOf(client), 1);
        }
    });
    sendClientList();
};
var handleLogin = function (ws, token) {
    jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
        if (err) {
            return;
        }
        console.log('user connected', decoded.user.username);
        wsUsers.push({
            ws: ws,
            keepalive: setInterval(function () {
                keepalive(ws);
            }, 10000),
            id: decoded.user.id,
            username: decoded.user.username,
            email: decoded.user.email,
            role: decoded.user.role,
        });
        sendClientList();
    });
};
var handleSigAdd = function (ws, msg) {
    console.log('sig list for users', app_1.app.userSig);
    sendSigList(ws);
};
function setWebSocket(app) {
    app.ws('/ws', function (ws, req, next) {
        console.log('connect ws');
        ws.on('message', function (data) {
            var msg = JSON.parse(data);
            switch (msg.type) {
                case 'login': {
                    handleLogin(ws, msg.message);
                    break;
                }
                case 'sig': {
                    handleSigAdd(ws, msg.message);
                    break;
                }
                case 'list': {
                    sendClientList();
                    break;
                }
                case 'ping': {
                    wsUsers.forEach(function (client) {
                        if (client.email === msg.message) {
                            ping(client.ws);
                        }
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        });
        next();
    });
}
exports.default = setWebSocket;
//# sourceMappingURL=websocket.js.map