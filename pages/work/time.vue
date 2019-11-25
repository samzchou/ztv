<template>
    <section class="work-container">
        <div class="header">
            <div>
                <div style="margin-right:10px">
                    <el-date-picker size="mini" v-model="currDate" type="month" placeholder="选择月" @change="changeCurrDate" style="width:120px" />
                </div>
                <div>时间钟（工时）列表；根据所属部门员工列出；（非管理者仅列出自己的数据）</div>
                <div>
                    选取年月做查询
                    <!-- <mycalendar :currValue="currDate" isDropDown /> -->
                </div>
            </div>
            <div>
                <el-button size="mini" type="text" @click="$router.push('/work/timeLine')">管理我的时间钟</el-button>
            </div>
        </div>
        <div class="tables">
            <el-table size="mini" :data="tableData.slice((query.page-1)*query.size, query.page*query.size)" :cell-class-name="setCellStyle" :header-cell-class-name="setCellStyle">
                <el-table-column prop="name" label="员工" width="70" fixed="left"></el-table-column>
                <el-table-column prop="totalTime" class="line" width="70" label="工时合计" fixed="left" align="center">
                    <template slot-scope="scope">
                        <!-- <span>{{$global.ChangeHourMinutestr(scope.row.totalTime)}}</span> -->
                        <span>{{$global.exChange(scope.row.totalTime,':')}}</span>
                    </template>
                </el-table-column>
                <el-table-column v-for="(day,index) in daysData" :prop="String(index)" :key="index" width="50" align="center">
                    <template slot="header" slot-scope="scope">
                        <div class="day">{{daysData[index]['dd']}}</div>
                        <div class="week-name">{{weekList[daysData[index]['week']]}}</div>
                    </template>
                    <template slot-scope="scope">
                        <div class="times">{{getMyworkTime(scope.row.lists, daysData[index]['dd'])}}</div>
                        <div class="cp" v-if="getTimeWidth(scope.row.lists, daysData[index]['dd'])">
                            <div :style="{'width':getTimeWidth(scope.row.lists, daysData[index]['dd'])+'%'}"></div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages">
            <div></div>
            <el-pagination size="mini" :total="total" :current-page="query.page" :page-sizes="[20, 30, 50, 100]" @size-change="handleSizeChange" @current-change="currentChange" layout="total, sizes, prev, pager, next, jumper" />
        </div>
        <div>后期扩展：可以根据数据生成chart图表</div>
    </section>
</template>

<script>
import mycalendar from '~/components/calendar';
export default {
    components: { mycalendar },
    data: () => ({
        currDate: new Date(),
        rangeDate: [],
        dateSplit: [],
        daysData: [],
        weekList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        tableData: [],
        total: 0,
        query: {
            page: 1,
            size: 30
        }
    }),
    methods: {
        currentChange(page) {
            this.query.page = page;
        },
        handleSizeChange(size) {
            this.query.page = 1;
            this.query.size = size;
        },
        getMyworkTime(lists, dd) {
            let dt = new Date(this.dateSplit.join('-') + '-' + dd + ' 00:00:00').getTime();
            let block = _.find(lists, { "date": dt })
            if (block && block.list.length) {
                let times = this.$global.getAllTimes(block.list);
                return this.$global.exChange(times, ':');
            } else {
                return "";
            }
        },
        getTimeWidth(lists, dd) {
            let dt = new Date(this.dateSplit.join('-') + '-' + dd + ' 00:00:00').getTime();
            let block = _.find(lists, { "date": dt });
            let percent = 0;
            if (block && block.list.length) {
                let times = this.$global.getAllTimes(block.list);
                let fullTimes = 8 * 60;
                percent = Math.ceil((times / fullTimes) * 100);
                percent = percent > 100 ? 100 : percent;
            }
            return percent;
        },
        setCellStyle({ row, column, rowIndex, columnIndex }) {
            //console.log(column, columnIndex);
            let clsName = "";
            if (!isNaN(column.property)) {
                let index = Number(column.property);
                if (this.daysData[index] && this.daysData[index]['week'] === 0) {
                    clsName = "gap";
                }
            } else {
                clsName = "gap";
            }
            return clsName;

        },
        changeCurrDate(val) {
            console.log('changeCurrDate', this.currDate);
            this.setDatePlit();
        },
        setDatePlit() {
            this.dateSplit = [];
            this.dateSplit.push(this.currDate.getFullYear());
            this.dateSplit.push(this.currDate.getMonth() + 1);

            this.setDays();
        },
        setDays() {
            this.rangeDate = [];
            // 获取本月第一天
            this.rangeDate.push(this.dateSplit.join('-') + '-01 00:00:00');
            // 获取本月最后一天
            let ld = this.$global.getLastDay(this.dateSplit[0], this.dateSplit[1]);
            this.rangeDate.push(this.dateSplit.join('-') + '-' + ld + ' 23:59:59');
            console.log('this.rangeDate', this.rangeDate)
            // 计算
            this.daysData = [];
            for (let i = 1; i <= ld; i++) {
                let week = new Date(this.dateSplit.join('-') + '-' + i).getDay();
                let j = i < 10 ? ('0' + i) : i;
                let obj = {
                    "data": this.dateSplit.join('-') + '-' + j,
                    "dd": j,
                    "week": week
                }
                this.daysData.push(obj);
            }
            // 获取员工工时数据
            this.getList();
        },
        async getList(match = {}) {
            let groupId = { "userId": "$userId" };
            match = _.merge({ startdate: { $gte: new Date(this.rangeDate[0]).getTime() }, enddate: { $lte: new Date(this.rangeDate[1]).getTime() } }, match);
            let condition = {
                type: 'groupList',
                collectionName: 'timeBlock',
                data: match,
                distinct: "userId",
                aggregate: [
                    { "$match": match },
                    {
                        "$group": {
                            "_id": groupId, // 按字段分组
                            "id": { "$first": "$id" },
                            "userId": { $first: "$userId" },
                            "startdate": { "$first": "$startdate" },
                            "enddate": { "$first": "$enddate" },
                            "total": { $sum: 1 },
                            "lists": { "$push": "$$ROOT" }
                        }
                    },
                    {
                        $lookup: {
                            from: "employee",
                            localField: "userId",
                            foreignField: "id",
                            as: "user"
                        }
                    },
                    {
                        $unwind: { // 拆分子数组
                            path: "$user",
                            preserveNullAndEmptyArrays: true // 空的数组也拆分
                        }
                    },
                    {
                        $addFields: { name: "$user.e_name" }
                    },
                    { "$sort": { "startdate": 1 } }
                ]
            };
            let result = await this.$axios.$post('mock/db', { data: condition });
            this.total = result.total;
            this.tableData = result.list.map(item => {
                let obj = {
                    name: item.name,
                    totalTime: this.calTotalTime(item.lists, 'totalTime'),
                    lists: this.calTotalTime(item.lists, 'lists')
                }
                return obj;
            });
            //console.log('tableData', this.tableData);
        },
        calTotalTime(list, key) {
            let obj = {
                totalTime: 0,
                lists: []
            }
            //console.log('calTotalTime', list)
            list.forEach(item => {
                obj.lists = _.concat(obj.lists, item.content);
                item.content.forEach(ls => {
                    obj.totalTime += this.$global.getAllTimes(ls.list);
                })
            })
            return obj[key];
        },
    },
    mounted() {
        this.setDatePlit();
    }
}
</script>

<style lang="scss" scoped>
$gapColor: #d1daef;
.work-container {
    margin: 15px;
    border: 1px solid #d0d3d8;
    background-color: #fff;
    min-height: 300px;
    padding: 20px;
    .header {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid $gapColor;
        padding-bottom: 10px;
        > div {
            display: flex;
            align-items: center;
        }
    }
    .tables {
        padding: 0;
        /deep/ .el-table {
            th,
            td {
                padding: 0;
                border-right: 1px solid #eee;
                border-bottom: 1px solid $gapColor;
                color: #444;
                &.has-gutter {
                    display: table-cell !important;
                }
                &.gap {
                    border-right: 1px solid $gapColor;
                }
                .cell {
                    padding: 5px;
                    position: relative;
                    overflow: unset;
                    .times {
                        padding: 0;
                        transform: scale(0.8);
                    }
                    .cp {
                        height: 4px;
                        background-color: #ddd;
                        position: absolute;
                        left: 4px;
                        right: 4px;
                        bottom: -3px;
                        > div {
                            display: block;
                            height: 4px;
                            background-color: #8accc5;
                        }
                    }
                    //line-height: 13px;
                    > div {
                        line-height: 13px;
                        padding: 0;
                        box-sizing: border-box;
                        &.week-name {
                            transform: scale(0.85);
                            color: #a7b8ea;
                        }
                    }
                }
            }

            .header-list {
                display: flex;
                border: 1px solid #eee;
                border-width: 0 1px;
                width: 380px;
                > li {
                    width: 14.285%;
                    display: flex;
                    justify-content: center;
                    > div {
                        line-height: 20px;
                        text-align: center;
                    }
                }
            }
        }
    }
    .pages {
        padding: 15px 0;
        display: flex;
        justify-content: space-between;
    }
}
</style>
