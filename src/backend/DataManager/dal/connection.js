'use strict';

const mysql = require('mysql');

var _conn = null;


module.exports = {
    getConnection: function (credentials) {
        credentials.multipleStatements = true;
        
        return new Promise(function (resolve, reject) {
            if (!_conn || (_conn && !compareCredentials(_conn.credentials, credentials))) {
                _conn = new Connection(credentials);
            }
            
            resolve(_conn);
        });
    }
};

function compareCredentials(left, right) {
    return (left.host === right.host && left.database === right.database && left.user === right.user && left.password === right.password);
}

function Connection(credentials) {
    this.credentials = credentials;
    this._conn = mysql.createConnection(credentials);
    this.threadId = null;
}

Connection.prototype.connect = function () {
    return new Promise((resolve, reject) => {
        if (!this.threadId) {
            this._conn.connect((err) => {
                if (err) {
                    console.log(err);
                    
                    reject(err);
                } else {
                    this.threadId = this._conn.threadId;
                    
                    resolve(this);
                }
            });
        } else {
            resolve(this);
        }
    });
};

Connection.prototype.query = function (query) {
    return new Promise((resolve, reject) => {
        this._conn.query(query, (err, results) => {
            if (err) {
                console.log(err);
                
                reject(err);
            } else {
                console.log(results);
            
                resolve({connection: this, results: results});
            }
        });
    });
};