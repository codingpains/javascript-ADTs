var express        = require('express'),
    path           = require('path'),
    compression    = require("compression"),
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    http           = require('http'),
    mainApp,
    server;

mainApp = express();

mainApp.use(bodyParser.urlencoded({extended: true}));
mainApp.use(bodyParser.json());

mainApp.use(express.static(__dirname + '/assets'));

mainApp.get('/', function(req, res) {
    res.sendFile(__dirname + '/semaphores.html');
});

mainApp.use(function handleNotFound(req, res, next) {
    res.status(404).send('Not found');
});

mainApp.use(function handleServerErrors(error, req, res, next) {
    console.log("\nServer catched error, ", error, error.stack);
    res.status(500);
    res.json({
        message : "Unknown error :("
    });
});

server = http.createServer(mainApp);

server.listen(3000);
console.log('Server ready and listening');

process.on('SIGTERM', function handleSigterm(e) {
    console.log('SIGTERM catched ', e);
    server.close();
});