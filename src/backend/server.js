'use strict';

const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');
const config = require('config');
const bodyParser = require('body-parser');

const dataManager = require('./DataManager');
const emitter = require('./eventEmitter');


const serverConfig = config.get('server');
const usersConfig = config.get('users');
const pathToWeb = path.join(__dirname, '../../dist');
const indexFile = path.join(pathToWeb, 'index.html');


const jsonParser = bodyParser.json()


module.exports = function () {
    const app = express();
    const server = http.Server(app);
    const io = socket(server);
    
    //app.use(body_parser.json());
    //app.use(body_parser.urlencoded({
    //    extended: true
    //}));
    
    app.get('/api/login/:email/:pass', (req, res) => {
        let user = usersConfig[req.params.email];
        
        if (user && user == req.params.pass) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
    
    app.get('/api/import/download-data', (req, res) => {
        dataManager.downloadData();
        
        res.send();
    });
    
    app.get('/api/import/get-data-status', (req, res) => {
        dataManager.getDataSatatus()
        .then((dataStatus) => {
            res.send(dataStatus);
        });
    });
    
    app.get('/api/import/unzip-data', (req, res) => {
        dataManager.unzipData();
        
        res.send();
    });
    
    app.get('/api/import/get-unzip-status', (req, res) => {
        dataManager.getUnzipSatatus()
        .then((unzipStatus) => {
            res.send(unzipStatus);
        });
    });
    
    app.post('/api/import/create-tables', jsonParser, (req, res) => {
        dataManager.createTables(req.body)
        .then(() => {
            res.send();
        })
        .catch((err) => {
            res.status(500).send({'error': err.toString()});
        });
    });
    
    app.post('/api/import/load-data', jsonParser, (req, res) => {
        dataManager.loadData(req.body)
        .then(() => {
            res.send();
        })
        .catch((err) => {
            res.status(500).send({'error': err.toString()});
        });
    });
    
    app.use(express.static(pathToWeb), (req, res) => {
        res.sendFile(indexFile);
    });
    
    io.on('connection', function (socket) {
        emitter.on('download-progress', (msg) => {
            socket.emit('download-progress', msg);
        });
        
        emitter.on('unzip-progress', (msg) => {
            socket.emit('unzip-progress', msg);
        });
        
        //socket.emit('news', { hello: 'world' });
        //socket.on('my other event', function (data) {
        //    console.log(data);
        //});
    });
    
    server.listen(serverConfig.port);
    
    console.log('Server started on localhost', serverConfig.port);
};