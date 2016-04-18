const downloader = require('./downloader');
const unzipper = require('./unzipper');


module.exports = {
    downloadData: downloader.downloadData,
    getDataSatatus: downloader.getDataSatatus,
    unzipData: unzipper.unzipData,
    getUnzipSatatus: unzipper.getUnzipSatatus
};