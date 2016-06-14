'use strict';


const dal = require('./dal');


module.exports = {
    loadData: function(credentials) {
         return dal.connection.getConnection(credentials)
        .then(function (conn) {
            return conn.connect();
        })
        .then(function (conn) {
            return conn.query(`
                SET @old_myisam_sort_buffer_size = @@myisam_sort_buffer_size;
                SET @old_myisam_max_sort_file_size = @@myisam_max_sort_file_size;
                SET @old_key_buffer_size = @@key_buffer_size;
                SET SESSION myisam_sort_buffer_size = 256*1024*1024; -- 256 MB
                SET GLOBAL myisam_max_sort_file_size = 16*1024*1024*1024; -- 16 GB
                SET GLOBAL repair_cache.key_buffer_size = 1024*1024*1024; -- 1 GB
                
                LOAD DATA LOCAL INFILE '/home/roger/projects/github/geonames-server-js/data/zip/allcountries/allCountries.txt'
                  INTO TABLE geonames_geoname;
                LOAD DATA LOCAL INFILE '/home/roger/projects/github/geonames-server-js/data/zip/no-country/null.txt'
                  INTO TABLE geonames_geoname;
                
                LOAD DATA LOCAL INFILE '/home/roger/projects/github/geonames-server-js/data/zip/hierarchy/hierarchy.txt'
                  INTO TABLE geonames_hierarchy;
                
                LOAD DATA LOCAL INFILE '/home/roger/projects/github/geonames-server-js/data/zip/alternatenames/iso-languagecodes.txt'
                  INTO TABLE geonames_iso_language
                  IGNORE 1 LINES;
                
                LOAD DATA LOCAL INFILE '/home/roger/projects/github/geonames-server-js/data/zip/alternatenames/alternateNames.txt'
                  INTO TABLE geonames_alternate_name;
                
                LOAD DATA LOCAL INFILE '/home/roger/projects/github/geonames-server-js/data/txt/continents.txt'
                  INTO TABLE geonames_continent
                  FIELDS TERMINATED BY ',';
                
                LOAD DATA LOCAL INFILE '/home/roger/projects/github/geonames-server-js/data/txt/countryInfo.txt'
                  INTO TABLE geonames_country
                   IGNORE 51 LINES;
                
                LOAD DATA LOCAL INFILE '/home/roger/projects/github/geonames-server-js/data/txt/admin1CodesASCII.txt'
                  INTO TABLE geonames_admin_code_ascii;
                LOAD DATA LOCAL INFILE '/home/roger/projects/github/geonames-server-js/data/txt/admin2Codes.txt'
                  INTO TABLE geonames_admin_code;
                
                LOAD DATA LOCAL INFILE '/home/roger/projects/github/geonames-server-js/data/txt/featureCodes_en.txt'
                  INTO TABLE geonames_feature;
                
                LOAD DATA LOCAL INFILE '/home/roger/projects/github/geonames-server-js/data/txt/timeZones.txt'
                  INTO TABLE geonames_timezone
                  IGNORE 1 LINES;
                
                LOAD DATA LOCAL INFILE '/home/roger/projects/github/geonames-server-js/data/zip/postalcodes/allCountries.txt'
                  INTO TABLE geonames_postal_code;
                
                SET SESSION myisam_sort_buffer_size = @old_myisam_sort_buffer_size;
                SET GLOBAL myisam_max_sort_file_size = @old_myisam_max_sort_file_size;
                SET GLOBAL repair_cache.key_buffer_size = @old_key_buffer_size;
                `
            );
        })
        .then(function(result) {
            console.log(result.results);
        });
    }
};