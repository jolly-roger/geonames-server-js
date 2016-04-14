-- change /home/www/geonames-import on your project path

-- change slowest `Repair with keycache` to more quickly `Repair with sort`
SET @old_myisam_sort_buffer_size = @@myisam_sort_buffer_size;
SET @old_myisam_max_sort_file_size = @@myisam_max_sort_file_size;
SET @old_key_buffer_size = @@key_buffer_size;
SET SESSION myisam_sort_buffer_size = 256*1024*1024; -- 256 MB
SET GLOBAL myisam_max_sort_file_size = 16*1024*1024*1024; -- 16 GB
SET GLOBAL repair_cache.key_buffer_size = 1024*1024*1024; -- 1 GB

LOAD DATA INFILE '/home/www/geonames-import/data/txt/allCountries.txt'
  INTO TABLE `geonames_geoname`;
LOAD DATA INFILE '/home/www/geonames-import/data/txt/dependencies.txt'
  INTO TABLE `geonames_geoname`;

LOAD DATA INFILE '/home/www/geonames-import/data/txt/hierarchy.txt'
  INTO TABLE `geonames_hierarchy`;

LOAD DATA INFILE '/home/www/geonames-import/data/txt/iso-languagecodes.txt'
  INTO TABLE `geonames_iso_language`
  IGNORE 1 LINES;

LOAD DATA INFILE '/home/www/geonames-import/data/txt/alternateNames.txt'
  INTO TABLE `geonames_alternate_name`;

LOAD DATA INFILE '/home/www/geonames-import/data/txt/continents.txt'
  INTO TABLE `geonames_continent`
  FIELDS TERMINATED BY ',';

LOAD DATA INFILE '/home/www/geonames-import/data/txt/countryInfo.txt'
  INTO TABLE `geonames_country`
   IGNORE 51 LINES;

LOAD DATA INFILE '/home/www/geonames-import/data/txt/admin1CodesASCII.txt'
  INTO TABLE `geonames_admin_code_ascii`;
LOAD DATA INFILE '/home/www/geonames-import/data/txt/admin2Codes.txt'
  INTO TABLE `geonames_admin_code`;

LOAD DATA INFILE '/home/www/geonames-import/data/txt/featureCodes_en.txt'
  INTO TABLE `geonames_feature`;

LOAD DATA INFILE '/home/www/geonames-import/data/txt/timeZones.txt'
  INTO TABLE `geonames_timezone`
  IGNORE 1 LINES;

LOAD DATA INFILE '/home/www/geonames-import/data/txt/postalCodes.txt'
  INTO TABLE `geonames_postal_code`;

SET SESSION myisam_sort_buffer_size = @old_myisam_sort_buffer_size;
SET GLOBAL myisam_max_sort_file_size = @old_myisam_max_sort_file_size;
SET GLOBAL repair_cache.key_buffer_size = @old_key_buffer_size;
