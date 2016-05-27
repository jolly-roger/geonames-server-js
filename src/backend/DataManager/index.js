const downloader = require('./downloader');
const unzipper = require('./unzipper');
const dbcreator = require('./dbcreator');


module.exports = {
    downloadData: downloader.downloadData,
    getDataSatatus: downloader.getDataSatatus,
    unzipData: unzipper.unzipData,
    getUnzipSatatus: unzipper.getUnzipSatatus,
    createTables: dbcreator.createTables
};