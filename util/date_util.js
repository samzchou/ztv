export default {
  formatDate() {
    let date = new Date();
    let seperator = "-";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator + month + seperator + strDate;
    return currentdate;
  },
  /**
   * 格式化日期
   * @param date 日期
   * @param format 格式 yyyy-MM-dd HH:mm:ss
   */
  format(date, format = 'yyyy-MM-dd') {
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "H+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "s": date.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  },
  // 当前日期是第几周
  weekIndexInMonth(date){
	let d = date || new Date();
	var date1 = new Date(d.getFullYear(), 0, 1);
	let dd = Math.round((date.valueOf() - date1.valueOf()) / 86400000);
	return Math.ceil((dd + ((date1.getDay() + 1) - 1)) / 7);
  },
  // 当前月有几周
  weekInMonthCount(date){
	let d = date || new Date();
	let sdate = new Date(d.setDate(1));
	let firstWeekDate = 1;
	if (sdate.getDay() === 1) { // 判断1号是周一
		firstWeekDatek = 1;
	} else if (date.getDay() === 0) { // 判断1号是周日
		firstWeekDate = 8 - 7 + 1;
	} else { // 判断1号是周二至周六之间
		firstWeekDate = 8 - date.getDay() + 1;
	}
	sdate.setMonth(sdate.getMonth()+1);
	sdate.setDate(0);
	let monthHasDays = sdate.getDate();// 本月天数
	monthHasDays = sdate.getDate() - firstWeekDate + 1;
	let hasWeek = Math.ceil(monthHasDays/7); // 计算本月有几周
	return hasWeek;
	
  },
  /**
   * 获取月第一天日期
   */
  getMonthStartDate(date) {
    let d = date || new Date();
	d = new Date(d.getFullYear(), d.getMonth(), 0);
    let startDate = new Date(d.setDate(1));
    return startDate;
  },
  /**
   * 获取月第一天日期
   */
  getMonthEndDate(date) {
    let d = date || new Date();
    let endDate = new Date(d.getFullYear(), d.getMonth()+1, 0); //.getDate()
	
    return endDate;
  },
  /**
   * 获取本周第一天日期
   */
  getWeekStartDate(date) {
    let d = date || new Date();
    let startDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + 1);
    return startDate;
  },
  /**
   * 获取本周最后一天日期
   */
  getWeekEndDate(date) {
    let d = date || new Date();
    let endDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (7 - d.getDay()));
    return endDate;
  },
  /**
   * 获取上周第一天日期
   */
  getLastWeekStartDate() {
    let d = new Date();
    let startDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() - 6);
    return this.format(startDate);
  },
  /**
   * 获取上周最后一天日期
   */
  getLastWeekEndDate() {
    let d = new Date();
    let endDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay());
    return this.format(endDate);
  },
  getDate(date) {
    if (!date) return new Date();
    if (typeof date === 'string') {
      date = new Date(date.replace(/-/g, '/').replace(/T|Z/g, ' ').trim());
    }
    return date;
  },
  /**
     * 获取上一月
     */
  getPreManthDate(date) {
    if (date) {
      date = this.getDate(date);
    } else {
      date = new Date();
    }
    let year = date.getFullYear(), month = date.getMonth() - 1, day = date.getDate();
    if (month === 0) {
      month = 12;
      year--;
    }
    let mDate = new Date(date.getFullYear(), date.getMonth(), 0);
    day = Math.min(day, mDate.getDate());
    return new Date(year, month, day);
  },
  /**
     * 获取下一月
     */
  getAfterManthDate(date) {
    if (date) {
      date = this.getDate(date);
    } else {
      date = new Date();
    }
    let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
    if (month === 13) {
      month = 1;
      year++;
    }
    let mDate = new Date(date.getFullYear(), date.getMonth(), 0);
    day = Math.min(day, mDate.getDate());
    return new Date(year, month, day);
  }
}