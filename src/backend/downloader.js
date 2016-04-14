'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');


const emitter = require('./eventEmitter');


const externalSourceDump = 'http://download.geonames.org/export/dump';
const externalSourceZip = 'http://download.geonames.org/export/zip';
const zipDir = path.join(__dirname, '../../data/zip');
const txtDir = path.join(__dirname, '../../data/txt');
const filesToDownload = [{
        source: externalSourceDump + '/allCountries.zip',
        target: path.join(zipDir, 'allCountries.zip')
    }, {
        source: externalSourceDump + '/no-country.zip',
        target: path.join(zipDir, 'no-country.zip')
    }, {
        source: externalSourceDump + '/alternateNames.zip',
        target: path.join(zipDir, 'alternateNames.zip')
    }, {
        source: externalSourceDump + '/hierarchy.zip',
        target: path.join(zipDir, 'hierarchy.zip')
    }, {
        source: externalSourceZip + '/allCountries.zip',
        target: path.join(zipDir, 'postalCodes.zip')
    }, {
        source: externalSourceDump + '/countryInfo.txt',
        target: path.join(txtDir, 'countryInfo.txt')
    }, {
        source: externalSourceDump + '/admin1CodesASCII.txt',
        target: path.join(txtDir, 'admin1CodesASCII.txt')
    }, {
        source: externalSourceDump + '/admin2Codes.txt',
        target: path.join(txtDir, 'admin2Codes.txt')
    }, {
        source: externalSourceDump + '/timeZones.txt',
        target: path.join(txtDir, 'timeZones.txt')
    }, {
        source: externalSourceDump + '/featureCodes_en.txt',
        target: path.join(txtDir, 'featureCodes_en.txt')
    }];


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
                downloadedSize += parseInt(chunk.length);
                currProgress = Math.round((downloadedSize / size * 100) * 100) / 100;

                if (currProgress > prevProgress) {
                    prevProgress = currProgress;

                    emitter.emit('download-progress', {
                        fileName: fileName,
                        fileId: fileName.replace('.', '-'),
                        progress: currProgress
                    });
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
    Promise.all(filesToDownload.map((fileToDownload) => {
        return downloadFile(fileToDownload.source, fileToDownload.target);
    }))
    .then(() => {
        console.log('Done');
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
