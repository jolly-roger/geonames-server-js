'use strict';

module.exports = {
    name: 'geonames_postal_code',
    create: `CREATE TABLE geonames_postal_code (
        country_code CHAR(2) NOT NULL,
        postal_code VARCHAR(20) NOT NULL,
        place_name VARCHAR(256) NOT NULL,
        admin_name1 VARCHAR(256) NOT NULL,
        admin_code1 VARCHAR(64) NOT NULL,
        admin_name2 VARCHAR(256) NOT NULL,
        admin_code2 VARCHAR(64) NOT NULL,
        admin_name3 VARCHAR(256) NOT NULL,
        admin_code3 VARCHAR(64) NOT NULL,
        latitude DECIMAL(10,7) NULL,
        longitude DECIMAL(11,8) NULL,
        accuracy TINYINT(2) NULL,
        KEY country_code (country_code),
        KEY postal_code (postal_code),
        KEY place_name (place_name),
        KEY latitude (latitude),
        KEY longitude (longitude)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;`,
    drop: `drop table if exists geonames_postal_code;`
};