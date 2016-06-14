'use strict';

module.exports = {
    name: 'geonames_geoname',
    create: `CREATE TABLE geonames_hierarchy (
            parent_id INT(10) UNSIGNED NULL,
            child_id INT(10) UNSIGNED NULL,
            type VARCHAR(50) NOT NULL,
            KEY parent_id (parent_id),
            KEY child_id (child_id),
            KEY type (type)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE utf8_unicode_ci;`,
    drop: `drop table if exists geonames_hierarchy;`
};