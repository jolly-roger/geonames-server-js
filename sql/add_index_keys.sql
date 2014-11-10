ALTER TABLE `geoname`
  ADD INDEX `geoname_id`(`geoname_id`),
  ADD INDEX `name` (`name`(80) ASC),
  ADD INDEX `ascii_name` (`ascii_name`(100) ASC),
  ADD INDEX `feature_class` (`feature_class` ASC),
  ADD INDEX `feature_code` (`feature_code` ASC),
  ADD INDEX `country_code` (`country_code` ASC)
;

ALTER TABLE `hierarchy`
  ADD INDEX `parent_id` (`parent_id` ASC),
  ADD INDEX `child_id` (`child_id` ASC)
;

ALTER TABLE `iso_language`
  ADD INDEX `iso_639_3` (`iso_639_3` ASC),
  ADD INDEX `iso_639_2` (`iso_639_2` ASC),
  ADD INDEX `iso_639_1` (`iso_639_1` ASC)
;

ALTER TABLE `alternate_name`
  ADD INDEX `alternate_name_id` (`alternate_name_id` ASC),
  ADD INDEX `geoname_id` (`geoname_id` ASC),
  ADD INDEX `iso_language` (`iso_language` ASC)
;

ALTER TABLE `country`
  ADD INDEX `iso2` (`iso2` ASC),
  ADD INDEX `iso3` (`iso3` ASC),
  ADD INDEX `iso_numeric` (`iso_numeric` ASC),
  ADD INDEX `fips_code` (`fips_code` ASC),
  ADD INDEX `geoname_id` (`geoname_id` ASC),
  ADD INDEX `name` (`name`(80) ASC)
;

ALTER TABLE `admin_code`
  ADD INDEX `geoname_id` (`geoname_id` ASC)
;

ALTER TABLE `admin_code_ascii`
  ADD INDEX `geoname_id` (`geoname_id` ASC)
;

ALTER TABLE `feature`
  ADD INDEX `language` (`language` ASC),
  ADD INDEX `code` (`code` ASC),
  ADD INDEX `name` (`name` ASC)
;

ALTER TABLE `time_zone`
  ADD INDEX `country_code` (`country_code` ASC),
  ADD INDEX `timezone_id` (`timezone_id` ASC)
;

ALTER TABLE `postal_code`
  ADD INDEX `country_code` (`country_code` ASC),
  ADD INDEX `postal_code` (`postal_code` ASC)
;
