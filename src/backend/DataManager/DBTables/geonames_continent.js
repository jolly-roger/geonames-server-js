'use strict';

module.exports = {
    name: 'geonames_continent',
    create: `CREATE TABLE geonames_continent (
        code CHAR(2) NOT NULL,
        name VARCHAR(20) NOT NULL,
        geoname_id INT(10) UNSIGNED NOT NULL,
        KEY code (code),
        KEY name (name),
        KEY geoname_id (geoname_id)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;`,
    drop: `drop table if exists geonames_continent;`
};