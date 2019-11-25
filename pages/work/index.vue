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
                    <div>本周：11月21日至11月31日；法定假日：3天</div>
                    <div v-if="weekTimeData && weekTimeData.plan" class="plans">
                        <fieldset>
                            <legend>本周工作计划</legend>
                            <div>工作分类：{{parseWorkPlan('workType')}}；工作项目：{{parseWorkPlan('workProject')}}<br />计划描述：{{parseWorkPlan('desc')}}</div>
                        </fieldset>

                    </div>
                    <div v-else>
                        <div>暂无本周计划，请点击下方按钮制定计划</div>
                        <div style="padding:15px 0">
                            <el-button type="success" @click="$router.push('/work/timeLine')" icon="el-icon-time">进入我的时间钟管理</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="left">
                <client-only>
                    <my-calendar lunar clean monFirst responsive @select="calendarChange" />
                </client-only>
            </div>
            <div class="mid">
                <div class="title">
                    <div>时间钟图表：{{setWeek}}</div>
                    <div>
                        <el-button-group>
                            <el-button size="mini" icon="el-icon-back" :type="isCurrWeek === -1 ? 'primary' : ''" title="上周" @click="setCurrWeek(-7)" />
                            <el-button v-if="isCurrWeek==-1" size="mini" icon="el-icon-right" :type="isCurrWeek === 1 ? 'primary' : ''" title="下周" @click="setCurrWeek(7)" />
                        </el-button-group>
                        <el-button size="mini" :type="isCurrWeek === 0 ? 'primary' : ''" icon="el-icon-pie-chart" title="本周" style="margin-left:10px" @click="setCurrWeek(0, true)">本周</el-button>
                        <el-button-group>
                            <el-button size="mini" icon="el-icon-back" :type="isCurrMonth === -1 ? 'primary' : ''" title="上月" @click="setCurrMonth(-1)" />
                            <el-button size="mini" v-if="isCurrMonth==-1" icon="el-icon-right" :type="isCurrMonth === 1 ? 'primary' : ''" title="下月" @click="setCurrMonth(1)" />
                        </el-button-group>
                        <el-button size="mini" :type="isCurrMonth === 0 ? 'primary' : ''" icon="el-icon-pie-chart" title="本周" style="margin-left:10px" @click="setCurrMonth(0, true)">本月</el-button>
                    </div>
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
                    <client-only v-if="timeData">
                        <echart :options="chartItem" ref="myEchart" :autoresize="true" />
                    </client-only>
                    <div v-else class="empty">当前周没有数据</div>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
import myClock from '~/components/clock';
import myCalendar from '~/components/calendar/calendar';
import timeWheel from '~/components/timeWheel';
import { mapState, mapMutations, mapActions } from "vuex";
import samForm from '~/components/form';
import formItem from '~/components/form/formItem';
import dataUtil from '~/util/data_util';
export default {
    components: {
        myClock, myCalendar, timeWheel, samForm, formItem
    },
    data: () => ({
        isInit: false,
        loadingMask: null,
        loadedChart: false,
        weekTime: 0,
        weekTimeData: null,
        isCurrWeek: 0,
        isCurrMonth: 0,
        currDate: '',
        timeData: null,
        weekList: [],
        filterForm: {
            department: []
        },
        filterValue: {
            department: []
        },
        filterItem: {
            "name": "department",
            "placeholder": "按部门查看",
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
        chartItem: {
            //color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    max: 24,
                    axisLabel: {
                        formatter: '{value}小时'
                    }
                },

            ],
            series: [
                {
                    name: '工作总时',
                    type: 'bar',
                    barWidth: '60%',
                    data: [],
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }
            ]
        }
    }),
    computed: {
        ...mapState(["collectionData"]),
        ...mapState("timeWork", ["holiday", "weekArray"]),
        setWeek() {
            if (this.weekList.length) {
                return moment(this.weekList[0]['date']).format('YYYY-MM-DD') + '至' + moment(this.weekList[6]['date']).format('YYYY-MM-DD')
            }
            return "";
        }
    },
    methods: {
        setCurrWeek() {

        },
        setCurrMonth() {

        },
        // 通过部门等查询过滤
        async handleFilterSearch() {
            //console.log('handleFilterSearch', this.filterValue.department);
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
        parseWorkPlan(key) {
            if (key == 'desc') {
                return this.weekTimeData.plan[key];
            } else {
                //debugger
                let obj = _.find(this.collectionData[key], { "id": this.weekTimeData.plan[key] });
                return obj.name || "";
            }
        },
        calendarChange(val) {
            this.currDate = new Date(new Date(val).toLocaleDateString()).getTime();
            //this.showCalendar = false;
            console.log('calendarChange', this.currDate);
            this.setWeekList();
        },
        // 设置一周的起始和终止时间
        setWeekList() {
            this.loadedChart = false;
            this.chartItem.xAxis[0].data = [];
            if (!this.loadingMask) {
                this.loadingMask = this.$loading({ background: 'rgba(0, 0, 0, 0.5)' });
            }
            this.weekList = [];
            const currenDay = new Date(this.currDate).getDay();
            const weekToDay = new Date(this.currDate).getTime();
            this.weekArray.forEach((w, i) => {
                const day = weekToDay + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7));
                const st = new Date(day).getTime();
                const obj = {
                    wday: w,
                    date: st
                };
                this.weekList.push(obj);
                this.chartItem.xAxis[0].data.push(w + '(' + moment(st).format('MM-DD') + ')')
            });
            console.log('this.weekList', this.weekList);
            this.getMyWorkByWeek()
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
            console.log('getMyWorkByWeek', result);
            if (result) {
                if (!this.weekTimeData) {
                    this.weekTimeData = { ...result };
                }
                this.timeData = result;
                this.chartItem.series[0].data = this.parseBarData(result.content);
            }
            setTimeout(() => {
                this.loadingMask && this.loadingMask.close();
                this.loadingMask = null;
                this.isInit = true;
                this.loadedChart = true;
                console.log(this.chartItem.series)
            }, 500);
        },
        // 获取月工作时间钟数据（按组织部门树查询）
        async getMyWorkByMonth(math = {}) {
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
            const result = await this.$axios.$post("mock/db", { data: condition }, { nothold: true });
            console.log('getMyWorkByWeek', result);
            if (result) {
                if (!this.weekTimeData) {
                    this.weekTimeData = { ...result };
                }
                this.timeData = result;
                this.chartItem.series[0].data = this.parseBarData(result.content);
            }
            setTimeout(() => {
                this.loadingMask && this.loadingMask.close();
                this.loadingMask = null;
                this.isInit = true;
                this.loadedChart = true;
                console.log(this.chartItem.series)
            }, 500);
        },
        parseBarData(lists) {
            let arr = [];
            lists.forEach(item => {
                let allTimes = 0;
                item.list.forEach(w => {
                    allTimes += w.allTimes;
                })
                arr.push(allTimes / 1000 / 3600);
            });
            //console.log('parseData', arr)
            return arr;
        },
        parsepieData(lists) {
            let arr = [];
            lists.forEach((item, i) => {
                let allTimes = 0;
                item.list.forEach(w => {
                    allTimes += w.allTimes;
                })
                arr.push({
                    value: allTimes / 1000 / 3600,
                    name: this.weekArray[i]
                });
            });
            //console.log('parseData', arr)
            return arr;
        },
        async getcurrDate() {
            this.loadingMask = this.$loading({ background: 'rgba(0, 0, 0, 0.5)' });
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
        //this.chartItem.xAxis[0].data = [...this.weekArray];
        this.getcurrDate();
    }
}
</script>
<style lang="scss" scoped>
@import './index';
</style>
