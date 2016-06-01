'use strict';

module.exports = {
    name: 'geonames_iso_language',
    create: `CREATE TABLE geonames_iso_language (
        iso_639_3 CHAR(3) NOT NULL,
        iso_639_2 VARCHAR(16) NOT NULL,
        iso_639_1 CHAR(2) NOT NULL,
        language_name VARCHAR(256) NOT NULL,
        KEY iso_639_3 (iso_639_3),
        KEY iso_639_2 (iso_639_2),
        KEY iso_639_1 (iso_639_1)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;`,
    drop: `drop table if exists geonames_iso_language;`
};