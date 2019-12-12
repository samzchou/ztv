<template>
    <section class="plan-container">
        <div class="header">
            <div>
                <div class="title">（{{$store.state.user.name}}）工作计划</div>
            </div>
        </div>
        <div class="content" v-loading="lodingData">
            <div class="btns">
                <div class="check-list">
                    <el-checkbox-group size="small" v-model="checkList" @change="handlerSelectChange">
                        <el-checkbox v-for="item in viewType" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
                    </el-checkbox-group>
                    <week-select style="margin-left:15px" ref="week-select" v-if="rangeTime&&rangeTime.startTime" :weekToDay="weekToDay" :startTime="rangeTime.startTime" :showMonth="showMonth" />
                    <el-select size="small" v-model="curruid" placeholder="根据员工查询">
                        <el-option v-for="user in userList" :key="user.id" :value="user.id" :label="user.name"></el-option>
                    </el-select>
                    <el-button size="small" type="success" @click="handlerSearch" style="margin-left:10px">查询</el-button>

                    <el-button size="small" type="info" @click="createWeekReport" style="margin-left:10px">创建周报</el-button>
                </div>
                <div class="week-select">
                    <el-button size="small" type="primary" @click="exportExcel" style="margin-left:20px">导出Excel</el-button>
                </div>
            </div>
            <el-table :data="tableData" fit stripe birder>
                <el-table-column v-for="(header,idx) in tableHeader" :key="idx" :label="header.label" align="center">
                    <el-table-column type="index" v-if="idx==0" label="序号" width="80" align="center" />
                    <el-table-column v-for="(child,index) in header.children" :key="`${idx}-${index}`" :prop="child.field" :label="child.label" :width="child.width||'auto'">
                        <template slot-scope="scope">
                            <div>{{scope.row[child.field]}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" v-if="header.type!==1" :width="header.type==2?160:100" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" v-if="header.type==2" @click="editRow(scope.row, idx, true)">主管评价</el-button>
                            <el-button type="text" @click="editRow(scope.row, idx)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="dialogTitle" class="edit-window" :visible.sync="visibleEdit" append-to-body :close-on-click-modal="false" width="500px">
            <div class="edit-form" v-if="visibleEdit">
                <div v-if="createReport" class="create-report">
                    <div>请选需要创建的周</div>
                    <week-select ref="week-report" v-if="rangeTime&&rangeTime.startTime" :showIcon="false" :weekToDay="weekToDay" :startTime="rangeTime.startTime" />
                </div>
                <sam-form v-else ref="dataForm" :data="dataForm" :isEdit="false" v-model="formValue" />
            </div>
            <div class="edit-btns">
                <el-button size="small" type="primary" @click="saveSubmit">提交保存</el-button>
                <el-button size="small" @click="visibleEdit=false">取消</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import samForm from '~/components/form';
import weekSelect from '~/components/userinfo/weekSelect';
import dateUtil from '~/util/date_util';
import dataJson from './planTest.json';
import XLSX from 'xlsx';
export default {
    components: {
        weekSelect, samForm
    },
    computed: {
        ...mapState(["collectionData"]),
        ...mapState("timeWork", ["weekArray", "holiday", "rangeTime"]),
    },
    watch: {
        rangeTime: {
            handler(obj) {
                if (!_.isEmpty(obj)) {
                    this.weekToDay = obj.startTime;
                    this.setWeekList();
                }
            },
            immediate: true
        }
    },
    data: () => ({
        userList: [],
        curruid: 0,
        lodingData: true,
        hasWekkReport: true, // 是否有周报
        createReport: false,
        weekList: [],
        weekToDay: Date.now(),
        startDate: 0,
        endDate: 0,
        sourceData: [],
        headerFields: [...dataJson.headerFields],
        tableHeader: [], //...dataJson.tableHeader
        tableData: [], //...dataJson.tableData
        listData: [],
        originData: [...dataJson.originData],
        colData: [],
        checkList: [2, 3],
        viewType: [{ value: 2, label: '周报' }, { value: 3, label: '月报' }],
        showMonth: false,
        visibleEdit: false,
        dialogTitle: "编辑月工作计划",
        editItem: null,
        dataForm: {},
        formValue: {},
        currWeekData: null
    }),


    methods: {
        ...mapActions("timeWork", ["ASYNC_GTETIME_RANGE", "ASYNC_GTE_HOLIDAY"]),
        setTitle(val) {
            return this.$global.getDateWeek(this.weekToDay) + val;
        },
        parseStr(string) {
            console.log('parseStr', str);
            //return str;
            try {
                string = string.replace(/\r\n/g, "<br/>")
                string = string.replace(/\n/g, "<br/>");
            } catch (e) {
                alert(e.message);
            }
            return string;
        },
        createWeekReport() {
            this.dialogTitle = "创建周计划";
            this.createReport = true;
            this.visibleEdit = true;
        },
        editRow(row, fieldIndex, flag) {
            this.editItem = Object.assign({ 'fieldIndex': fieldIndex }, { ...row });
            this.formValue = {};
            this.dataForm = {};
            //console.log(row, this.tableHeader[fieldIndex], this.editItem);
            //return;
            let workType = _.find(this.$store.state.collectionData.workType, { "id": this.editItem.type })
            let content;
            if (fieldIndex == 0) { // 月计划
                this.dialogTitle = "编辑月工作计划（" + workType.name + "）";
                this.dataForm = { ...dataJson.formMonth };
                // 取出月计划的原始数据
                if (row.mdata && row.mdata) {
                    content = _.find(row.mdata.list, { worktype: row.type });
                }
            } else { // 周计划
                this.dialogTitle = "编辑周计划（" + workType.name + "）";
                this.dataForm = _.cloneDeep(dataJson.formWeek);
                let itemList = [...this.dataForm.itemList];
                //debugger
                if (!flag) {
                    itemList.splice(3, 1);
                } else {
                    itemList = itemList.map(item => {
                        if (item.name !== 'evaluation') {
                            item.disabled = true;
                        }
                        return item;
                    })
                }
                this.$set(this.dataForm, 'itemList', itemList);
                this.currWeekData = { ...this.sourceData[fieldIndex] };
                if (this.currWeekData.content && this.currWeekData.content.list) {
                    content = _.find(this.currWeekData.content.list, { worktype: row.type });
                }
            }
            this.dataForm.itemList.forEach(item => {
                this.formValue[item.name] = content ? content[item.name] : "";
            });
            this.visibleEdit = true;
        },
        saveSubmit() {
            if (this.createReport) {
                this.createMyWeekReport();
            } else {
                if (this.editItem.fieldIndex == 0) { // 保存月报数据
                    this.saveMonthData();
                } else {
                    this.saveWeekData();
                }
            }
        },

        // 保存月报数据
        async createMyWeekReport() {
            let currDay = this.$refs['week-report']['currDay'];
            const data = {
                uid: this.$store.state.user.id,
                type: 2,
                startTime: dateUtil.getWeekStartDate(new Date(currDay)).getTime(),
                endTime: dateUtil.getWeekEndDate(new Date(currDay)).getTime() + 24 * 3600 * 1000 - 1,
            }
            let condition = {
                notNotice: true,
                type: "getData",
                collectionName: "work_report",
                data: data
            };
            let res = await this.$axios.$post("mock/db", { data: condition });
            //console.log('createMyWeekReport', data, res);
            if (res) {
                this.$alert("该周周报已经存在！请选择其他周！")
            } else {
                condition.type = "addData";
                let result = await this.$axios.$post("mock/db", { data: condition });
                if (result) {
                    this.$message.success("该周日报已经创建成功！");
                    this.visibleEdit = false;
                    this.createReport = false;

                    this.handlerSearch();
                }
            }
        },
        // 保存周报数据
        saveWeekData() {
            console.log('saveWeekData', this.formValue, this.currWeekData);

            let objData = _.merge({
                worktype: this.editItem.type,
            }, this.formValue);
            let currWeekData = { ...this.currWeekData };
            if (!currWeekData.content) {
                currWeekData.content = {
                    list: [objData]
                }
            } else {
                let index = _.findIndex(currWeekData.content.list, { worktype: this.editItem.type });
                if (!!~index) {
                    currWeekData.content.list[index] = _.merge(currWeekData.content.list[index], objData);
                } else {
                    currWeekData.content.list.push(objData);
                }
            }
            let condition = {
                notNotice: true,
                type: "updateData",
                collectionName: "work_report",
                data: currWeekData
            };
            //console.log('saveWeekData', condition);
            this.$axios.$post("mock/db", { data: condition }).then(res => {
                if (res) {
                    this.visibleEdit = false;
                    this.$message.success("周计划保存成功！");
                    this.handlerSearch();
                }
            })

        },
        // 保存月报
        saveMonthData() {
            //console.log('this.formValue', this.formValue);
            if (this.$refs['dataForm']) {
                let refForm = this.$refs['dataForm'];
                let isValidate = refForm.checkFormValidate();
                if (!isValidate) {
                    this.$message.error('表单数据的验证有误，请核查！');
                    return;
                }
                //console.log(this.editItem, this.tableData, this.sourceData);
                let currtMonth = this.$refs['week-select']['currtMonth'];
                let startTime = dateUtil.getMonthStartDate(new Date(currtMonth)).getTime();
                let endTime = dateUtil.getMonthEndDate(new Date(currtMonth)).getTime() + 24 * 3600 * 1000 - 1;
                let mdata = _.find(this.sourceData, { startTime: startTime, endTime: endTime, });
                const condition = {
                    type: "addData",
                    collectionName: "work_report",
                    data: {}
                };
                if (!mdata) { // 没有月计划数据
                    mdata = {
                        type: 3,
                        uid: this.$store.state.user.id,
                        update_uid: this.$store.state.user.id,
                        startTime: startTime,
                        endTime: endTime,
                        content: {
                            list: []
                        }
                    }
                    mdata.content.list.push(_.merge({
                        worktype: this.editItem.type,
                        uid: this.$store.state.user.id
                    }, this.formValue));
                    //console.log('mdata', mdata);
                } else {
                    condition.type = "updateData";
                    let itemIndex = _.findIndex(mdata.content.list, { worktype: this.editItem.type });
                    if (!!~itemIndex) {
                        let item = { ...mdata.content.list[itemIndex] };
                        mdata.content.list[itemIndex] = _.merge(item, this.formValue);
                    } else {
                        mdata.content.list.push(_.merge(this.formValue, { worktype: this.editItem.type, uid: this.$store.state.user.id }))
                    }

                }
                condition.data = mdata;
                /* console.log('saveSubmit condition', condition)
                return; */
                this.$axios.$post("mock/db", { data: condition }).then(res => {
                    //console.log('saveSubmit', res)
                    if (res) {
                        this.visibleEdit = false;
                        this.$message.success("保存成功！");
                        this.handlerSearch();
                    }
                });
            }
        },
        // 设置一周的起始和终止时间
        setWeekList() {
            this.weekList = [];
            const currenDay = new Date(this.weekToDay).getDay();
            this.weekArray.forEach((w, i) => {
                const day = this.weekToDay + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7));
                const st = new Date(day).getTime();
                const obj = { wday: w, date: st, allTimes: 0 };
                this.weekList.push(obj);
            });
            this.startDate = this.weekList[0]['date'];
            this.endDate = this.weekList[6]['date'] + 24 * 3600 * 1000 - 1;
            // 获取周总结和周计划数据
            this.$nextTick(() => {
                this.handlerSearch();
            })
        },
        setCurrWeek(date) {
            this.weekToDay = date;
            this.setWeekList();
        },
        handlerSelectChange(val) {
            this.showMonth = val.includes(3);
            return val.includes(3);
        },
        handlerSearch() {
            let currDay = this.$refs['week-select']['currDay'];
            let currtMonth = this.$refs['week-select']['currtMonth'];
            let params = { startTime: 0, endTime: 0 };

            // 如果是按月查询的
            if (this.handlerSelectChange(this.checkList)) {
                params.startTime = { $gte: dateUtil.getMonthStartDate(new Date(currtMonth)).getTime() };
                params.endTime = { $lte: dateUtil.getMonthEndDate(new Date(currtMonth)).getTime() + 24 * 3600 * 1000 - 1 };
            } else { // 按周
                params.startTime = { $gte: dateUtil.getWeekStartDate(new Date(currDay)).getTime() };
                params.endTime = { $lte: dateUtil.getWeekEndDate(new Date(currDay)).getTime() + 24 * 3600 * 1000 - 1 };
            }
            //console.log('params', params);
            this.getReportData(params);
        },
        // 获取周总结和周计划数据
        async getReportData(math = {}) {
            this.lodingData = true;
            this.hasWekkReport = true;
            // 如果选择有周报的则还需要取出上周的周总结数据？？？
            math = _.merge(math, { "uid": this.curruid });
            const condition = {
                type: "listData",
                collectionName: "work_report",
                notNotice: true,
                data: _.merge({
                    "type": { $in: this.checkList }
                }, math),
                sortby: { 'type': -1, 'startTime': 1 }
            };
            //console.log('getReportData', condition);
            let res = await this.$axios.$post("mock/db", { data: condition });
            //console.log('getReportData', JSON.stringify(res.list));

            if (res) {
                this.sourceData = res.list;
                let user = this.$store.state.user;
                let list = [];
                let header = [...dataJson.tableHeader];
                let monthReportList = [], weeReportList = [], dayReportList = [];

                /*---表头重构开始--------------------------------------------*/
                // 重构月计划表头
                let mIndex = _.findIndex(header, { type: 3 });
                if (this.checkList.includes(3)) {
                    let mItem = header[mIndex];
                    monthReportList = res.list.filter(o => o.type == 3);
                    mItem['label'] = '（' + user.name + '）' + moment(math.startTime.$gte).format('YYYY年MM月') + '工作计划';
                    header.splice(mIndex + 1, 0, mItem);
                }
                header.splice(mIndex, 1);

                // 重构周报表头
                let wIndex = _.findIndex(header, { type: 2 });
                let wItem = header[wIndex];
                if (this.checkList.includes(2)) {

                    weeReportList = res.list.filter(o => o.type == 2);
                    if (weeReportList && weeReportList.length) {
                        let wItem = header[wIndex];
                        weeReportList.forEach((item, idx) => {
                            let weekIndexInMonth = dateUtil.weekIndexInMonth(new Date(item.startTime));
                            let lastStartTime = item.startTime - 7 * 24 * 3600 * 1000;
                            let lastEndTime = item.startTime - 1;

                            let obj = _.cloneDeep(wItem);
                            obj.label = '（' + user.name + '）' + '第' + (weekIndexInMonth - 1) + '周周总结和第' + weekIndexInMonth + '周周计划';
                            obj.children = obj.children.map((child, index) => {
                                if (child.field == 'summary') {
                                    child.label = (weekIndexInMonth - 1) + "周总结（" + moment(lastStartTime).format('MM.DD') + "-" + moment(lastEndTime).format('MM.DD') + "）";
                                }
                                if (child.field == 'desc') {
                                    child.label = weekIndexInMonth + "周计划（" + moment(item.startTime).format('MM.DD') + "-" + moment(item.endTime).format('MM.DD') + "）";
                                }
                                child.field += '-' + idx; // + '-' + index;
                                return child;
                            });

                            header.splice(wIndex + idx + 1, 0, obj);
                        });
                    } else {
                        this.hasWekkReport = false;
                    }
                }
                header.splice(wIndex, 1);

                // 判断表头是否有工作分类
                if (header[0]['children'][0]['field'] !== 'worktype') {
                    header[0]['children'].unshift({
                        "field": "worktype",
                        "label": "工作名称",
                        "width": 120
                    })
                }
                //console.log('header', header)
                this.tableHeader = header;
                /*---表头重构完成；下面构建数据以符合输出标准--------------------------------------------*/

                let dataList = [];

                const headerFields = [...dataJson.tableHeader];

                const weekFied = _.find(headerFields, { type: 2 });

                //debugger
                const employee = this.$store.state.collectionData.employee;
                let monthReport;
                if (monthReportList.length) {
                    monthReport = monthReportList[0];
                }
                this.$store.state.collectionData.workType.forEach(item => {
                    // 列出月计划数据
                    let obj = {
                        "type": item.id,
                        "worktype": item.name,
                        "mcontent": "",
                        "mtime": "",
                        "muid": "",
                        "mleader": ""
                    }
                    if (monthReport) {
                        obj.mdata = monthReport.content;
                        //obj.id = monthReport.id; // 这里有问题的
                        if (monthReport.content && monthReport.content.list) {
                            let typeItem = _.find(monthReport.content.list, { "worktype": item.id });
                            if (typeItem) {
                                let muser = _.find(employee, { id: typeItem.uid });
                                let mleader = _.find(employee, { id: typeItem.leaderId });
                                obj.muid = muser ? muser.name : '';
                                obj.leaderId = typeItem.leaderId;
                                obj.mleader = mleader ? mleader.name : '';
                                obj.mcontent = typeItem.desc;
                                obj.mtime = moment(typeItem.startTime).format('MM月DD日') + '-' + moment(typeItem.endTime).format('MM月DD日');
                            }
                        }
                        //console.log('monthReport', obj);
                    }

                    // 列出作结周计划
                    if (weeReportList && weeReportList.length) {
                        //debugger
                        weeReportList.forEach((wpItem, idx) => {
                            let wp;
                            if (wpItem.content && wpItem.content.list) {
                                wp = _.find(wpItem.content.list, { "worktype": item.id })
                            }
                            weekFied.children.forEach(lis => {
                                let key = lis.field + '-' + idx;
                                //console.log('weeReportList', lis.field, wp)
                                obj[key] = wp ? wp[lis.field] : "";
                            })
                        })
                    }
                    dataList.push(obj);
                    //console.log('dataList', dataList)

                });
                this.tableData = dataList;

                this.lodingData = false;
            }
        },

        exportExcel() {
            this.$alert("抱歉，导出模块正在测试中，暂未开放！")
        },

        initData() {
            this.listData = this.originData.map(res => {
                res.warehouseItem.forEach(item => {
                    res[item.warehouseId] = item;
                })
                return res;
            });
            this.originData[0].warehouseItem.forEach((res) => {
                this.colData.push({
                    dataItem: res.warehouseId,
                    dataName: res.warehouseName
                })
            })
            //console.log('originData', this.listData, this.colData);
        },

        listEmployee() {
            // 部门
            let deptList = this.$store.state.collectionData.department;
            let myDept = this.$storage.get("dept");
            let detpIds = [];
            if (myDept) {
                myDept.forEach(item => {
                    detpIds = detpIds.concat(this.$global.getDeptIds(deptList, item.id));
                })
                console.log('listEmployee', detpIds)
            }
            if (detpIds.length) {
                const employeeList = this.$store.state.collectionData.employee;
                debugger
                this.userList = employeeList.filter(item => {
                    return detpIds.includes(item.department);
                })
                console.log('this.userList', this.userList)
            }

        },
    },
    beforeMount() {
        this.curruid = this.$store.state.user.id;
        // 获取服务器的时间
        this.ASYNC_GTETIME_RANGE();
        // 获取休假日数据
        this.ASYNC_GTE_HOLIDAY();
    },
    mounted() {
        this.initData();
        this.listEmployee();
    }
}
</script>

<style lang="scss" scoped>
@import './plan.scss';
</style>