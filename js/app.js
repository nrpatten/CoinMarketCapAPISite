var $th = $("<td></td>");

$(document).ready(function() {

  var myTable = $("#coinmarketcap").on('init.dt', getData).DataTable({
    "processing": true,
    "ajax": {
      "url": "http://162.243.239.186:8000/?url=http://coinmarketcap.northpole.ro/api/v5/all.json",
      "dataSrc": "markets"
    },
    "columns": [
    { "data": "position",
      "render": function(data, type, row) {
        return '<img src="img/HashMark.png" height="14" width="14"></img> ' + (data) + ' ';
      }
    }, 
    { "data": null,
      render: function( data, type, row) {
        return (data.name); $th.wrap('<div></div>').parent().html();
      }
    },
    { "data": "symbol" }, 
    { "data": "marketCap.usd",
      "render": function(data, type, row) {
        return '<span style="font-size:12px;" class="glyphicon glyphicon-usd"></span> ' + Number(data).toLocaleString() + ' ';
      }
    },
    { "data": "price.usd",
      "render": function(data, type, row) {
        return '<span style="font-size:12px;" class="glyphicon glyphicon-usd"></span> ' + Number(data).toFixed(8) + ' ';
      }
    },
    { "data": "price.btc",
      "render": function(data, type, row) {
        return '<span style="font-size:12px;color:orange;" class="glyphicon glyphicon-bitcoin"></span> ' + Number(data).toFixed(8) + ' ';
      }
    }, 
    { "data": "availableSupply" },
    { "data": "volume24.btc",
      "render": function(data, type, row) {
        return '<span style="font-size:12px;color:orange;" class="glyphicon glyphicon-bitcoin"></span> ' + Number(data).toLocaleString() + ' ';
      }
    }
    ],
    "dom": 'T<"clear">lfrtip',
    "tableTools": {
      "sSwfPath": "swf/copy_csv_xls_pdf.swf",
      "aButtons": [
        "copy",
        "print", {
          "sExtends": "collection",
          "sButtonText": "Save",
          "aButtons": ["csv", "xls", "pdf"]
        }
      ]
    }
  });
  function find(key, obj) {
    for (var i in obj) {
      if (obj[i].name == key) {
        return obj[i];
      }
    }
   return obj[i];
  }
  function getData() {
    var myTable = $("#coinmarketcap").DataTable();
    $.ajax({
      url: "quick_search.json",
      dataType: "json",
      success: function(json) {
      myTable
        .column(1)
        .nodes()
        .each(function(node, index, dt) {
          var slug = find(myTable.cell(node).data().name, json);
          var item = ('  <img src="img/'+ (slug.slug) +'.png" height="18" width="18" />');
          $(myTable.cell(node).node()).append(item);
        });
      }
    });
  }
  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }
  setInterval(function test() {
    myTable.ajax.reload(null, false);
  }, 300000);
});