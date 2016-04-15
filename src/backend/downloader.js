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

function generateInitDataStatus() {
    let dataStatus = {};
                
    dataConfig.files.forEach((file) => {
        let fileId = getFileId(file.target);
       
        dataStatus[fileId] = {
            fileName: file.target,
            progress: 0
        };
    });
    
    return dataStatus;
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
                currProgress = Math.round((downloadedSize / size * 100) * 100) / 100;

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

module.exports = function () {
    initDataStatus()
    .then((initDataStatus) => {
        dataStatus = initDataStatus;
        
        Promise.all(dataConfig.files.map((file) => {
            let fileId = getFileId(file.target);
            
            if (dataStatus[fileId].progress != 100) {
                let source = (file.source.toLowerCase().indexOf('.zip') > -1) ?
                        dataConfig.sourceZip + '/' + file.source
                    :
                        dataConfig.sourceDump + '/' + file.source
                ;
                let target = (file.target.toLowerCase().indexOf('.zip') > -1) ?
                        path.join(__dirname, dataConfig.dir, 'zip', file.target)
                    :
                        path.join(__dirname, dataConfig.dir, 'txt', file.target)
                ;
                
                return downloadFile(source, target);
            } else {
                return Promise.resolve();
            }
        }))
        .then(() => {
            fs.writeFile(dataStatusFile, JSON.stringify(dataStatus), (err) => {});
            
            emitter.emit('download-progress', dataStatus);
        });
    });
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
