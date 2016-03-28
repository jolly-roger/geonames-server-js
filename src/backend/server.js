'use strict';

const express = require('express');
const path = require('path');
const config = require('config');


const serverConfig = config.get('server');


module.exports = function () {
    const app = express();
    
    app.use(express.static(path.join(__dirname, '../web')));
    
    app.listen(serverConfig.port);
    
    console.log('Server started on localhost', serverConfig.port);
};