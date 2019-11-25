<template>
    <section class="canlendar-container">
        <div v-if="isInit">
            <div class="header">
                <el-date-picker size="mini" v-model="currYear" type="year" value-format="yyyy" placeholder="选择年" @change="setYear()" style="width:150px;" />
                <div class="alc">
                    <span>休息/节假日总数：{{holidayTotal}} 天</span>
                    <span><em class="type_1" />休息日</span>
                    <span><em class="type_2" />节假日</span>
                </div>
                <div>
                    <el-button size="small" type="primary" v-if="lists.length" @click="saveData" :icon="saveLoading?'el-icon-loading':''" :disabled="saveLoading">保存休假日</el-button>
                </div>
            </div>
            <div class="error" v-if="error">对不起，无法计算当年的休假日，请核查年数！</div>
            <div v-else>
                <schedule-canlendar ref="canlendar" :holidays="lists" :year="currYear" @changeType="changeType" />
            </div>
        </div>
        <div v-else class="lists">
            <div :loading="true"><i class="el-icon-loading" />系统正在处理{{currYear}}年休假日数据... </div>
        </div>
    </section>
</template>

<script>
import scheduleCanlendar from '~/components/schedule';
export default {
    components: {
        scheduleCanlendar
    },
    data: () => ({
        currYear: new Date().getFullYear().toString(),
        holidayData: [],
        isInit: false,
        error: 0,
        lists: [],
        holidayTotal: 0,
        saveLoading: false,
    }),
    methods: {
        // 获取全年休假日总数
        getAllHolidayLen() {
            let len = 0;
            for (let i = 0; i < this.lists.length; i++) {
                len += Object.keys(this.lists[i]).length;
            }
            return len;
        },
        setYear(year) {
            console.log('setYear', this.currYear);
            this.isInit = false;
            this.getHoliday();
        },
        changeType(item) {
            let key = item.obj.day < 10 ? '0' + item.obj.day : String(item.obj.day);
            this.lists[item.index][key] = String(item.obj.dateType);
            if (item.obj.dateType == '0') {
                this.holidayTotal--;
            } else {
                this.holidayTotal++;
            }
        },
        saveData() {
            this.saveLoading = true;
            let data = { "year": String(this.currYear), "lists": [...this.lists] };
            let holidayData = [...this.holidayData];
            if (this.holidayData.length) {
                let index = _.findIndex(this.holidayData, { "year": String(this.currYear) });
                this.$set(holidayData, index, data);
            } else {
                holidayData = [data];
            }
            console.log('holidayData', data);

            const condition = {
                type: 'writeFile',
                path: 'holiday.json',
                data: JSON.stringify(holidayData)
            }
            this.$axios.$post('mock/files', { data: condition }).then(res => {
                //console.log('saveData', res);
                if (res) {
                    this.$message.info("已保存");
                    this.saveLoading = false;
                }
            })
        },
        /**
         * 如果本地没有数据则从第三方获取数据
         * 0 代表工作日，1 代表休息日，2 代表节假日
         */
        async getHoliday() {
            this.lists = [];
            this.error = 0;

            const condition = {
                type: 'openFile',
                path: 'holiday.json'
            }
            let res = await this.$axios.$post('mock/files', { data: condition });
            if (res) {
                this.holidayData = JSON.parse(res);
                let obj = _.find(this.holidayData, { "year": String(this.currYear) });
                if (obj) {
                    this.lists = obj.lists;
                    console.log('this.lists', this.lists);
                }
            } else {
                for (let i = 1; i <= 12; i++) {
                    let k = this.currYear + String(i < 10 ? '0' + i : i);
                    let res = await this.$axios.$get('http://www.easybots.cn/api/holiday.php?m=' + k);
                    //console.log('getHoliday=>' + k, res[k])
                    if (!res[k]) {
                        this.error++;
                    } else {
                        this.lists.push(res[k]);
                    }
                }
            }
            this.holidayTotal = this.getAllHolidayLen();
            setTimeout(() => {
                this.isInit = true;
            }, 1000)

        }
    },
    mounted() {
        this.getHoliday();
    },
    layout: "admin"
}
</script>

<style lang="scss" scoped>
.canlendar-container {
    overflow-y: auto;
    height: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 15px;
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .alc {
            display: flex;
            align-items: center;
            > span {
                margin: 0 15px;
                display: flex;
                align-items: center;
                em {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    margin-right: 5px;
                    &.type_1 {
                        background-color: $c-rest;
                    }
                    &.type_2 {
                        background-color: $c-holiday;
                    }
                }
            }
        }
    }
    .error {
        font-size: 16px;
        color: red;
    }
    .lists {
        padding: 0 15px;
        > div {
            padding: 15px 0;
            border-bottom: 1px solid #ddd;
        }
        > ul {
            li {
                display: flex;
                align-items: center;
                height: 40px;
            }
        }
    }
}
</style>