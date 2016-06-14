'use strict';


const dal = require('./dal');


module.exports = {
    loadData: function(credentials) {
        //let myisamSortBufferSize;
        //let myisamMaxSortFileSize;
        //let keyBufferSize;
        
        return dal.connection.getConnection(credentials)
        .then(function (conn) {
            return conn.connect();
        })
        //.then(function (conn) {
        //    return conn.query(dal.commands.getDefaultConfig);
        //})
        //.then(function (result) {
        //    myisamSortBufferSize = result.results[0]['@@myisam_sort_buffer_size'];
        //    myisamMaxSortFileSize = result.results[0]['@@myisam_max_sort_file_size'];
        //    keyBufferSize = result.results[0]['@@key_buffer_size'];
        //
        //    return result.connection;
        //})
        //.then(function (conn) {
        //    return conn.query(dal.commands.setPerformanceConfig);
        //})
        //.then((result) => result.connection)
        .then(function (conn) {
            return conn.query(`
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
                  INTO TABLE geonames_postal_code;`);
        });
        //.then(function (conn) {
        //    return conn.query(dal.commands.setDefaultConfig, [myisamSortBufferSize, myisamMaxSortFileSize, keyBufferSize]);
        //});
    }
};