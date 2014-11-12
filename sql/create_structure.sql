CREATE TABLE `geonames_geoname` (
  `geoname_id` INT(10) UNSIGNED NOT NULL COMMENT 'integer id of record in geonames database',
  `name` VARCHAR(200) NOT NULL COMMENT 'name of geographical point (utf8)',
  `ascii_name` VARCHAR(200) NOT NULL COMMENT 'name of geographical point in plain ascii characters',
  `alternate_name` TEXT COMMENT 'alternatenames, comma separated, ascii names automatically transliterated, convenience attribute from alternatename table',
  `latitude` DECIMAL(10,7) NULL COMMENT 'latitude in decimal degrees (wgs84)',
  `longitude` DECIMAL(10,7) NULL COMMENT 'longitude in decimal degrees (wgs84)',
  `feature_class` CHAR(1) NOT NULL COMMENT 'see http://www.geonames.org/export/codes.html',
  `feature_code` VARCHAR(10) NOT NULL COMMENT 'see http://www.geonames.org/export/codes.html',
  `country_code` VARCHAR(2) NOT NULL COMMENT 'ISO-3166 2-letter country code',
  `cc2` VARCHAR(60) NOT NULL COMMENT 'alternate country codes, comma separated, ISO-3166 2-letter country code',
  `admin1` VARCHAR(60) NOT NULL COMMENT 'fipscode (subject to change to iso code), see exceptions below, see file admin1Codes.txt for display names of this code',
  `admin2` VARCHAR(80) NOT NULL COMMENT 'code for the second administrative division, a county in the US, see file admin2Codes.txt',
  `admin3` VARCHAR(20) NOT NULL COMMENT 'code for third level administrative division',
  `admin4` VARCHAR(20) NOT NULL COMMENT 'code for fourth level administrative division',
  `population` BIGINT(12) NOT NULL,
  `elevation` VARCHAR(15) NOT NULL DEFAULT 0 COMMENT 'in meters',
  `gtopo30` VARCHAR(15) NOT NULL COMMENT ' digital elevation model, srtm3 or gtopo30, average elevation of 3''x3'' (ca 90mx90m) or 30''x30'' (ca 900mx900m) area in meters, integer. srtm processed by cgiar/ciat',
  `timezone_id` VARCHAR(40) NOT NULL,
  `mod_date` DATE NULL COMMENT 'date of last modification in yyyy-MM-dd format'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `geonames_hierarchy` (
  `parent_id` INT(10) NULL,
  `child_id` INT(10) NULL,
  `type` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `geonames_iso_language` (
  `iso_639_3` CHAR(3) NOT NULL,
  `iso_639_2` VARCHAR(100) NOT NULL,
  `iso_639_1` VARCHAR(2) NOT NULL,
  `language_name` VARCHAR(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `geonames_alternate_name` (
  `alternate_name_id` INT(10) UNSIGNED NOT NULL COMMENT 'the id of this alternate name',
  `geoname_id` INT(10) UNSIGNED NULL COMMENT 'geonameId referring to id in table geoname',
  `iso_language` VARCHAR(7) NOT NULL COMMENT 'iso 639 language code 2- or 3-characters; 4-characters \'post\' for postal codes and \'iata\',\'icao\' and faac for airport codes, fr_1793 for French Revolution names,  abbr for abbreviation, link for a website',
  `alternate_name` VARCHAR(200) NOT NULL COMMENT 'alternate name or name variant',
  `is_preferred_name` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '\'1\', if this alternate name is an official/preferred name',
  `is_short_name` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '\'1\', if this is a short name like \'California\' for \'State of California\'',
  `is_colloquial` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '\'1\', if this alternate name is a colloquial or slang term',
  `is_historic` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '\'1\', if this alternate name is historic and was used in the past'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `geonames_continent` (
  `code` CHAR(2) NOT NULL,
  `name` VARCHAR(20) NOT NULL,
  `geoname_id` INT(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `geonames_country` (
  `iso2` CHAR(2) NOT NULL,
  `iso3` CHAR(3) NOT NULL,
  `iso_numeric` INT(11) UNSIGNED NULL,
  `fips_code` VARCHAR(3) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `capital` VARCHAR(200) NOT NULL,
  `area_in_sq_km` double NOT NULL DEFAULT 0,
  `population` BIGINT(12) UNSIGNED NOT NULL,
  `continent_code` CHAR(2) NOT NULL,
  `tld` CHAR(3) NOT NULL,
  `currency` CHAR(3) NOT NULL,
  `currency_name` VARCHAR(20) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `postal_code_format` VARCHAR(100) NOT NULL,
  `postal_code_regex` VARCHAR(255) NOT NULL,
  `geoname_id` INT(10) UNSIGNED NULL,
  `languages` VARCHAR(200) NOT NULL,
  `neighbours` CHAR(100) NOT NULL,
  `equivalent_fips_code` CHAR(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `geonames_admin_code_ascii` (
  `code` CHAR(15) NOT NULL,
  `name` TEXT,
  `name_ascii` TEXT,
  `geoname_id` INT(10) UNSIGNED NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `geonames_admin_code` (
  `code` CHAR(15) NOT NULL,
  `name` TEXT,
  `name_ascii` TEXT,
  `geoname_id` INT(10) UNSIGNED NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `geonames_feature` (
  `language` CHAR(2) NOT NULL,
  `code` CHAR(10) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `geonames_time_zone` (
   `country_code` CHAR(2) NULL,
   `timezone_id` VARCHAR(200) NOT NULL,
   `gmt_offset` DECIMAL(4,2) NULL,
   `dst_offset` DECIMAL(4,2) NULL,
   `raw_offset` DECIMAL(4,2) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `geonames_postal_code` (
  `country_code` CHAR(2) NOT NULL,
  `postal_code` VARCHAR(20) NOT NULL,
  `place_name` TEXT,
  `admin_name1` TEXT,
  `admin_code1` VARCHAR(80) NOT NULL,
  `admin_name2` TEXT,
  `admin_code2` VARCHAR(80) NOT NULL,
  `admin_name3` TEXT,
  `admin_code3` VARCHAR(80) NOT NULL,
  `latitude` DECIMAL(10,7) NULL,
  `longitude` DECIMAL(10,7) NULL,
  `accuracy` TINYINT(2) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;
