'use strict';

const mysql = require('mysql');


module.exports = {
    createTables: function(credentials) {
        return new Promise((resolve, reject) => {
            let conn= mysql.createConnection(credentials);
               
            conn.connect(function(err) {
                if (err) {
                    return reject(err);
                }
               
                console.log('connected as id ' + conn.threadId);
                
                resolve();
            });
        });
    }
};

