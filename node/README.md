# CoinMarketCapAPISite Node.js Scraping
-------------

* Simple CoinMarketCap API website made with jquery, dataTables, and Node.js
 * Scrapes coinmarketcap every 5 minuts with Node.js.
 * Pulls all of the CoinMarketCap data and displays it in a table.
 * Auto refresh the data every 5 minutes.
 * Bootstrap Style with Pagination and Search.
 * Print or Copy and Download as CSV, Excel, PDF.


Setup:

`cd /var/www`

`git clone https://github.com/nrpatten/CoinMarketCapAPISite.git coinmarketcap`

`cd coinmarketcap`

`git checkout dev-node`

`cd node`

`npm install`

Crontab:
```shell
crontab -e
```

Add:
```shell
*/5 * * * * cd /var/www/coinmarketcap/node/ && node update.js 
```
Done..
