<template>
    <div class="week-select">
        <div v-if="!showMonth">
            <el-button-group v-if="showIcon">
                <el-button :size="size" icon="el-icon-back" :type="isCurrWeek === -1 ? 'primary' : ''" title="上周" @click="setWeek(-7)" />
                <el-button :size="size" icon="el-icon-right" :type="isCurrWeek === 1 ? 'primary' : ''" title="下周" @click="setWeek(7)" />
            </el-button-group>

            <el-date-picker v-model="currDay" :size="size" type="week" :clearable="false" :picker-options="{ firstDayOfWeek: 1 }" format="yyyy年 第 WW 周" placeholder="选择周" @change="setSelectWeek" style="width:170px" />
            <!-- <el-button :size="size" :type="isCurrWeek === 0 ? 'primary' : ''" icon="el-icon-news" title="本周" @click="setWeek(0, true)">本周</el-button> -->
        </div>
        <div v-else class="canlan" style="margin-left:10px">
            <el-date-picker :size="size" v-model="currtMonth" type="month" format="yyyy年MM月" placeholder="选择月" @change="setSelectMonth" style="width:150px" />
        </div>
    </div>
</template>

<script>
export default {
    name: "week-select",
    props: {
        showMonth: {
            type: Boolean,
            default: false
        },
        showWeek: {
            type: Boolean,
            default: true
        },
        showIcon: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: "small"
        },
        startTime: Number,
        weekToDay: Number, // 本周第一天
    },
    watch: {
        weekToDay(val) {
            this.currDay = val;
        }
    },
    data: () => ({
        isCurrWeek: 0,
        currDay: Date.now(),
        currtMonth: Date.now(),
    }),
    methods: {
        /**
         * 设置一周（从周一开始）
         * @params val:number 加减值; thisWeek:boolean 是否本周
         */
        setWeek(val, thisWeek) {
            this.isCurrWeek = val;
            const date = new Date(this.currDay);
            if (!thisWeek) {
                const dp = date.setDate(date.getDate() + val);
                this.currDay = new Date(dp).getTime();
            } else {
                this.currDay = this.startTime;
            }
            this.currtMonth = this.startTime;
            console.log(this.currDay, this.currtMonth)
        },
        setSelectWeek(date) {
            console.log('setSelectWeek', date);
            this.currDay = date.getTime();
            console.log('currDay', this.currDay);
            //this.$parent.setCurrWeek(date.getTime())
        },
        setSelectMonth(date) {
            console.log('setSelectMonth', date);
            this.currtMonth = date.getTime();
            console.log('currtMonth', this.currtMonth)

        }
    },
}
</script>

<style lang="scss" scoped>
.week-select {
    display: flex;
    align-items: center;
}
</style>