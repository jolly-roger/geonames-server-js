#!/bin/bash

# author Oleg Kravchuk kolegm.real[@]gmail.com

externalSourceDump="http://download.geonames.org/export/dump"
externalSourceZip="http://download.geonames.org/export/zip"

dir=$( cd "$( dirname "$0" )" && pwd )

zipDir="$dir/../data/zip"
txtDir="$dir/../data/txt"

header() {
	echo
	echo "========================================="
	echo "  DOWNLOADING data from GEONAMES source  "
	echo "========================================="
	echo
}

usage() {
	echo
	echo "USAGE EXAMPLES:"
	echo
	echo "[USAGE 1]" $0 "--whole"
	echo
	echo -e "\t== Recommended usage =="
	echo -e "\tIn this mode the current geonames.org's dumps are downloaded to the local machine."
	echo -e "\tAll txt files dowloaded into [$txtDir] folder first."
	echo -e "\tAll archives dowloaded into [$zipDir] folder first."
	echo -e "\tAnd unzip after into [$txtDir] folder."
	echo -e "\tAlso, folder [$zipDir] will be cleaned."
	echo
	echo "[USAGE 2]" $0 "--wget"
	echo
	echo -e "\tIn this mode the current geonames.org's dumps are downloaded to the local machine."
	echo -e "\tAll txt files dowloaded into [$txtDir] folder first."
	echo -e "\tAll archives dowloaded into [$zipDir] folder first."
	echo
	echo "[USAGE 3]" $0 "--unzip"
	echo
	echo -e "\tUnzip files from folder [$zipDir] into [$txtDir] folder."
	echo
	echo "[USAGE 4]" $0 "--clean"
	echo
	echo -e "\tClean folder [$zipDir] - remove all files in it."
	echo
}

download_info() {
	echo
	echo -e "Downloading data from geonames.org into [$txtDir] and [$zipDir] folders."
	echo
}

unzip_info() {
	echo
	echo -e "Unzip archive from [$zipDir] into [$txtDir]"
	echo
}

clean_info() {
	echo
	echo -e "Clean folder [$zipDir]"
	echo
}

run_download_process() {
	download_info

	wget -c -O $zipDir/allCountries.zip $externalSourceDump/allCountries.zip
	wget -c -O $zipDir/no-country.zip $externalSourceDump/no-country.zip
	wget -c -O $zipDir/alternateNames.zip  $externalSourceDump/alternateNames.zip
	wget -c -O $zipDir/hierarchy.zip  $externalSourceDump/hierarchy.zip

	wget -c -O $zipDir/postalCodes.zip $externalSourceZip/allCountries.zip

	wget -c -O $txtDir/countryInfo.txt  $externalSourceDump/countryInfo.txt
	wget -c -O $txtDir/admin1CodesASCII.txt  $externalSourceDump/admin1CodesASCII.txt
	wget -c -O $txtDir/admin2Codes.txt  $externalSourceDump/admin2Codes.txt
	wget -c -O $txtDir/timeZones.txt  $externalSourceDump/timeZones.txt
	wget -c -O $txtDir/featureCodes_en.txt  $externalSourceDump/featureCodes_en.txt
}

run_unzip_process() {
	unzip_info

	unzip -o $zipDir/allCountries.zip -d $txtDir/

	unzip -o $zipDir/no-country.zip null.txt -d $zipDir/
	mv $zipDir/null.txt $txtDir/dependencies.txt

	unzip -o $zipDir/alternateNames.zip -d $txtDir/
	unzip -o $zipDir/hierarchy.zip -d $txtDir/

	unzip -o $zipDir/postalCodes.zip allCountries.txt -d $zipDir
	mv $zipDir/allCountries.txt $txtDir/postalCodes.txt
}

run_clean() {
	clean_info

	rm -f $zipDir/allCountries.zip
	rm -f $zipDir/no-country.zip
	rm -f $zipDir/alternateNames.zip
	rm -f $zipDir/hierarchy.zip
	rm -f $zipDir/postalCodes.zip
}

header

if [ $# -lt 1 ]; then
	usage
	exit -1
fi

case "$1" in
	--whole)
		run_download_process
		run_unzip_process
		run_clean
		;;
	--wget)
		run_download_process
		;;
	--unzip)
		run_unzip_process
		;;
	--clean)
		run_clean
		;;
	*)
		usage
		exit -1
		;;
esac

exit 0
