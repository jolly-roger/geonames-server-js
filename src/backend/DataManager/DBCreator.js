'use strict';

const mysql = require('mysql');


const DBTables = require('./DBTables');


module.exports = {
    createTables: function(credentials) {
        return new Promise((resolve, reject) => {
            let conn= mysql.createConnection(credentials);
               
            conn.connect(function(err) {
                if (err) {
                    return reject(err);
                }
               
                console.log('connected as id ' + conn.threadId);
                
                DBTables.reduce(function (p, table) {
                    return p.then(function () {
                        return new Promise((resolve, reject) => {
                            conn.query(table.drop, function (err, results, fields) {
                                if (err) {
                                    console.log('Table', table.name, 'drop command error:', err);
                                    
                                    return reject(err);
                                }
                                
                                console.log('Table', table.name, 'drop command result:', results);
                                
                                conn.query(table.create, function (err, results, fields) {
                                    if (err) {
                                        console.log('Table', table.name, 'create command error:', err);
                                        
                                        return reject(err);
                                    }
                                    
                                    console.log('Table', table.name, 'create command result:', results);
                                
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

