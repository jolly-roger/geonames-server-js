'use strict';

module.exports = {
    name: 'geonames_admin_code_ascii',
    create: `CREATE TABLE geonames_admin_code_ascii (
        code CHAR(15) NOT NULL,
        name VARCHAR(256) NOT NULL,
        ascii_name VARCHAR(256) NOT NULL,
        geoname_id INT(10) UNSIGNED NULL,
        KEY code (code),
        KEY name (name),
        KEY ascii_name (ascii_name),
        KEY geoname_id (geoname_id)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;`,
    drop: `drop table if exists geonames_admin_code_ascii;`
};