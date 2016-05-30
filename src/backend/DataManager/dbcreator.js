'use strict';

const mysql = require('mysql');


const DBCommands = require('./DBCommands');


module.exports = {
    createTables: function(credentials) {
        return new Promise((resolve, reject) => {
            let conn= mysql.createConnection(credentials);
               
            conn.connect(function(err) {
                if (err) {
                    return reject(err);
                }
               
                console.log('connected as id ' + conn.threadId);
                
                DBCommands.reduce(function (p, command) {
                    return p.then(function () {
                        return new Promise((resolve, reject) => {
                            conn.query(command.drop, function (err, results, fields) {
                            if (err) {
                                return reject(err);
                            }
                            
                            conn.query(command.create, function (err, results, fields) {
                                if (err) {
                                    return reject(err);
                                }
                                
                                console.log('execute ', results);
                            
                                resolve();
                            });
                        });
                    });
                    });
                }, Promise.resolve());
            });
        });
    }
};

