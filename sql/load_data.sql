LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/allCountries.txt'
  INTO TABLE `geoname`;
--LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/null.txt'
--  INTO TABLE `geoname`;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/hierarchy.txt'
  INTO TABLE `hierarchy`;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/iso-languagecodes.txt'
  INTO TABLE `iso_language`
  IGNORE 1 LINES;
UPDATE `iso_language` SET `iso_639_2` = NULL WHERE TRIM(`iso_639_2`) = '';
UPDATE `iso_language` SET `iso_639_1` = NULL WHERE TRIM(`iso_639_1`) = '';

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/alternateNames.txt'
  INTO TABLE `alternate_name`;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/continents.txt'
  INTO TABLE `continent`
  FIELDS TERMINATED BY ',';

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/countryInfo.txt'
  INTO TABLE `country`
   IGNORE 51 LINES;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/admin1CodesASCII.txt'
  INTO TABLE `admin_code_ascii`;
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/admin2Codes.txt'
  INTO TABLE `admin_code`;

ALTER TABLE `feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'en';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_en.txt'
  INTO TABLE feature;
ALTER TABLE `feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'bg';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_bg.txt'
  INTO TABLE `feature`;
ALTER TABLE `feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'nb';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_nb.txt'
  INTO TABLE feature;
ALTER TABLE `feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'nn';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_nn.txt'
  INTO TABLE `feature`;
ALTER TABLE `feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'no';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_no.txt'
  INTO TABLE `feature`;
ALTER TABLE `feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'ru';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_ru.txt'
  INTO TABLE `feature`;
ALTER TABLE `feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'sv';
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_sv.txt'
  INTO TABLE `feature`;
ALTER TABLE `feature` CHANGE COLUMN `language` `language` CHAR(2) NULL DEFAULT 'en';
DELETE FROM `feature` WHERE `code` = 'null';

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/timeZones.txt'
  INTO TABLE `time_zone`
  IGNORE 1 LINES;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/postalCodes.txt'
  INTO TABLE `postal_code`;
