<template>
    <section class="add-container">
        <div class="content">
            <!--头部控制菜单-->
            <div class="header">
                <div class="title">
                    <span>编辑页面</span>
                    <el-button icon="el-icon-back" type="text" @click="$router.push('/admin/pages/list')">返回页面列表</el-button>
                </div>
                <div>
                    <el-button class="icon-link" v-if="!codeVisible" icon="el-icon-plus" @click="createNew(true)">新建</el-button>
                    <el-button class="icon-link" v-if="!codeVisible" icon="el-icon-delete" @click="createNew(false)">清除</el-button>
                    <el-button class="icon-link" v-if="!codeVisible" icon="el-icon-document" @click="codeVisible=true">代码</el-button>
                    <el-button class="icon-link" v-if="codeVisible" icon="el-icon-s-platform" @click="backForm">返回视图</el-button>
                    <el-button class="icon-link" v-if="!codeVisible" icon="el-icon-view" @click="dialogVisible=true">预览</el-button>
                    <el-button class="icon-link" v-if="!codeVisible" icon="el-icon-folder-opened" @click="saveMyPage">保存</el-button>
                </div>
            </div>
            <!--显示代码-->
            <div class="code-container" v-if="codeVisible">
                <el-scrollbar class="scrollbar">
                    <client-only>
                        <codemirror ref="myCm" class='area' v-model="pageCode" :options="codeOption" @input="onCmCodeChange" />
                    </client-only>
                </el-scrollbar>
            </div>
            <!--主体画布-->
            <div class="draw-container" v-else>
                <el-scrollbar class="scrollbar">
                    <client-only>
                        <page-data :data="pageForm" :isRelease="true" :listParam="{}" />
                    </client-only>
                </el-scrollbar>
            </div>
        </div>
        <!--右側側滑面板 新增表单-->
        <slider-panel width="350px" title="页面编辑" position="right" :visible.sync="slideShow">
            <el-tabs v-model="activeTab" @tab-click="tabsClick">
                <el-tab-pane label="表单" name="attrForm">
                    <div class="form-container">
                        <div class="filter">
                            <el-input size="mini" placeholder="输入关键字进行过滤" v-model="filterText" />
                        </div>
                        <div class="content">
                            <el-scrollbar class="scrollbar" ref="scrollTree">
                                <el-table size="mini" ref="multipleTable" :data="tableList.filter(data => !filterText || data.form_name.toLowerCase().includes(filterText.toLowerCase()))" :show-header="false" highlight-current-row style="width: 100%">
                                    <el-table-column label="表单名称">
                                        <template slot-scope="scope">
                                            <div :class="{'active':scope.row.active}" @click="rowClick(scope.row)">
                                                <el-checkbox v-model="scope.row.active" />
                                                <span>{{ scope.row.form_name }}</span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-scrollbar>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="页面属性" name="attrPage">
                    <div class="row-container">
                        <el-scrollbar class="scrollbar" ref="scrollProp">
                            <el-form size="mini" :model="rowForm" label-position="top" ref="rowForm">
                                <el-form-item label="页面标题名称" prop="title">
                                    <el-input v-model="rowForm.title" @input="setFrom" />
                                </el-form-item>
                                <el-form-item label="展示方式(默认为表单)" prop="showType">
                                    <el-radio-group v-model="rowForm.showType" @change="setFrom">
                                        <el-radio :label="0">表单方式</el-radio>
                                        <el-radio :label="1">报表方式</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="是否支持条件筛选" prop="filter">
                                    <el-switch v-model="rowForm.filter" active-color="#13ce66" inactive-color="#CCC" @change="setFilter" />
                                </el-form-item>
                                <el-form-item label="筛选字段" prop="filterFields" v-if="rowForm.filter">
                                    <el-table size="mini" ref="filterTable" :data="pageForm.content.itemList" :show-header="false" highlight-current-row style="width: 100%" @select="selectFields">
                                        <el-table-column type="selection" width="50" align="center" />
                                        <el-table-column label="字段名称">
                                            <template slot-scope="scope">
                                                <span>{{scope.row.label}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-form-item>
                            </el-form>
                        </el-scrollbar>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </slider-panel>
    </section>
</template>

<script>
import {
    mapState, mapMutations, mapActions
} from 'vuex';
import samPage from '~/components/page';
import pageData from '~/components/page/data';
import sliderPanel from '~/components/sliderPanel';
export default {
    components: {
        sliderPanel, samPage, pageData
    },
    computed: {
        ...mapState('pages', ['formList', 'pageForm']),
    },
    watch: {
        // 从列表进入编辑后更新
        formList: {
            handler(list) {
                this.tableList = _.cloneDeep(list).map(item => {
                    if (item.id == this.pageForm.formid) {
                        item.active = true;
                    }
                    return item;
                });
                this.$nextTick(() => {
                    this.INIT_PAGES();
                })
            },
            immediate: true
        },
        // 选取右侧表单后更新
        pageForm: {
            handler(obj) {
                this.setPageData();
            },
            immediate: true
        }
    },
    data: () => ({
        checked: true,
        slideShow: true,
        filterText: '',
        tableList: [],
        pageData: {},
        activeTab: 'attrForm',
        rowForm: {
            filterFields: []
        },
        codeVisible: false,
        codeOption: {
            tabSize: 4,
            lineNumbers: true,
            line: true,
            lineWrapping: true,
            mode: { name: 'javascript', json: true },
            theme: 'eclipse',
            styleActiveLine: true,
        },
        pageCode: "",
        dialogVisible: false,
        saveLoading: false,
    }),
    methods: {
        ...mapActions('pages', ['ASYNC_GETFORMS']),
        ...mapMutations('pages', ['INIT_PAGES', 'UPDATE_PAGES', 'CLEAR_PAGES']),
        // 保存页面
        saveMyPage() {
            this.saveLoading = true;
            let pageForm = Object.assign({}, this.pageForm);
            let condition = {
                type: 'addData',
                collectionName: 'pageList',
                data: {
                    "create_eid": this.$store.state.user.id,
                    "page_name": pageForm.title,
                    "content": { ...pageForm }
                }
            };
            if (pageForm.id) {
                condition.type = "updateData";
            }
            delete condition.data.content.content;
            //console.log('saveMyPage', condition);
            //return;
            this.$axios.$post('mock/db', { data: condition }).then(result => {
                //console.log('result', result);
                this.$message.success(pageForm.id ? "编辑成功" : "新增成功");
                pageForm.id = result.id;
                this.saveLoading = false;
                this.UPDATE_PAGES({ ...pageForm })
            });
        },
        backForm() {
            // 校验JSON格式是否正确
            let code = this.$refs.myCm.value;
            if (this.$global.isJSON(code)) {
                code = JSON.parse(code);
                this.UPDATE_PAGES({ ...code });
                this.codeVisible = false;
            } else {
                this.$message.error("代码格式有错，请核查！");
            }
        },

        async rowClick(row) {
            let pages = Object.assign({}, this.pageForm);
            let actived = !row.active;
            // 取出当前被勾选中的
            this.tableList = this.tableList.map(item => {
                item.active = false;
                if (item.id == row.id) {
                    item.active = actived;
                }
                return item;
            });

            // 如果取消了勾选
            if (!actived) {
                pages.title = "空页面";
                pages.content = {};
                delete pages.formid;
            } else {
                // 重新获取表单更新后数据
                let conditon = {
                    type: 'getData',
                    collectionName: "formList",
                    data: { id: row.id },
                    column: { "content": 1 }
                }
                let res = await this.$axios.$post('mock/db', { data: conditon });
                //debugger
                if (res) {
                    pages.title = res.content.title || "我的页面";
                    pages.content = res.content;
                    pages.formid = row.id;
                } else {
                    this.$alert("无法获取该表单数据");
                    return;
                }
            }
            this.UPDATE_PAGES({ ...pages });
        },
        toggleFilter(rows) {
            if (rows && rows.length) {
                rows.forEach(row => {
                    this.$refs.filterTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.filterTable.clearSelection();
            }
        },
        selectFields(rows) {
            this.rowForm.filterFields = rows.map(item => {
                return item.name;
            });
            this.setFrom();
        },
        setFrom() {
            let pageForm = Object.assign({}, this.pageForm, this.rowForm);
            //console.log('setFrom', pageForm);
            this.UPDATE_PAGES({ ...pageForm });
        },
        setFilter(val) {
            if (!val) {
                this.rowForm.filterFields && delete this.rowForm.filterFields;
            } else {
                this.rowForm.filterFields = [];
            }
            this.setFrom();
        },
        setPageData() {
            let pageForm = Object.assign({}, this.pageForm);
            this.pageCode = JSON.stringify({ ...pageForm }, null, 4);
            this.rowForm = { ...pageForm };
        },
        // 代码发生改变
        onCmCodeChange(code) {
            //console.log('this is new code', code);
        },
        // 新建表单
        createNew(flag) {
            if (!_.isEmpty(this.pageForm.content)) {
                this.$confirm('将清除有数据，确定?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.clearPages(flag);
                }).catch(() => { });
            } else {
                this.clearPages(flag);
            }
        },
        clearPages(flag) {
            this.CLEAR_PAGES(flag);
            this.slideShow = true;
        },
        // tab标签改变
        tabsClick(obj) {
            //console.log('tabsClick', obj);
            this.$nextTick(() => {
                if (obj.name == 'attrPage') {
                    if (this.rowForm.filterFields && this.$refs.filterTable) {
                        let rows = this.pageForm.content.itemList.filter(item => {
                            return this.rowForm.filterFields.includes(item.name);
                        });
                        this.toggleFilter(rows);
                    }
                }
            })
        },
    },
    created() {
        this.ASYNC_GETFORMS();
    },
    beforeDestroy() {
        this.$storage.session.remove('adminPages');
    },
    layout: "admin"
}
</script>

<style lang="scss" scoped>
.add-container {
    display: flex;
    height: 100%;
    .scrollbar {
        height: 100%;
        /deep/ .el-scrollbar__wrap {
            overflow-x: hidden;
            .el-menu--collapse {
                width: auto;
            }
        }
        /deep/ .el-scrollbar__bar {
            z-index: 2;
        }
    }
    > div {
        &.content {
            flex: 1;
            height: 100%;
            box-sizing: border-box;
            overflow: hidden;
            .header {
                box-sizing: border-box;
                padding: 0 15px;
                height: 36px;
                background-color: #eee;
                border-bottom: 1px solid #ddd;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .title {
                    font-size: 16px;
                }
            }
            .draw-container {
                height: calc(100% - 40px);
                overflow: hidden;
                background-color: #fff;
            }
            .code-container {
                height: calc(100% - 40px);
                overflow: hidden;
                /deep/ .CodeMirror {
                    flex-grow: 1;
                    height: auto;
                }
            }
        }
    }
    /deep/ .slide-panel {
        height: 100%;
        .slide-panel__header {
            background-color: #bccad8;
            height: 36px;
            box-sizing: border-box;
            > i {
                color: #333;
            }
        }
        .slide-panel__body {
            overflow: hidden;
            background-color: #edf4fb;
            .el-tabs {
                height: 100%;
                .el-tabs__header {
                    margin: 0;
                    height: 40px;
                    .el-tabs__item {
                        padding: 0 20px;
                    }
                }
                .el-tabs__content {
                    height: calc(100% - 40px);
                    .el-tab-pane {
                        height: 100%;
                        > div {
                            height: 100%;
                            &.form-container {
                                .filter {
                                    padding: 15px;
									box-sizing:border-box;
									height:60px;
                                }
								.content{
									height:calc(100% - 60px);
									overflow:hidden;
								}
								
                                .el-table {
                                    background-color: transparent;
                                    tr {
                                        background-color: transparent;
                                        cursor: default;
                                        user-select: none;
                                        td:hover {
                                            background-color: transparent;
                                        }
                                        .cell {
                                            padding-left: 15px;
                                            color: #666;
                                            > div {
                                                cursor: pointer;
                                                > span {
                                                    pointer-events: none;
                                                }
                                                > label {
                                                    pointer-events: none;
                                                    margin-right: 5px;
                                                }
                                                &.active {
                                                    color: #295be8;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            &.row-container {
                                padding: 15px 25px 0 25px;
                                box-sizing: border-box;
                                height: 100%;
                                overflow: hidden;
                                /deep/ .el-table {
                                    background-color: transparent;
                                    tr {
                                        background-color: transparent;
                                    }
                                }
                            }
                            &.component-content {
                                height: 100%;
                                overflow: hidden;
                            }
                        }
                    }
                }
            }
        }
    }
}
.sumlite-container {
    max-height: 500px;
    overflow: hidden;
}
</style>
