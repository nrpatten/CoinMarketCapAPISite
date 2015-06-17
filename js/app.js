$(document).ready(function() {
	var refreshTable = $("#coinmarketcap").DataTable( {
		"ajax": {
			"url": "http://162.243.239.186:8000/?url=http://coinmarketcap.northpole.ro/api/v5/all.json",
			"dataSrc": "markets"
		},
		"columns": [
			{ "data": "position", "render": function (data,type,row) { return '<img src="img/HashMark.png" height="14" width="14"></img> ' + (data) +''; } },
			{ "data": "name", "render": function (data,type,row) { return '<img src="img/'+ (data).toLowerCase() +'.png" height="18" width="18"></img> ' + (data) +''; } },
                        { "data": "symbol" },
                        { "data": "marketCap.usd", "render": function (data,type,row) { return '<span style="font-size:12px;" class="glyphicon glyphicon-usd"></span> ' + Number(data).toLocaleString() +''; } },
                        { "data": "price.usd", "render": function (data,type,row) { return '<span style="font-size:12px;" class="glyphicon glyphicon-usd"></span> ' + Number(data).toFixed(8) +''; } },
                        { "data": "price.btc", "render": function (data,type,row) { return '<span style="font-size:12px;color:orange;" class="glyphicon glyphicon-bitcoin"></span> ' + Number(data).toFixed(8) +''; } },
                        { "data": "volume24.btc", "render": function (data,type,row) { return '<span style="font-size:12px;color:orange;" class="glyphicon glyphicon-bitcoin"></span> ' + Number(data).toFixed(2) +''; } }
                ],
                "dom": 'T<"clear">lfrtip',
                "tableTools": {
                    "sSwfPath": "swf/copy_csv_xls_pdf.swf",
                    "aButtons": [
                        "copy",
                        "print",
                        {
                            "sExtends":    "collection",
                            "sButtonText": "Save",
                            "aButtons":    [ "csv", "xls", "pdf" ]
                        }
                    ]
                }
	} );
        function round(value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }
        setInterval (function test() {
          refreshTable.ajax.reload( null, false );
        }, 300000);
} );
