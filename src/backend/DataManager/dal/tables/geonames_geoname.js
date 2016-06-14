'use strict';

module.exports = {
    name: 'geonames_geoname',
    create: `CREATE TABLE geonames_geoname (
            geoname_id INT(10) UNSIGNED NOT NULL COMMENT
                'integer id of record in geonames database',
            name VARCHAR(200) NOT NULL COMMENT
                'name of geographical point (utf8)',
            ascii_name VARCHAR(200) NOT NULL COMMENT
                'name of geographical point in plain ascii characters',
            alternate_name TEXT COMMENT
                'alternatenames, comma separated, ascii names automatically transliterated, convenience attribute from alternatename table',
            latitude DECIMAL(10,8) NULL COMMENT
                'latitude in decimal degrees (wgs84)',
            longitude DECIMAL(11,8) NULL COMMENT
                'longitude in decimal degrees (wgs84)',
            feature_class CHAR(1) NOT NULL COMMENT
                'see http://www.geonames.org/export/codes.html',
            feature_code VARCHAR(10) NOT NULL COMMENT
                'see http://www.geonames.org/export/codes.html',
            country_code VARCHAR(2) NOT NULL COMMENT
                'ISO-3166 2-letter country code',
            cc2 VARCHAR(60) NOT NULL COMMENT
                'alternate country codes, comma separated, ISO-3166 2-letter country code',
            admin1 VARCHAR(20) NOT NULL COMMENT
                'fipscode (subject to change to iso code), see exceptions below, see file admin1Codes.txt for display names of this code',
            admin2 VARCHAR(80) NOT NULL COMMENT
                'code for the second administrative division, a county in the US, see file admin2Codes.txt',
            admin3 VARCHAR(20) NOT NULL COMMENT
                'code for third level administrative division',
            admin4 VARCHAR(20) NOT NULL COMMENT
                'code for fourth level administrative division',
            population INT(8) UNSIGNED NOT NULL,
                elevation INT(10) NOT NULL DEFAULT 0 COMMENT 'in meters',
            gtopo30 VARCHAR(16) NOT NULL COMMENT
                'digital elevation model, srtm3 or gtopo30, average elevation of 3''x3'' (ca 90mx90m) or 30''x30'' (ca 900mx900m) area in meters, integer. srtm processed by cgiar/ciat',
            timezone VARCHAR(40) NOT NULL,
            mod_date DATE NULL COMMENT
                'date of the last modification in yyyy-MM-dd format',
            KEY geoname_id (geoname_id),
            KEY name (name),
            KEY ascii_name (ascii_name),
            KEY latitude (latitude),
            KEY longitude (longitude),
            KEY feature_class (feature_class),
            KEY feature_code (feature_code),
            KEY country_code (country_code)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;`,
    drop: `drop table if exists geonames_geoname;`
};