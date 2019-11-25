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
  /**
   * 获取本周第一天日期
   */
  getWeekStartDate() {
    let d = new Date();
    let startDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + 1);
    return this.format(startDate);
  },
  /**
   * 获取本周最后一天日期
   */
  getWeekEndDate() {
    let d = new Date();
    let endDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (7 - d.getDay()));
    return this.format(endDate);
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