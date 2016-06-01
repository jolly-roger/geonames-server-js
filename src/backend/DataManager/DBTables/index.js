'use strict';

const geonames_geoname = require('./geonames_geoname');
const geonames_hierarchy = require('./geonames_hierarchy');
const geonames_iso_language = require('./geonames_iso_language');
const geonames_alternate_name = require('./geonames_alternate_name');
const geonames_continent = require('./geonames_continent');
const geonames_country = require('./geonames_country');
const geonames_admin_code_ascii = require('./geonames_admin_code_ascii');
const geonames_admin_code = require('./geonames_admin_code');
const geonames_feature = require('./geonames_feature');
const geonames_timezone = require('./geonames_timezone');
const geonames_postal_code = require('./geonames_postal_code');


module.exports = [
    geonames_geoname,
    geonames_hierarchy,
    geonames_iso_language,
    geonames_alternate_name,
    geonames_continent,
    geonames_country,
    geonames_admin_code_ascii,
    geonames_admin_code,
    geonames_feature,
    geonames_timezone,
    geonames_postal_code
];