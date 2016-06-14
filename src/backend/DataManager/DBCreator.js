'use strict';


const dal = require('./dal');


module.exports = {
    createTables: function(credentials) {
        return dal.connection.getConnection(credentials)
        .then(function (conn) {
            return conn.connect();
        })
        .then(function (conn) {
           
            console.log('connected as id ' + conn.threadId);
            
            return dal.tables.reduce(function (p, table) {
                return p.then(function () {
                    return new Promise((resolve, reject) => {
                        conn.query(table.drop)
                        .then(function (result) {
                            console.log('Table', table.name, 'drop command result:', result.results);
                            
                            result.connection.query(table.create)
                            .then(function (result) {
                                console.log('Table', table.name, 'create command result:', result.results);
                                
                                resolve();
                            })
                            .catch(function (err) {
                                console.log('Table', table.name, 'create command error:', err);
                                
                                reject(err);
                            });
                        })
                        .catch(function(err) {
                            console.log('Table', table.name, 'drop command error:', err);
                            
                            reject(err);
                        });
                    });
                });
            }, Promise.resolve());
        });
    }
};

