

var hoursDiv = document.getElementById('hoursDiv');
var hoursDivChart = echarts.init(hoursDiv, null, {renderer: 'svg'});

var dayDiv = document.getElementById('dayDiv');
var dayDivChart = echarts.init(dayDiv, null, {renderer: 'svg'});

var dayDiv3 = document.getElementById('dayDiv3');
var dayDivChart3 = echarts.init(dayDiv3, null, {renderer: 'svg'});

var dayDiv4 = document.getElementById('dayDiv4');
var dayDivChart4 = echarts.init(dayDiv4, null, {renderer: 'svg'});

var dayDiv5 = document.getElementById('dayDiv5');
var dayDivChart5 = echarts.init(dayDiv5, null, {renderer: 'svg'});

var dayDiv6 = document.getElementById('dayDiv6');
var dayDivChart6 = echarts.init(dayDiv6, null, {renderer: 'svg'});

/*var dayDiv7 = document.getElementById('dayDiv');
var dayDivChart7 = echarts.init(dayDiv7, null, {renderer: 'svg'});

var dayDiv8 = document.getElementById('dayDiv');
var dayDivChart8 = echarts.init(dayDiv8, null, {renderer: 'svg'});

var dayDiv9 = document.getElementById('dayDiv');
var dayDivChart9 = echarts.init(dayDiv9, null, {renderer: 'svg'});*/



var top1Div = document.getElementById('top1Div');
var top1Chart = echarts.init(top1Div, null, {renderer: 'svg'});

var top2Div = document.getElementById('top2Div');
var top2Chart = echarts.init(top2Div, null, {renderer: 'svg'});


function getTop1() {
    var mark = Number("52.483").toFixed(3) *1;
    var mark_sub =Number("47.517").toFixed(3) *1;

    var data=[{value:mark, name:'直接访问', itemStyle:{normal:{color:'#ED881B'}}},
        {value:mark_sub, name:'邮件营销', itemStyle:{normal:{color:'#8a4f10'}}}
    ]


    var a=0;
    for(var i=0; i<data.length; i++) {
        a+=data[i].value;
    }
    data.push({value:a, name:'__other', itemStyle:{normal:{color:'rgba(0,0,0,0)'}}});
    var option3 = {
        tooltip : {
            trigger: 'item',
            formatter: function(param){
                var str = '<style>td{padding:5px;}</style><table>';
                var c = (param['value']/a)*100;
                c = c.toFixed(3);
                str  = str + c + "%";
                return str
            }

        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                startAngle:180,
                radius: ['50%', '70%'],
                center: ['50%', '56%'],
                data:data,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
            }
        ]
    };
    if (option3 && typeof option3 === "object") {
        top1Chart.setOption(option3, true);
    }

}

function getTop2() {
    var data2=[{value:100, name:'直接访问', itemStyle:{normal:{color:'#f66a65'}}},
        {value:100, name:'邮件营销', itemStyle:{normal:{color:'#9d4643'}}}
        ]
    var a=0;
    for(var i=0; i<data2.length; i++) {
        a+=data2[i].value;
    }
    data2.push({value:a, name:'__other', itemStyle:{normal:{color:'rgba(0,0,0,0)'}}});
    var option4 = {
        tooltip : {
            trigger: 'item',
            formatter: function(param){
                var str = '<style>td{padding:5px;}</style><table>';
                var c = (param['value']/a)*100;
                c = c.toFixed(3);
                str  = str + c + "%";
                return str
            }

        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                startAngle:180,
                radius: ['50%', '70%'],
                center: ['50%', '56%'],
                data:data2,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
            }
        ]
    };
    if (option4 && typeof option4 === "object") {
        top2Chart.setOption(option4, true);
    }

}



function getHours() {

    var oldprice = 0;
    var maxValue = 0;// 最高价
    var minValue = 99999999999;// 最低价
    var highColor = '#FF0000';// 上涨颜色
    var lowColor = '#00FF00';// 下跌
    var ktimeArray = [];// 分时的数据
    var anchor = []; // 分时的区间
    var yAxisNum = 3; // y轴线个数选择基数
    var normalColor = '#000000';// 正常颜色



    var data = xxx()
    for (var i = 0; i < data.length; i++){
        var info = data[i]
        var price = info.close
        oldprice = price
        items = {
            name: info.last_updated,// 时间
            value: [info.last_updated, price]
            // 价格
        };

        if (maxValue < price) {
            maxValue = price;
        }
        if (minValue > price) {
            minValue = price;
        }
        ktimeArray.push(items);
    }

    var lastClose = ktimeArray[0].value[1];// TODO 今天开盘价

    var date1 = ktimeArray[0].name;
    var date2 = ktimeArray[ktimeArray.length - 1].name;
    var endPrice = ktimeArray[ktimeArray.length - 1].value[1];

    anchor = [{
        name: date1,
        value: [date1, lastClose]
    }, {
        name: date2,
        value: [date2, endPrice]
    }];


    // 最大最小值根据和中间值的定义重新选择
    if ((maxValue - lastClose) > (lastClose - minValue)) {
        minValue = lastClose - (maxValue - lastClose);
    } else {
        maxValue = lastClose + (lastClose - minValue);
    }

    // 获取y轴间隔
    if (maxValue == minValue) {
        maxValue = maxValue * 1.1;
        minValue = minValue * 0.9;
    }
    var yAxisSpan = (maxValue - minValue) / (yAxisNum - 1);
    // 获取金额数组
    var data = ktimeArray; //TODO 需要的数组
    var option = {
        backgroundColor: '#ffffff',
        tooltip: {
            trigger: 'axis',
            formatter: function (param) {
                param = param[0];
                return [
                    '时间: ' + getJustMin(param.name) + '<br/>',
                    '金额: ' + param.value[1].toFixed(2) + '<br/>',
                    '涨跌: '
                    + ((param.value[1] - lastClose) * 100 / lastClose)
                        .toFixed(2) + '%'].join('');
            }

        },

        grid : {
            top : 20,
            bottom: 40,
            left:80,
            right:40,
        },
        xAxis: {
            type : 'time',
            splitLine : {
                show : false
            },
            position : 'bottom',
            splitNumber : 5,
            axisLabel : {
                margin:20,
                interval : false,
                formatter : function(value, index) {
                    // 格式化成月/日，只在第一个刻度显示年份
                    var date = new Date(value);
                    date = date.Format('hh:mm');
                    if (index > 0 && date == '23:59') {
                        date = "24:00";
                    }
                    return date;
                }
            }
        },
        yAxis: [
            {
                type : 'value',
                position : 'left',
                max : maxValue,
                min : minValue,
                interval : yAxisSpan,
                splitLine: {
                    show: true,
                    interval:yAxisSpan,
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: ['', '#b6b6b6']
                    }
                },
                axisLabel: {
                    formatter: function (value, index) {
                        return value.toFixed(2);
                    },
                    textStyle: {
                        color: function (value, index) {
                            if (value > lastClose) {
                                return highColor;
                            } else if (value < lastClose) {
                                return lowColor;
                            } else {
                                return normalColor;
                            }
                        },
                        fontSize: 11
                    }
                }
            },
        ],
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: 'spline',
            itemStyle: {
                normal: {
                    width:1,
                    lineStyle: {
                        width:1,
                        color: '#818c98'
                    }
                }
            },
            areaStyle: {
                origin: 'start',
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#ecf2fc'
                }, {
                    offset: 1,
                    color: '#FFFFFF'
                }])
            },
            data: data
        }, {
            name: '.anchor',
            type: 'line',
            showSymbol: false,
            data: anchor,
            itemStyle: {
                normal: {
                    opacity: 0
                }
            },
            lineStyle: {
                normal: {
                    opacity: 0
                }
            }
        }]
    };
    if (option && typeof option === "object") {
        hoursDivChart.setOption(option, true);
    }

    var option ={
        name:'BTC',
        type:0,

    };
    $.ajax({
        url: 'http://www.41caijing.com/index/get_detail_kline.html',
        type: 'GET',
        data:option,
        success: function (data, textStatus, xhr) {
            for (var i = 0; i < data.length; i++){
                var info = data[i]
                var price = info.close
                oldprice = price
                items = {
                    name: info.last_updated,// 时间
                    value: [info.last_updated, price]
                    // 价格
                };

                if (maxValue < price) {
                    maxValue = price;
                }
                if (minValue > price) {
                    minValue = price;
                }
                ktimeArray.push(items);
            }

            var lastClose = ktimeArray[0].value[1];// TODO 今天开盘价

            var date1 = ktimeArray[0].name;
            var date2 = ktimeArray[ktimeArray.length - 1].name;
            var endPrice = ktimeArray[ktimeArray.length - 1].value[1];

            anchor = [{
                name: date1,
                value: [date1, lastClose]
            }, {
                name: date2,
                value: [date2, endPrice]
            }];


            // 最大最小值根据和中间值的定义重新选择
            if ((maxValue - lastClose) > (lastClose - minValue)) {
                minValue = lastClose - (maxValue - lastClose);
            } else {
                maxValue = lastClose + (lastClose - minValue);
            }

            // 获取y轴间隔
            if (maxValue == minValue) {
                maxValue = maxValue * 1.1;
                minValue = minValue * 0.9;
            }
            var yAxisSpan = (maxValue - minValue) / (yAxisNum - 1);
            // 获取金额数组
            var data = ktimeArray; //TODO 需要的数组
            var option = {
                backgroundColor: '#ffffff',
                tooltip: {
                    trigger: 'axis',
                    formatter: function (param) {
                        param = param[0];
                        return [
                            '时间: ' + getJustMin(param.name) + '<br/>',
                            '金额: ' + param.value[1].toFixed(2) + '<br/>',
                            '涨跌: '
                            + ((param.value[1] - lastClose) * 100 / lastClose)
                                .toFixed(2) + '%'].join('');
                    }

                },

                grid : {
                    top : 20,
                    bottom: 40,
                    left:80,
                    right:40,
                },
                xAxis: {
                    type : 'time',
                    splitLine : {
                        show : false
                    },
                    position : 'bottom',
                    splitNumber : 5,
                    axisLabel : {
                        margin:20,
                        interval : false,
                        formatter : function(value, index) {
                            // 格式化成月/日，只在第一个刻度显示年份
                            var date = new Date(value);
                            date = date.Format('hh:mm');
                            if (index > 0 && date == '23:59') {
                                date = "24:00";
                            }
                            return date;
                        }
                    }
                },
                yAxis: [
                    {
                        type : 'value',
                        position : 'left',
                        max : maxValue,
                        min : minValue,
                        interval : yAxisSpan,
                        splitLine: {
                            show: true,
                            interval:yAxisSpan,
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['', '#b6b6b6']
                            }
                        },
                        axisLabel: {
                            formatter: function (value, index) {
                                return value.toFixed(2);
                            },
                            textStyle: {
                                color: function (value, index) {
                                    if (value > lastClose) {
                                        return highColor;
                                    } else if (value < lastClose) {
                                        return lowColor;
                                    } else {
                                        return normalColor;
                                    }
                                },
                                fontSize: 11
                            }
                        }
                    },
                ],
                series: [{
                    name: '模拟数据',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    smooth: 'spline',
                    itemStyle: {
                        normal: {
                            width:1,
                            lineStyle: {
                                width:1,
                                color: '#818c98'
                            }
                        }
                    },
                    areaStyle: {
                        origin: 'start',
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#ecf2fc'
                        }, {
                            offset: 1,
                            color: '#FFFFFF'
                        }])
                    },
                    data: data
                }, {
                    name: '.anchor',
                    type: 'line',
                    showSymbol: false,
                    data: anchor,
                    itemStyle: {
                        normal: {
                            opacity: 0
                        }
                    },
                    lineStyle: {
                        normal: {
                            opacity: 0
                        }
                    }
                }]
            };
            if (option && typeof option === "object") {
                hoursDivChart.setOption(option, true);
            }
        }
    });


}

function getDay() {
    var option ={
        date:0,
        name:'BTC',
        type:1,
        chart:dayDivChart
    };
    getDate(option,function (data) {
        toData(option,data)
    })

}
function getDay3() {

    var option ={
        date:1,
        name:'BTC',
        type:1,
        chart:dayDivChart3
    }
    getDate(option,function (data) {
        toData(option,data)
    })

}
function getDay4() {
    var option ={
        date:2,
        name:'BTC',
        type:1,
        chart:dayDivChart4
    }
    getDate(option,function (data) {
        toData(option,data)
    })

}
function getDay5() {
    var option ={
        date:3,
        name:'BTC',
        type:1,
        chart:dayDivChart5
    }
    getDate(option,function (data) {
        toData(option,data)
    })

}
function getDay6() {

    var option ={
        date:4,
        name:'BTC',
        type:1,
        chart:dayDivChart6
    }
    getDate(option,function (data) {
        toData(option,data)
    })


}

function getDate(data,cb) {
    $.ajax({
        url: 'http://www.41caijing.com/index/get_detail_kline.html',
        type: 'GET',
        data: {
            date: data.date || '0',
            name: data.name || 'BTC',
            type: data.type || 1,
        },
        success: function (data, textStatus, xhr) {
            console.log(data)
            var list =update(data)
            console.log(list)
            cb && cb(list)
        }
    });


    var list =update(null,data.date)
    cb && cb(list)
}
function update(data,num) {

    if (data == null) {
        data = cc(num)
    }

    // 应该改成  var list = data
    var list = data.data.quote;
    var newlist =[];
    // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
    for (var i = 0;i<list.length;i++){
        var info = list[i];
        newlist.push([info.last_updated.toString().substring(0,10),
            info.open,
            info.close,
            info.low,
            info.high,
            info.pricema7,
            info.pricema15,
            info.pricema30,
        ])
    }
    return newlist
}


function toData(option,data) {
    var data0 =splitData(data)
    var option3 = {
        backgroundColor: '#ffffff',

        legend: {
            data: ['日K', 'MA7', 'MA15', 'MA30'],
            inactiveColor: '#777',
            textStyle: {
                color: '#000'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                    color: '#376df4',
                    width: 2,
                    opacity: 1
                }
            },
            formatter: function (param) {
                var fdata = {
                    open: {name: '开盘', value: 0},
                    close: {name: '收盘', value: 0},
                    lowest: {name: '最低', value: 0},
                    highest: {name: '最高', value: 0},
                    MA7: {name: 'MA7', value: 0},
                    MA15: {name: 'MA15', value: 0},
                    MA30: {name: 'MA30', value: 0},
                };

                // ['open', 'close', 'lowest', 'highest', 'volumn']
                // [1, 4, 3, 2]
                for (var i = 0; i < param.length; i++) {
                    var info = param[i];
                    if (info.seriesName === "日K") {
                        fdata.open.value = info.data[1];
                        fdata.close.value = info.data[4];
                        fdata.lowest.value = info.data[3];
                        fdata.highest.value = info.data[2]
                    } else if (info.seriesName === fdata[info.seriesName].name) {
                        fdata[info.seriesName].value = info.value ||'-'
                    }
                }


                var arr = [];
                var reg = /^[0-9,.]*$/; //^[-\+]?\d+(\.\d+)?$/;
                for (var obj in fdata) {
                    if (reg.test(fdata[obj].value)) {
                        fdata[obj].value = fdata[obj].value.toFixed(2)
                    }
                    arr.push(fdata[obj].name + ': ' + fdata[obj].value + '<br/>');
                }
                return arr.join("")

            }
        },


        xAxis: {
            type: 'category',
            data: data0.categoryData,
            axisLine: {lineStyle: {color: '#8392A5'}}
        },
        yAxis: {
            scale: true,
            axisLine: {lineStyle: {color: '#8392A5'}},
            splitLine: {show: false}
        },
        grid : {
            top : 20,
            bottom: 40,
            left:40,
            right:40,
        },
        dataZoom: [{
            type: 'inside'
        }],
        animation: false,
        series: [
            {
                type: 'candlestick',
                name: '日K',
                data: data0.values,
                itemStyle: {
                    normal: {
                        color: '#FD1050',
                        color0: '#0CF49B',
                        borderColor: '#FD1050',
                        borderColor0: '#0CF49B'
                    }
                }
            },
            {
                name: 'MA7',
                type: 'line',
                data: data0.pricema7,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                }
            },
            {
                name: 'MA15',
                type: 'line',
                data: data0.pricema15,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: data0.pricema30,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                }
            },

        ]
    };
    if (option3 && typeof option3 === "object") {
        option.chart.setOption(option3, true);
    }
}

function splitData(rawData) {
    var categoryData = [];
    var values = []
    var pricema7 =[]
    var pricema15 =[]
    var pricema30 =[]

    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        console.log(rawData[i])
        values.push([rawData[i][0],rawData[i][1],rawData[i][2],rawData[i][3]])
        pricema7.push(rawData[i][4])
        pricema15.push(rawData[i][5])
        pricema30.push(rawData[i][6])

    }
    return {
        categoryData: categoryData,
        values: values,
        pricema7:pricema7,
        pricema15:pricema15,
        pricema30:pricema30,
    };
}

// TODO 测试数据  通过请删除
function cc(num) {

    var data;

    if (num==0){
        data ={"result":{"symbol":"BTC","time_open":"2018-10-30 08:00:00","last_updated":"2018-10-31 07:59:59","quote":[{"volume":3781100000,"high":6364.99,"last_updated":"2018-10-31 07:59:59","volumema15":56716500000,"pricema7":6337.565,"low":6310.14,"pricema15":6337.565,"volumema30":113433000000,"pricema30":6337.565,"volumema7":26467700000,"close":6334.27,"open":6337.04},{"volume":4191240000,"high":6349.16,"last_updated":"2018-11-01 07:59:59","volumema15":62868600000,"pricema7":6333.02,"low":6316.88,"pricema15":6333.02,"volumema30":125737200000,"pricema30":6333.02,"volumema7":29338680000,"close":6317.61,"open":6336.99},{"volume":3789400000,"high":6547.14,"last_updated":"2018-11-02 07:59:59","volumema15":56841000000,"pricema7":6429.485,"low":6311.83,"pricema15":6429.485,"volumema30":113682000000,"pricema30":6429.485,"volumema7":26525800000,"close":6377.78,"open":6318.14},{"volume":3658640000,"high":6400.07,"last_updated":"2018-11-04 07:59:59","volumema15":54879600000,"pricema7":6371.22,"low":6342.37,"pricema15":6371.22,"volumema30":109759200000,"pricema30":6371.22,"volumema7":25610480000,"close":6361.26,"open":6387.24},{"volume":4390020000,"high":6388.63,"last_updated":"2018-11-05 07:59:59","volumema15":65850300000,"pricema7":6341.6,"low":6294.57,"pricema15":6341.6,"volumema30":131700600000,"pricema30":6341.6,"volumema7":30730140000,"close":6376.13,"open":6365.47},{"volume":4174800000,"high":6480.59,"last_updated":"2018-11-06 07:59:59","volumema15":62622000000,"pricema7":6422.105,"low":6363.62,"pricema15":6422.105,"volumema30":125244000000,"pricema30":6422.105,"volumema7":29223600000,"close":6419.66,"open":6363.62},{"volume":4700040000,"high":6463.55,"last_updated":"2018-11-07 07:59:59","volumema15":70500600000,"pricema7":6435.855,"low":6408.16,"pricema15":6435.855,"volumema30":141001200000,"pricema30":6435.855,"volumema7":32900280000,"close":6461.01,"open":6433.38},{"volume":4941260000,"high":6552.16,"last_updated":"2018-11-08 07:59:59","pricema7":6385.0578571429,"low":6468.31,"volumema7":29139010000,"close":6530.14,"open":6468.5},{"volume":4665260000,"high":6536.92,"last_updated":"2018-11-09 07:59:59","volumema15":69978900000,"pricema7":6487.725,"low":6438.53,"pricema15":6487.725,"volumema30":139957800000,"pricema30":6487.725,"volumema7":32656820000,"close":6453.72,"open":6522.27},{"volume":4346820000,"high":6456.46,"last_updated":"2018-11-10 07:59:59","volumema15":65202300000,"pricema7":6414.915,"low":6373.37,"pricema15":6414.915,"volumema30":130404600000,"pricema30":6414.915,"volumema7":30427740000,"close":6385.62,"open":6442.6},{"volume":3705320000,"high":6437.28,"last_updated":"2018-11-11 07:59:59","volumema15":55579800000,"pricema7":6411.295,"low":6385.31,"pricema15":6411.295,"volumema30":111159600000,"pricema30":6411.295,"volumema7":25937240000,"close":6409.22,"open":6386.13},{"volume":3939060000,"high":6423.25,"last_updated":"2018-11-12 07:59:59","volumema15":59085900000,"pricema7":6386.71,"low":6350.17,"pricema15":6386.71,"volumema30":118171800000,"pricema30":6386.71,"volumema7":27573420000,"close":6411.27,"open":6413.63},{"volume":4295770000,"high":6434.21,"last_updated":"2018-11-13 07:59:59","pricema7":6438.4057142857,"low":6360.47,"volumema7":30472560000,"close":6371.27,"open":6411.76},{"volume":4503800000,"high":6395.27,"last_updated":"2018-11-14 07:59:59","volumema15":67557000000,"pricema7":6368.97,"low":6342.67,"pricema15":6368.97,"volumema30":135114000000,"pricema30":6368.97,"volumema7":31526600000,"close":6359.49,"open":6373.19},{"volume":7398940000,"high":6371.55,"last_updated":"2018-11-15 07:59:59","volumema15":110984100000,"pricema7":5957.82,"low":5544.09,"pricema15":5957.82,"volumema30":221968200000,"pricema30":5957.82,"volumema7":51792580000,"close":5738.35,"open":6351.24},{"volume":7032140000,"high":5774.82,"last_updated":"2018-11-16 07:59:59","volumema15":105482100000,"pricema7":5566.6,"low":5358.38,"pricema15":5566.6,"volumema30":210964200000,"pricema30":5566.6,"volumema7":49224980000,"close":5648.03,"open":5736.15},{"volume":5279320000,"high":5657.02,"last_updated":"2018-11-17 07:59:59","volumema15":79189800000,"pricema7":5577.98,"low":5498.94,"pricema15":5577.98,"volumema30":158379600000,"pricema30":5577.98,"volumema7":36955240000,"close":5575.55,"open":5645.32},{"volume":4303150000,"high":5578.58,"last_updated":"2018-11-18 07:59:59","volumema15":64547250000,"pricema7":5549.07,"low":5519.56,"pricema15":5549.07,"volumema30":129094500000,"pricema30":5549.07,"volumema7":30122050000,"close":5554.33,"open":5578.58},{"volume":4159680000,"high":5653.61,"last_updated":"2018-11-19 07:59:59","volumema15":62395200000,"pricema7":5606.675,"low":5559.74,"pricema15":5606.675,"volumema30":124790400000,"pricema30":5606.675,"volumema7":29117760000,"close":5623.54,"open":5559.74},{"volume":7039560000,"high":5620.78,"last_updated":"2018-11-20 07:59:59","volumema15":105593400000,"pricema7":5231.845,"low":4842.91,"pricema15":5231.845,"volumema30":211186800000,"pricema30":5231.845,"volumema7":49276920000,"close":4871.49,"open":5620.78},{"volume":8428290000,"high":4951.61,"last_updated":"2018-11-21 07:59:59","volumema15":126424350000,"pricema7":4611.86,"low":4272.11,"pricema15":4611.86,"volumema30":252848700000,"pricema30":4611.86,"volumema7":58998030000,"close":4451.87,"open":4863.93},{"volume":6120120000,"high":4675.73,"last_updated":"2018-11-22 07:59:59","volumema15":91801800000,"pricema7":4509.855,"low":4343.98,"pricema15":4509.855,"volumema30":183603600000,"pricema30":4509.855,"volumema7":42840840000,"close":4602.17,"open":4465.54},{"volume":4569370000,"high":4629.64,"last_updated":"2018-11-23 07:59:59","volumema15":68540550000,"pricema7":4497.64,"low":4365.64,"pricema15":4497.64,"volumema30":137081100000,"pricema30":4497.64,"volumema7":31985590000,"close":4365.94,"open":4611.57},{"volume":4871490000,"high":4396.42,"last_updated":"2018-11-24 07:59:59","volumema15":73072350000,"pricema7":4296.05,"low":4195.68,"pricema15":4296.05,"volumema30":146144700000,"pricema30":4296.05,"volumema7":34100430000,"close":4347.11,"open":4360.7},{"volume":4679500000,"high":4413.09,"last_updated":"2018-11-25 07:59:59","volumema15":70192500000,"pricema7":4104.125,"low":3795.16,"pricema15":4104.125,"volumema30":140385000000,"pricema30":4104.125,"volumema7":32756500000,"close":3880.76,"open":4347.69},{"volume":6825640000,"high":4120.87,"last_updated":"2018-11-26 07:59:59","volumema15":102384600000,"pricema7":3852.965,"low":3585.06,"pricema15":3852.965,"volumema30":204769200000,"pricema30":3852.965,"volumema7":47779480000,"close":4009.97,"open":3880.78},{"volume":6476900000,"high":4107.14,"last_updated":"2018-11-27 07:59:59","volumema15":97153500000,"pricema7":3875.53,"low":3643.92,"pricema15":3875.53,"volumema30":194307000000,"pricema30":3875.53,"volumema7":45338300000,"close":3779.13,"open":4015.07},{"volume":5998720000,"high":3862.96,"last_updated":"2018-11-28 07:59:59","volumema15":89980800000,"pricema7":3761.985,"low":3661.01,"pricema15":3761.985,"volumema30":179961600000,"pricema30":3761.985,"volumema7":41991040000,"close":3820.72,"open":3765.95},{"volume":7280280000,"high":4385.9,"last_updated":"2018-11-29 07:59:59","volumema15":109204200000,"pricema7":4104.185,"low":3822.47,"pricema15":4104.185,"volumema30":218408400000,"pricema30":4104.185,"volumema7":50961960000,"close":4257.42,"open":3822.47},{"volume":6503347767.1892,"high":4413.02046804,"last_updated":"2018-11-30 07:59:59","volumema15":97550216507.838,"pricema7":4279.3928023794,"low":4145.7651367188,"pricema15":4279.3928023794,"volumema30":195100433015.68,"pricema30":4279.3928023794,"volumema7":45523434370.325,"close":4278.84645524,"open":4269.0043945312},{"volume":6048016716.855,"high":4322.97639207,"last_updated":"2018-12-01 07:59:59","volumema15":90720250752.825,"pricema7":4132.89923883,"low":3942.82208559,"pricema15":4132.89923883,"volumema30":181440501505.65,"pricema30":4132.89923883,"volumema7":42336117017.985,"close":4017.26845712,"open":4289.08896703},{"volume":5375314093.1014,"high":4309.37731216,"last_updated":"2018-12-02 07:59:59","volumema15":80629711396.522,"pricema7":4139.543977385,"low":3969.71064261,"pricema15":4139.543977385,"volumema30":161259422793.04,"pricema30":4139.543977385,"volumema7":37627198651.71,"close":4214.67193177,"open":4024.46424203},{"volume":5262697895.1207,"high":4301.51941165,"last_updated":"2018-12-03 07:59:59","volumema15":78940468426.811,"pricema7":4206.248942335,"low":4110.97847302,"pricema15":4206.248942335,"volumema30":157880936853.62,"pricema30":4206.248942335,"volumema7":36838885265.845,"close":4139.8780641,"open":4200.73317961},{"volume":5089570993.523,"high":4155.97928378,"last_updated":"2018-12-04 07:59:59","volumema15":76343564902.846,"pricema7":3998.212776075,"low":3840.44626837,"pricema15":3998.212776075,"volumema30":152687129805.69,"pricema30":3998.212776075,"volumema7":35626996954.661,"close":3894.1309069,"open":4147.32376691},{"volume":5028069239.3143,"high":4075.62765492,"last_updated":"2018-12-05 07:59:59","volumema15":75421038589.714,"pricema7":3954.188796675,"low":3832.74993843,"pricema15":3954.188796675,"volumema30":150842077179.43,"pricema30":3954.188796675,"volumema7":35196484675.2,"close":3956.89386975,"open":3886.2948763},{"volume":5302481573.5223,"high":3969.53585216,"last_updated":"2018-12-06 07:59:59","volumema15":79537223602.835,"pricema7":3861.765339395,"low":3753.99482663,"pricema15":3861.765339395,"volumema30":159074447205.67,"pricema30":3861.765339395,"volumema7":37117371014.656,"close":3753.99482663,"open":3958.89472485},{"volume":5878333109.0289,"high":3874.96603127,"last_updated":"2018-12-07 07:59:59","volumema15":88174996635.433,"pricema7":3698.033877555,"low":3521.10172384,"pricema15":3698.033877555,"volumema30":176349993270.87,"pricema30":3698.033877555,"volumema7":41148331763.202,"close":3521.10172384,"open":3754.07446712},{"volume":6835615448.3968,"high":3512.59040851,"last_updated":"2018-12-08 07:59:59","volumema15":90441242083.83,"pricema7":3592.821069195,"low":3280.22875211,"pricema15":3624.6185162423,"volumema30":178244348719.26,"pricema30":3591.4367941174,"volumema7":41935930494.744,"close":3419.93720035,"open":3512.59040851},{"volume":5050420351.4263,"high":3517.21874569,"last_updated":"2018-12-09 16:39:01","volumema15":90620172435.256,"pricema7":3492.0197473586,"low":3350.65070337,"pricema15":3567.1441645443,"volumema30":178629509070.69,"pricema30":3489.6437849351,"volumema7":41611036753.069,"close":3497.80566404,"open":3421.9104035},{"volume":4931559216.7478,"high":3647.33258231,"last_updated":"2018-12-10 11:19:00","volumema15":87889511333.113,"pricema7":3791.8866228321,"low":3597.97120565,"pricema15":3919.588825228,"volumema30":167882341333.11,"pricema30":4739.281912614,"volumema7":38701792755.968,"close":3609.85089174,"open":3612.04639531},{"volume":4757239913.7833,"high":3513.18494093,"last_updated":"2018-12-11 23:39:03","volumema15":85821111246.896,"pricema7":3713.9587258092,"low":3392.2500529,"pricema15":3892.9056583557,"volumema30":168934261246.9,"pricema30":4640.6626625112,"volumema7":38369461676.228,"close":3406.9878246,"open":3497.5547337},{"volume":4688875234.5243,"high":3513.18494093,"last_updated":"2018-12-12 10:14:00","volumema15":86293326830.741,"pricema7":3636.8392673271,"low":3392.2500529,"pricema15":3863.724840553,"volumema30":169739156830.74,"pricema30":4549.0459202765,"volumema7":38258479364.951,"close":3420.61201079,"open":3497.5547337},{"volume":3990818671.5023,"high":3534.22857953,"last_updated":"2018-12-13 23:59:01","volumema15":84285425502.243,"pricema7":3580.9388837292,"low":3406.69672889,"pricema15":3844.2900175003,"volumema30":169434205502.24,"pricema30":4449.0973911113,"volumema7":36946816462.931,"close":3438.25973484,"open":3421.4583733},{"volume":4319266211.7517,"high":3489.73939494,"last_updated":"2018-12-14 19:29:02","volumema15":81324411713.994,"pricema7":3536.5099734899,"low":3284.32361682,"pricema15":3796.479784559,"volumema30":169249671713.99,"pricema30":4349.6994413073,"volumema7":35387749565.654,"close":3319.15613871,"open":3487.87935755},{"volume":3822294405.2048,"high":3305.75310795,"last_updated":"2018-12-16 23:59:01","volumema15":77342030068.659,"pricema7":3454.5370536857,"low":3191.30356157,"pricema15":3704.6041269573,"volumema30":166909537835.85,"pricema30":4166.4939902246,"volumema7":32521930999.796,"close":3273.37227456,"open":3243.99754038},{"volume":4426064010.1706,"high":3450.20737544,"last_updated":"2018-12-17 23:59:00","volumema15":75133997059.474,"pricema7":3426.6790032264,"low":3233.81979097,"pricema15":3644.6335573197,"volumema30":163717381543.52,"pricema30":4088.7186800335,"volumema7":31056890210.405,"close":3436.16325808,"open":3236.2747733},{"volume":5919179381.7226,"high":3597.9178885,"last_updated":"2018-12-18 15:44:00","volumema15":73564338800.11,"pricema7":3375.2642833193,"low":3253.12299273,"pricema15":3586.6497221247,"volumema30":162243717377.26,"pricema30":4011.7788950155,"volumema7":29909124615.665,"close":3549.96170031,"open":3253.12299273},{"volume":6389343011.8041,"high":3802.4669143,"last_updated":"2018-12-19 17:44:00","volumema15":72750844482.779,"pricema7":3355.5820608936,"low":3487.16920219,"pricema15":3529.6774715747,"volumema30":162389770955.05,"pricema30":3938.5320678183,"volumema7":29402794124.305,"close":3779.44728713,"open":3544.76156472}],"name":"Bitcoin"},"total":0,"code":1000,"data":{"symbol":"BTC","time_open":"2018-10-30 08:00:00","last_updated":"2018-10-31 07:59:59","quote":[{"volume":3781100000,"high":6364.99,"last_updated":"2018-10-31 07:59:59","volumema15":56716500000,"pricema7":6337.565,"low":6310.14,"pricema15":6337.565,"volumema30":113433000000,"pricema30":6337.565,"volumema7":26467700000,"close":6334.27,"open":6337.04},{"volume":4191240000,"high":6349.16,"last_updated":"2018-11-01 07:59:59","volumema15":62868600000,"pricema7":6333.02,"low":6316.88,"pricema15":6333.02,"volumema30":125737200000,"pricema30":6333.02,"volumema7":29338680000,"close":6317.61,"open":6336.99},{"volume":3789400000,"high":6547.14,"last_updated":"2018-11-02 07:59:59","volumema15":56841000000,"pricema7":6429.485,"low":6311.83,"pricema15":6429.485,"volumema30":113682000000,"pricema30":6429.485,"volumema7":26525800000,"close":6377.78,"open":6318.14},{"volume":3658640000,"high":6400.07,"last_updated":"2018-11-04 07:59:59","volumema15":54879600000,"pricema7":6371.22,"low":6342.37,"pricema15":6371.22,"volumema30":109759200000,"pricema30":6371.22,"volumema7":25610480000,"close":6361.26,"open":6387.24},{"volume":4390020000,"high":6388.63,"last_updated":"2018-11-05 07:59:59","volumema15":65850300000,"pricema7":6341.6,"low":6294.57,"pricema15":6341.6,"volumema30":131700600000,"pricema30":6341.6,"volumema7":30730140000,"close":6376.13,"open":6365.47},{"volume":4174800000,"high":6480.59,"last_updated":"2018-11-06 07:59:59","volumema15":62622000000,"pricema7":6422.105,"low":6363.62,"pricema15":6422.105,"volumema30":125244000000,"pricema30":6422.105,"volumema7":29223600000,"close":6419.66,"open":6363.62},{"volume":4700040000,"high":6463.55,"last_updated":"2018-11-07 07:59:59","volumema15":70500600000,"pricema7":6435.855,"low":6408.16,"pricema15":6435.855,"volumema30":141001200000,"pricema30":6435.855,"volumema7":32900280000,"close":6461.01,"open":6433.38},{"volume":4941260000,"high":6552.16,"last_updated":"2018-11-08 07:59:59","pricema7":6385.0578571429,"low":6468.31,"volumema7":29139010000,"close":6530.14,"open":6468.5},{"volume":4665260000,"high":6536.92,"last_updated":"2018-11-09 07:59:59","volumema15":69978900000,"pricema7":6487.725,"low":6438.53,"pricema15":6487.725,"volumema30":139957800000,"pricema30":6487.725,"volumema7":32656820000,"close":6453.72,"open":6522.27},{"volume":4346820000,"high":6456.46,"last_updated":"2018-11-10 07:59:59","volumema15":65202300000,"pricema7":6414.915,"low":6373.37,"pricema15":6414.915,"volumema30":130404600000,"pricema30":6414.915,"volumema7":30427740000,"close":6385.62,"open":6442.6},{"volume":3705320000,"high":6437.28,"last_updated":"2018-11-11 07:59:59","volumema15":55579800000,"pricema7":6411.295,"low":6385.31,"pricema15":6411.295,"volumema30":111159600000,"pricema30":6411.295,"volumema7":25937240000,"close":6409.22,"open":6386.13},{"volume":3939060000,"high":6423.25,"last_updated":"2018-11-12 07:59:59","volumema15":59085900000,"pricema7":6386.71,"low":6350.17,"pricema15":6386.71,"volumema30":118171800000,"pricema30":6386.71,"volumema7":27573420000,"close":6411.27,"open":6413.63},{"volume":4295770000,"high":6434.21,"last_updated":"2018-11-13 07:59:59","pricema7":6438.4057142857,"low":6360.47,"volumema7":30472560000,"close":6371.27,"open":6411.76},{"volume":4503800000,"high":6395.27,"last_updated":"2018-11-14 07:59:59","volumema15":67557000000,"pricema7":6368.97,"low":6342.67,"pricema15":6368.97,"volumema30":135114000000,"pricema30":6368.97,"volumema7":31526600000,"close":6359.49,"open":6373.19},{"volume":7398940000,"high":6371.55,"last_updated":"2018-11-15 07:59:59","volumema15":110984100000,"pricema7":5957.82,"low":5544.09,"pricema15":5957.82,"volumema30":221968200000,"pricema30":5957.82,"volumema7":51792580000,"close":5738.35,"open":6351.24},{"volume":7032140000,"high":5774.82,"last_updated":"2018-11-16 07:59:59","volumema15":105482100000,"pricema7":5566.6,"low":5358.38,"pricema15":5566.6,"volumema30":210964200000,"pricema30":5566.6,"volumema7":49224980000,"close":5648.03,"open":5736.15},{"volume":5279320000,"high":5657.02,"last_updated":"2018-11-17 07:59:59","volumema15":79189800000,"pricema7":5577.98,"low":5498.94,"pricema15":5577.98,"volumema30":158379600000,"pricema30":5577.98,"volumema7":36955240000,"close":5575.55,"open":5645.32},{"volume":4303150000,"high":5578.58,"last_updated":"2018-11-18 07:59:59","volumema15":64547250000,"pricema7":5549.07,"low":5519.56,"pricema15":5549.07,"volumema30":129094500000,"pricema30":5549.07,"volumema7":30122050000,"close":5554.33,"open":5578.58},{"volume":4159680000,"high":5653.61,"last_updated":"2018-11-19 07:59:59","volumema15":62395200000,"pricema7":5606.675,"low":5559.74,"pricema15":5606.675,"volumema30":124790400000,"pricema30":5606.675,"volumema7":29117760000,"close":5623.54,"open":5559.74},{"volume":7039560000,"high":5620.78,"last_updated":"2018-11-20 07:59:59","volumema15":105593400000,"pricema7":5231.845,"low":4842.91,"pricema15":5231.845,"volumema30":211186800000,"pricema30":5231.845,"volumema7":49276920000,"close":4871.49,"open":5620.78},{"volume":8428290000,"high":4951.61,"last_updated":"2018-11-21 07:59:59","volumema15":126424350000,"pricema7":4611.86,"low":4272.11,"pricema15":4611.86,"volumema30":252848700000,"pricema30":4611.86,"volumema7":58998030000,"close":4451.87,"open":4863.93},{"volume":6120120000,"high":4675.73,"last_updated":"2018-11-22 07:59:59","volumema15":91801800000,"pricema7":4509.855,"low":4343.98,"pricema15":4509.855,"volumema30":183603600000,"pricema30":4509.855,"volumema7":42840840000,"close":4602.17,"open":4465.54},{"volume":4569370000,"high":4629.64,"last_updated":"2018-11-23 07:59:59","volumema15":68540550000,"pricema7":4497.64,"low":4365.64,"pricema15":4497.64,"volumema30":137081100000,"pricema30":4497.64,"volumema7":31985590000,"close":4365.94,"open":4611.57},{"volume":4871490000,"high":4396.42,"last_updated":"2018-11-24 07:59:59","volumema15":73072350000,"pricema7":4296.05,"low":4195.68,"pricema15":4296.05,"volumema30":146144700000,"pricema30":4296.05,"volumema7":34100430000,"close":4347.11,"open":4360.7},{"volume":4679500000,"high":4413.09,"last_updated":"2018-11-25 07:59:59","volumema15":70192500000,"pricema7":4104.125,"low":3795.16,"pricema15":4104.125,"volumema30":140385000000,"pricema30":4104.125,"volumema7":32756500000,"close":3880.76,"open":4347.69},{"volume":6825640000,"high":4120.87,"last_updated":"2018-11-26 07:59:59","volumema15":102384600000,"pricema7":3852.965,"low":3585.06,"pricema15":3852.965,"volumema30":204769200000,"pricema30":3852.965,"volumema7":47779480000,"close":4009.97,"open":3880.78},{"volume":6476900000,"high":4107.14,"last_updated":"2018-11-27 07:59:59","volumema15":97153500000,"pricema7":3875.53,"low":3643.92,"pricema15":3875.53,"volumema30":194307000000,"pricema30":3875.53,"volumema7":45338300000,"close":3779.13,"open":4015.07},{"volume":5998720000,"high":3862.96,"last_updated":"2018-11-28 07:59:59","volumema15":89980800000,"pricema7":3761.985,"low":3661.01,"pricema15":3761.985,"volumema30":179961600000,"pricema30":3761.985,"volumema7":41991040000,"close":3820.72,"open":3765.95},{"volume":7280280000,"high":4385.9,"last_updated":"2018-11-29 07:59:59","volumema15":109204200000,"pricema7":4104.185,"low":3822.47,"pricema15":4104.185,"volumema30":218408400000,"pricema30":4104.185,"volumema7":50961960000,"close":4257.42,"open":3822.47},{"volume":6503347767.1892,"high":4413.02046804,"last_updated":"2018-11-30 07:59:59","volumema15":97550216507.838,"pricema7":4279.3928023794,"low":4145.7651367188,"pricema15":4279.3928023794,"volumema30":195100433015.68,"pricema30":4279.3928023794,"volumema7":45523434370.325,"close":4278.84645524,"open":4269.0043945312},{"volume":6048016716.855,"high":4322.97639207,"last_updated":"2018-12-01 07:59:59","volumema15":90720250752.825,"pricema7":4132.89923883,"low":3942.82208559,"pricema15":4132.89923883,"volumema30":181440501505.65,"pricema30":4132.89923883,"volumema7":42336117017.985,"close":4017.26845712,"open":4289.08896703},{"volume":5375314093.1014,"high":4309.37731216,"last_updated":"2018-12-02 07:59:59","volumema15":80629711396.522,"pricema7":4139.543977385,"low":3969.71064261,"pricema15":4139.543977385,"volumema30":161259422793.04,"pricema30":4139.543977385,"volumema7":37627198651.71,"close":4214.67193177,"open":4024.46424203},{"volume":5262697895.1207,"high":4301.51941165,"last_updated":"2018-12-03 07:59:59","volumema15":78940468426.811,"pricema7":4206.248942335,"low":4110.97847302,"pricema15":4206.248942335,"volumema30":157880936853.62,"pricema30":4206.248942335,"volumema7":36838885265.845,"close":4139.8780641,"open":4200.73317961},{"volume":5089570993.523,"high":4155.97928378,"last_updated":"2018-12-04 07:59:59","volumema15":76343564902.846,"pricema7":3998.212776075,"low":3840.44626837,"pricema15":3998.212776075,"volumema30":152687129805.69,"pricema30":3998.212776075,"volumema7":35626996954.661,"close":3894.1309069,"open":4147.32376691},{"volume":5028069239.3143,"high":4075.62765492,"last_updated":"2018-12-05 07:59:59","volumema15":75421038589.714,"pricema7":3954.188796675,"low":3832.74993843,"pricema15":3954.188796675,"volumema30":150842077179.43,"pricema30":3954.188796675,"volumema7":35196484675.2,"close":3956.89386975,"open":3886.2948763},{"volume":5302481573.5223,"high":3969.53585216,"last_updated":"2018-12-06 07:59:59","volumema15":79537223602.835,"pricema7":3861.765339395,"low":3753.99482663,"pricema15":3861.765339395,"volumema30":159074447205.67,"pricema30":3861.765339395,"volumema7":37117371014.656,"close":3753.99482663,"open":3958.89472485},{"volume":5878333109.0289,"high":3874.96603127,"last_updated":"2018-12-07 07:59:59","volumema15":88174996635.433,"pricema7":3698.033877555,"low":3521.10172384,"pricema15":3698.033877555,"volumema30":176349993270.87,"pricema30":3698.033877555,"volumema7":41148331763.202,"close":3521.10172384,"open":3754.07446712},{"volume":6835615448.3968,"high":3512.59040851,"last_updated":"2018-12-08 07:59:59","volumema15":90441242083.83,"pricema7":3592.821069195,"low":3280.22875211,"pricema15":3624.6185162423,"volumema30":178244348719.26,"pricema30":3591.4367941174,"volumema7":41935930494.744,"close":3419.93720035,"open":3512.59040851},{"volume":5050420351.4263,"high":3517.21874569,"last_updated":"2018-12-09 16:39:01","volumema15":90620172435.256,"pricema7":3492.0197473586,"low":3350.65070337,"pricema15":3567.1441645443,"volumema30":178629509070.69,"pricema30":3489.6437849351,"volumema7":41611036753.069,"close":3497.80566404,"open":3421.9104035},{"volume":4931559216.7478,"high":3647.33258231,"last_updated":"2018-12-10 11:19:00","volumema15":87889511333.113,"pricema7":3791.8866228321,"low":3597.97120565,"pricema15":3919.588825228,"volumema30":167882341333.11,"pricema30":4739.281912614,"volumema7":38701792755.968,"close":3609.85089174,"open":3612.04639531},{"volume":4757239913.7833,"high":3513.18494093,"last_updated":"2018-12-11 23:39:03","volumema15":85821111246.896,"pricema7":3713.9587258092,"low":3392.2500529,"pricema15":3892.9056583557,"volumema30":168934261246.9,"pricema30":4640.6626625112,"volumema7":38369461676.228,"close":3406.9878246,"open":3497.5547337},{"volume":4688875234.5243,"high":3513.18494093,"last_updated":"2018-12-12 10:14:00","volumema15":86293326830.741,"pricema7":3636.8392673271,"low":3392.2500529,"pricema15":3863.724840553,"volumema30":169739156830.74,"pricema30":4549.0459202765,"volumema7":38258479364.951,"close":3420.61201079,"open":3497.5547337},{"volume":3990818671.5023,"high":3534.22857953,"last_updated":"2018-12-13 23:59:01","volumema15":84285425502.243,"pricema7":3580.9388837292,"low":3406.69672889,"pricema15":3844.2900175003,"volumema30":169434205502.24,"pricema30":4449.0973911113,"volumema7":36946816462.931,"close":3438.25973484,"open":3421.4583733},{"volume":4319266211.7517,"high":3489.73939494,"last_updated":"2018-12-14 19:29:02","volumema15":81324411713.994,"pricema7":3536.5099734899,"low":3284.32361682,"pricema15":3796.479784559,"volumema30":169249671713.99,"pricema30":4349.6994413073,"volumema7":35387749565.654,"close":3319.15613871,"open":3487.87935755},{"volume":3822294405.2048,"high":3305.75310795,"last_updated":"2018-12-16 23:59:01","volumema15":77342030068.659,"pricema7":3454.5370536857,"low":3191.30356157,"pricema15":3704.6041269573,"volumema30":166909537835.85,"pricema30":4166.4939902246,"volumema7":32521930999.796,"close":3273.37227456,"open":3243.99754038},{"volume":4426064010.1706,"high":3450.20737544,"last_updated":"2018-12-17 23:59:00","volumema15":75133997059.474,"pricema7":3426.6790032264,"low":3233.81979097,"pricema15":3644.6335573197,"volumema30":163717381543.52,"pricema30":4088.7186800335,"volumema7":31056890210.405,"close":3436.16325808,"open":3236.2747733},{"volume":5919179381.7226,"high":3597.9178885,"last_updated":"2018-12-18 15:44:00","volumema15":73564338800.11,"pricema7":3375.2642833193,"low":3253.12299273,"pricema15":3586.6497221247,"volumema30":162243717377.26,"pricema30":4011.7788950155,"volumema7":29909124615.665,"close":3549.96170031,"open":3253.12299273},{"volume":6389343011.8041,"high":3802.4669143,"last_updated":"2018-12-19 17:44:00","volumema15":72750844482.779,"pricema7":3355.5820608936,"low":3487.16920219,"pricema15":3529.6774715747,"volumema30":162389770955.05,"pricema30":3938.5320678183,"volumema7":29402794124.305,"close":3779.44728713,"open":3544.76156472}],"name":"Bitcoin"},"success":false,"errorMessage":"\u8c03\u7528\u6210\u529f","message":"\u8c03\u7528\u6210\u529f"}

    }else {
        data={"result":{"symbol":"BTC","time_open":"2018-10-30 08:00:00","last_updated":"2018-11-01 07:59:59","quote":[{"volume":19655250000,"high":6349.16,"last_updated":"2018-10-31 07:59:59","volumema15":56716500000,"pricema7":6337.565,"low":6316.88,"pricema15":6337.565,"volumema30":113433000000,"volumema7":26467700000,"close":6317.61,"open":6337.04},{"volume":30923520000,"high":6480.59,"last_updated":"2018-11-05 07:59:59","volumema15":65850300000,"pricema7":6341.6,"low":6363.62,"pricema15":6341.6,"volumema30":131700600000,"volumema7":30730140000,"close":6419.66,"open":6365.47},{"volume":31836950000,"high":6434.21,"last_updated":"2018-11-13 07:59:59","volumema15":64436550000,"pricema7":6397.34,"low":6360.47,"pricema15":6397.34,"volumema30":128873100000,"volumema7":30070390000,"close":6371.27,"open":6411.76},{"volume":39868010000,"high":5653.61,"last_updated":"2018-11-19 07:59:59","volumema15":62395200000,"pricema7":5606.675,"low":5559.74,"pricema15":5606.675,"volumema30":124790400000,"volumema7":29117760000,"close":5623.54,"open":5559.74},{"volume":13302540000,"high":4120.87,"last_updated":"2018-11-26 07:59:59","volumema15":102384600000,"pricema7":3852.965,"low":3585.06,"pricema15":3852.965,"volumema30":204769200000,"volumema7":47779480000,"close":4009.97,"open":3880.78}],"name":"Bitcoin"},"total":0,"code":1000,"data":{"symbol":"BTC","time_open":"2018-10-30 08:00:00","last_updated":"2018-11-01 07:59:59","quote":[{"volume":19655250000,"high":6349.16,"last_updated":"2018-10-31 07:59:59","volumema15":56716500000,"pricema7":6337.565,"low":6316.88,"pricema15":6337.565,"volumema30":113433000000,"volumema7":26467700000,"close":6317.61,"open":6337.04},{"volume":30923520000,"high":6480.59,"last_updated":"2018-11-05 07:59:59","volumema15":65850300000,"pricema7":6341.6,"low":6363.62,"pricema15":6341.6,"volumema30":131700600000,"volumema7":30730140000,"close":6419.66,"open":6365.47},{"volume":31836950000,"high":6434.21,"last_updated":"2018-11-13 07:59:59","volumema15":64436550000,"pricema7":6397.34,"low":6360.47,"pricema15":6397.34,"volumema30":128873100000,"volumema7":30070390000,"close":6371.27,"open":6411.76},{"volume":39868010000,"high":5653.61,"last_updated":"2018-11-19 07:59:59","volumema15":62395200000,"pricema7":5606.675,"low":5559.74,"pricema15":5606.675,"volumema30":124790400000,"volumema7":29117760000,"close":5623.54,"open":5559.74},{"volume":13302540000,"high":4120.87,"last_updated":"2018-11-26 07:59:59","volumema15":102384600000,"pricema7":3852.965,"low":3585.06,"pricema15":3852.965,"volumema30":204769200000,"volumema7":47779480000,"close":4009.97,"open":3880.78}],"name":"Bitcoin"},"success":false,"errorMessage":"\u8c03\u7528\u6210\u529f","message":"\u8c03\u7528\u6210\u529f"}
    }

    return data
}

function xxx() {
    var data =[{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 10:24:01","price":3979.688,"name":"Bitcoin","sign":"USD","change_daily":-0.04846060161628,"id":"5c21a819e3bb301e0cb3781d","close":3883.261,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 10:29:01","price":3979.688,"name":"Bitcoin","sign":"USD","change_daily":-0.050921490443579,"id":"5c21a83de3bb301e0cb3880c","close":3873.218,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 10:44:01","price":3979.688,"name":"Bitcoin","sign":"USD","change_daily":-0.050239895280359,"id":"5c21a84ae3bb301e0cb38df6","close":3875.999,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 11:04:00","price":3979.688,"name":"Bitcoin","sign":"USD","change_daily":-0.050079307616372,"id":"5c21a857e3bb301e0cb393e1","close":3876.655,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 11:14:00","price":3979.688,"name":"Bitcoin","sign":"USD","change_daily":-0.048518606436798,"id":"5c21a864e3bb301e0cb399c8","close":3883.024,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 11:29:00","price":3979.688,"name":"Bitcoin","sign":"USD","change_daily":-0.04981850945337,"id":"5c21a872e3bb301e0cb39fad","close":3877.719,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 11:44:01","price":3978.674,"name":"Bitcoin","sign":"USD","change_daily":-0.052252381253773,"id":"5c21aa932d5893499c55933a","close":3867.786,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 11:59:01","price":3949.084,"name":"Bitcoin","sign":"USD","change_daily":-0.066753400258712,"id":"5c21acea2d5893499c559920","close":3808.607,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 12:14:00","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.066175658527367,"id":"5c21b19b2d5893499c559f1b","close":3810.965,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 12:29:01","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.066569874794907,"id":"5c21b3f32d5893499c55a587","close":3809.356,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 12:49:00","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.065210833190247,"id":"5c21bd7e2d5893499c55ad0c","close":3814.903,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 12:59:00","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.064767025920769,"id":"5c21bd802d5893499c55b2f0","close":3816.714,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 13:14:00","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.062337195739295,"id":"5c21e46a2d5893499c55c1c5","close":3826.63,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 13:29:00","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.05834594660855,"id":"5c21e46b2d5893499c55c7aa","close":3842.918,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 13:44:01","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.058593709372681,"id":"5c21e46d2d5893499c55cd8e","close":3841.907,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 13:59:01","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.059539824530952,"id":"5c21e4702d5893499c55d373","close":3838.046,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 14:14:01","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.05921168345984,"id":"5c21e4722d5893499c55d958","close":3839.385,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 14:29:00","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.062196043820903,"id":"5c21e4752d5893499c55df3d","close":3827.206,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 14:44:01","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.062710426716328,"id":"5c21e4782d5893499c55e521","close":3825.107,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 14:59:00","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.062157974595225,"id":"5c21e47b2d5893499c55eb06","close":3827.361,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 15:14:00","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.058544302434548,"id":"5c21e47e2d5893499c55f0eb","close":3842.109,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 15:29:02","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.059472972251378,"id":"5c21e4812d5893499c55f6d0","close":3838.319,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 15:44:01","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.056682365099368,"id":"5c21e4842d5893499c55fcb5","close":3849.708,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 15:59:00","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.061060238496019,"id":"5c21e5b3e3bb30274c8f6864","close":3831.841,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 16:14:01","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.062260817439203,"id":"5c21ed92e3bb30063c740e01","close":3826.942,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 16:29:01","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.063867094747483,"id":"5c21ed9fe3bb30063c7413f5","close":3820.386,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 16:44:00","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.064709158469968,"id":"5c21f0e4e3bb30063c741a50","close":3816.95,"open":4081.03,"slug":"bitcoin"},{"volume":2147483.647,"symbol":"BTC","last_updated":"2018-12-25 16:59:01","price":3946.509,"name":"Bitcoin","sign":"USD","change_daily":-0.06764125217889,"id":"5c21f33ce3bb302f98cffe5d","close":3804.984,"open":4081.03,"slug":"bitcoin"}]
    return data
}

