/*
 * 比较日期大小
 * 日期格式：yyyy-MM-dd
 * 返回：当参数1＜参数2时，返回-1；当参数1=参数2时，返回0；当参数1＞参数2时，返回1。
 */
function compareDate(logintime, logouttime) {

    //console.log("in==>"+logintime + "---" + logouttime);

    var arys1 = new Array();
    var arys2 = new Array();
    if (logintime != null && logouttime != null) {
        arys1 = logintime.split('-');
        var logindate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
        arys2 = logouttime.split('-');
        var logoutdate = new Date(arys2[0], parseInt(arys2[1] - 1), arys2[2]);
        //console.log("out==>"+logindate + "---" + logoutdate);
        if (logindate > logoutdate) {
            return 1;
        } else if(logindate < logoutdate){
            return -1;
        } else {
            return 0;
        }
    } else {
        return -1;
    }
}

/*
 * 判断日期，时间大小
 * 日期格式：yyyy-MM-dd HH:mm:ss
 * 返回：当参数1＜参数2时，返回-1；当参数1=参数2时，返回0；当参数1＞参数2时，返回1。
 */
function compareTime(logintime, logouttime) {
    if (logintime.length > 0 && logouttime.length > 0) {
        //console.log(logintime + "---" + logouttime);

        var logintimeTemp = logintime.split(" ");
        var logouttimeTemp = logouttime.split(" ");

        var arrloginDate = logintimeTemp[0].split("-");
        var arrlogoutDate = logouttimeTemp[0].split("-");

        var arrloginTime = logintimeTemp[1].split(":");
        var arrlogoutTime = logouttimeTemp[1].split(":");

        var allLoginDate = new Date(arrloginDate[0], arrloginDate[1], arrloginDate[2], arrloginTime[0], arrloginTime[1], arrloginTime[2]);
        var allLogoutDate = new Date(arrlogoutDate[0], arrlogoutDate[1], arrlogoutDate[2], arrlogoutTime[0], arrlogoutTime[1], arrlogoutTime[2]);

        if (allLoginDate.getTime() > allLogoutDate.getTime()) {
            return 1;
        } else if( allLoginDate.getTime() < allLogoutDate.getTime()){
            return -1;
        }else {
            return 0;
        }
    } else {
        return -1;
    }
}

/*
 * 日期格式化
 * 使用：new Date().formate(参数)
 * 参数：可选格式1==>yyyy-MM-dd hh:mm:ss 格式2==>yyyy-MM-dd
*/
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};

/*
 *   格式化时间
 *   返回值：中国标准时间format yyyy-mm-dd
 */
const format = (time) => {
    let ymd = '';
    let mouth = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : ('0' + (time.getMonth() + 1));
    let day = time.getDate() >= 10 ? time.getDate() : ('0' + time.getDate());
    ymd += time.getFullYear() + '-'; // 获取年份。
    ymd += mouth + '-'; // 获取月份。
    ymd += day; // 获取日。
    return ymd // 返回日期。
};

/*
 *  根据start时间和end时间计算出中间包含的每一天
 *  前提：1使用上面的format方法格式化日期 2传入的日期只能是"yyyy-MM-dd"格式
 */
const getAllDate = (start, end) => {
    let dateArr = [];
    let startArr = start.split('-');
    let endArr = end.split('-');
    let db = new Date();
    db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2]);
    let de = new Date();
    de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2]);
    let unixDb = db.getTime();
    let unixDe = de.getTime();
    let stamp;
    const oneDay = 24 * 60 * 60 * 1000;
    for (stamp = unixDb; stamp <= unixDe;) {
        dateArr.push(format(new Date(parseInt(stamp))));
        stamp = stamp + oneDay;
    }
    return dateArr;
};

/*
 *  获取最近三个月
 */
const getThreeMonthDate = () => {
    let nowDate = new Date();
    let nowDateChange = new Date();
    let threeMonth = [];
    // 获取前三月时间
    nowDateChange.setMonth(nowDateChange.getMonth() - 3);
    threeMonth.push(format(nowDateChange));
    threeMonth.push(format(nowDate));
    return threeMonth
};

/*
 *  获取最近一个月
 */
const getMonthDate = () => {
    let nowDate = new Date();
    let nowDateChange = new Date();
    let lastMonth = [];
    // 获取前一月时间
    nowDateChange.setMonth(nowDateChange.getMonth() - 1);
    lastMonth.push(format(nowDateChange));
    lastMonth.push(format(nowDate));
    return lastMonth
};

/*
 *  获取最近一周（七天）
 */
const getWeekDate = () => {
    let myDate = new Date();
    // 获取前一周时间
    const oneDay = 24 * 60 * 60 * 1000;
    let oneweekdate = new Date(myDate - 7 * oneDay);
    let lastWeek = [];
    lastWeek.push(format(oneweekdate));
    lastWeek.push(format(myDate));
    return lastWeek
};
