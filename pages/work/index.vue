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
                    <div>本周：{{getRangeWeek}}；法定节假日：{{getMyHday}}天；</div>
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
                    <!-- <div v-else style="padding:20px 0">
                        <div>暂无本周计划，请进入我的时间制定工作计划</div>
                    </div> -->
                    <div style="padding:15px 0">
                        <el-button type="success" @click="goMyWork(null)" icon="el-icon-time">进入我的时间钟管理</el-button>
                        <el-button type="warning" @click="$router.push('/work/plan')" icon="el-icon-user">查看我的工作计划</el-button>
                        <!-- <el-button type="warning" @click="viewUerTime()" icon="el-icon-user">{{viewUser?"查看我的时间钟记录":"查看部门员工的时间钟记录"}}</el-button> -->
                    </div>
                </div>
            </div>
            <!-- <div class="canlader">
                <client-only>
                    <my-calendar lunar clean monFirst responsive :holidays="myHolidays" :currWeek="!useMonth?weekList[0]['date']:null" :value="calendarValue" @select="calendarChange" />
                </client-only>
            </div> -->
        </div>
        <div class="content">
            <!-- <div class="left">
                <client-only>
                    <my-calendar lunar clean monFirst responsive :holidays="myHolidays" :currWeek="!useMonth?weekList[0]['date']:null" :value="calendarValue" @select="calendarChange" />
                </client-only>
            </div> -->
            <div class="mid">
                <div class="title">
                    <div class="canlan">
                        <el-date-picker v-model="currDate" size="small" type="week" :clearable="false" :picker-options="{ firstDayOfWeek: 1 }" format="yyyy年 第 WW 周" placeholder="选择周" @change="handlerChangeWeek" style="width:170px" />
                        <!-- <el-date-picker v-model="currDate" size="mini" type="month" :clearable="false" placeholder="选择月" @change="handlerChangeMonth" style="width:140px;margin-left:20px" /> -->
                        <el-cascader size="small" v-model="deptids" :options="deptData" clearable placeholder="按部门查询" style="width:500px" />
                        <el-button size="small" type="primary" @click="handleFilterSearch" icon="el-icon-search">查询</el-button>
                    </div>
                    <div>

                        <el-button size="small" type="primary" icon="el-icon-pie-chart" title="本周" @click="showChart">图表分析</el-button>
                    </div>
                </div>
                <!-- <div class="charts" v-if="!viewUser">
                    <client-only>
                        <echart :options="chartItem" ref="myEchart" :autoresize="true" />
                    </client-only>
                </div> -->
                <div class="table-container">
                    <el-table v-if="tableData.length" :data="tableData" style="width: 100%">
                        <el-table-column align="center" :label="getTableTitle">
                            <el-table-column label="员工姓名" align="center" prop="empname" width="100" />
                            <el-table-column label="审核指导" align="center" width="250">
                                <template slot-scope="scope">
                                    <div class="check-content">
                                        <div v-html="getCheckUser(scope.row)"></div>
                                        <div>审核指导：{{scope.row.checkDesc||""}}</div>
                                    </div>
                                    <div>
                                        <el-button size="mini" type="success" @click="goMyWork(scope.row)">查看详情</el-button>
                                        <el-button size="mini" v-if="showAll" type="primary" :disabled="disableCheck(scope.row)" @click="viewCheck(scope.row)">审核</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column v-for="(n,idx) in weekArray" :key="idx" :label="n" align="center" width="250">
                                <!-- <template slot="header" slot-scope="scope">
                                    <div>{{setTableHeader(idx)}}</div>
                                </template> -->
                                <template slot-scope="scope">
                                    <div class="alltimes">总工作时长：{{getAllTimes(scope.row.content[idx]['list'])}}</div>
                                    <ul class="list-time" v-for="(item,index) in scope.row.content[idx]['list']" :key="index">
                                        <li v-html="parseTimeStr(item)"></li>
                                    </ul>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <el-dialog title="工作审核" class="edit-window" :visible.sync="visibleEdit" append-to-body :close-on-click-modal="false" width="500px">
            <div class="edit-form" v-if="visibleEdit">
                <el-input type="textarea" rows="5" v-model="checkDesc" placeholder="请输入指导意见"></el-input>
            </div>
            <div class="edit-btns" style="padding:20px 0">
                <el-button size="small" type="primary" @click="saveCheck">提交保存</el-button>
                <el-button size="small" @click="visibleEdit=false">取消</el-button>
            </div>
        </el-dialog>

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
import dateUtil from '~/util/date_util';
import chartOptions from './chartOptions.json';
import WebSocket from '~/util/webSocket';
export default {
    components: {
        myClock, myCalendar, timeWheel, samForm, formItem
    },
    data: () => ({
        showAll: false,
        currDept: null,
        socketIO: null,
        isInit: false,
        userList: [], // 部门员工
        tableData: [],
        viewUser: true,
        checkDesc: '',
        visibleEdit: false,
        editTimeData: null,
        myHolidays: holidays,
        loadingMask: null,
        //loadedChart: false,
        weekRange: null,
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
        deptids: [],
        deptData: [],
        chartItem: { ...chartOptions },
        monthLast: '',
    }),
    computed: {
        ...mapState(["collectionData"]),
        ...mapState("timeWork", ["holiday", "weekArray", "workState"]),
        getRangeWeek() {
            return moment(this.weekRange[0]['date']).format("MM月DD日") + "至" + moment(this.weekRange[6]['date']).format("MM月DD日")
        },
        getTableTitle() {
            let cw = dateUtil.weekIndexInMonth(new Date(this.weekList[0]['date']));
            let sd = moment(this.weekList[0]['date']).format("MM月DD日") + "至" + moment(this.weekList[6]['date']).format("MM月DD日");
            if (this.showAll) {
                return "44444444444";
                //return this.currDept.dept_name + "第" + cw + "周员工时间钟汇总（" + sd + "）";
            } else {
                return this.$store.state.user.name + "第" + cw + "周时间钟汇总（" + sd + "）";
            }
        },
        // 获取当前周的总休假天数
        getMyHday() {
            //console.log('this.weekList', this.weekList);
            let restDay = 0;
            this.weekRange.forEach(item => {
                let year = new Date(item.date).getFullYear();
                let month = new Date(item.date).getMonth();
                let hd = _.find(this.myHolidays, { "year": String(year) });
                hd = hd.lists[month];
                let day = new Date(item.date).getDate();
                day = day < 10 ? '0' + day : String(day);
                if (hd[day]) {
                    restDay++;
                }
            })
            return restDay;
        },

    },
    methods: {
        // 展示图表
        showChart() {

        },
        getAllTimes(list) {
            let times = 0;
            //console.log('getAllTimes', list);
            list.forEach(item => {
                let alltimes = item.endTime - item.startTime;
                times += alltimes;
            })
            return this.$global.ChangeHourMinutestr(times);
        },
        goMyWork(row = null) {
            //console.log('this.weekList', this.weekList);
            this.$storage.session.remove('timework');
            this.$storage.session.remove('weekList');

            if (row) { // 查看员工时间钟
                this.$storage.session.set('timework', { userId: row.userId });
                this.$storage.session.set('weekList', this.weekList);
            }
            this.$router.push('/work/timeLine');
        },

        disableCheck(row) {
            if (!row || !row.userId) return true;
            return row.userId == this.$store.state.user.id;
        },
        getCheckUser(row) {
            if (!row.checkUid || !row) return "";
            let user = _.find(this.$store.state.collectionData.employee, { "id": row.checkUid });
            if (!user) return "";
            return "审核人：" + user.name;
        },
        // 解析列表时间钟数据
        parseTimeStr(data) {
            if (!data) return "";
            let workType = this.$store.state.collectionData.workType;
            let wt = _.find(workType, { "id": data.type });
            let html = '<div class="type">工作分类：' + wt.name + '</div>';
            html += '<div>时间段：' + this.$global.ChangeHourMinutestr(data.startTime) + '-' + this.$global.ChangeHourMinutestr(data.endTime) + '</div>';
            html += '<div>' + data.desc + '</div>';
            let workState = _.find(this.workState, { "id": data.state });
            html += '<div class="state state-' + data.state + '">' + workState.label + '</div>';

            return html;
        },
        viewCheck(row) {
            this.editTimeData = { ...row };
            this.checkDesc = this.editTimeData.checkDesc || "";
            this.visibleEdit = true;
        },
        // 保存审核意见
        saveCheck() {
            //console.log('saveCheck', this.editTimeData, this.checkDesc);
            const condition = {
                type: "updateData",
                collectionName: "timeBlock",
                notNotice: true,
                data: {
                    id: this.editTimeData.id,
                    checkUid: this.$store.state.user.id,
                    checkDesc: this.checkDesc,
                    isRead: false
                }
            };
            this.$axios.$post("mock/db", { data: condition }).then(res => {
                if (res) {
                    //console.log('send saveCheck', res);
                    let timeData = _.find(this.tableData, { "id": this.editTimeData.id });
                    let index = _.findIndex(this.tableData, { "id": this.editTimeData.id });
                    timeData = _.merge(timeData, condition.data);
                    this.$set(this.tableData, index, { ...timeData });

                    this.visibleEdit = false;
                    // 发送一条消息
                    const cn = {
                        type: "addData",
                        collectionName: "inbox",
                        data: {
                            fid: this.editTimeData.id,
                            wfType: 2,
                            fromuserId: this.$store.state.user.id,
                            fromName: this.$store.state.user.name,
                            touserId: [this.editTimeData.userId],
                            content: { "date": Date.now() }
                        }
                    };
                    //console.log('send inbox', cn);
                    //return;
                    this.$axios.$post("mock/db", { data: cn }).then(result => {
                        if (result) {
                            this.$message.success("审核指导意见已保存！并通知了对方");
                            this.socketIO.send({ "event": 'timeCheck', "obj": { "id": result.id, "touserId": [this.editTimeData.userId] } });
                            this.editTimeData = null;
                        }
                    });
                }
            });

        },
        // 周范围日期
        setWeekStr() {
            if (this.weekList.length) {
                return moment(this.weekList[0]['date']).format('YYYY-MM-DD') + '至' + moment(this.weekList[6]['date']).format('YYYY-MM-DD')
            }
            return "";
        },
        /* viewUerTime() {
            this.viewUser = !this.viewUser;
        }, */
        // 周下拉选择
        handlerChangeWeek(date) {
            //console.log('handlerChangeWeek', date);
            this.currDate = date.getTime();
            this.calendarValue = [date.getFullYear(), date.getMonth() + 1];
            this.useMonth = false;
            this.setWeekList();
        },
        // 本周
        /* setCurrWeek(val) {
            //console.log('setCurrWeek', new Date(this.weekList[0]['date']), this.weekList[0]['date']);
            this.currDate = this.weekTime; //new Date(dp).getTime();
            const date = new Date(this.weekTime);
            this.calendarValue = [date.getFullYear(), date.getMonth() + 1];
            this.useMonth = false;
            this.setWeekList();
        }, */
        // 年月下拉选择
        /* handlerChangeMonth(date) {
            console.log('handlerChangeMonth', date);
            this.currDate = date.getTime();
            this.monthLast = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
            //console.log('monthLast', this.monthLast);
            this.useMonth = true;
            this.getMyWorkByMonth();
        }, */
        // 本月
        /* setCurrMonth(val) {
            const date = new Date(this.weekTime);
            this.currDate = new Date(date.getFullYear(), date.getMonth()).getTime();
            this.monthLast = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();

            //this.isCurrMonth = val;
            this.useMonth = true;
            this.getMyWorkByMonth();
        }, */
        // 通过部门等查询过滤
        async handleFilterSearch() {

        },

        // 解析周计划数据
        parseWorkPlan(key, item) {
            let obj = _.find(this.collectionData[key], { "id": item[key] });
            return obj.name || "";
        },
        // 日历传参
        calendarChange(val) {
            //console.log('calendarChange', val);
            this.currDate = new Date(new Date(val).toLocaleDateString()).getTime();
            //
            this.setWeekList();
        },
        // 设置一周的起始和终止时间
        setWeekList() {
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
            if (!this.weekRange) {
                this.weekRange = [...this.weekList];
            }
            this.getMyWorkByWeek();

            // 获取员工时间钟数据
            //this.getEmpTimeList();

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
        getMyWorkByWeek(math = {}) {
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
            this.$axios.$post("mock/db", { data: condition }).then(result => {
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
                    this.getEmpTimeList();
                }, 500);
            });

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
        },
        getEmpTimeList() {
            this.tableData = [];
            let deptList = this.$store.state.collectionData.department;
            let myDept = this.$storage.get("dept");
            this.detpIds = [];
            let uids = [this.$store.state.user.id];
            const employeeList = this.$store.state.collectionData.employee;
            this.userList = [...employeeList];
            // 如果是主管领导
            if (myDept) {
                this.showAll = true;
                myDept.forEach(item => {
                    this.detpIds = this.detpIds.concat(this.$global.getDeptIds(deptList, item.id));
                });

                if (this.detpIds.length) {
                    this.userList = employeeList.filter(item => {
                        if (_.isArray(item.department)) {
                            for (let i = 0; i < item.department.length; i++) {
                                if (this.detpIds.includes(item.department[i])) {
                                    return true;
                                }
                            }
                        } else {
                            return this.detpIds.includes(item.department);
                        }
                    });
                    uids = this.userList.map(item => {
                        return item.id;
                    });

                    // 列出部门结构树
                    deptList.forEach(item => {
                        if (this.detpIds.includes(item.id)) {
                            let obj = {
                                id: item.id,
                                pid: item.dept_parentid,
                                value: item.id,
                                label: item.dept_name
                            }
                            this.deptData.push(obj);
                        }
                    })
                    this.deptData = this.$global.toTree(this.deptData);
                    console.log('this.deptData', this.deptData)
                    //debugger
                }
            }
            // 获取员工的时间钟数据
            const condition = {
                type: "listData",
                collectionName: "timeBlock",
                notNotice: true,
                data: {
                    userId: { $in: uids },
                    startdate: { $gte: this.weekList[0].date },
                    enddate: { $lt: this.weekList[6].date + 24 * 3600 * 1000 }
                }
            };
            //debugger
            this.$axios.$post("mock/db", { data: condition }).then(result => {
                console.log('员工时间钟', result);
                if (result && result.list.length) {
                    this.tableData = result.list.map(item => {
                        let emp = _.find(this.userList, { "id": item.userId });
                        item.empname = emp.name;
                        return item;
                    });
                    console.log('this.tableData', this.tableData)
                }
            });
        },
    },
    created() {
        //this.getcurrDate();
    },
    mounted() {
        this.socketIO = new WebSocket();
        this.getcurrDate();
    },
    beforeDestroy() {
        this.socketIO = null;
    },
}
</script>
<style lang="scss" scoped>
@import './index';
</style>
