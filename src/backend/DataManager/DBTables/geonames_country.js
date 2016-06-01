'use strict';

module.exports = {
    name: 'geonames_country',
    create: `CREATE TABLE geonames_country (
        iso2 CHAR(2) NOT NULL,
        iso3 CHAR(3) NOT NULL,
        iso_numeric INT(10) UNSIGNED NULL,
        fips_code VARCHAR(3) NOT NULL,
        name VARCHAR(256) NOT NULL,
        capital VARCHAR(256) NOT NULL,
        area_in_sq_km double NOT NULL DEFAULT 0,
        population BIGINT(12) UNSIGNED NOT NULL,
        continent_code CHAR(2) NOT NULL,
        tld CHAR(4) NOT NULL,
        currency CHAR(3) NOT NULL,
        currency_name VARCHAR(20) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        postal_code_format VARCHAR(128) NOT NULL,
        postal_code_regex TEXT NOT NULL,
        languages VARCHAR(256) NOT NULL,
        geoname_id INT(10) UNSIGNED NULL,
        neighbours VARCHAR(128) NOT NULL,
        equivalent_fips_code CHAR(10) NOT NULL,
        KEY iso2 (iso2),
        KEY iso3 (iso3),
        KEY iso_numeric (iso_numeric),
        KEY fips_code (fips_code),
        KEY geoname_id (geoname_id),
        KEY continent_code (continent_code),
        KEY name (name)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;`,
    drop: `drop table if exists geonames_country;`
};