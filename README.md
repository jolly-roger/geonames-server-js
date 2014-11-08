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
 136K admin1CodesASCII.txt
 1.9M admin2Codes.txt
 1.2G allCountries.txt
 349M alternateNames.txt
  31K countryInfo.txt
  65K featureCodes_bg.txt
  56K featureCodes_en.txt
  56K featureCodes_nb.txt
  56K featureCodes_nn.txt
  56K featureCodes_no.txt
 112K featureCodes_ru.txt
  57K featureCodes_sv.txt
 6.0M hierarchy.txt
 125K iso-languagecodes.txt
  76M postalCodes.txt
  14K timeZones.txt
```
Total disk space used for zipped data [temporary]
```bash
$ ls -lh ./data/zip
total 376M
 269M allCountries.zip
  95M alternateNames.zip
 1.3M hierarchy.zip
  11M postalCodes.zip
```
