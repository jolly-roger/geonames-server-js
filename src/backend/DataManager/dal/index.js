'use strict';

const tables = require('./tables');
const connection = require('./connection');
const commands = require('./commands');


module.exports = {
    tables: tables,
    connection: connection,
    commands: commands
};