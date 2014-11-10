CREATE TABLE `continent` (
  `code` char(2) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `geoname_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `geoname` (
  `geoname_id` INT(10) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `ascii_name` VARCHAR(200) NOT NULL,
  `alternate_names` TEXT,
  `latitude` DECIMAL(10,7) NULL,
  `longitude` DECIMAL(10,7) NULL,
  `feature_class` CHAR(1) NOT NULL,
  `feature_code` VARCHAR(10) NOT NULL,
  `country` VARCHAR(2) NOT NULL,
  `cc2` VARCHAR(60) NOT NULL,
  `admin1` VARCHAR(60) NOT NULL,
  `admin2` VARCHAR(80) NOT NULL,
  `admin3` VARCHAR(20) NOT NULL,
  `admin4` VARCHAR(20) NOT NULL,
  `population` BIGINT(12) NULL,
  `elevation` VARCHAR(15) NOT NULL DEFAULT 0,
  `gtopo30` VARCHAR(15) NOT NULL,
  `timezone` VARCHAR(40) NOT NULL,
  `mod_date` DATE NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `country` (
  `iso2` CHAR(2) NOT NULL,
  `iso3` CHAR(3) NOT NULL,
  `iso_numeric` INT(11) NULL,
  `fips_code` VARCHAR(3) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `capital` VARCHAR(200) NOT NULL,
  `area_in_sq_km` double NOT NULL DEFAULT 0,
  `population` BIGINT(12) DEFAULT NULL,
  `continent` CHAR(2) DEFAULT NULL,
  `tld` CHAR(3) NOT NULL,
  `currency` CHAR(3) NOT NULL,
  `currency_name` VARCHAR(20) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `postal_code_format` VARCHAR(100) NOT NULL,
  `postal_code_regex` VARCHAR(255) NOT NULL,
  `geoname_id` INT(10) NULL,
  `languages` VARCHAR(200) NOT NULL,
  `neighbours` CHAR(100) NOT NULL,
  `equivalent_fips_code` CHAR(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `iso_language` (
  `iso_639_3` char(3) NOT NULL,
  `iso_639_2` varchar(100) NOT NULL,
  `iso_639_1` varchar(2) NOT NULL,
  `language_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `alternate_name` (
  `alternate_name_id` INT(10) NOT NULL,
  `geoname_id` INT(10) NULL,
  `iso_language` VARCHAR(7) NOT NULL,
  `alternate_name` VARCHAR(200) NOT NULL,
  `is_preferred_name` TINYINT(1) NOT NULL DEFAULT 0,
  `is_short_name` TINYINT(1) NOT NULL DEFAULT 0,
  `is_colloquial` TINYINT(1) NOT NULL DEFAULT 0,
  `is_historic` TINYINT(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `hierarchy` (
  `parent_id` int(11) NULL,
  `child_id` int(11) NULL,
  `type` varchar(50) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `admin_code_ascii` (
  `code` char(15) NOT NULL,
  `name` text,
  `name_ascii` text,
  `geoname_id` int(10) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `admin_code` (
  `code` char(15) DEFAULT NULL,
  `name` text,
  `name_ascii` text,
  `geoname_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `feature` (
  `language` CHAR(2) NULL,
  `code` CHAR(10) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `time_zone` (
   `country_code` char(2) NULL,
   `timezoneid` varchar(200) NOT NULL,
   `gmt_offset` decimal(4,2) NULL,
   `dst_offset` decimal(4,2) NULL,
   `raw_offset` decimal(4,2) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `postal_code` (
  `country` char(2) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `place_name` TEXT,
  `admin_name1` TEXT,
  `admin_code1` varchar(80) NOT NULL,
  `admin_name2` TEXT,
  `admin_code2` varchar(80) NOT NULL,
  `admin_name3` TEXT,
  `admin_code3` varchar(80) NOT NULL,
  `latitude` decimal(10,7) NULL,
  `longitude` decimal(10,7) NULL,
  `accuracy` tinyint(2) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;
