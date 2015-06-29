#!/usr/bin/env node
var request = require("request"),
    cheerio = require("cheerio"),
    fs = require("fs");

var currencies = ["usd", "btc"];
var currencyExchangeRates = Array();
var data = {};

request('http://coinmarketcap.com/all/views/all/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(body);
    currencyExchangeRates = $("#currency-exchange-rates").data();
    $("tr").each(function (i) {
    	if (i > 0) {
	var td = $(this).find("td");
        var position = td.eq(0).text().trim();
        var icon = $(this).find("img.currency-logo").attr("src").replace("/static/img/coins/16x16/", "");
	var name = td.eq(1).text().replace("/", "").trim();
        var re = /\s([a-z]|[0-9])+\s/i;
        var supplyText = td.eq(5).text();
        var symbol = td.eq(2).text().trim();
	var marketCap = currencyDictionary(td.eq(3));
        var price = currencyDictionary(td.eq(4).find("a").eq(0));
	var supply = td.eq(5).text().replace(/\D/g, "").trim(); // Replace all non digit characters with nothing
	var volume = currencyDictionary(td.eq(6).find("a").eq(0));
	var change1h = td.eq(7).text().replace("%", "").trim();
        var change24h = td.eq(8).text().replace("%", "").trim();
        var change7d = td.eq(9).text().replace("%", "").trim();
	var timestamp = Date.now() / 1000;
	data[name] = {
            "position": position,
            "name": name,
            "symbol": symbol,
            "icon": icon,
            "market_cap": marketCap,
            "price": price,
            "supply": supply,
            "volume": volume,
            "change1h": change1h,
            "change24h": change24h,
            "change7d": change7d,
        };
      }
    });
   writeData();
  }
});

function currencyDictionary(item) {
  var resultArray = {};
  currencies.forEach(function(currency) {
    if (currency == "btc") {
      var result = item.data("btc");
    }
    else {
      var result = item.data("usd") / currencyExchangeRates[currency];
    }
    resultArray[currency] = result.toString().replace(/,/g,"");
  });
  return resultArray;
}

function writeData() {
    dataDir = "/var/www/coinmarketcap/json/";
    callback = function(error) {
      if (error) {
        console.log(error);
      }
    }; 
    for (currancy in data) {
      info = data[currancy];
      fileName = dataDir + info["symbol"] + ".json";
      fs.writeFile(fileName, JSON.stringify(info), callback);
    }
    writeAll()
}

function writeAll() {
    dataDir = "/var/www/coinmarketcap/json/";
    callback = function(error) {
      if (error) {
        console.log(error);
      }
    };
    var res = {"markets":[]};
    for (var prop in data) {
      res.markets.push(data[prop])
    };
    fs.writeFile(dataDir + "all.json", JSON.stringify(res), callback);
}
