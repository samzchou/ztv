<template>
    <section class="plan-container">
        <div class="header">
            <div>
                <div class="title">（{{$store.state.user.name}}）第{{setTitle(-1)}}周总结和第{{setTitle(0)}}周周计划</div>
            </div>
        </div>
        <div class="content">
            <div class="btns">
                <div class="check-list">
                    <el-checkbox-group size="small" v-model="checkList" @change="handlerChangeType">
                        <el-checkbox-button v-for="item in viewType" :key="item.value" :label="item.value">{{item.label}}</el-checkbox-button>
                    </el-checkbox-group>
                </div>
                <div class="week-select">
                    <week-select v-if="rangeTime&&rangeTime.startTime" :weekToDay="weekToDay" :startTime="rangeTime.startTime" :showMonth="showMonth" />
                    <el-button size="small" type="success" @click="exportExcel" style="margin-left:20px">导出Excel</el-button>
                </div>
            </div>
            <el-table :data="tableData">
                <el-table-column v-for="(header,idx) in tableHeader" :key="idx" :label="header.label" align="center">
                    <el-table-column type="index" v-if="idx==0" label="序号" width="80" align="center" />
                    <el-table-column v-for="(child,index) in header.children" :key="`${idx}-${index}`" :prop="child.field" :label="child.label" :width="child.width||'auto'"></el-table-column>
                    <el-table-column label="操作" v-if="header.type!==1" width="120" align="center">
                        <template slot-scope="scope">
                            <el-button type="text">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table-column>

            </el-table>
        </div>
    </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import weekSelect from '~/components/userinfo/weekSelect';
import dataJson from './planTest.json';
import XLSX from 'xlsx';
export default {
    components: {
        weekSelect
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
        weekList: [],
        weekToDay: Date.now(),
        startDate: 0,
        endDate: 0,
        tableHeader: [...dataJson.tableHeader],
        tableData: [...dataJson.tableData], //
        listData: [],
        originData: [...dataJson.originData],
        colData: [],
        checkList: [1],
        viewType: [{ value: 1, label: '日报' }, { value: 2, label: '周报' }, { value: 3, label: '月报' }, { value: 0, label: '所有' }],
        showMonth: false
    }),


    methods: {
        ...mapActions("timeWork", ["ASYNC_GTETIME_RANGE", "ASYNC_GTE_HOLIDAY"]),
        setTitle(val) {
            console.log('this.weekToDay', this.weekToDay)
            return this.$global.getDateWeek(this.weekToDay) + val;
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
            //if (!this.startDate && !this.endDate) {
            this.startDate = this.weekList[0]['date'];
            this.endDate = this.weekList[6]['date'] + 24 * 3600 * 1000 - 1;
            //}
            //console.log('this.weekList', this.weekList)
            // 获取周总结和周计划数据
            this.getReportData();
            //console.log('this.weekList', this.weekList)
        },
        setCurrWeek(date) {
            this.weekToDay = date;
            this.setWeekList();
        },
        handlerChangeType(val) {
            console.log('handlerChangeType', this.checkList)
            this.showMonth = val.includes(3);
            this.getReportData()
        },
        // 获取周总结和周计划数据
        async getReportData(math = {}) {
            console.log()
            math = _.merge(math, { "uid": this.$store.state.user.id });
            const condition = {
                type: "listData",
                collectionName: "work_report",
                notNotice: true,
                data: _.merge({
                    "type": { $in: this.checkList }
                }, math),
                sortby: 'type',
                ascby: -1
            };
            console.log('getReportData', condition);
            let res = await this.$axios.$post("mock/db", { data: condition });

            console.log('getReportData', res.list);
            if (res) {
                let list = [];
                this.$store.state.collectionData.workType.forEach(item => {
                    let arr = [];

                })
            }
        },

        exportExcel() {
            // 定义列宽
            const wscols = [
                { wpx: 50 }, { wpx: 100 }, { wpx: 300 }, { wpx: 150 }, { wpx: 150 }, { wpx: 350 }, { wpx: 350 }, { wpx: 350 }, { wpx: 150 }, { wpx: 350 }
            ];
            /**
             * 合并单元格元素(decode_range方法解析数据格式)
            {
                 s: { //s start 开始
                    c: 1,//cols 开始列
                    r: 0 //rows 开始行
                },
                e: {//e end  结束
                    c: 4,//cols 结束列
                    r: 0 //rows 结束行
                }
            }
            */
            // 合并列 做序号用
            const wsMerge = [XLSX.utils.decode_range('A1:A2')];
            /* const wsMerge = [
                { s: { r: 0, c: 0, }, e: { r: 1, c: 0 } },
                { s: { r: 0, c: 1, }, e: { r: 0, c: 4 } },
                { s: { r: 0, c: 5, }, e: { r: 0, c: 9 } }
            ] */
            /** 头部-行列信息*/
            //const header1 = this.colData.map(res => res.dataName)
            const tableHeader = [{ label: "季子禾2019年11月工作计划", s: 1, e: 4 }, { label: "季子禾第45周周总结和第46周周计划", s: 5, e: 9 }]
            // 第一行表头
            const header1 = ["季子禾2019年11月工作计划", "", "", "", "季子禾第45周周总结和第46周周计划", "", "", "", ""];
            let index = 1;
            //let hdMergeObj = { s: { r: 0 }, e: { r: 0 } };

            tableHeader.forEach(item => {
                wsMerge.push({
                    s: { r: 0, c: item.s },
                    e: { r: 0, c: item.e }
                })
            });
            console.log('wsMerge', wsMerge);
            //return;

            // 第二行表头
            const header2 = ["工作名称", "工作内容", "时间节点", "具体负责人", "45周总结（11.09）", "存在的问题", "46周计划（11.11-11.16）", "主管", "主管评价"];
            /* const header2 = this.colData.map(() => '库存数量').concat('库存数量');
            header2.map((res, idx, array) => {
                if ((idx + 2) % 1 === 0) {
                    array.splice(3 * idx + 1, 0, '锁定数量', '可用数量')
                }
                return res
            }); */
            console.log(header1, header2);
            // 构建sheet结构
            const ws = XLSX.utils.aoa_to_sheet([['序号'].concat(header1), [''].concat(header2)]);

            // 重构数据内容
            XLSX.utils.sheet_add_aoa(ws, [[1], [2]], { origin: 'A3' });

            let sheetData = [];
            for (let i = 0; i < 2; i++) {
                let arr = [];
                for (let j = 0; j < header2.length; j++) {
                    arr.push(header2[j] + '-' + j);
                }
                sheetData.push(arr);
            }

            // 将数据添加到行
            XLSX.utils.sheet_add_aoa(ws, sheetData, { origin: { r: 2, c: 1 } });


            // 导出 Sheet1:名称
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, '2019年11月');
            ws["B1"].s = {									//为某个单元格设置单独样式,不起作用
                font: {
                    name: '宋体',
                    sz: 24,
                    bold: true,
                    color: { rgb: "FFFFAA00" }
                },
                alignment: { horizontal: "center", vertical: "center", wrap_text: true },
                fill: { bgcolor: { rgb: 'ffff00' } }
            };
            ws['!cols'] = wscols;
            ws['!merges'] = wsMerge;
            XLSX.writeFile(wb, '库存报表.xlsx')
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
            console.log('originData', this.listData, this.colData);
        }
    },
    beforeMount() {
        // 获取服务器的时间
        this.ASYNC_GTETIME_RANGE();
        // 获取休假日数据
        this.ASYNC_GTE_HOLIDAY();
    },
    mounted() {
        this.initData()
    }
}
</script>

<style lang="scss" scoped>
@import './plan.scss';
</style>