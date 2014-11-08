#!/bin/bash

echo "[START] Performing process - import data from geonames.org"

bash ./shell/download.sh $1

echo "[FINISH] Performing process - import data from geonames.org"

exit 0
