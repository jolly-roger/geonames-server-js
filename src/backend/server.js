'use strict';

const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');
const config = require('config');

const downloader = require('./downloader');
const emitter = require('./eventEmitter');


const serverConfig = config.get('server');
const usersConfig = config.get('users');
const pathToWeb = path.join(__dirname, '../../dist');
const indexFile = path.join(pathToWeb, 'index.html');


module.exports = function () {
    const app = express();
    const server = http.Server(app);
    const io = socket(server);
    
    app.get('/api/login/:email/:pass', (req, res) => {
        let user = usersConfig[req.params.email];
        
        if (user && user == req.params.pass) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
    
    app.get('/api/import/download-status', (req, res) => {
        downloader();
        
        res.send();
    });
    
    app.get('/api/import/download', (req, res) => {
        downloader();
        
        res.send();
    });
    
    app.use(express.static(pathToWeb), (req, res) => {
        res.sendFile(indexFile);
    });
    
    io.on('connection', function (socket) {
        emitter.on('download-progress', (msg) => {
            socket.emit('download-progress', msg);
        });
        
        //socket.emit('news', { hello: 'world' });
        //socket.on('my other event', function (data) {
        //    console.log(data);
        //});
    });
    
    server.listen(serverConfig.port);
    
    console.log('Server started on localhost', serverConfig.port);
};