module.exports = {
    getFileId: function (fileName) {
        return fileName.replace('.', '-');
    }
}