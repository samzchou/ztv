<template>
    <section class="msglist-container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="工作事项" name="first">
                <div class="btns">
                    <el-button size="small" type="primary">全部已读</el-button>
                    <el-button size="small" type="primary">删除</el-button>
                </div>
                <el-table size="small" :data="todoData" style="width: 100%">
                    <el-table-column type="index" label="序号" width="60" align="center" />
                    <el-table-column prop="name" label="已读" width="100">
                        <template slot-scope="scope">{{scope.row.isRead?'是':'否'}}</template>
                    </el-table-column>
                    <el-table-column label="处理事项">
                        <template slot-scope="scope">
                            {{setType(scope.row.wfType)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="fromName" label="来自" />
                    <el-table-column label="记录时间">
                        <template slot-scope="scope">
                            {{formatDate(scope.row.createDate)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="最后更新">
                        <template slot-scope="scope">
                            {{formatDate(scope.row.updateDate)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" type="text" icon="el-icon-document" @click="showDetail(scope.row)">查看详情</el-button>
                            <!-- <el-button size="small" type="text" icon="el-icon-document">详情</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pages">
                    <el-pagination size="mini" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[30, 50, 100, 200]" :page-size="query.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="query.total" />
                </div>
            </el-tab-pane>
            <el-tab-pane label="消息通知" name="second">暂无消息通知</el-tab-pane>
        </el-tabs>
        <!--消息内容-->
        <el-dialog title="事项详情" :visible.sync="dialogVisible" append-to-body :close-on-click-modal="false" width="600px">
            <my-msg :data="msgBox" :showList="false" />
        </el-dialog>
    </section>
</template>

<script>
import myMsg from '~/components/myMsg';
import WebSocket from '~/util/webSocket';
export default {
    components: {
        myMsg
    },
    data: () => ({
        socketIO: null,
        activeName: 'first',
        query: {
            page: 1,
            pagesize: 30,
            total: 0
        },
        todoData: [],
        dialogVisible: false,
        msgBox: null,
    }),
    methods: {
        showDetail(item) {
            this.msgBox = item;
            this.dialogVisible = true;
        },
        formatDate(datetime, dis = 'YYYY-MM-DD hh:mm:ss') {
            if (datetime) {
                return moment(datetime).format(dis);
            }
            return "";
        },
        setType(val) {
            let type = _.find(this.$store.state.wfType, { "value": val });
            return type.label || "";
        },
        handleSizeChange(size) {
            this.query.page = 1;
            this.query.pagesize = size;
            this.getTodo();
        },
        handleCurrentChange(page) {
            this.query.page = page;
            this.getTodo();
        },
        async getTodo(math = {}) {
            const condition = {
                type: "listData",
                collectionName: "inbox",
                notNotice: true,
                data: _.merge({ touserId: { $in: [this.$store.state.user.id] } }, math),
                aggregate: [
                    {
                        $lookup: {
                            from: "employee",
                            localField: "fromuserId",
                            foreignField: "id",
                            as: "employee"
                        }
                    },
                    {
                        $unwind: { // 拆分子数组
                            path: "$employee",
                            preserveNullAndEmptyArrays: true // 空的数组也拆分
                        }
                    },
                    {
                        $addFields: { fromName: "$employee.e_name" }
                    },
                    { $sort: { id: 1 } },
                    { $skip: (this.query.page - 1) * this.query.pagesize },
                    { $limit: this.query.pagesize }
                ]
            };
            const result = await this.$axios.$post("mock/db", { data: condition }, { nothold: true });
            this.query.total = result.total;
            this.todoData = result.list;
            console.log('getTodo', result)
        },
        initWebSocket() {
            this.socketIO = new WebSocket();
            this.socketIO.onmessage(data => {
                if (!['applyFeedBack'].includes(data.event) && (data.obj.touserId.includes(this.$store.state.user.id) || !data.obj.touserId.length)) {
                    this.getTodo();
                }
            })
        },
    },
    mounted() {
        this.initWebSocket();
        this.getTodo();
    },
    beforeDestroy() {
        this.socketIO = null;
    }
}
</script>
<style lang="scss" scoped>
.msglist-container {
    margin: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    min-height: 500px;
    padding: 10px 30px;
    .btns {
        padding-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .pages {
        padding: 15px 0;
        display: flex;
        justify-content: flex-end;
    }
}
</style>