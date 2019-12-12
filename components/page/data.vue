<template>
    <section class="sam-page">
        <div class="header">
            <div class="title"><i class="el-icon-price-tag" />{{formData.title}}</div>
            <div>
                <el-button class="icon-link" icon="el-icon-plus" @click="addNewList" v-show="!isAdd && viewAll">新增数据</el-button>
                <el-button class="icon-link" icon="el-icon-finished" @click="filterVisible=!filterVisible" v-if="formData.filter">筛选</el-button>
            </div>
            <div v-show="isAdd">
                <el-button class="icon-link" icon="el-icon-back" @click="backList(false)">返回列表</el-button>
            </div>
        </div>
        <!--表单-->
        <div class="forms" v-if="isAdd">
            <sam-form ref="samform" :data="formData.content" :isEdit="false" v-model="formValue" />
            <div class="btns">
                <el-button size="small" type="primary" @click="submitForms(true)" :disabled="submitLoading" :icon="submitLoading?'el-loading':''">提交保存</el-button>
                <el-button size="small" @click="submitForms(false)">重置表单</el-button>
                <el-button size="small" @click="backList(true)">返回列表</el-button>
            </div>
        </div>
        <div v-else class="table-container">
            <!--筛选-->
            <div class="filter" v-show="filterVisible">
                <!-- <div>{{filterForm}}</div> -->
                <div v-if="filterForm && filterForm.itemList && filterForm.itemList.length">
                    <sam-form ref="filterform" :data="filterForm" :isEdit="false" v-model="filterValue" :isFilter="true" />
                    <!-- <div>{{filterValue}}</div> -->
                    <div class="btns">
                        <el-button size="mini" type="primary" @click="searchSubmit(false)">搜索</el-button>
                        <el-button size="mini" @click="searchReset">重置</el-button>
                    </div>
                </div>
                <div v-else style="padding: 0 20px; text-align:center"><i class="el-icon-warning-outline" /> 没有可检索的参数</div>
            </div>
            <div v-if="!formData.content" style="padding:30px">
                <div>暂无数据</div>
            </div>
            <div class="tables" v-else>
                <el-table size="small" :data="tableData" border stripe fit max-height="500" :row-key="isTree?'id':''" :tree-props="treeProps" style="width:100%">
                    <el-table-column type="index" label="序号" fixed="left" align="center" width="70">
                        <template slot-scope="scope">
                            <span>{{scope.$index+(query.page - 1) * query.size + 1}}</span>
                        </template>
                    </el-table-column>
                    <template v-for="field in filedsArr">
                        <el-table-column :label="field.label" :key="field.name" :width="field.width?field.width:setColWidth(field.label)">
                            <template slot-scope="scope">
                                <!-- <span>{{scope.row[field.name]}}</span> -->
                                <span>{{getStr(scope.row, field.name)}}</span>
                            </template>
                        </el-table-column>
                    </template>
                    <!--如果是tree结构的表格-->
                    <el-table-column v-if="isTree" label="下属单元合计">
                        <template slot-scope="scope">
                            <!-- <span>sdsdsd</span> -->
                            <span>{{scope.row.children && scope.row.children.length}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" icon="el-icon-edit" @click="addNewList(scope.row)">编辑</el-button>
                            <el-button v-if="viewAll" type="text" size="mini" icon="el-icon-delete" @click="removeItem(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pages">
                    <el-pagination size="mini" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.query.page" :page-sizes="[20, 50, 100, 200]" :page-size="this.query.size" layout="total, sizes, prev, pager, next, jumper" :total="this.query.total" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import samForm from '~/components/form';
import dataUtil from '~/util/data_util';
import dataOptions from '~/config/options';
export default {
    components: {
        samForm
    },
    computed: {
        ...mapState(['checkArr']),
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        viewAll: {
            type: Boolean,
            default: true
        },
        uinq: [],
        listParam: {
            type: Object,
            default: {}
        },
        hasPassword: {
            type: String,
            default: undefined
        },
        isTree: {
            type: Object,
            default: null
        },
    },
    watch: {
        data: {
            // 数据发生更新
            handler(obj) {
                console.log('watch data handler=>', obj);
                if (obj.content && obj.content.itemList) {
                    this.filedsArr = obj.content.itemList.filter(o => { return !o.tableHide });
                    //console.log('this.filedsArr', this.filedsArr)
                    this.tableData = [];
                    this.formData = _.cloneDeep(obj);
                    this.setData();
                }
            },
            immediate: true
        }
    },
    data: () => ({
        collectionName: "",
        isAdd: false,
        filedsArr: [],      // 数据字段列
        fieldItemData: {},   // 数据字段对应的值集
        filterVisible: false,
        filterValue: {},
        filterForm: {
            "position": "top",
            "gutter": 20,
            "colspan": 6,
            "size": "small",
            "itemList": []
        },
        formValue: {},
        formData: {},
        submitLoading: false,
        loading: false,
        tableData: [],
        treeProps: { children: 'children', hasChildren: 'hasChildren' },
        query: {
            page: 1,
            size: 50,
            total: 0
        },
        editRow: {},
        passwordValue: '',
    }),
    methods: {
        setColWidth(str) {
            return str.length > 3 ? str.length * 30 : str.length * 40;
        },
        addNewList(row = {}) {
            this.isAdd = true;
            this.filterVisible = false;
            this.formValue = {};
            this.editRow = _.cloneDeep(row);
            if (!_.isEmpty(row)) {
                this.passwordValue = (this.hasPassword && row[this.hasPassword]) ? row[this.hasPassword] : '';
                if (this.formData.content.itemList && this.formData.content.itemList.length) {
                    this.formData.content.itemList.forEach(item => {
                        let key = item.key;
                        this.formValue[key] = row[item.name] || '';
                        if (item.component == 'sam-cascader' && !this.formValue[key]) {
                            this.formValue[key] = [];
                        }
                    });
                }
            }
        },
        backList(flag) {
            this.isAdd = false;
            this.editRow = null;
            this.query.page = 1;
            this.searchSubmit(flag);
        },
        submitForms(flag) {
            let isValidate = true;
            let refForm = this.$refs['samform'];
            if (flag) {
                isValidate = refForm.checkFormValidate();
                if (!isValidate) {
                    this.$message.error('表单数据的验证有误，请核查！');
                    return;
                }
            } else {
                refForm.resetForm();
                return;
            }
            this.submitData();
        },
        // 提交数据
        submitData() {
            let data = {}, submitType = 'addData';
            this.formData.content.itemList.forEach(item => {
                let key = item.name;
                let value = dataUtil.checkValue(item.type, this.formValue[item.key]);
                data[key] = value;
            });
            let dff = this.$global.difference(data, this.editRow);
            if (!_.isEmpty(this.editRow)) {
                submitType = "updateData";
                dff.id = this.editRow.id;
            }
            let condition = {
                "collectionName": this.collectionName,
                "type": submitType,
                "data": dff
            };

            this.$axios.$post('mock/db', { data: condition }).then(result => {
                this.$message("数据已提交保存");
                if (submitType == 'updateData') {
                    this.backList(true);
                } else {
                    this.$refs['samform'].resetForm();
                }
            });
        },
        setData() {
            this.tableData = [];
            this.fieldItemData = {};
            this.filterForm.itemList = [];
            this.filterValue = {};
            this.collectionName = undefined;
            let valueObj = {}, filterObj = {}, itemList = [];
            console.log('this.formData.setData', this.formData.content.itemList)
            //debugger
            if (this.formData.content && this.formData.content.itemList && this.formData.content.itemList.length) {
                this.formData.content.itemList.forEach(item => {
                    if (!this.collectionName) {
                        this.collectionName = item.table;
                    }
                    valueObj[item.key] = item.value || "";
                    // 如果有筛选条件
                    if (this.formData.filterFields && this.formData.filterFields.length && this.formData.filterFields.includes(item.name)) {
                        item.isFilter = true;
                        filterObj[item.key] = item.value || item.default || '';
                        itemList.push(item);
                    }
                    if (item.optionsUrl) {
                        this.setItemData(item);
                    }
                });
                this.formValue = { ...valueObj };
                // 如果有筛选条件则创建form表单
                this.filterForm.itemList = [...itemList];
                this.filterValue = { ...filterObj };
                //console.log('this.formData', this.formData.content.itemList)
                this.getList();
            }
        },
        // 搜索
        searchSubmit(flag) {
            this.filterParams = {};
            if (!flag) {
                this.filterForm.itemList.forEach(item => {
                    let key = item.name;
                    let value = dataUtil.checkValue(item.type, this.filterValue[item.key]);
                    //console.log('this.filterParams value', value)
                    if (value) {
                        value = dataUtil.getSearchParams(item, value);
                        this.filterParams[key] = value;
                    }
                });
            }
            //console.log('this.filterParams', this.filterParams)
            this.getList();
        },
        // 重置搜索表单
        searchReset() {
            this.$refs.filterform.resetForm();
        },
        handleSizeChange(size) {
            this.query.size = size;
            this.query.page = 1;
            this.searchSubmit();
        },
        handleCurrentChange(page) {
            this.query.page = page;
            this.searchSubmit();
        },
        // 获取字段所对应的值集
        setItemData(item) {
            let conditon = {
                type: 'listData',
                collectionName: item.optionsUrl.table,
                data: item.optionsUrl.params || {},
                column: item.optionsUrl.column || {}
            }
            let key = item.name;
            this.$axios.$post('mock/db', { data: conditon }).then(res => {
                if (!this.fieldItemData[key]) {
                    let lists = res.list;
                    if (item.component == 'sam-cascader') {
                        lists = res.list.map(obj => {
                            return {
                                id: obj.id,
                                pid: item.optionsUrl.pid ? obj[item.optionsUrl.pid] : obj.pid,
                                value: obj[item.optionsUrl.value],
                                label: obj[item.optionsUrl.label]
                            }
                        });
                        lists = this.$global.toTree(lists);
                    }
                    this.fieldItemData[key] = lists;
                }
                //console.log('this.fieldItemData', this.fieldItemData);
            });
        },

        // 设置显示值
        getStr(row, field) {
            let str = row[field];
            if (str === undefined || str === null) return "";
            //return str;
            let item = _.find(this.formData.content.itemList, { "name": field });
            if (item.options || item.optionsUrl) {
                if (item.optionsUrl) { // 有后台接口数据
                    let collData = this.fieldItemData[field];
                    if (collData && collData.length) {
                        if (item.component == 'sam-cascader') {
                            str = _.uniq(dataUtil.arrConversion(str));
                            let nodeStr = dataUtil.getTreeNode(collData, [...str], '/');
                            str = nodeStr;
                        } else {
                            if (!isNaN(str)) {
                                let data = _.find(collData, { "id": Number(str) });
                                let key = item.optionsUrl.label;
                                str = data ? data[key] : '';
                            } else if (_.isArray(str)) {
                                str = str.join(",");
                            }
                        }
                    }
                } else if (item.options && item.options.length) { // 标准化的值集
                    let op = _.find(item.options, { "value": str });
                    str = op ? op.label : '';
                }
            } else if (item.component == 'sam-date') {
                str = moment(str).format(item.format || 'YYYY-MM-DD');
            } else if (item.component == 'sam-cascader' && item.optionsConst) {
                if (!_.isArray(str)) {
                    str = [str];
                }
                let nodeStr = dataUtil.getTreeNode(this.$store.state.collectionData[item.optionsConst], [...str], '/');
                str = nodeStr;
            }
            return str;
        },
        removeItem(row) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let condition = {
                    type: 'removeData',
                    collectionName: this.collectionName,
                    data: { id: row.id }
                };
                this.$axios.$post('mock/db', { data: condition }).then(res => {
                    this.$message.info('删除成功!');
                    this.getList();
                });
            }).catch(() => { });
        },
        async getList(match = {}) {
            this.loading = true;
            match = Object.assign({}, match, this.listParam, this.filterParams);
            // 通用列表查询
            let condition = {
                type: 'listData',
                collectionName: this.collectionName,
                data: match,
                page: this.query.page,
                pagesize: this.query.size
            };

            let result = await this.$axios.$post('mock/db', { data: condition });
            //console.log('getList', result.list);
            this.query.total = result.total;
            //this.tableData = result.list;
            this.tableData = result.list.map(item => {
                delete item.employee, delete item.__v, delete item._id;
                return item;
            });
            if (this.isTree) {
                this.tableData = this.$global.toTree([...this.tableData], { parentKey: this.isTree.parentKey });
            }
            setTimeout(() => {
                this.loading = false;
            }, 500)
        }
    },

    mounted() {
        //this.setData();
    },
    layout: 'admin'
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/admin-form';
</style>
