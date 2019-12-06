<template>
    <section class="times-container" v-if="!isInit">正在加载中....</section>
    <section v-else class="times-container">
        <div class="header">
            <div class="left">
                <my-clock :areaRect="{width:200,height:200}" />
            </div>
            <div class="mid">
                <div class="title">
                    <p>助力中国高铁，提升中国速度</p>
                    <p>Help China's High-Speed Rail, Speed of China</p>
                </div>
                <div class="desc">
                    <div>本周：11月21日至11月31日；法定节假日：{{getMyHday}}天；本周工作计划如下</div>
                    <div v-if="weekTimeData && weekTimeData.plan" class="plans">
                        <el-table :data="weekTimeData.plan" size="small" border stripe fit style="width:100%">
                            <el-table-column type="index" label="序号" align="center" width="50" />
                            <el-table-column label="工作分类" prop="workType" width="100">
                                <template slot-scope="scope">
                                    {{parseWorkPlan('workType', scope.row)}}
                                </template>
                            </el-table-column>
                            <el-table-column label="工作项目" prop="workProject" width="100">
                                <template slot-scope="scope">
                                    {{parseWorkPlan('workProject', scope.row)}}
                                </template>
                            </el-table-column>
                            <el-table-column label="计划内容描述" prop="desc" />

                        </el-table>
                    </div>
                    <div v-else style="padding:20px 0">
                        <div>暂无本周计划，请进入我的时间制定工作计划</div>
                    </div>
                    <div style="padding:0 0 15px 0">
                        <el-button type="success" @click="$router.push('/work/timeLine')" icon="el-icon-time">进入我的时间钟管理</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="left">
                <client-only>
                    <my-calendar lunar clean monFirst responsive :holidays="myHolidays" :currWeek="!useMonth?weekList[0]['date']:null" :value="calendarValue" @select="calendarChange" />
                </client-only>
            </div>
            <div class="mid">
                <div class="title">
                    <div class="canlan">
                        <el-date-picker v-model="currDate" size="mini" type="week" :clearable="false" :picker-options="{ firstDayOfWeek: 1 }" format="yyyy年 第 WW 周" placeholder="选择周" @change="handlerChangeWeek" style="width:150px" />
                        <el-button size="mini" icon="el-icon-pie-chart" title="本周" @click="setCurrWeek(0)">本周图表</el-button>
                        <el-date-picker v-model="currDate" size="mini" type="month" :clearable="false" placeholder="选择月" @change="handlerChangeMonth" style="width:140px;margin-left:20px" />
                        <el-button size="mini" icon="el-icon-pie-chart" title="本周" @click="setCurrMonth(0)">本月图表</el-button>
                    </div>
                    <!-- <div>
                        <el-button-group style="margin-right:15px;">
                            <el-button size="mini" icon="el-icon-back" :type="isCurrWeek === -1 ? 'primary' : ''" title="上周" @click="setCurrWeek(-7)" />
                            <el-button size="mini" icon="el-icon-pie-chart" :type="isCurrWeek === 0 ? 'primary' : ''" title="本周" @click="setCurrWeek(0)">本周</el-button>
                            <el-button size="mini" icon="el-icon-right" :type="isCurrWeek === 1 ? 'primary' : ''" title="下周" @click="setCurrWeek(7)" />
                        </el-button-group>
                        <el-button-group>
                            <el-button size="mini" icon="el-icon-back" :type="isCurrMonth === -1 ? 'primary' : ''" title="上月" @click="setCurrMonth(-1)" />
                            <el-button size="mini" :type="isCurrMonth === 0 ? 'primary' : ''" icon="el-icon-pie-chart" title="本周" @click="setCurrMonth(0)">本月</el-button>
                            <el-button size="mini" icon="el-icon-right" :type="isCurrMonth === 1 ? 'primary' : ''" title="下月" @click="setCurrMonth(1)" />
                        </el-button-group>
                    </div> -->
                    <div>
                        <el-form ref="myForm" :inline="true" status-icon label-position="left" size="mini" :model="filterValue">
                            <form-item :item="filterItem" v-model="filterValue.department" :itemValue="{'val':filterValue.department}" />
                            <el-form-item>
                                <el-button type="" @click="handleFilterSearch">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="charts">
                    <client-only>
                        <echart :options="chartItem" ref="myEchart" :autoresize="true" />
                    </client-only>
                    <!-- <div v-else class="empty">当前周没有数据</div> -->
                </div>
            </div>
        </div>

    </section>
</template>

<script>
import myClock from '~/components/clock';
import holidays from '~/config/opts/holiday.json';
import myCalendar from '~/components/calendar/calendar';
import timeWheel from '~/components/timeWheel';
import { mapState, mapMutations, mapActions } from "vuex";
import samForm from '~/components/form';
import formItem from '~/components/form/formItem';
import dataUtil from '~/util/data_util';
import chartOptions from './chartOptions.json';
export default {
    components: {
        myClock, myCalendar, timeWheel, samForm, formItem
    },
    data: () => ({
        isInit: false,
        myHolidays: holidays,
        loadingMask: null,
        //loadedChart: false,
        weekTime: 0,
        weekTimeData: null,
        isCurrWeek: 0,
        isCurrMonth: 0,
        currDate: '',
        weekByDate: '',
        timeData: null,
        weekList: [],
        useMonth: false,
        calendarValue: [],
        filterForm: {
            department: []
        },
        filterValue: {
            department: []
        },
        filterItem: {
            "name": "department",
            "placeholder": "按部门查看，限主管或领导",
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                }
            }
        },
        chartItem: { ...chartOptions },
        monthLast: '',
    }),
    computed: {
        ...mapState(["collectionData"]),
        ...mapState("timeWork", ["holiday", "weekArray"]),
        /* getweekByDate() {
            return new Date(this.weekList[0]['date']);
        }, */

        // 获取当前周的总休假天数
        getMyHday() {
            //console.log('this.weekList', this.weekList);
            let restDay = 0;
            this.weekList.forEach(item => {
                let year = new Date(item.date).getFullYear();
                let month = new Date(item.date).getMonth();
                let hd = _.find(this.myHolidays, { "year": String(year) });
                hd = hd.lists[month];
                let day = new Date(item.date).getDate();
                day = day < 10 ? '0' + day : String(day);
                if (hd[day]) {
                    restDay++;
                }
                //console.log('day', month, hd, day)
            })
            return restDay;
        }
    },
    methods: {
        // 周范围日期
        setWeekStr() {
            if (this.weekList.length) {
                return moment(this.weekList[0]['date']).format('YYYY-MM-DD') + '至' + moment(this.weekList[6]['date']).format('YYYY-MM-DD')
            }
            return "";
        },
        // 周下拉选择
        handlerChangeWeek(date) {
            console.log('handlerChangeWeek', date);
            this.currDate = date.getTime();
            this.calendarValue = [date.getFullYear(), date.getMonth() + 1];
            this.useMonth = false;
            this.setWeekList();
        },
        // 本周
        setCurrWeek(val) {
            //console.log('setCurrWeek', new Date(this.weekList[0]['date']), this.weekList[0]['date']);
            this.currDate = this.weekTime; //new Date(dp).getTime();
            const date = new Date(this.weekTime);
            this.calendarValue = [date.getFullYear(), date.getMonth() + 1];
            this.useMonth = false;
            this.setWeekList();
        },
        // 年月下拉选择
        handlerChangeMonth(date) {
            console.log('handlerChangeMonth', date);
            this.currDate = date.getTime();
            this.monthLast = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
            //console.log('monthLast', this.monthLast);
            this.useMonth = true;
            this.getMyWorkByMonth();
        },
        // 本月
        setCurrMonth(val) {
            const date = new Date(this.weekTime);
            this.currDate = new Date(date.getFullYear(), date.getMonth()).getTime();
            this.monthLast = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();

            //this.isCurrMonth = val;
            this.useMonth = true;
            this.getMyWorkByMonth();
        },
        // 通过部门等查询过滤
        async handleFilterSearch() {
            this.$alert("对不起，因当前数据未完善，无法进行统计！")
            return;
            const condition = {
                type: "listData",
                collectionName: "employee",
                notNotice: true,
                data: { "department": { "$in": this.filterValue.department } },
                column: { id: 1, name: 1 }
            };
            const result = await this.$axios.$post("mock/db", { data: condition });
            //console.log('handleFilterSearch result', result);
            if (result && result.list.length) {
                let uids = result.list.map(item => {
                    return item.id;
                })
                console.log('uids', uids);
            }
        },
        needAddPlan(item) {

        },
        removePlan(item) {

        },

        // 解析周计划数据
        parseWorkPlan(key, item) {
            let obj = _.find(this.collectionData[key], { "id": item[key] });
            return obj.name || "";
        },
        // 日历传参
        calendarChange(val) {
            console.log('calendarChange', val);
            this.currDate = new Date(new Date(val).toLocaleDateString()).getTime();
            //
            this.setWeekList();
        },
        // 设置一周的起始和终止时间
        setWeekList() {
            //this.loadedChart = false;
            this.calendarValue = [];
            this.chartItem.xAxis[0].data = [];
            if (!this.loadingMask) {
                this.loadingMask = this.$loading({ background: 'rgba(0, 0, 0, 0.5)', text: '正在分析数据' });
            }
            this.weekList = [];
            const currenDay = new Date(this.currDate).getDay();
            const weekToDay = new Date(this.currDate).getTime();

            this.calendarValue = [new Date(this.currDate).getFullYear(), new Date(this.currDate).getMonth() + 1];

            this.weekArray.forEach((w, i) => {
                const day = weekToDay + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7));
                const st = new Date(day).getTime();
                const obj = {
                    wday: w,
                    date: st
                };
                this.weekList.push(obj);
                this.chartItem.xAxis[0].data.push(w + '(' + moment(st).format('MM-DD') + ')');
            });
            this.getMyWorkByWeek();
        },
        // 获取某月的工作时间钟数据
        async getMyWorkByMonth(math = {}) {
            //this.loadedChart = false;
            this.timeData = null;
            this.chartItem.series[0].data = [];
            this.chartItem.xAxis[0].data = [];
            if (!this.loadingMask) {
                this.loadingMask = this.$loading({ background: 'rgba(0, 0, 0, 0.5)', text: '正在分析数据' });
            }
            const condition = {
                type: "listData",
                collectionName: "timeBlock",
                notNotice: true,
                data: {
                    startdate: { $gte: this.currDate, $lte: this.monthLast },
                    userId: this.$store.state.user.id
                }
            };
            const result = await this.$axios.$post("mock/db", { data: condition });
            this.timeData = result;

            const lastDay = new Date(this.monthLast).getDate();
            let sdata = [...this.chartItem.series];
            sdata[0].data = [];
            let xAxis = [...this.chartItem.xAxis];
            for (let i = 0; i < lastDay; i++) {
                xAxis[0].data.push((i + 1) + '日');
                sdata[0].data.push(0);
            }
            this.$set(this.chartItem, 'xAxis', xAxis);
            let title = { ...this.chartItem.title };
            title.subtext = moment(this.currDate).format('YYYY年MM月');
            this.$set(this.chartItem, 'title', title);

            if (result && result.list) {
                // 日期天
                let dayArr = [];
                // 统计每天总时间
                result.list.forEach(list => {
                    list.content.forEach(item => {
                        if (item.list && item.list.length) {
                            dayArr.push(item);
                        }
                    })
                });
                for (let i = 0; i < lastDay; i++) {
                    let dd = this.currDate + i * 3600 * 24 * 1000;
                    let tt = _.find(dayArr, { "date": dd });
                    if (tt) {
                        sdata[0].data[i] = this.parseDayData(tt.list);
                    }
                }
            }
            this.$set(this.chartItem, 'series', sdata);
            setTimeout(() => {
                this.loadingMask && this.loadingMask.close();
                this.loadingMask = null;
                this.isInit = true;
            }, 500);

        },
        // 解析每天的时间总数
        parseDayData(list) {
            let allTimes = 0;
            list.forEach(item => {
                allTimes += item.allTimes / 1000 / 3600;
            });
            return allTimes;
        },
        // 获取周工作时间钟数据
        async getMyWorkByWeek(math = {}) {
            this.timeData = null;
            this.chartItem.series[0].data = [];
            const condition = {
                type: "getData",
                collectionName: "timeBlock",
                notNotice: true,
                data: {
                    startdate: this.weekList[0].date,
                    userId: this.$store.state.user.id
                }
            };
            const result = await this.$axios.$post("mock/db", { data: condition });
            //console.log('getMyWorkByWeek', result);
            let title = { ...this.chartItem.title };
            title.subtext = this.setWeekStr();
            this.$set(this.chartItem, 'title', title);

            let sdata = [...this.chartItem.series];
            sdata[0]['data'] = [0, 0, 0, 0, 0, 0, 0];
            if (result) {
                if (!this.weekTimeData) {
                    this.weekTimeData = { ...result };
                }
                this.timeData = result;
                if (result.content && result.content.length) {
                    sdata[0]['data'] = this.parseBarData(result.content);
                }
            }
            this.$set(this.chartItem, 'series', sdata);
            setTimeout(() => {
                this.loadingMask && this.loadingMask.close();
                this.loadingMask = null;
                this.isInit = true;
            }, 500);
        },
        // 解析chart数据
        parseBarData(lists) {
            let arr = [];
            lists.forEach(item => {
                let allTimes = 0;
                if (item && item.list.length) {
                    item.list.forEach(w => {
                        allTimes += w.allTimes;
                    })
                }
                arr.push(allTimes / 1000 / 3600);
            });
            return arr;
        },
        // 获取当天时间
        async getcurrDate() {
            this.loadingMask = this.$loading({ background: 'rgba(0, 0, 0, 0.5)', text: '正在分析数据' });
            const condition = {
                type: "getServerTime"
            };
            let result = await this.$axios.$post("mock/db", { data: condition }, { nothold: true });
            result = new Date(new Date(result).toLocaleDateString()).getTime();
            this.weekTime = result;
            this.currDate = result;
            this.setWeekList();
        }
    },
    created() {
        this.getcurrDate();
    }
}
</script>
<style lang="scss" scoped>
@import './index';
</style>
