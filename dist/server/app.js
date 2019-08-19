"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var routes_1 = require("./routes");
var websocket_1 = require("./websocket");
var expressWs = require('express-ws')(express());
var app = expressWs.app;
exports.app = app;
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var mongodbURI;
if (process.env.NODE_ENV === 'test') {
    mongodbURI = process.env.MONGODB_TEST_URI;
}
else {
    mongodbURI = process.env.MONGODB_URI;
    app.use(morgan('dev'));
}
mongoose.Promise = global.Promise;
var mongodb = mongoose.connect(mongodbURI, { useMongoClient: true });
mongodb
    .then(function (db) {
    console.log('Connected to MongoDB on', db.host + ':' + db.port);
    routes_1.default(app);
    websocket_1.default(app);
    if (!module.parent) {
        app.listen(app.get('port'), '0.0.0.0', function () {
            console.log('Server listening on port ' + app.get('port'));
        });
    }
})
    .catch(function (err) {
    console.error(err);
});
var HashMap = require('hashmap');
var map = new HashMap();
app.userSig = map;
//# sourceMappingURL=app.js.map