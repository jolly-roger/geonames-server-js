'use strict';

module.exports = {
    getMyisamSortBufferSize: 'select @@myisam_sort_buffer_size;',
    getMyisamMaxSortFileSize: 'select @@myisam_max_sort_file_size;',
    getKeyBufferSize: 'select @@key_buffer_size;'
};