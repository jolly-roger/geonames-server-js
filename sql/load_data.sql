LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/allCountries.txt'
  INTO TABLE `geonames_geoname`;
--LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/null.txt'
--  INTO TABLE `geoname`;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/hierarchy.txt'
  INTO TABLE `geonames_hierarchy`;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/iso-languagecodes.txt'
  INTO TABLE `geonames_iso_language`
  IGNORE 1 LINES;
UPDATE `geonames_iso_language` SET `iso_639_2` = NULL WHERE TRIM(`iso_639_2`) = '';
UPDATE `geonames_iso_language` SET `iso_639_1` = NULL WHERE TRIM(`iso_639_1`) = '';

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/alternateNames.txt'
  INTO TABLE `geonames_alternate_name`;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/continents.txt'
  INTO TABLE `geonames_continent`
  FIELDS TERMINATED BY ',';

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/countryInfo.txt'
  INTO TABLE `geonames_country`
   IGNORE 51 LINES;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/admin1CodesASCII.txt'
  INTO TABLE `geonames_admin_code_ascii`;
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/admin2Codes.txt'
  INTO TABLE `geonames_admin_code`;

ALTER TABLE `geonames_feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'en';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_en.txt'
  INTO TABLE `geonames_feature`;
ALTER TABLE `geonames_feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'bg';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_bg.txt'
  INTO TABLE `geonames_feature`;
ALTER TABLE `geonames_feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'nb';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_nb.txt'
  INTO TABLE `geonames_feature`;
ALTER TABLE `geonames_feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'nn';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_nn.txt'
  INTO TABLE `geonames_feature`;
ALTER TABLE `geonames_feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'no';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_no.txt'
  INTO TABLE `geonames_feature`;
ALTER TABLE `geonames_feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'ru';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_ru.txt'
  INTO TABLE `geonames_feature`;
ALTER TABLE `geonames_feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'sv';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_sv.txt'
  INTO TABLE `geonames_feature`;
ALTER TABLE `geonames_feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'en';
DELETE FROM `geonames_feature` WHERE `code` = 'null';

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/timeZones.txt'
  INTO TABLE `geonames_time_zone`
  IGNORE 1 LINES;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/postalCodes.txt'
  INTO TABLE `geonames_postal_code`;
