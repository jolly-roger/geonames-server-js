'use strict';

module.exports = {
    name: 'geonames_timezone',
    create: `CREATE TABLE geonames_timezone (
        country_code CHAR(2) NULL,
        timezone VARCHAR(48) NOT NULL,
        gmt_offset DECIMAL(4,2) NULL,
        dst_offset DECIMAL(4,2) NULL,
        raw_offset DECIMAL(4,2) NULL,
        KEY country_code (country_code),
        KEY timezone (timezone)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;`,
    drop: `drop table if exists geonames_timezone;`
};