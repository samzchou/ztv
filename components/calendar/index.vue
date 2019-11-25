<template>
    <section class="calendar-container">
        <div class="title">
            <span @click="showIt">{{getDateStr}}</span>
        </div>
        <div ref="mycalendar" class="mycalendar" :class="{'show':showCalendar,'fixed':!isDropDown}" :style="itemStyle">
            <calendar :months="months" :value="value" lunar clean monFirst responsive @select="calendarChange" />
        </div>
    </section>
</template>

<script>
import calendar from './calendar';
import { holiday } from './holiday';
export default {
    name: "my-calendar",
    components: { calendar },
    props: {
        currValue: {
            type: Date,
            default: new Date()
        },
        isDropDown: {
            type: Boolean,
            dafault: false
        }
    },
    data: () => ({
        width: 350,
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        value: [2019, 10, 14],
        tileContent: holiday,
        showCalendar: false,
        position: {
            top: 100,
            left: 200
        }
    }),
    computed: {
        itemStyle() {
            return {
                top: this.position.top + 'px',
                left: this.position.left + 'px'
            };
        },
        getDateStr() {
            return this.value.join('-');
        }
    },
    watch: {
        currValue(val) {
            console.log('watch currValue', val);
            this.changeDate(val);
        }
    },
    methods: {
        showIt(evt) {
            let target = evt.target;
            let rect = target.getBoundingClientRect();
            this.position = {
                top: rect.top + 30,
                left: rect.left
            }
            this.showCalendar = true;
        },
        calendarChange(val) {
            this.value = val;
            this.showCalendar = false;
            console.log('calendarChange', val);
        },
        changeDate(date) {
            let currDay = moment(date).format('YYYY-MM-DD');
            this.value = currDay.split('-');
            //console.log('currDay', currDay.split('-'))
        }
    },
    created() {
        console.log('currValue', this.currValue);
        this.changeDate(this.currValue);
    },

    mounted() {
        this.$nextTick(() => {
            if (this.isDropDown) {
                document.body.append(this.$refs.mycalendar);
            }
        })
    },

};
</script>
<style lang="scss" scoped>
.calendar-container {
    .title {
        display: flex;
        justify-content: center;
        height: 25px;
        line-height: 25px;
        > span {
            cursor: pointer;
            padding: 0 10px;
            //border: 1px solid #ddd;
        }
    }
}
.mycalendar {
    z-index: 1000;
    top: 20px;
    visibility: hidden;
    &.fixed {
        visibility: visible;
        margin-top: 10px;
    }
    &.show {
        position: absolute;
        visibility: visible;
    }
}
</style>
