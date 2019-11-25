<template>
    <section class="index-container">
        <el-row :gutter="30" class="panel-group">
            <el-col :span="24/panelList.length" v-for="(panel,index) in panelList" :key="index">
                <div class="card-panel" @click="gopath(panel)">
                    <i :class="panel.icon" />
                    <div class="card-panelwrapper">
                        <h3>{{panel.label}}
                            <i class="el-icon-more" />
                        </h3>
                        <count-to :start-val="0" :end-val="panel.endVal" :duration="panel.duration" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="chart-times">
            <chart-worktimes />
        </div>
    </section>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import CountTo from 'vue-count-to';
import chartWorktimes from '~/components/chart/chartWorktimes';

export default {
    components: {
        CountTo, chartWorktimes
    },
    data: () => ({
        panelList: [],
        /* panelList: [
            { label: "员工数", "name": "userlist", path:"/userinfo/list", icon: "el-icon-user", color: "", endVal: 280, duration: 1200 },
            { label: "本周工时合计", "name": "userlist", path:"/work/time", icon: "el-icon-timer blue", endVal: 54000, duration: 1200 },
            { label: "我的代办事项", "name": "userlist", path:"/work/todo", icon: "el-icon-suitcase red", endVal: 20, duration: 3000 },
            { label: "信息中心", "name": "userlist", path:"/infomation", icon: "el-icon-chat-line-square orange", endVal: 130, duration: 3000 }
        ] */
    }),
    computed: {
        //...mapState(['weekArray', 'timeutilHeight', 'locakMinutes', 'editIndex', 'editBlock', 'isEditTime']),
        getToday() {
            return moment().format('llll');
        }
    },
    watch: {
        /* editBlock: {
            handler(obj) {
                if (obj && !_.isEmpty(obj) && this.isEditTime) {
                    this.editBlockInfo();
                } else {
                    this.showWindow = false;
                }
            },
            immediate: true
        } */
    },
    methods: {
        //...mapMutations(['UPDATE_EDITINGTIME']),
        gopath(obj) {
            console.log('path', obj);
            this.$router.push(obj.path);
        },

        // 获取已有的数据
        async getList() {
            /* this.timeData = null;
            this.blockList = [];
            let condition = {
                type: "getData",
                collectionName: "timeBlock",
                data: {
                    date: this.$global.calcData(this.weekDay).getTime(),
                    userId: this.$store.state.user.id
                }
            }
            let result = await this.$axios.$post('mock/db', { data: condition });
            if (result) {
                this.timeData = result;
                this.blockList = result.content;
                console.log('getList', this.blockList);
            } */
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/home';
</style>
