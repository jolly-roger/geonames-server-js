'use strict';

module.exports = {
    name: 'geonames_alternate_name',
    create: `CREATE TABLE geonames_alternate_name (
        alternate_name_id INT(10) UNSIGNED NOT NULL COMMENT
            'the id of this alternate name',
        geoname_id INT(10) UNSIGNED NULL COMMENT
            'geonameId referring to id in table geoname',
        iso_language VARCHAR(7) NOT NULL COMMENT
            'iso 639 language code 2- or 3-characters; 4-characters \\'post\\' for postal codes and \\'iata\\',\\'icao\\' and faac for airport codes, fr_1793 for French Revolution names,  abbr for abbreviation, link for a website',
        alternate_name VARCHAR(200) NOT NULL COMMENT
            'alternate name or name variant',
        is_preferred_name TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT
            '\\'1\\', if this alternate name is an official/preferred name',
        is_short_name TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT
            '\\'1\\', if this is a short name like \\'California\\' for \\'State of California\\'',
        is_colloquial TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT
            '\\'1\\', if this alternate name is a colloquial or slang term',
        is_historic TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT
            '\\'1\\', if this alternate name is historic and was used in the past',
        KEY alternate_name_id (alternate_name_id),
        KEY geoname_id (geoname_id),
        KEY iso_language (iso_language),
        KEY alternate_name (alternate_name)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;`,
    drop: `drop table if exists geonames_alternate_name;`
};