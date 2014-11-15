-- change /home/kolegm/github/repos/geonames_import on your project path

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/allCountries.txt'
  INTO TABLE `geonames_geoname`;
LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/dependencies.txt'
  INTO TABLE `geonames_geoname`;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/hierarchy.txt'
  INTO TABLE `geonames_hierarchy`;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/iso-languagecodes.txt'
  INTO TABLE `geonames_iso_language`
  IGNORE 1 LINES;

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

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/featureCodes_en.txt'
  INTO TABLE `geonames_feature`;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/timeZones.txt'
  INTO TABLE `geonames_timezone`
  IGNORE 1 LINES;

LOAD DATA INFILE '/home/kolegm/github/repos/geonames_import/data/txt/postalCodes.txt'
  INTO TABLE `geonames_postal_code`;
