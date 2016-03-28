'use strict';

const express = require('express');
const path = require('path');
const config = require('config');


const serverConfig = config.get('server');
const pathToWeb = path.join(__dirname, '../../build/web');


module.exports = function () {
    const app = express();
    
    app.use(express.static(pathToWeb));
    
    app.listen(serverConfig.port);
    
    console.log('Server started on localhost', serverConfig.port);
};