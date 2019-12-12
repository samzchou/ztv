<template>
    <section class="plan-container">
        <div class="header">
            <div>
                <div class="title">（{{$store.state.user.name}}）第{{setTitle(-1)}}周总结和第{{setTitle(0)}}周周计划</div>
            </div>
            <div v-if="rangeTime" class="btns">
                <week-select :weekToDay="weekToDay" :startTime="rangeTime.startTime" />
                <el-button size="mini" type="success" @click="exportExcel">导出Excel</el-button>
            </div>
        </div>
        <div class="content">
            <div>sss</div>
            <el-table :data="tableData">
                <el-table-column align="center" label="(季子禾)2019年11月工作计划">
                    <el-table-column type="index" label="序号" width="80"></el-table-column>
                    <el-table-column prop="type" label="工作名称" width="150"></el-table-column>
                    <el-table-column prop="contentmonth" label="工作内容" width="120"></el-table-column>
                    <el-table-column prop="timeNode" label="时间节点" width="120"></el-table-column>
                    <el-table-column prop="uid" label="具体责任人" width="120"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="（季子禾）第45周周总结和第46周周计划">
                    <el-table-column prop="summary1" label="45周总结（11.09）" width="200"></el-table-column>
                    <el-table-column prop="question1" label="存在的问题" width="200"></el-table-column>
                    <el-table-column prop="content1" label="46周计划（11.11-11.16）" width="200"></el-table-column>
                    <el-table-column prop="leader1" label="主管1" width="200"></el-table-column>
                    <el-table-column prop="evaluation1" label="主管评价1" width="200"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="（季子禾）第47周周总结和第48周周计划">
                    <el-table-column prop="summary2" label="45周总结（11.09）" width="200"></el-table-column>
                    <el-table-column prop="question1" label="存在的问题" width="200"></el-table-column>
                    <el-table-column prop="content2" label="46周计划（11.11-11.16）" width="200"></el-table-column>
                    <el-table-column prop="leader2" label="主管2" width="200"></el-table-column>
                    <el-table-column prop="evaluation2" label="主管评价2" width="200"></el-table-column>
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
        tableData: [...dataJson.tableData],
        listData: [],
        originData: [...dataJson.originData],
        colData: [],
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
        // 获取周总结和周计划数据
        async getReportData(math = {}) {
            math = _.merge(math, { "uid": this.$store.state.user.id });
            const condition = {
                type: "getData",
                collectionName: "work_report",
                notNotice: true,
                data: _.merge({
                    "type": 1
                }, math)
            };
            console.log('getReportData', condition)
        },

        exportExcel() {
            const wscols = [
                { wpx: 220 } // 第一列宽度设置单位px
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
            // 合并列
            const wsMerge = [XLSX.utils.decode_range('A1:A2')];
            /** 头部-行列信息*/
            const header1 = this.colData.map(res => res.dataName).concat('合计');
            console.log('header1', header1);
            // 构建第一行表头的合并数据
            header1.map((res, idx, array) => {
                // 定义列位置
                const hdMergeObj = {
                    s: { r: 0 },
                    e: { r: 0 }
                }
                if ((idx + 2) % 1 === 0) {
                    array.splice(3 * idx + 1, 0, '', '')
                    hdMergeObj['s']['c'] = 3 * idx + 1
                    hdMergeObj['e']['c'] = hdMergeObj['s']['c'] + 2
                    wsMerge.push(hdMergeObj)
                }
                return res
            });
            console.log('wsMerge', wsMerge)
            // 第二行表头
            const header2 = this.colData.map(() => '库存数量').concat('库存数量');
            header2.map((res, idx, array) => {
                if ((idx + 2) % 1 === 0) {
                    array.splice(3 * idx + 1, 0, '锁定数量', '可用数量')
                }
                return res
            });
            console.log('header2', header2);
            // 构建sheet结构
            const ws = XLSX.utils.aoa_to_sheet([['商品信息'].concat(header1), [''].concat(header2)]);
            /** 商品信息-行列信息*/
            const skuInfo = this.listData.map(res => res.skuId + '\r\n' + res.skuName);
            XLSX.utils.sheet_add_aoa(ws, skuInfo.map(res => [res]), { origin: 'A3' });
            /** 仓库-行列信息 字段（库存数量，锁定数量，可用数量）*/
            const unAllowed = ['skuId', 'skuName', 'warehouseItem'];
            // 重构数据内容
            const sheetData = this.listData.map((data) => {
                const filterItem = Object.assign({}, data);
                Object.keys(filterItem).filter(key => unAllowed.includes(key)).forEach(key => delete filterItem[key]);
                // 重构完数据
                let warehouseDatas = [];
                Object.values(filterItem).forEach(res => {
                    warehouseDatas = warehouseDatas.concat([res.quantity]).concat([res.lockQuantity]).concat([res.availableQuantity]);
                    return warehouseDatas;
                })
                return warehouseDatas;
            });
            console.log('sheetData', sheetData);
            // 将数据添加到行
            XLSX.utils.sheet_add_aoa(ws, sheetData, { origin: { r: 2, c: 1 } });
            /** 合计-行列信息*/
            const totalData = this.listData.map(row => {
                const totlal_quantity = Object.values(row.warehouseItem).map(res => res.quantity).reduce((accumulator, currentValue) => accumulator + currentValue);
                const totlal_lockQuantity = Object.values(row.warehouseItem).map(res => res.lockQuantity).reduce((accumulator, currentValue) => accumulator + currentValue);
                const totlal_availableQuantity = Object.values(row.warehouseItem).map(res => res.availableQuantity).reduce((accumulator, currentValue) => accumulator + currentValue);
                return [totlal_quantity, totlal_lockQuantity, totlal_availableQuantity];
            });
            console.log('totalData', totalData);
            XLSX.utils.sheet_add_aoa(ws, totalData, { origin: { r: 2, c: this.colData.length * 3 + 1 } });
            // 导出 Sheet1:名称
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, '库存');
            ws['!cols'] = wscols;
            ws['!merges'] = wsMerge;
            console.log(wsMerge);

            XLSX.writeFile(wb, '库存报表按SKU.xlsx')
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