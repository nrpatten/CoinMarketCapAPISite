$(document).ready(function() {
   var refreshTable = $("#coinmarketcap").DataTable( {
      "bRetrieve": true,
      "processing": true,
      "language": {
         "emptyTable": "The table is still loading data or there was an error with JSON"
      },
      "ajax": {
         "url": "json/markets.json",
         "dataSrc": "markets",
         "dataType": "json"
      },
      "columns": [
         { "data": "position", "render": function (data,type,row) { return '<img src="img/HashMark.png" height="14" width="14"></img> ' + (data) +''; } },
         { "data": null, "render": function (data,type,row) { return '<img src="http://coinmarketcap.com/static/img/coins/16x16/'+ (data.logo) +'" height="18" width="18"></img> ' + (data.name) +''; } },
         { "data": "symbol" },
         { "data": "marketcap_usd", "render": function (data,type,row) { return '<span style="font-size:12px;" class="glyphicon glyphicon-usd"></span> ' + Number(data).toLocaleString() +''; } },
         { "data": "price_usd", "render": function (data,type,row) { return '<span style="font-size:12px;" class="glyphicon glyphicon-usd"></span> ' + Number(data).toFixed(8) +''; } },
         { "data": "supply_btc", "render": function (data,type,row) { return '<span style="font-size:12px;color:orange;" class="glyphicon glyphicon-bitcoin"></span> ' + Number(data).toFixed(8) +''; } },
         { "data": "volume_usd" , "render": function (data,type,row) { return '<span style="font-size:12px;" class="glyphicon glyphicon-usd"></span> ' + Number(data).toLocaleString() +''; } },
         { "data": "change1h" },
         { "data": "change24h" },
         { "data": "change1d" }
      ],
      "dom": 'T<"clear">lfrtip',
      "tableTools": {
         "sSwfPath": "swf/copy_csv_xls_pdf.swf",
         "aButtons": [
            "copy",
            "print",
            {
            "sExtends": "collection",
            "sButtonText": "Save",
            "aButtons": [ "csv", "xls", "pdf" ]
            }
         ]
      }
   });
   function round(value, decimals) {
      return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
   }
   setInterval (function test() {
      refreshTable.ajax.reload( null, false );
   }, 300000);
});
