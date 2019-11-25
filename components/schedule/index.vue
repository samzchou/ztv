<template>
    <section class="rili">
        <el-row :gutter="30">
            <el-col :span="6" v-for="(items,index) in rili.wkfCalendarDefine" :key="index">
                <div class="calendar">
                    <div class="calendar_title">{{monthStr[lang][index]}}</div>
                    <div class="calendar_week">
                        <span v-for="(week,idx) in weekStr[lang]" :key="idx">{{week}}</span>
                    </div>
                    <div class="calendar_dateCon">
                        <span v-for="(item,idx) in items" :key="idx" @click="handleClick(item, index, idx, $event)">
                            <em :class="`type_${item.dateType}`">{{changeDate(item.date)}}</em>
                        </span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="data-window" id="data-window" :class="{ show: showWindow }" :style="setWindowPos">
            <div class="title">
                <span>设定工作日及休假日</span>
                <i class="el-icon-close" @click="showWindow=false" />
            </div>
            <div class="content" v-if="currItem">
                <div>{{currItem.obj.calendarDate}}</div>
                <div>
                    <el-select size="mini" v-model="currItem.obj.dateType" placeholder="请选择类型" @change="changeType">
                        <el-option v-for="type in holidayType" :key="type.value" :label="type.label" :value="type.value" />
                    </el-select>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'schedule-canlendar',
    props: {
        holidays: Array,
        year: {
            type: String,
            default: new Date().getFullYear().toString()
        },
        lang: {
            type: String,
            default: "zh_cn"
        }
    },
    computed: {
        setWindowPos() {
            return {
                left: this.windowPostion.left + "px",
                top: this.windowPostion.top + "px"
            };
        },
        getHolidayType() {
            let type = _.find(this.holidayType, { "value": this.currItem.obj.dateType });
            return type ? type.label : "工作日";
        }
    },
    watch: {
        year() {
            this.setCalendar();
        },
    },
    data: () => ({
        isInit: false,
        weekStr: {
            en_us: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sta'],
            zh_cn: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        },
        monthStr: {
            en_us: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            zh_cn: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        rili: {
            year: '2019',
            wkfCalendarDefine: []
        },
        showWindow: false,
        windowPostion: {
            left: 300,
            top: 200
        },
        currItem: null,
        holidayType: [],
    }),
    methods: {
        changeType(val) {
            //console.log('changeType', this.currItem, this.rili.wkfCalendarDefine[this.currItem.index][this.currItem.idx]);
            this.$emit('changeType', this.currItem);
            this.showWindow = false;
        },
        getMonth(year) {
            let self = this;
            let dayMseconds = 3600 * 24 * 1000;                                     // 一天毫秒数;
            let monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            let resultArr = [];
            let run = this.isRun(year);                                             // 判断是否是闰年
            for (let i = 1; i < 13; i++) {                                          // 12个月循环
                let arr = [];
                let firstday = new Date(year + "-" + i + "-01").getTime();          // 时间戳
                let lastday = 30;
                let weekDay = new Date(firstday).getDay();                          // 根据时间戳，拿到本月第一天的星期
                let weekLastDay = weekDay + 31;                                     // 本月最后一天的星期
                switch (i) {
                    case 2:
                        if (run) {
                            lastday = new Date(year + "-" + i + "-29").getTime();
                            weekLastDay = weekDay + 29;
                        } else {
                            lastday = new Date(year + "-" + i + "-28").getTime();
                            weekLastDay = weekDay + 28;
                        }
                        break;
                    case 4:
                        lastday = new Date(year + "-" + i + "-30").getTime();
                        weekLastDay = weekDay + 30;
                        break;
                    case 6:
                        lastday = new Date(year + "-" + i + "-30").getTime();
                        weekLastDay = weekDay + 30;
                        break;
                    case 9:
                        lastday = new Date(year + "-" + i + "-30").getTime();
                        weekLastDay = weekDay + 30;
                        break;
                    case 11:
                        lastday = new Date(year + "-" + i + "-30").getTime();
                        weekLastDay = weekDay + 30;
                        break;
                    default:
                        lastday = new Date(year + "-" + i + "-31").getTime();
                        weekLastDay = weekDay + 31;
                        break;
                }
                let n = 0, colIndex = i - 1;
                for (var j = 0; j < 42; j++) {          // 42 格子数
                    var content = { date: '' };
                    if (j < weekDay || j > weekLastDay - 1) {
                        arr.push(content);
                    } else {
                        n++;
                        let tDay = new Date(firstday + dayMseconds * n - dayMseconds).getDate();
                        arr.push(
                            {
                                day: tDay,
                                date: firstday + dayMseconds * n - dayMseconds,
                                calendarDate: moment(new Date(firstday + dayMseconds * n - dayMseconds)).format('YYYY-MM-DD'),//dateUtil.format(new Date(firstday + dayMseconds * n - dayMseconds), 'yyyy-MM-dd'),
                                week: new Date(firstday + dayMseconds * n - dayMseconds).getDay(),
                                dateType: this.getDayType(colIndex, tDay),
                                isActive: false
                            }
                        )
                    }
                }
                resultArr.push(arr);
            }
            return resultArr;
        },
        getDayType(colIndex, day) {
            day = day < 10 ? '0' + day : String(day);
            let dy = this.holidays[colIndex][day];
            return dy || '0';
        },
        // 判断是否是闰年
        isRun(year) {
            year = Number(year);
            if ((year % 400 == 0) || (year % 4 == 0) && (year % 100 != 0)) {
                return true;
            } else {
                return false;
            }
        },
        changeDate: function (date) {
            if (date) {
                return new Date(date).getDate();
            } else {
                return ''
            }
        },
        setCalendar() {
            this.rili = {
                year: String(this.year),
                wkfCalendarDefine: this.getMonth(this.year)
            };
            this.isInit = true;
        },
        newMonth() {
            let aa = this.getMonth(this.year);
            console.log('nw', aa);
        },
        handleClick(item, index, idx, evt) {
            if (!item.date) return;
            this.currItem = { "obj": item, "index": index, "idx": idx };
            const rect = evt.target.getBoundingClientRect();
            this.windowPostion.left = rect.left + rect.width;
            this.windowPostion.top = rect.top + rect.height;
            const containerWidth = 210; //document.getElementById("data-window").offsetWidth;
            if (this.windowPostion.left + containerWidth > document.body.offsetWidth) {
                this.windowPostion.left -= containerWidth;
            }
            this.showWindow = true;
        },
        removeArr(arr, obj) {
            arr.map((item, i) => {
                if (item.date === obj.date && item.idx === obj.idx) {
                    arr.splice(i, 1);
                }
            })
            return arr;
        }
    },
    mounted() {
        this.setCalendar();
        this.holidayType = [...this.$store.state.holidayType];
        if (!this.isInit) {
            document.body.append(document.getElementById('data-window'));
        }

    }
}
</script>

<style lang="scss" scoped>
.rili {
    .calendar {
        height: 280px;
        background-color: #fff;
        box-sizing: border-box;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        .calendar_title {
            font-weight: bold;
            padding: 0.35em 0;
            text-align: center;
            border-bottom: 1px solid #ddd;
            background-color: #dfe7f3;
        }
        .calendar_week {
            padding: 0.5em 0 0.5em 0;
            span {
                width: 14.2857%;
                text-align: center;
                display: inline-block;
            }
        }
        .calendar_dateCon {
            user-select: none;
            span {
                padding: 6px 0;
                width: 14.2857%;
                align-items: center;
                justify-content: center;
                display: inline-flex;
                position: relative;
                > em {
                    font-style: normal;
                    cursor: default;
                    display: block;
                    position: relative;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: transparent;
                    font-size: 10px;
                    line-height: 20px;
                    &.type_1 {
                        background-color: #51afff;
                        color: #fff;
                    }
                    &.type_2 {
                        background-color: $c-main;
                        color: #fff;
                    }
                }
            }
        }
    }
}
.data-window {
    width: 200px;
    position: absolute;
    z-index: 10;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.1);
    display: none;
    &.show {
        display: block;
    }
    .title {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #eaeaea;
        box-sizing: border-box;
        padding: 0 10px;
        i {
            cursor: pointer;
        }
    }
    .content {
        line-height: 30px;
        //min-height: 100px;
        box-sizing: border-box;
        padding: 0 10px 20px 10px;
    }
}
</style>
