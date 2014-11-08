#Import data from source geonames.org
External data urls:
* [all dumps](http://download.geonames.org/export/dump)
* [postal codes](http://download.geonames.org/export/zip)

For downloading external data - call the next shell script with option `--whole`
```bash
$ bash ./shell/download.sh --whole
```

For running shell script with other options see descriptions.
Just run without options - and yuo see descriptions about all available options
```bash
$ bash ./shell/download.sh
```

###Additionaly
Total disk space used for downloaded data:
```bash
$ du
376M ./data/zip  
1.6G ./data/txt  
2.0G ./data  
```
Total disk space used for unpacked data
```bash
$ ls -lh ./data/txt
total 1.6G
 136K Nov admin1CodesASCII.txt
 1.9M Nov admin2Codes.txt
 1.2G Nov allCountries.txt
 349M Nov alternateNames.txt
  31K Nov countryInfo.txt
  65K Nov featureCodes_bg.txt
  56K Nov featureCodes_en.txt
  56K Nov featureCodes_nb.txt
  56K Nov featureCodes_nn.txt
  56K Nov featureCodes_no.txt
 112K Nov featureCodes_ru.txt
  57K Nov featureCodes_sv.txt
 6.0M Nov hierarchy.txt
 125K Nov iso-languagecodes.txt
  76M Nov postalCodes.txt
  14K Nov timeZones.txt
```
Total disk space used for zipped data [temporary]
```bash
$ ls -lh ./data/zip
total 376M
 269M Nov allCountries.zip
  95M Nov alternateNames.zip
 1.3M Nov hierarchy.zip
  11M Nov postalCodes.zip
```
