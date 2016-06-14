'use strict';

module.exports = {
    getDefaultConfig: 'select @@myisam_sort_buffer_size, @@myisam_max_sort_file_size, @@key_buffer_size;',
    setPerformanceConfig: 'set session myisam_sort_buffer_size = 256*1024*1024, global myisam_max_sort_file_size = 16*1024*1024*1024, ' +
        'global repair_cache.key_buffer_size = 1024*1024*1024;',
    setDefaultConfig: 'set session myisam_sort_buffer_size = ?, global myisam_max_sort_file_size = ?, ' +
        'global repair_cache.key_buffer_size = ?;',
};