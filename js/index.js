var columns = [
    {field: 'code41', title: '41代码'},
    {field: 'transactionPairs', title: '交易对', formatter: function(value, row, index) {
        var arr = value.split('/');
        return '<a href="./value_detail.html"><img style="margin-right: 10px;" width="24" src="./img/bitcoin.png" /><span style="color: #190A06;">' + arr[0] + '/</span><span style="color: #3F3F3F;">' + arr[1] + '</span></a>';
    }},
    {field: 'presentPrice', title: '现价', sortable: true},
    {field: 'height24', title: '24H高（￥)', sortable: true},
    {field: 'low24', title: '24H低（￥)', sortable: true},
    {field: 'turnover24', title: '24H成交额（￥)', sortable: true},
    {field: 'dayHighsLows', title: '日涨跌', sortable: true, formatter: function(value, row, index) {
        if (parseFloat(value) > 0) {
            return '<span style="color: #F66A65;">' + value + '</span>';
        } else {
            return '<span style="color: #38E038;">' + value + '</span>';
        }
    }},
    {field: 'dayHighsLows7', title: '七日涨跌', sortable: true, formatter: function(value, row, index) {
        if (parseFloat(value) > 0) {
            return '<span style="color: #F66A65;">' + value + '</span>';
        } else {
            return '<span style="color: #38E038;">' + value + '</span>';
        }
    }},
];
var data = [
    {id: 1, code41: 410001, transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 2, code41: 410001, transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '-4.09%', dayHighsLows7: '-4.09%'},
    {id: 3, code41: 410001, transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 4, code41: 410001, transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '-4.09%', dayHighsLows7: '-4.09%'},
    {id: 5, code41: 410001, transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 6, code41: 410001, transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 7, code41: 410001, transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 8, code41: 410001, transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 9, code41: 410001, transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 10,code41: 410001,  transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 12,code41: 410001,  transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 13,code41: 410001,  transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 14,code41: 410001,  transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 15,code41: 410001,  transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 16,code41: 410001,  transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 17,code41: 410001,  transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 18,code41: 410001,  transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 19,code41: 410001,  transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
    {id: 20,code41: 410001,  transactionPairs: 'BTC/USDT', presentPrice: '27546.21', height24: '27546.21', low24: '27541.21', turnover24: '27546.21万', dayHighsLows: '+4.09%', dayHighsLows7: '+4.09%'},
];

$('.tabs li').on('click', function () {
    $(this).addClass('active').siblings('li').removeClass('active');
    var index = $(this).index();
    $('.tab-views .view').eq(index).addClass('active').siblings('.view').removeClass('active');
});

$('#view-2').bootstrapTable({
    pagination: true,
    pageNumber: 1,
    pageSize: 15,
    striped: true,
    columns: columns,
    data: data
});

$('#view-3').bootstrapTable({
    pagination: true,
    pageNumber: 1,
    pageSize: 15,
    striped: true,
    columns: columns,
    data: data
});