<template>
    <section class="statistical-container">
        <div class="header">
            <div class="dates">
                <el-button size="mini" icon="el-icon-d-arrow-left" title="上月" />
                <el-date-picker size="mini" v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                />
                <el-button size="mini" icon="el-icon-d-arrow-right" title="下月" />
            </div>
            <div class="btns">btns</div>
        </div>
        <div class="tables">
            <el-table size="mini" :data="tableData">
                <!-- <el-table-column prop="title" label="工作主题" width="300"></el-table-column> -->
                <el-table-column width="80">
                    <span>工时合计</span>
                </el-table-column>
                <el-table-column width="80">
                    <template slot-scope="scope">
                        <span>{{getListsTimes(scope.row.totalTimes)}}</span>
                    </template>
                </el-table-column>
                <el-table-column v-for="(day,index) in weekList" :key="index">
                    <template slot="header" slot-scope="scope">
                        <ul class="header-list">
                            <li v-for="(canledar,idx) in weekList[index]['canledar']" :key="idx" v-html="getCanledar(canledar, idx)"></li>
                        </ul>
                    </template>
                    <template slot-scope="scope">
                        <ul class="header-list">
                            <li v-for="(list,idx) in scope.row.list" :key="idx">
                                <div>{{getAllTimes(list)}}</div>
                            </li>
                        </ul>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="total">
            <ul>
                <li>
                    <div class="label">工时总计</div>
                    <div>{{getListsTimes(myAllTimes)}}</div>
                </li>
                <li>
                    <div class="label">已计划</div>
                    <div>14:30</div>
                </li>
            </ul>

        </div>
        <div style="width:380px;">
            <mycalendar :currValue="weekDay" isDropDown />
        </div>
    </section>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import mycalendar from '~/components/calendar';

export default {
    components: { mycalendar },
    computed: {
        ...mapState(['weekArray', 'workType', 'workProject']),
    },
    data: () => ({
        value1: "",
        weekDay: new Date(),
        weekList: [],
        tableData: [],
        myAllTimes: 0,
        showCalendar: false
    }),
    methods: {

        getListsTimes(times) {
            //return 100;
            return this.$global.ChangeHourMinutestr(times);
        },
        getAllTimes(list, flag) {
            console.log('list', list);
            let allTimes = 0;
            list.forEach(item => {
                let startMin = this.$global.changeMyTimeToMin(item.startTime); //obj.startTime.split(':')[0];
                let endMin = this.$global.changeMyTimeToMin(item.endTime);
                allTimes += (endMin - startMin);
                //console.log('allTimes', allTimes);
            });
            if (flag) {
                return allTimes;
            }
            return this.$global.ChangeHourMinutestr(allTimes);
        },
        getCanledar(date, index) {
            return '<div>' + moment(date).format('MM-DD') + '<br/>' + this.weekArray[index] + '</div>';
        },
        setCanledar(date) {
            let list = [];
            let timesStamp = date.getTime();
            let currenDay = date.getDay();
            for (let i = 0; i < 7; i++) {
                let day = timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7);
                list.push(new Date(day))
            }
            return list;
        },
        async getList() {
            this.timeData = null;
            this.myAllTimes = 0;
            let condition = {
                type: "listData",
                collectionName: "timeBlock",
                data: {
                    date: this.weekDay.getTime(),
                    userId: this.$store.state.user.id
                }
            }
            let result = await this.$axios.$post('mock/db', { data: condition });
            console.log('result', result);
            if (result) {
                //this.timeData = result;
                this.weekList = result.list.map(item => {
                    item.canledar = this.setCanledar(new Date(item.date));
                    return item;
                });
                this.tableData = result.list.map(item => {
                    let obj = { totalTimes: 0, list: [] };
                    if (item.content && item.content.length) {
                        obj.list = item.content;
                        item.content.forEach(block => {
                            if (block.length) {
                                obj.totalTimes += this.getAllTimes(block, true);
                            }
                        })
                    }
                    this.myAllTimes += obj.totalTimes;
                    return obj; //item.content;
                });
                console.log('tableData', this.tableData);
                //console.log('getList', this.weekList);
            }
        }
    },
    mounted() {
        var weekList = this.$storage.session.get('weekList');
        this.weekDay = this.$global.calcData(new Date(weekList[0]['date']));
        console.log('weekList', this.weekList);
        this.getList();
    }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
