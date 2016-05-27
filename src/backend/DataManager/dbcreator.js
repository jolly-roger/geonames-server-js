'use strict';

const mysql = require('mysql');


module.exports = {
    createTables: function(credentials) {
        let conn= mysql.createConnection(credentials);
           
        conn.connect(function(err) {
            if (err) {
              console.error('error connecting: ' + err);
              return;
            }
           
            console.log('connected as id ' + conn.threadId);
        });
    }
};

