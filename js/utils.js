function getLocalTime(nS) {
	var kday = new Date(parseInt(nS) * 1000);
	var year = kday.getFullYear();
	var month = kday.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}
	var day = kday.getDate();
	if (day < 10) {
		day = '0' + day;
	}
	var hours = kday.getHours();
	var minutes = kday.getMinutes();
	var seconds = kday.getSeconds();
	if (seconds > 0) {
		minutes = minutes + 1;
	}
	if (minutes == 60) {
		minutes = 0;
		hours = hours + 1;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (hours < 10) {
		hours = '0' + hours;
	}
	return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
}

Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

// 或者时间截取的分钟
function getJustMin(time) {
	return time.substring(10, time.length);
};
