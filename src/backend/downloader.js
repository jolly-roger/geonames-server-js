'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('config');


const emitter = require('./eventEmitter');


const dataConfig = config.get('data');
const dataStatusFile = path.join(__dirname, dataConfig.dir, 'data-status.json');
let dataStatus = {};


function initDataStatus() {
    return new Promise((resolve, reject) => {
        fs.readFile(dataStatusFile, (err, data) => {
            if (err) {
                resolve(generateInitDataStatus());
            }
            
            try {
                resolve(JSON.parse(data));
            } catch (ex) {
                resolve(generateInitDataStatus());
            }
        });
    });
}

function verifyInitDataStatus(initDataStatus) {
    return Promise.all(Object.keys(initDataStatus).map((fileId) => {
        return new Promise((resolve, reject) => {
            let file = initDataStatus[fileId];

            fs.stat(getTarget(file.fileName), (err, stat) => {
                if (err) {
                    file.progress = 0
                }
                
                resolve(file);
            })
        });
    }));
}

function generateInitDataStatus() {
    let initDataStatus = {};
                
    dataConfig.files.forEach((file) => {
        let fileId = getFileId(file.target);
       
        initDataStatus[fileId] = {
            fileName: file.target,
            progress: 0
        };
    });
    
    return initDataStatus;
}

function getFileId(fileName) {
    return fileName.replace('.', '-');
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        let file = fs.createWriteStream(dest);
        let request = http.get(url, (response) => {
            let size = parseInt(response.headers['content-length']);
            let downloadedSize = 0;
            let fileName = dest.split(path.sep).pop();
            let prevProgress = 0;
            let currProgress = 0;

            response.pipe(file);
            
            response.on('data', (chunk) => {
                let fileId = getFileId(fileName);
                
                downloadedSize += parseInt(chunk.length);
                currProgress = Math.round((downloadedSize / size * 100));

                if (currProgress > prevProgress) {
                    prevProgress = currProgress;
                    
                    dataStatus[fileId].progress = currProgress;

                    emitter.emit('download-progress', dataStatus);
                }
            });
            
            file.on('finish', function() {
                file.close(() => resolve());
            });
        }).on('error', (err) => {
            fs.unlink(dest);
            reject(err.message);
        });
    });
}

function getSource(source) {
    return (source.toLowerCase().indexOf('.zip') > -1) ?
            dataConfig.sourceZip + '/' + source
        :
            dataConfig.sourceDump + '/' + source
    ;
}

function getTarget(target) {
    return (target.toLowerCase().indexOf('.zip') > -1) ?
            path.join(__dirname, dataConfig.dir, 'zip', target)
        :
            path.join(__dirname, dataConfig.dir, 'txt', target)
    ;
}

module.exports = {
    downloadData: function () {
        return initDataStatus()
            .then((initDataStatus) => {
                return verifyInitDataStatus(initDataStatus);
            })
            .then((verifiedInitDataStatus) => {
                let initDataStatus = {};
                
                verifiedInitDataStatus.forEach((file) => {
                    initDataStatus[getFileId(file.fileName)] = file;
                });
                
                return initDataStatus;
            })
            .then((initDataStatus) => {
                dataStatus = initDataStatus;
                
                Promise.all(dataConfig.files.map((file) => {
                    let fileId = getFileId(file.target);
                    
                    if (dataStatus[fileId].progress != 100) {
                        return downloadFile(getSource(file.source), getTarget(file.target));
                    } else {
                        return Promise.resolve();
                    }
                }))
                .then(() => {
                    fs.writeFile(dataStatusFile, JSON.stringify(dataStatus), (err) => {});
                    
                    emitter.emit('download-progress', dataStatus);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getDataSatatus: function() {
        return initDataStatus()
            .then((initDataStatus) => {
                return verifyInitDataStatus(initDataStatus);
            })
            .then((verifiedInitDataStatus) => {
                let initDataStatus = {};
                
                verifiedInitDataStatus.forEach((file) => {
                    initDataStatus[getFileId(file.fileName)] = file;
                });
                
                return initDataStatus;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

//run_unzip_process() {
//	unzip_info
//
//	unzip -o $zipDir/allCountries.zip -d $txtDir/
//
//	unzip -o $zipDir/no-country.zip null.txt -d $zipDir/
//	mv $zipDir/null.txt $txtDir/dependencies.txt
//
//	unzip -o $zipDir/alternateNames.zip -d $txtDir/
//	unzip -o $zipDir/hierarchy.zip -d $txtDir/
//
//	unzip -o $zipDir/postalCodes.zip allCountries.txt -d $zipDir
//	mv $zipDir/allCountries.txt $txtDir/postalCodes.txt
//}
//
//run_clean() {
//	clean_info
//
//	rm -f $zipDir/allCountries.zip
//	rm -f $zipDir/no-country.zip
//	rm -f $zipDir/alternateNames.zip
//	rm -f $zipDir/hierarchy.zip
//	rm -f $zipDir/postalCodes.zip
//}
