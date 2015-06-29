# CoinMarketCapAPISite 
-------------

* Simple CoinMarketCap API website made with jquery, dataTables, Bootstrap and PHP Simple html Dom
 * Scrapes coinmarketcap every 5 minuts with PHP Dom.
 * Pulls all of the CoinMarketCap data and displays it in a table.
 * Auto refresh the data every 5 minutes.
 * Bootstrap Style with Pagination and Search.
 * Print or Copy and Download as CSV, Excel, PDF.

* Note PHP5 must be used to run PHP Simple html Dom.

Setup:

`cd /var/www`

`git clone https://github.com/nrpatten/CoinMarketCapAPISite.git coinmarketcap`

`cd coinmarketcap`

`git checkout dev-next`

`cd json`

`chmod +x check.sh`

Crontab:
```shell
crontab -e
```

Add:
```shell
*/5 * * * * cd /var/www/coinmarketcap/json/ && /usr/bin/php allcoins.php > all.json
*/1 * * * * cd /var/www/coinmarketcap/json/ && /bin/sh check.sh all.json
```
Done..
