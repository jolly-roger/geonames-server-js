#!/bin/bash

# author Oleg Kravchuk kolegm.real[@]gmail.com

dir=$( cd "$( dirname "$0" )" && pwd )

sqlDir="$dir/../sql"

# default database access rights
dbHost="localhost"
dbPort=3306
dbName="geonames"

header() {
  echo
  echo "================================="
  echo "  LOAD data into MySQL database  "
  echo "================================="
  echo
}

usage() {
  echo
  echo "USAGE EXAMPLE:"
  echo
  echo " $0 -a <action> -u <user> -p <password> -h <host> -P <port> -D <dbname>"
  echo
  echo " Available values for option <action>: "
  echo " [import-data] == Recommended usage == Create database $dbName with table structure, and load all geonames data"
  echo " [create-db] Creates the mysql empty database $dbName."
  echo " [drop-db] Removes the mysql database $dbName completely."
  echo " [create-structure] Creates the table structure with no data in the database $dbName."
  echo " [drop-structure] Removes all the table structure with data from the database $dbName."
  echo " [load-data] Imports geonames data into database $dbName."
  echo " [truncate-data] Remove geonames data from database $dbName."
  echo " [add-indexes] Add indexes into every table in database $dbName."
  echo
  echo " The rest of parameters indicates the following information:"
  echo " -u <user> User name to access database server."
  echo " -p <password> User password to access database server."
  echo " -h <host> Data Base Server address (default: $dbHost)."
  echo " -P <port> Data Base Server Port (default: $dbPort)"
  echo " -D <dbname> Data Base Name for the geonames.org data (default: $dbName)"

  exit -1
}

display_parameters() {
  echo -e "Database parameters being used:"
  echo -e "\taction: $action"
  echo -e "\tusername: $dbUsername"
  echo -e "\tpassword: $dbPassword"
  echo -e "\thost: $dbHost"
  echo -e "\tport: $dbPort"
  echo -e "\tdbname: $dbName"
}

check_action() {
  if [ -z $action ]; then
    echo
    echo "WARNING: No action provided. Please write some value in parameter -a[?]"
    usage
    exit 1
  fi
}

check_username() {
  if [ -z $dbUsername ]; then
    echo
    echo "WARNING: No username provided for accessing the database. Please write some value in parameter -u[?]"
    usage
    exit 1
  fi
}

check_password() {
  if [ -z $dbPassword ]; then
    echo
    echo "WARNING: No password provided for accessing the database. Please write some value in parameter -p[?]"
    usage
    exit 1
  fi
}

show_database() {
  echo
  echo "Show all databases."
  mysql -h$dbHost -P$dbPort -u$dbUsername -p$dbPassword -Bse "show databases;"
}

create_database() {
  echo
  echo "Create database [$dbName]."
  mysql -h$dbHost -P$dbPort -u$dbUsername -p$dbPassword -Bse "CREATE DATABASE [$dbName] CHARACTER SET utf8 COLLATE utf8_unicode_ci;"
}

drop_database() {
  echo
  echo "Truncate [$dbName] database"
  mysql -h$dbHost -P$dbPort -u$dbUsername -p$dbPassword -Bse "DROP DATABASE IF EXISTS [$dbName];"
}

use_database() {
  echo
  echo "Use database [$dbName]."
  mysql -h$dbHost -P$dbPort -u$dbUsername -p$dbPassword -Bse "USE $dbName;"
}

load_structure() {
  echo
  echo "Create structure of tables for database [$dbName]."
  mysql -h$dbHost -P$dbPort -u$dbUsername -p$dbPassword $dbName < $sqlDir/create_structure.sql
}

drop_structure() {
  echo
  echo "Drop structure of tables for database [$dbName]."
  mysql -h$dbHost -P$dbPort -u$dbUsername -p$dbPassword $dbName < $sqlDir/drop_structure.sql
}

load_data() {
  echo
  echo "Load geonames data into database [$dbName]."
  mysql -h$dbHost -P$dbPort -u$dbUsername -p$dbPassword --local-infile=1 $dbName < $sqlDir/load_data.sql
}

truncate_data() {
  echo
  echo "Truncate data from database [$dbName]."
  mysql -h$dbHost -P$dbPort -u$dbUsername -p$dbPassword $dbName < $sqlDir/truncate_data.sql
}

add_indexes() {
  echo
  echo "Add all index keys fro every table in database [$dbName]."
  mysql -h$dbHost -P$dbPort -u$dbUsername -p$dbPassword $dbName < $sqlDir/add_index_keys.sql
}

header

while getopts "a:u:p:h:P:D:" opt;  do
  case $opt in
    a) action=$OPTARG ;;
    u) dbUsername=$OPTARG ;;
    p) dbPassword=$OPTARG ;;
    h) dbHost=$OPTARG ;;
    P) dbPort=$OPTARG ;;
    D) dbName=$OPTARG ;;
    *)
      usage
      exit -1
  esac
done

display_parameters

check_action
check_username
check_password

case "$action" in
  import-data)
    drop_database
    create_database
    load_structure
    load_data
    add_indexes
    ;;
  create-db)
    create_database
    use_database
    ;;
  drop-db)
    drop_database
    #show_database
    ;;
  create-structure)
    use_database
    load_structure
    ;;
  drop-structure)
    use_database
    drop_structure
    ;;
  load-data)
    use_database
    load_data
    ;;
  truncate-data)
    use_database
    truncate_data
    ;;
  add-indexes)
    use_database
    add_indexes
    ;;
  *)
    usage
    exit -1
    ;;
esac

echo

exit 0
