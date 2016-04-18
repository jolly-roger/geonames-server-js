'use strict';

const fs = require('fs');
const path = require('path');
const config = require('config');
const unzip = require('unzip2');


const emitter = require('../eventEmitter');
const common = require('./common');


const dataConfig = config.get('data');
const unzipStatusFile = path.join(__dirname, dataConfig.dir, 'unzip-status.json');
let unzipStatus = {};


function initUnzipStatus() {
    return new Promise((resolve, reject) => {
        fs.readFile(unzipStatusFile, (err, data) => {
            if (err) {
                resolve(generateInitUnzipStatus());
            }
            
            try {
                resolve(JSON.parse(data));
            } catch (ex) {
                resolve(generateInitUnzipStatus());
            }
        });
    });
}

function verifyInitUnzipStatus(initUnzipStatus) {
    return Promise.all(Object.keys(initUnzipStatus).map((fileId) => {
        return new Promise((resolve, reject) => {
            let file = initUnzipStatus[fileId];

            fs.stat(getTarget(file.fileName), (err, stat) => {
                if (err) {
                    file.progress = 0
                }
                
                resolve(file);
            })
        });
    }));
}

function generateInitUnzipStatus() {
    let initUnzipStatus = {};
                
    dataConfig.files.forEach((file) => {
        let fileId = common.getFileId(file.target);
       
        if (file.target.toLowerCase().indexOf('.zip') > -1) {
            initUnzipStatus[fileId] = {
                fileName: file.target,
                progress: 0
            };
        }
    });
    
    return initUnzipStatus;
}

function unzipFile(source) {
    return new Promise((resolve, reject) => {
        let fileName = source.split(path.sep).pop();
        let unzipedSize = 0;
        let prevProgress = 0;
        let currProgress = 0;
        
        fs.stat(source, (err, stat) => {
            if (err) {
                resolve();
            }
            
            let file = fs.createReadStream(source);
            //let file = fs.createWriteStream(target);
        
            file.on('error', (err) => {
                console.log(err);
                
                resolve();
            });
            
            file.on('data', (chunk) => {
                let fileId = common.getFileId(fileName);
                
                unzipedSize += parseInt(chunk.length);
                currProgress = Math.round((unzipedSize / stat.size * 100));

                if (currProgress > prevProgress) {
                    prevProgress = currProgress;
                    
                    unzipStatus[fileId].progress = currProgress;

                    emitter.emit('unzip-progress', unzipStatus);
                }
            });
            
            file.pipe(unzip.Extract({
                path: path.join(__dirname, dataConfig.dir, 'zip',
                    fileName.toLowerCase().replace('.zip', ''))
            }))
            .on('error', (err) => {
                console.log(err);

                resolve();
            })
            .on('finish', () => {
                resolve();
            });
        });
    });
}

function getTarget(target) {
    return path.join(__dirname, dataConfig.dir, 'txt', target.toLowerCase().replace('.zip', '.txt'));
}

function getSource(source) {
    return path.join(__dirname, dataConfig.dir, 'zip', source);
}

module.exports = {
    unzipData: function () {
        return initUnzipStatus()
            .then((initUnzipStatus) => {
                return verifyInitUnzipStatus(initUnzipStatus);
            })
            .then((verifiedInitUnzipStatus) => {
                let initUnzipStatus = {};
                
                verifiedInitUnzipStatus.forEach((file) => {
                    initUnzipStatus[common.getFileId(file.fileName)] = file;
                });
                
                return initUnzipStatus;
            })
            .then((initUnzipStatus) => {
                unzipStatus = initUnzipStatus;
                
                let zipFiles = [];
                
                dataConfig.files.forEach((file) => {
                    if (file.target.toLowerCase().indexOf('.zip') > -1) {
                        zipFiles.push(file);
                    }
                });
                
                Promise.all(zipFiles.map((file) => {
                    let fileId = common.getFileId(file.target);
                    
                    if (unzipStatus[fileId].progress != 100) {
                        return unzipFile(getSource(file.target));
                    } else {
                        return Promise.resolve();
                    }
                }))
                .then(() => {
                    fs.writeFile(unzipStatusFile, JSON.stringify(unzipStatus), (err) => {});
                    
                    emitter.emit('unzip-progress', unzipStatus);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getUnzipSatatus: function() {
        return initUnzipStatus()
            //.then((initUnzipStatus) => {
            //    return verifyInitUnzipStatus(initUnzipStatus);
            //})
            //.then((verifiedInitUnzipStatus) => {
            //    let initUnzipStatus = {};
            //    
            //    verifiedInitUnzipStatus.forEach((file) => {
            //        initUnzipStatus[common.getFileId(file.fileName)] = file;
            //    });
            //    
            //    return initUnzipStatus;
            //})
            .catch((err) => {
                console.log(err);
            });
    }
};