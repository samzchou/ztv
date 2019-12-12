/* eslint-disable */
<template>
    <section class="home-container">
        <!--顶部工具条-->
        <div class="tools">
            <div>
                <div style="font-size:16px">
                    <el-button type="text" icon="el-icon-back" @click="$router.back()">返回</el-button>
                </div>
                <!-- <el-button-group>
                    <el-button size="mini" icon="el-icon-back" :type="isCurrWeek === -1 ? 'primary' : ''" title="上周" @click="setWeek(-7)" />
                    <el-button size="mini" icon="el-icon-right" :type="isCurrWeek === 1 ? 'primary' : ''" title="下周" @click="setWeek(7)" />
                </el-button-group>
                <el-button size="mini" :type="isCurrWeek === 0 ? 'primary' : ''" icon="el-icon-news" title="本周" style="margin-left:10px" @click="setWeek(0, true)">本周</el-button> -->
                <div class="canlan">
                    <el-date-picker v-model="weekToDay" size="mini" type="week" :clearable="false" :picker-options="{ firstDayOfWeek: 1 }" format="yyyy年 第 WW 周" placeholder="选择周" @change="setDay" />
                </div>
                <div v-if="weekList.length" class="text">{{ setWeekTitle }}</div>
                <div class="all-times" v-if="isInit">{{getEmpWorkTitle}}</div>
            </div>
            <div>
                <el-tooltip class="item" effect="dark" :content="timeData.checkDesc" placement="bottom-end" v-if="timeData&&timeData.checkDesc">
                    <el-button type="text" icon="el-icon-s-comment">主管审核指导意见</el-button>
                </el-tooltip>
                <el-button v-if="!onlyView" size="mini" icon="el-icon-time" type="success" @click="$router.push('/work/plan')">制定我的周计划</el-button>
            </div>
        </div>

        <!--内容区-->
        <div class="list-content">
            <div id="times-list" class="times">
                <ul>
                    <li v-for="n in workTime.allHour" :key="n" :style="{'height':`${timeutilHeight*4}px`}">
                        <div>{{ getWorkHour(n) }}</div>
                    </li>
                </ul>
            </div>
            <div v-if="weekList.length" class="lists">
                <!--表格grid头部-->
                <div class="header" id="week-header">
                    <ul class="week-list">
                        <li v-for="(week, idx) in weekList" :key="idx" :style="{'width':`${timeutilWidth}px`}">
                            <div class="day" :class="{ active: checkAtive(idx) }">
                                <div>
                                    <span>{{ week.wday }} {{ getToday(week.date) }}</span>
                                    <em class="dot">{{getHoliday(week)}}</em>
                                </div>
                                <div class="total-times">
                                    <!--判断是否已经申请补填-->
                                    <el-link v-if="checkApply(idx)&&!onlyView" type="danger" @click="applyTime(idx)">申请补填</el-link>
                                    <!--是否未开始-->
                                    <span v-else-if="notUse(idx)">未开始</span>
                                    <!--是否有补填-->
                                    <span v-else-if="checkNeedApply(idx)">
                                        <el-link type="primary">补填{{checkNeedApply(idx).stateStr}}</el-link>
                                        <div class="view-apply">
                                            <div class="title"><span>申请原因：</span><br>{{checkNeedApply(idx)['reson']}}</div>
                                            <div class="content"><span>审批回复：</span><br>{{checkNeedApply(idx)['feedBack']}}</div>
                                            <div v-if="!checkNeedApply(idx)['agree']">
                                                <el-button size="mini" type="primary" @click="applyTime(idx)">再次申请补填</el-button>
                                            </div>
                                        </div>
                                    </span>
                                    <span>{{ changeHourMinutestr(week.allTimes) }}</span>
                                </div>
                            </div>
                            <div class="pos" :class="{ active: checkAtive(idx) }" />
                        </li>
                    </ul>
                </div>
                <!--表格内容区-->
                <div id="table-lists" class="tables">
                    <ul id="week-list" class="week-list">
                        <li v-for="n in 7" :key="n" :class="{ active: checkAtive(n - 1) }" :style="{'width':`${timeutilWidth}px`}">
                            <time-col :col-index="n - 1" :ref="`cols-${n - 1}`" :time="weekList[n - 1]" :dataList="timeBlockList[n - 1]? timeBlockList[n - 1]['list']: []" />
                            <!--如果今天之前就冻结，加上遮罩，除非申请了补填并审核同意 :disabled="disabledWork(n - 1) || onlyView" -->
                            <!-- <div v-if="disabledWork(n - 1) || onlyView" class="mask"></div> -->
                        </li>
                    </ul>
                    <div class="data-window" :class="{ show: showWindow }" :style="setWindowPos">
                        <div class="title">
                            <span>个人时钟管理数据录入</span>
                            <i class="el-icon-close" @click="closeEdit" />
                        </div>
                        <!--数据浮动窗编辑-->
                        <time-work @close="closeEdit" @save="saveData(null)" />
                    </div>
                </div>
            </div>
        </div>
        <!--申请补填弹窗-->
        <el-dialog class="apply-dialog" :title="isAddPlan?'制定本周工作计划':'申请补填'" :visible.sync="showDialog" append-to-body :close-on-click-modal="false" width="500px">
            <div>
                <div class="apply-title">
                    申请日期：{{ formatDate(ruleForm.date) }}
                </div>
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="top">
                    <el-form-item label="选择审核人" prop="touserId">
                        <el-checkbox-group v-model="ruleForm.touserId">
                            <el-checkbox v-for="item in myleader" :key="item.id" :label="item.id">
                                {{ item.name }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="补填原因" prop="reson">
                        <el-input v-model="ruleForm.reson" type="textarea" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="submitApply">提交申请</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import timeCol from "~/components/userinfo/timeCol";
import timeWork from "~/components/userinfo/timeWork";
import WebSocket from '~/util/webSocket';
import dataUtil from '~/util/data_util';
import samForm from '~/components/form';

import timeLineForm from './timeLineForm.json';
//const timeLineForm = require('./timeLineForm.json');

export default {
    components: {
        timeCol, timeWork, samForm
    },
    data: () => ({
        onlyView: false,
        empuid: 0,
        workid: 0,
        isSaved: false, // 数据是否已保存
        isInit: false,
        loading: true,
        weekList: [],
        isCurrWeek: 0,
        viewType: 0,
        firstDay: 0,
        weekToDay: undefined, // 本周第一天
        startDate: 0, //当前周第一天
        endDate: 0,      // 当前周最后一天
        timeData: null,
        timeBlockList: [], // 时间钟列表
        currBlock: {},
        showWindow: false,
        startRect: {},
        windowPostion: {
            left: 300,
            top: 200
        },
        showDialog: false,
        isAddPlan: false, // 是否制定周计划
        showCheck: false,
        formData: timeLineForm,
        formValue: {
            workType: "",
            workProject: "",
            desc: ""
        },
        myleader: [],
        ruleForm: {
            touserId: [],
            date: 0,
            reson: ""
        },
        rules: {
            reson: [{ required: true, message: "请输入原因", trigger: "blur" }],
            touserId: [{ type: 'array', required: true, message: "请至少选择一个审核人", trigger: "change" }],
        },
        socketIO: null,
        myDayReport: null,
        myWeekPlan: null,

    }),
    computed: {
        ...mapState(["collectionData"]),
        ...mapState("timeWork", ["workTime", "holiday", "weekArray", "timeutilWidth", "timeutilHeight", "locakMinutes", "editIndex", "editBlock", "isEditTime", "rangeTime"]),
        getEmpWorkTitle() {
            let emp = _.find(this.$store.state.collectionData.employee, { id: this.empuid });
            return emp.name + "的时间钟"
        },
        setWindowPos() {
            return {
                left: this.windowPostion.left + "px",
                top: this.windowPostion.top + "px"
            };
        },
        setWeekTitle() {
            return (moment(this.weekList[0].date).format("YYYY-MM-DD") + "至" + moment(this.weekList[6].date).format("YYYY-MM-DD"));
        },
        // 是否在本周时间内
        checkOutPaln() {
            if (this.weekList.length && this.rangeTime) {
                let st = this.weekList[0].date, et = this.weekList[6].date + 24 * 60 * 60 * 1000 - 1;
                return this.rangeTime.endTime >= et;
            }
            return false;
        },
        checkIsPaln() {
            if (this.weekList.length && this.rangeTime) {
                let st = this.weekList[0].date, et = this.weekList[6].date + 24 * 60 * 60 * 1000 - 1;
                return this.rangeTime.startTime >= st && this.rangeTime.endTime <= et;
            }
            return false;
        }
    },
    watch: {
        editBlock: {
            handler(obj) {
                if (obj && !_.isEmpty(obj) && this.isEditTime) {
                    this.editBlockInfo();
                } else {
                    this.showWindow = false;
                }
            },
            immediate: true
        },
        rangeTime: {
            handler(obj) {
                if (!_.isEmpty(obj)) {
                    this.weekToDay = obj.startTime;
                    let weekList = this.$storage.session.get("weekList");
                    if (weekList) {
                        this.weekToDay = weekList[0]['date'];
                    }
                    this.setWeekList(weekList);
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapMutations("timeWork", ["UPDATE_EDITINGTIME", "UPDATE_WEEKPLAN"]),
        ...mapActions("timeWork", ["ASYNC_GTETIME_RANGE", "ASYNC_GTE_HOLIDAY"]),
        getWorkHour(i) {
            let hour = this.workTime.startHour + i - 1;
            return (hour < 10 ? '0' + hour : hour) + ':00';
        },
        closeDialog() {
            this.isAddPlan = false;
        },

        getHoliday(week) {
            if (!this.holiday.length) return "";
            let year = new Date(week.date).getFullYear();
            let month = new Date(week.date).getMonth();
            let day = new Date(week.date).getDate();
            day = day < 10 ? '0' + day : String(day);
            //console.log('getHoliday', year)
            let hh = _.find(this.holiday, { 'year': String(year) });
            if (!hh) return;
            let type = hh.lists[month][day];
            if (type) {
                let tt = _.find(this.$store.state.holidayType, { "value": String(type) });
                return tt.label.substring(0, 1);
            }
            return '工';
        },
        formatDate(date) {
            return moment(date).format("YYYY-MM-DD");
        },
        // 提交补填申请
        submitApply() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let timeData = { ...this.timeData };
                    if (!timeData.apply) {
                        timeData.apply = [];
                    } else {
                        let index = _.findIndex(timeData.apply, {
                            date: this.ruleForm.date
                        });
                        if (~index) {
                            timeData.apply.splice(index, 1);
                        }
                    }
                    this.ruleForm.state = 1; // 待处理
                    this.ruleForm.isover = false; // 未完成补填
                    timeData.apply.push({ ...this.ruleForm });
                    this.saveData(timeData);
                    this.showDialog = false;
                }
            });
        },
        // 请求补填
        applyTime(i) {
            this.isAddPlan = false;
            this.showDialog = true;
            this.ruleForm = {
                date: this.weekList[i].date,
                touserId: [],
                reson: ""
            };
        },
        // 判断是否未开始
        notUse(i) {
            return this.weekList[i].date > this.endDate;
        },
        // 判断是否已申请补填，且日期须小于今天
        checkNeedApply(i) {
            //日期须小于今天
            if (this.weekList[i].date >= this.rangeTime.startTime) {
                return null;
            }
            if (this.timeData && this.timeData.apply) {
                let apply = _.find(this.timeData.apply, { 'date': this.weekList[i].date });
                if (apply) {
                    let stateType = _.find(this.$store.state.stateType, { 'value': apply.state });
                    apply.stateStr = stateType.label || "";
                }
                return apply;
            }
            return null;
        },
        /**
         * 校验是否可以申请补填
         * 1、根据本月第一天, 小于的不能再申请补填
         * 2、大于等于今天的，不做申请补填
         */
        checkApply(i) {
            let flag = false;
            const md = new Date(this.rangeTime.startTime).setDate(1);
            if (this.weekList[i].date < md) { // 小于本月
                flag = false;
            } else {
                if (this.weekList[i].date < this.rangeTime.startTime) { // 小于今天的
                    flag = true;
                    if (this.timeData && this.timeData.apply) {
                        const applyIndex = _.findIndex(this.timeData.apply, {
                            date: this.weekList[i].date
                        });
                        flag = !~applyIndex;
                    }
                }
            }
            return flag;
        },
        /**
         * 过时后检查是否可以补填； 加遮罩禁用
         * 1、小于今天:false
         * 2、除非有申请补填并同意
         */
        disabledWork(i) {
            if (this.timeData && this.timeData.apply) {
                //const item = _.find(this.timeData.content, { date: this.weekList[i].date });
                const index = _.findIndex(this.timeData.apply, {
                    date: this.weekList[i].date,
                    agree: true,
                    isover: false
                });
                if (!!~index) {
                    return false;
                } else {
                    if (this.weekList[i].date < this.rangeTime.startTime) {
                        return true;
                    }
                }
            } else if (this.weekList[i].date < this.rangeTime.startTime || this.weekList[i].date > this.endDate) { //小于当前时间或大于当前周最后一天
                return true;
            }
            return false;
        },
        /**
         * 设置一周（从周一开始）
         * @params val:number 加减值; thisWeek:boolean 是否本周
         */
        setWeek(val, thisWeek) {
            this.isCurrWeek = val;
            const date = new Date(this.weekToDay);
            if (!thisWeek) {
                const dp = date.setDate(date.getDate() + val);
                this.weekToDay = new Date(dp).getTime();
            } else {
                this.weekToDay = this.rangeTime.startTime;
            }
            this.setWeekList();
        },
        // 判断是否是今天
        checkAtive(index) {
            if (this.rangeTime) {
                return this.weekList[index].date == this.rangeTime.startTime;
            }
        },
        // 将毫秒数转换成小时分
        changeHourMinutestr(milliseconds) {
            milliseconds = !milliseconds ? 0 : milliseconds;
            return this.$global.exChange(milliseconds, ':');
        },
        showStatistical() {
            this.$storage.session.set("weekList", this.weekList);
            this.$router.push("/work/time");
        },
        // 新增时间钟数据
        addBlock(colIndex, index, blockObj) {
            if (!this.timeBlockList[colIndex]) {
                this.timeBlockList[colIndex] = {
                    list: []
                };
            }
            //this.isSaved = false;
            this.timeBlockList[colIndex].list.push(blockObj);
            //console.log('addBlock', this.timeBlockList);
        },
        removeBlock(colIndex, rowIndex) {
            let blockList = [...this.timeBlockList][colIndex];
            if (blockList.list && blockList.list.length) {
                let list = blockList.list;
                list.splice(rowIndex, 1);
                this.$set(blockList, 'list', list);
                this.$set(this.timeBlockList, colIndex, blockList);
                //this.isSaved = false;
                this.saveData();
            }
        },
        // 编辑时间块信息
        editBlockInfo() {
            this.showWindow = true;
            const colIndex = this.editBlock.colIndex;
            const colLi = document.getElementById("week-list").childNodes[colIndex];
            if (colLi) {
                const startTime = this.workTime.startHour * 3600 * 1000;
                let top = (this.editBlock.startTime - startTime) / 1000 / 60;
                top = (top / this.locakMinutes) * this.timeutilHeight;

                this.windowPostion.left = colLi.offsetLeft + colLi.offsetWidth;
                this.windowPostion.top = top; //(this.editBlock.startTime / 1000 / 60 / this.locakMinutes) * this.timeutilHeight; //this.editBlock.rowIndex * this.timeutilHeight;

                const containerWidth = document.getElementById("table-lists").offsetWidth;
                if (this.windowPostion.left + 350 > containerWidth) {
                    this.windowPostion.left = colLi.offsetLeft - 350;
                }
                this.calcAllTimes();
            }
        },
        // 取消关闭个人时钟管理数据录入小窗口
        closeEdit() {
            //debugger
            if (!this.editBlock.type) { // 如果没有表单的数据则直接删除
                this.$refs["cols-" + this.editBlock.colIndex][0].removeBlock(this.editBlock.index);
            }
            this.UPDATE_EDITINGTIME(false);
            this.showWindow = false;
        },
        // 计算每天的总工时
        calcAllTimes(list) {
            list = !list ? this.getAlltimeBlockList() : list;
            list.forEach((block, i) => {
                this.weekList[i].allTimes = this.$global.getAllTimes(
                    block.list
                );
            });
            //console.log("calcAllTimes", this.weekList);
        },
        // 时间钟数据交叉整理
        setCrossList(list) {
            for (let i = 0; i < list.length; i++) {
                list[i]['index'] = i;
                if (i > 0) {
                    let preEndTime = list[i - 1]['endTime']; // 前一个时间块
                    let allTime = list[i]['allTime'];
                    if (list[i]['startTime'] < preEndTime) {
                        //debugger
                        list[i]['startTime'] = preEndTime;
                        list[i]['endTime'] = list[i]['startTime'] + list[i]['allTimes'];
                    }
                }
            }
            return list;
        },
        // 获取所有时间钟数据
        getAlltimeBlockList() {
            const dataArr = [];
            for (let i = 0; i < 7; i++) {
                let blockList = this.$refs["cols-" + i][0].blockList;
                // 需要做时间交叉整理
                if (blockList.length) {
                    //debugger
                    blockList = _.sortBy(blockList, ['startTime']);
                    blockList = this.setCrossList(blockList);
                }
                dataArr.push({
                    date: this.weekList[i].date,
                    list: blockList
                });
            }
            return dataArr;
        },
        // 保存数据(如果有之前申请补填的数据传过来则合并)
        saveData(timeObj = {}) {
            //debugger
            this.showWindow = false;
            const dataArr = this.getAlltimeBlockList();
            let data = {
                userId: this.$store.state.user.id,
                startdate: this.weekList[0].date,
                enddate: this.weekList[6].date + 24 * 3600 * 1000 - 1,
                content: dataArr
            };
            let condition = {
                type: "addData",
                collectionName: "timeBlock"
            };
            if (this.timeData) {
                condition.type = "updateData";
                data.id = this.timeData.id;
            }
            data = Object.assign({}, data, { ...timeObj });
            // 处理申请补填的数据，如果已做了补填则置为已经完成
            //debugger
            if (this.timeData && this.timeData.apply && this.timeData.apply.length) {
                data.content.forEach(item => {
                    let index = _.findIndex(this.timeData.apply, { "date": item.date });
                    if (!!~index && item.list.length) {
                        let apply = { ...this.timeData.apply[index] };
                        apply.isover = true;
                        this.$set(this.timeData.apply, index, apply);
                    }
                })
                data.apply = this.timeData.apply;
            }
            condition.data = data;
            /* console.log('saveData', this.timeData, data)
            return; */
            this.$axios.$post("mock/db", { data: condition }).then(result => {
                //console.log("result", result);
                if (!this.timeData) {
                    this.timeData = result;
                }
                this.isSaved = true;
                this.$message.success("保存成功！");
                this.showWindow = false;
                // 如果提请了补填
                if (!_.isEmpty(timeObj)) {
                    this.submitInbox(timeObj, this.timeData.id);
                }
                this.calcAllTimes();

            });
        },
        // 从时间钟提取内容到下周计划
        async pickerWeekPlan(data) {
            console.log('pickerWeekPlan', this.myWeekPlan, data);
            console.log('endTime', this.weekList[6])
            let startTime = this.weekList[6]['date'] + 24 * 3600 * 1000; // 下周起始
            let endTime = startTime + 7 * 24 * 3600 * 1000 - 1;
            console.log(startTime, endTime);

            //if (!this.myWeekPlan) return;
            let condition = {
                type: "getData",
                collectionName: "work_report",
                notNotice: true,
                data: {
                    uid: this.$store.state.user.id,
                    type: 2,
                    startTime: startTime,
                    endTime: endTime
                }
            };
            let res = await this.$axios.$post("mock/db", { data: condition })
            console.log('pickerWeekPlan', res);
            let objData = {
                worktype: data.type,
                desc: data.desc
            };
            if (!res) {
                condition.type = "addData";
                condition.content = { list: [] };
                condition.content.list.push(objData);
            } else {
                //debugger
                condition.data = res;
                condition.type = "updateData";
                let content = res.content;
                if (!content) {
                    content = { list: [] };
                    content.list.push(objData);
                } else {
                    //debugger
                    let objIndex = _.findIndex(content.list, { worktype: data.type });
                    let obj = _.find(content.list, { worktype: data.type });
                    if (obj) {
                        objData.desc = obj.desc + '；' + objData.desc;
                        content.list[objIndex] = _.merge(content.list[objIndex], objData);
                    } else {
                        content.list.push(objData);
                    }
                }
                condition.data.content = content;

            }
            let result = await this.$axios.$post("mock/db", { data: condition });
            if (result) {
                this.$message.success("已成功提取到下周计划中");
            }
        },
        // 创建下周工作计划数据
        updateWeekReport() {
            //console.log('timeData', this.timeData, this.weekList);
            if (!this.timeData.id) return;
            // 定义下周的起始时间
            const date = new Date(this.weekToDay);
            const startTime = this.weekList[0]['date'];
            const endTime = this.weekList[6]['date'] + 24 * 3600 * 1000 - 1;
            let data = {
                type: 2,
                worktime_id: this.timeData.id,
                uid: this.$store.state.user.id,
                startTime: startTime,
                endTime: endTime,
                update_uid: this.$store.state.user.id
            }
            let condition = {
                type: "addData",
                collectionName: "work_report",
                notNotice: true,
                data: data
            };
            this.$axios.$post("mock/db", { data: condition }).then(res => {
                console.log('updateWeekReport', res);
                this.myWeekPlan = res;
            })
        },
        // 获取日报数据
        /* async getMyReport(type = 1) {
            this.myDayReport = null;
            // this.myWeekPlan = null;
            if (!this.timeData.id) return;
            const condition = {
                type: "getData",
                collectionName: "work_report",
                notNotice: true,
                data: {
                    "uid": this.$store.state.user.id,
                    "worktime_id": this.timeData.id,
                    "type": 1
                }
            };
            let res = await this.$axios.$post("mock/db", { data: condition });
            if (res) {
                console.log('getMyReport', res);
                this.myDayReport = res;
            }
        }, */
        // 获取下周计划数据
        async getWeekPlan(type = 2) {
            // 定义下周的起始时间
            const date = new Date(this.weekToDay);
            const startTime = this.weekList[0]['date'];//date.setDate(date.getDate() + 7);
            const endTime = this.weekList[6]['date'] + 7 * 24 * 3600 * 1000 - 1;//startTime + 7 * 24 * 3600 * 1000 - 1;
            //console.log('this.weekToDay', this.weekToDay, startTime, endTime);

            this.myWeekPlan = null;
            if (!this.timeData.id) return;
            const condition = {
                type: "getData",
                collectionName: "work_report",
                notNotice: true,
                data: {
                    "uid": this.empuid,
                    "startTime": startTime,
                    "endTime": endTime,
                    "type": 2
                }
            };
            let res = await this.$axios.$post("mock/db", { data: condition });
            if (res) {
                this.myWeekPlan = res;
                this.UPDATE_WEEKPLAN(_.cloneDeep(res));
            }
        },
        // 发送消息
        async submitInbox(obj, wtid) {
            const condition = {
                type: "addData",
                collectionName: "inbox",
                data: {
                    fid: wtid,
                    wfType: 1,
                    fromuserId: this.$store.state.user.id,
                    fromName: this.$store.state.user.name,
                    touserId: this.ruleForm.touserId,
                    content: { "date": this.ruleForm.date }//"时间钟补填申请,日期：" + moment(obj.date).format("YYYY-MM-DD")
                }
            };
            let res = await this.$axios.$post("mock/db", { data: condition });
            if (res) {
                this.socketIO.send({ "event": 'timeBlock', "obj": { "id": res.id, "touserId": this.ruleForm.touserId } });
            }
        },
        getToday(date) {
            return moment(date).format("MM-DD");
        },
        setType(val) {
            this.viewType = val;
        },
        // 从日期选择器中设置
        setDay(date) {
            this.weekToDay = date.getTime();
            this.setWeekList();
        },
        // 滚动条事件
        handleScroll() {
            this.$nextTick(() => {
                const tableContainer = document.getElementById("table-lists");
                const headerContainer = document.getElementById("week-header");
                const timeListContainer = document.getElementById("times-list");
                tableContainer.removeEventListener('scroll', () => { return false });
                tableContainer.onscroll = (evt) => {
                    headerContainer.scrollLeft = evt.target.scrollLeft;
                    timeListContainer.scrollTop = evt.target.scrollTop;
                }
            });
        },
        getNowDay(val) {
            const date = this.$global.calcData(this.weekToDay);
            date.setDate(date.getDate() + val);
            return date;
        },
        // 设置一周的起始和终止时间
        setWeekList(weekList) {
            this.timeBlockList = [];
            const currenDay = new Date(this.weekToDay).getDay();
            if (!weekList) {
                this.weekList = [];
                this.weekArray.forEach((w, i) => {
                    const day = this.weekToDay + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7));
                    const st = new Date(day).getTime();
                    const obj = {
                        wday: w,
                        date: st
                    };
                    this.weekList.push(obj);
                });
            } else {
                this.weekList = weekList;
            }
            if (!this.startDate && !this.endDate) {
                this.startDate = this.weekList[0]['date'];
                this.endDate = this.weekList[6]['date'];
            }
            // 获取数据
            this.getTimeData();
        },
        // 获取已有的数据
        async getTimeData(isMsg = false) {
            this.planData = [];
            this.timeData = null;
            this.myDayReport = null;
            this.myWeekPlan = null;
            const condition = {
                type: "getData",
                collectionName: "timeBlock",
                notNotice: true,
                data: {
                    startdate: this.weekList[0].date,
                    userId: this.empuid
                }
            };
            const result = await this.$axios.$post("mock/db", { data: condition });
            if (result) {
                //console.log('getTimeData', result)
                this.timeData = result;
                this.timeBlockList = result.content || [];
                if (this.timeBlockList.length) {
                    this.calcAllTimes(this.timeBlockList);
                }
                // 判断是否有主管审核且未阅读,然后更新为已阅读
                if (result.checkDesc && !result.isRead) {
                    this.$alert(result.checkDesc, '时间钟主管审核指导', {
                        confirmButtonText: '已收到',
                        showClose: false,
                        callback: action => {
                            let cn = {
                                type: "updateData",
                                collectionName: "timeBlock",
                                notNotice: true,
                                data: {
                                    id: result.id,
                                    isRead: true
                                }
                            };
                            this.$axios.$post("mock/db", { data: cn }).then(rs => {
                                if (rs) {
                                    this.$message.success("请按主管的审核指导进行修正！");
                                }
                            })
                        }
                    });
                }
                // 取出下周计划数据
                if (!isMsg) this.getWeekPlan(2);
            }
            this.isSaved = true;
            this.isInit = true;
            this.handleScroll();
        },
        // 获取我的上级主管
        async getMyLeader() {
            const department = this.$store.state.user.department;
            let ss = dataUtil.arrConversion(department);
            let did = ss[ss.length - 1];
            let dept = await this.$axios.$post('mock/db', {
                data: {
                    type: 'getData',
                    collectionName: 'department',
                    data: {
                        "id": did
                    },
                    column: { "leaderId": 1 }
                }
            });
            if (!dept) return;
            const uids = !_.isArray(dept.leaderId) ? [dept.leaderId] : dept.leaderId;

            let result = await this.$axios.$post('mock/db', {
                data: {
                    type: 'listData',
                    collectionName: 'employee',
                    data: {
                        id: { $in: uids }
                    },
                    column: { "id": 1, "name": 1, "username": 1, "department": 1 }
                }
            });
            if (result) {
                this.myleader = result.list;
            }
        },
        // 接收到消息后更新数据
        resetApply(blockItem) {
            let applyIndex = _.findIndex(this.timeData.apply, { 'date': blockItem.date });
            this.$set(this.timeData.apply, applyIndex, blockItem);
        },
        // 初始化socket
        initWebSocket() {
            this.socketIO = new WebSocket();
            this.socketIO.onmessage(data => {
                if (data.obj.touserId.includes(this.$store.state.user.id)) {
                    console.log('%c%s', 'color:green;', 'timeLine客户端接收到消息=>：' + JSON.stringify(data));
                    if (data.event == 'applyFeedBack') { // 通过审核，允许可以补填
                        this.resetApply(data.obj.blockItem);
                    } else if (data.event == 'timeCheck') { // 已审核指导，重新获取数据并弹出通知
                        this.getTimeData(true);
                    }
                }
            })
        },
    },
    beforeMount() {
        this.empuid = this.$store.state.user.id;
        // 如果非本人进入查看的
        let timework = this.$storage.session.get('timework');
        console.log('timework', this.$storage.session.get('timework'));
        if (timework) {
            this.empuid = timework.userId;
            this.onlyView = true;
        }
        // 获取服务器的时间
        this.ASYNC_GTETIME_RANGE();
        // 获取休假日数据
        this.ASYNC_GTE_HOLIDAY();
    },
    mounted() {
        if (!this.onlyView) {
            this.myleader = this.getMyLeader();
            this.initWebSocket();
        }
    },
    beforeDestroy() {
        this.socketIO = null;
    },
    // 导航离开该组件的对应路由时调用
    beforeRouteLeave(to, from, next) {
        if (this.isSaved) {
            next();
        } else {
            this.$confirm('当前数据未做保存，确定离开?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                next();
            }).catch(() => { });
        }
    },
};
</script>

<style lang="scss" scoped>
@import './mytimes';
.apply-dialog {
    .apply-title {
        padding: 10px 0px;
        border-bottom: 1px solid #eee;
        margin-bottom: 15px;
    }
}
</style>
