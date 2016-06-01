const downloader = require('./downloader');
const unzipper = require('./unzipper');
const DBCreator = require('./DBCreator');
const DBDataLoader = require('./DBDataLoader');


module.exports = {
    downloadData: downloader.downloadData,
    getDataSatatus: downloader.getDataSatatus,
    unzipData: unzipper.unzipData,
    getUnzipSatatus: unzipper.getUnzipSatatus,
    createTables: DBCreator.createTables,
    loadData: DBDataLoader.loadData
};