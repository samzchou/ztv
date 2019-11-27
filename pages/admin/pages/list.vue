<template>
    <section class="formlist-container">
        <div class="forms">
            <div class="left">
                <div class="title">页面列表</div>
            </div>
            <div class="right">
                <search-input :visible.sync="searchShow" :value="searchKey" placeholder="关键字查询" size="mini" width="150px" @change="changeKey" />
                <el-button type="text" icon="el-icon-user" @click="addNew" style="margin-left:10px;">新增页面</el-button>
            </div>
        </div>
        <div class="tables">
            <el-table size="mini" v-loading="listLoading" :data="listData.slice((query.page-1)*query.size, query.page*query.size)" stripe border highlight-current-row fit max-height="500" style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.$index+( query.page - 1) * query.size + 1}} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="页面ID" width="80" />
                <el-table-column prop="page_name" label="页面名称" />
                <el-table-column prop="content" label="数据结构" width="450">
                    <template slot-scope="scope">
                        <span>{{getCode(scope.row.content)}}</span>
                        <el-button type="text" @click="showCode(scope.row.content)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="更新者" width="120" />
                <el-table-column prop="create_date" label="最后更新" width="150">
                    <template slot-scope="scope">
                        <span>{{getDate(scope.row.create_date)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" align="center" width="130">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" icon="el-icon-edit" @click="editItem(scope.row)">编辑
                        </el-button>
                        <el-button type="text" size="mini" icon="el-icon-remove" @click="removeItem(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages">
            <el-pagination size="mini" :total="total" :current-page="query.page" :page-sizes="[20, 30, 50, 100]" @size-change="handleSizeChange" @current-change="currentChange" layout="total, sizes, prev, pager, next, jumper" />
        </div>

        <el-dialog title="数据代码" class="code-dialog" :visible.sync="dialogVisible" :close-on-click-modal="false" append-to-body width="65%">
            <el-scrollbar class="scrollbar">
                <client-only>
                    <codemirror ref="myCm" class='area' v-model="formCode" :options="codeOption" />
                </client-only>
            </el-scrollbar>
        </el-dialog>
    </section>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import searchInput from '~/components/searchInput';
export default {
    components: {
        searchInput
    },
    data() {
        return {
            searchShow: false,
            searchKey: '',
            listLoading: false,
            sourceData: [],
            listData: [],
            total: 0,
            query: {
                page: 1,
                size: 30
            },
            drawerShow: false,
            editPage: null,
            formCode: {},
            dialogVisible: false,
            codeOption: {
                tabSize: 4,
                lineNumbers: true,
                line: true,
                lineWrapping: true,
                mode: { name: 'javascript', json: true },
                theme: 'eclipse',
                styleActiveLine: true,
                readOnly: true
            },
        }
    },
    methods: {
        ...mapMutations('pages', ['UPDATE_PAGES', 'CLEAR_PAGES']),
        showCode(code) {
            this.dialogVisible = true;
            this.formCode = JSON.stringify(code, null, 4);
        },
        getDate(date) {
            return moment(date).format('YYYY-MM-DD hh:mm:ss');
        },
        getCode(code) {
            code = JSON.stringify(code);
            return code.substring(0, 50) + '...';
        },
        changeKey(val) {
            this.searchKey = val;
            let params = {
                "page_name": { $regex: val }
            };
            this.getList(params);
        },
        addNew() {
            this.CLEAR_PAGES(true);
            window.location.href = '/admin/pages/addNew';
        },
        async editItem(item) {
            item.content.id = item.id;
            let condition = {
                type: 'getData',
                collectionName: 'formList',
                notNotice: true,
                data: { id: item.content.formid }
            };
            let res = await this.$axios.$post('mock/db', { data: condition });
            if (!res) {
                this.$confirm('无法获取表单数据，可能数据被损坏?', '提示', {
                    confirmButtonText: '重新编辑',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.UPDATE_PAGES(item.content);
                    window.location.href = '/admin/pages/addNew';
                }).catch(() => { });
                return;
            }
            item.content.content = res.content;

            this.UPDATE_PAGES(item.content);
            window.location.href = '/admin/pages/addNew';
        },
        removeItem(row) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let condition = {
                    type: 'removeData',
                    collectionName: 'pageList',
                    data: { id: row.id }
                };
                this.$axios.$post('mock/db', { data: condition }).then(result => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    let index = _.findIndex(this.listData, { id: row.id });
                    this.listData.splice(index, 1);
                    this.total--;
                });
            }).catch();
        },
        currentChange(page) {
            this.query.page = page;
        },
        handleSizeChange(size) {
            this.query.page = 1;
            this.query.size = size;
        },
        async getList(match = {}) {
            this.listLoading = true;
            let condition = {
                type: 'aggregate',
                collectionName: 'pageList',
                data: match,
                aggregate: [
                    { "$match": match },
                    {
                        $lookup: {
                            from: "employee",
                            localField: "create_eid",
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
                        $addFields: { userName: "$user.e_name" }
                    },
                    { $sort: { id: 1 } }
                ]
            };
            let result = await this.$axios.$post('mock/db', { data: condition });
            /* console.log('getList', result);
            debugger */
            this.total = result.total;
            this.sourceData = result.list;
            this.listData = [...result.list];
            this.listLoading = false;
            this.editPage = null;
        },
    },
    mounted() {
        this.getList();
    },
    layout: "admin"
}
</script>

<style lang="scss" scoped>
.formlist-container {
    background-color: #fff;
    border: 1px solid #ddd;
    margin: 15px;
    padding: 25px;
    .forms {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div {
            display: flex;
            align-items: center;
        }
    }
    .pages {
        padding: 10px 0;
        display: flex;
        justify-content: flex-end;
    }
}
/deep/ .el-drawer {
    height: 100%;
    .el-drawer__header {
        margin-bottom: 0;
        padding: 10px 15px;
        border-bottom: 1px solid #ddd;
        > :first-child {
            font-size: 16px;
        }
    }
    .el-drawer__body {
        padding: 20px 20px 0 0;
        box-sizing: border-box;
        height: calc(100% - 50px);

        .el-tabs {
            height: 100%;
            .el-tabs__content {
                //width: 500px;
                height: 100%;
                overflow: hidden;
                .el-tab-pane {
                    height: 100%;
                    overflow: hidden;
                }
            }
        }
    }
}
.code-dialog {
    /deep/ .el-dialog__body {
        height: 500px;
        overflow: hidden;
        padding: 0;
        .scrollbar {
            height: 100%;
            /deep/ .el-scrollbar__wrap {
                overflow-x: hidden;
                .el-menu--collapse {
                    width: auto;
                }
            }
        }
        .CodeMirror {
            flex-grow: 1;
            height: auto;
        }
    }
}
</style>

