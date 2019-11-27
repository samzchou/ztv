/* eslint-disable */
export default {

    formatDate(date, format = 'yyyy-MM-dd') {
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

    // 获取本周第一天日期
    calcData(date = newDate()) {
        let weekday = date.getDay() || 7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
        date.setDate(date.getDate() - weekday + 1);
        date.setHours(0, 0, 0, 0);
        return date;
    },
    // 毫秒转小时分
    ChangeHourMinutestr(mss) {
        //let days = parseInt(mss / (1000 * 60 * 60 * 24));
        let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        //let seconds = (mss % (1000 * 60)) / 1000;
        return (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes);
    },
    // 分钟转换为
    exChange(mss, ext) {
        let hours = Math.floor(mss / 1000 / 60 / 60); //parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((mss / 1000 / 60) % 60); //parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
        if (ext) {
            return (hours < 10 ? '0' + hours : hours) + ext + (minutes < 10 ? '0' + minutes : minutes);
        }
        return (hours < 10 ? '0' + hours : hours) + "小时 " + (minutes < 10 ? '0' + minutes : minutes) + "分钟";
    },
    // 小时分转毫秒
    changeMyTimeToMin(str) {
        let hours = str.split(':')[0];
        let min = str.split(':')[1];
        return Number(hours) * 3600 * 1000 + Number(min) * 60 * 1000;
    },
    setEndTime(satrtDate, minutes) {
        let min = satrtDate.getMinutes();
        satrtDate.setMinutes(min + minutes);
        return satrtDate;
    },
    getAllTimes(list) {
        let allTimes = 0;
		if(list && list.length){
			list.forEach(item => {
				allTimes += item.allTimes; //(item.endTime - item.startTime);
			});
		}
        return allTimes;
    },
    // 判断是否为JSON字符串
    isJSON(str) {
        if (typeof str == 'string') {
            try {
                var obj = JSON.parse(str);
                if (typeof obj == 'object' && obj) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                console.log('error：' + str + '!!!' + e);
                return false;
            }
        }
    },
    // 递归数据成tree结构
    toTree(data, opts = {}) {
        let parentKey = opts.parentKey || 'pid';
        data.forEach(function(item) {
            delete item.children;
        });
        var map = {};
        data.forEach(function(item) {
            map[item.id] = item;
        });
        var val = [];
        data.forEach(function(item) {
            var parent = map[item[parentKey]];
            if (parent) {
                (parent.children || (parent.children = [])).push(item);
            } else {
                val.push(item);
            }
        });
        return val;
    },
    // 检测两个DOM碰撞情况，created By sam
    hit(source, targets) {
        const sourceRect = source.getBoundingClientRect();
        let arr = [];
        targets.forEach((element, i) => {
            let eleRect = element.childNodes[0].getBoundingClientRect();
            if (Math.round(eleRect.left) >= Math.round(sourceRect.left) && Math.round(eleRect.left) <= Math.round(sourceRect.right) && Math.round(eleRect.top) >= Math.round(sourceRect.top) && Math.round(eleRect.top) < Math.round(sourceRect.bottom)) {
                arr.push(element);
            }
        });
        return arr;
    },
    // 获取每月有几周
    getWeeks(year, month) {
        let d = new Date();
        // 该月第一天
        d.setFullYear(year, month - 1, 1);
        let w1 = d.getDay() || 7; //if (w1 == 0) w1 = 7;
        // 该月天数
        d.setFullYear(year, month, 0);
        let dd = d.getDate();
        // 第一个周一
        let d1;
        if (w1 != 1) {
            d1 = 7 - w1 + 2;
        } else {
            d1 = 1;
        }
        let week_count = Math.ceil((dd - d1 + 1) / 7);
        return week_count;
    },
    // 获取每月第几周的日期范围
    getWeekTime(year, month, weekday) {
        var d = new Date();
        // 该月第一天
        d.setFullYear(year, month - 1, 1);
        var w1 = d.getDay();
        if (w1 == 0) w1 = 7;
        // 该月天数
        d.setFullYear(year, month, 0);
        var dd = d.getDate();
        // 第一个周一
        let d1;
        if (w1 != 1) d1 = 7 - w1 + 2;
        else d1 = 1;
        var monday = d1 + (weekday - 1) * 7;
        var sunday = monday + 6;
        var from = year + "-" + month + "-" + monday;
        var to;
        if (sunday <= dd) {
            to = year + "-" + month + "-" + sunday;
        } else {
            d.setFullYear(year, month - 1, sunday);
            let days = d.getDate();
            to = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + days;
        }
        console.log(weekday + " 从" + from + " 到 " + to + "");
    },
    // 获取每月第几周的周一的日期
    getMondayTime(year, month, weekday) {
        var d = new Date();
        // 该月第一天
        d.setFullYear(year, month - 1, 1);
        var w1 = d.getDay();
        if (w1 == 0) w1 = 7;
        // 该月天数
        d.setFullYear(year, month, 0);
        var dd = d.getDate();
        // 第一个周一
        let d1;
        if (w1 != 1) d1 = 7 - w1 + 2;
        else d1 = 1;
        var monday = d1 + (weekday - 1) * 7;
        return monday;
    },
    // 获取当月最后一天日期
    getLastDay(year, month) {
        var new_year = year; //取当前的年份
        var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）
        if (month > 12) {
            new_month -= 12; //月份减
            new_year++; //年份增
        }
        var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天
        return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate(); //获取当月最后一天日期
    },

    // 比较两个Object差异,返回一个新的对象，created By sam
    difference(obj1, obj2) {
        const changes = (obj1, obj2) => {
            return _.transform(obj1, (result, value, key) => {
                if (!_.isEqual(value, obj2[key])) {
                    result[key] = (_.isObject(value) && _.isObject(obj2[key])) ? changes(value, obj2[key]) : value;
                }
            });
        }
        return changes(obj1, obj2);
    },
    // 随机产生字符串 xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx，created By sam
    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            const d = new Date().getTime().toString(16);
            return v.toString(16);
        })

    },
    autoCode(params = { f: 36, e: 2 }) {
        return Math.random().toString(params.f).substr(params.e);
    },

    getObjXy(obj) {
        let xy = obj.getBoundingClientRect();
        let top = xy.top - document.documentElement.clientTop + document.documentElement.scrollTop,
            bottom = xy.bottom,
            left = xy.left - document.documentElement.clientLeft + document.documentElement.scrollLeft,
            right = xy.right,
            width = xy.width || right - left,
            height = xy.height || bottom - top;
        return {
            top: top,
            right: right,
            bottom: bottom,
            left: left,
            width: width,
            height: height
        }
    },

    // 获取元素绝对坐标值
    getElCoordinate(dom, center) {
        var t = dom.offsetTop;
        var l = dom.offsetLeft;
        var w = dom.offsetWidth;
        var h = dom.offsetHeight;
        dom = dom.offsetParent;
        while (dom) {
            t += dom.offsetTop;
            l += dom.offsetLeft;
            dom = dom.offsetParent;
        };
        return {
            top: center ? (t + h / 2) : t,
            left: center ? (l + w / 2) : l,
        };
    },

    hasClass(ele, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0 || !ele.className) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
    },
    addClass(ele, cls) {
        if (!this.hasClass(ele, cls)) {
            ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
        }
    },
    removeClass(ele, cls) {
        if (this.hasClass(ele, cls)) {
            let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            ele.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },
    toggleClass(ele, cls) {
        if (!this.hasClass(ele, cls)) {
            ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
        } else {
            this.removeClass(ele, cls);
        }
    },
    //获取对应Key的值
    getValueByKey(arr, valueKey, value, key) {
        if (!arr || arr.length < 1) return ''
        var i = 0,
            len = arr.length;
        for (; i < len; i++) {
            if (arr[i][valueKey] === value) {
                return arr[i][key];
            }
        }
        return '';
    },
    formatFileSize(fileSize) {
        if (fileSize < 1024) {
            return fileSize + 'B';
        } else if (fileSize < (1024 * 1024)) {
            var temp = fileSize / 1024;
            temp = temp.toFixed(2);
            return temp + 'KB';
        } else if (fileSize < (1024 * 1024 * 1024)) {
            var temp = fileSize / (1024 * 1024);
            temp = temp.toFixed(2);
            return temp + 'MB';
        } else {
            var temp = fileSize / (1024 * 1024 * 1024);
            temp = temp.toFixed(2);
            return temp + 'GB';
        }
    },
    getExt(filename) {
        let index = filename.lastIndexOf(".");
        return filename.substr(index + 1);
    }

}
