'use strict';

module.exports = {
    name: 'geonames_feature',
    create: `CREATE TABLE geonames_feature (
        code CHAR(10) NOT NULL,
        name VARCHAR(256) NOT NULL,
        description TEXT,
        KEY code (code),
        KEY name (name)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;`,
    drop: `drop table if exists geonames_feature;`
};