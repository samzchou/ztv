<template>
    <section class="add-container">
        <div class="content">
            <div class="header">
                <div class="title">
                    <span>编辑表单</span>
                    <el-button icon="el-icon-back" type="text" @click="$router.push('/admin/forms/list')">返回表单列表</el-button>
                </div>
                <div>
                    <el-button class="icon-link" v-if="!codeVisible" icon="el-icon-plus" @click="createNew(true)">新建</el-button>
                    <el-button class="icon-link" v-if="!codeVisible" icon="el-icon-delete" @click="createNew(false)">清空</el-button>
                    <el-button class="icon-link" v-if="!codeVisible" icon="el-icon-document" @click="codeVisible=true">代码</el-button>
                    <el-button class="icon-link" v-if="codeVisible" icon="el-icon-s-platform" @click="backForm">返回视图</el-button>
                    <el-button class="icon-link" v-if="!codeVisible" icon="el-icon-view" @click="dialogVisible=true">预览</el-button>
                    <el-button class="icon-link" v-if="!codeVisible" icon="el-icon-folder-opened" @click="saveMyForm">保存</el-button>
                </div>
            </div>
            <div class="code-container" v-if="codeVisible">
                <el-scrollbar class="scrollbar">
                    <client-only>
                        <codemirror ref="myCm" class='area' v-model="formCode" :options="codeOption" @input="onCmCodeChange" />
                    </client-only>
                </el-scrollbar>
            </div>
            <div class="draw-container" v-else>
                <el-scrollbar class="scrollbar">
                    <sam-form :data="currForms" :isEdit="true" @editItem="activeTab='attrComponent'" v-model="formValue" />
                </el-scrollbar>
            </div>
        </div>
        <!--右側側滑面板 新增表单-->
        <slider-panel width="350px" title="表单编辑" position="right" :visible.sync="slideShow">
            <el-tabs v-model="activeTab" @tab-click="tabsClick">
                <el-tab-pane label="数据字段" name="attrField">
                    <div class="field-container">
                        <div class="filter">
                            <el-input size="mini" placeholder="输入关键字进行过滤" v-model="filterText" />
                        </div>
                        <div class="content">
                            <el-scrollbar class="scrollbar" ref="scrollTree">
                                <el-tree ref="tree" :props="defaultProps" :data="collections" node-key="tableName" show-checkbox :filter-node-method="filterNode" @check-change="handleCheckChange" @check="setNodeCheck" />
                            </el-scrollbar>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="表单属性" name="attrform">
                    <div class="row-container">
                        <el-scrollbar class="scrollbar" ref="scrollProp">
                            <el-form size="mini" :model="rowForm" label-position="top" ref="rowForm">
                                <el-form-item label="表单标题" prop="title">
                                    <el-input v-model="rowForm.title" @input="setFrom" />
                                </el-form-item>
                                <el-form-item label="每行列数" prop="colspan">
                                    <el-slider v-model="rowForm.colspan" :min="1" :max="6" @change="setFrom" />
                                </el-form-item>
                                <el-form-item label="表单域标签的位置" prop="position">
                                    <el-radio-group v-model="rowForm.position" @change="setFrom">
                                        <el-radio-button v-for="item in positionArr" :key="item.value" :value="item.value" :label="item.value">{{item.label}}</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="表单内组件的尺寸" prop="size">
                                    <el-radio-group v-model="rowForm.size" @change="setFrom">
                                        <el-radio-button v-for="item in sizeArr" :key="item.value" :value="item.value" :label="item.value">{{item.label}}</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="行内表单模式" prop="inline">
                                    <el-switch v-model="rowForm.inline" @change="setFrom" />
                                </el-form-item>
                                <el-form-item v-if="rowForm.inline" label="表单内组件间隔(PX)" prop="gutter">
                                    <el-slider v-model="rowForm.gutter" :min="0" :step="5" :max="60" @change="setFrom" />
                                </el-form-item>
                            </el-form>
                        </el-scrollbar>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="组件属性" name="attrComponent">
                    <div class="component-content">
                        <el-scrollbar class="scrollbar" ref="scrollItem">
                            <edit-item />
                        </el-scrollbar>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </slider-panel>

        <el-dialog class="view-form" title="预览表单" :visible.sync="dialogVisible" :close-on-click-modal="false" append-to-body width="65%">
            <div class="sumlite-container">
                <el-scrollbar class="scrollbar">
                    <sam-form :data="currForms" :isEdit="false" :isTest="true" v-model="testValue" />
                </el-scrollbar>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import {
    mapState, mapMutations, mapActions
} from 'vuex';
import samForm from '~/components/form';
import editItem from '~/components/form/editItem';
import sliderPanel from '~/components/sliderPanel';
export default {
    components: {
        sliderPanel, samForm, editItem
    },
    computed: {
        ...mapState('forms', ['collections', 'currForms']),
        getCheckedKeys() {
            let keys = [];
            let currForms = {
                ...this.currForms
            }
            currForms.itemList.forEach(item => {
                keys.push(item.tableName);
            });
            return keys;
        },
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        currForms: {
            handler(list) {
                this.setFormData();
            },
            immediate: true
        },
    },
    data: () => ({
        slideShow: true,
        listCollections: [],
        filterText: '',
        activeTab: 'attrField',
        defaultProps: {
            children: 'children',
            label: 'label'
        },
        selectNodes: [],
        expandedKeys: [],
        sizeArr: [{ value: "", label: "大" }, { value: "medium", label: "中等" }, { value: "small", label: "小" }, { value: "mini", label: "微小" }],
        positionArr: [{ value: "left", label: "左侧" }, { value: "top", label: "顶部" }],
        rowForm: {
            inline: true
        },
        formValue: {},
        testValue: {},
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
        formCode: "",
        dialogVisible: false,
        saveLoading: false,
        treeCheckName: '',
        treeCheckChanged: false,
    }),
    methods: {
        ...mapActions('forms', ['ASYNC_GETCOLLS']),
        ...mapMutations('forms', ['INIT_FORMS', 'UPDATE_FORMS', 'CLEAR_FORMS']),
        // 保存表单
        saveMyForm() {
            this.saveLoading = true;
            let currForms = _.cloneDeep(this.currForms);
            let condition = {
                type: 'addData',
                collectionName: 'formList',
                data: {
                    "create_eid": this.$store.state.user.id,
                    "form_name": currForms.title,
                    "content": currForms
                }
            };
            if (currForms.id) {
                condition.type = "updateData";
            }
            // console.log('saveMyForm', condition);
            this.$axios.$post('mock/db', { data: condition }).then(result => {
                //console.log('result', result);
                this.$message.success(currForms.id ? "编辑成功" : "新增成功");
                currForms.id = result.id;
                this.saveLoading = false;
                this.UPDATE_FORMS({ ...currForms })
            });
        },
        backForm() {
            // 校验JSON格式是否正确
            let code = this.$refs.myCm.value;
            if (this.$global.isJSON(code)) {
                code = JSON.parse(code);
                this.UPDATE_FORMS({ ...code });
                this.codeVisible = false;
            } else {
                this.$message.error("代码格式有错，请核查！")
            }
        },
        // 初始化tree
        initTree() {
            let keys = this.getItemKeys(this.currForms.itemList);
            if (this.$refs.tree) {
                this.$refs.tree.setCheckedKeys(keys);
            }
        },
        // 获取已被选中的节点key
        getItemKeys(nodes) {
            let keys = nodes.map(item => {
                return item.tableName;
            });
            return keys;
        },
        // 设置check后的所有选中节点并处理数据
        setNodeCheck() {
            let checkedNodes = this.$refs.tree.getCheckedNodes().filter(o => { return o.table !== undefined });
            let formData = _.cloneDeep(this.currForms);
            formData.itemList = checkedNodes.map(item => {
                if (item.required && !item.rules) {
                    let rule = {
                        "required": true,
                        "message": "必填项",
                        "trigger": (item.component == 'sam-input') ? 'blur' : 'change'
                    };
                    if (item.component == "sam-cascader" || (item.component == "sam-select" && item.multiple)) {
                        rule.type = 'array';
                    }
                    item.rules = [rule];
                }
                return item;
            })
            this.UPDATE_FORMS({ ...formData });
        },
        // tree勾选状态发生改变后删除或新增, 如果是父级节点则不进入数据
        handleCheckChange(item, isChecked) {
            if (isChecked === true) {
                if (item.children && item.children.length) {
                    this.treeCheckName = item.tableName;
                    let keys = this.getItemKeys(item.children);
                    this.$refs.tree.setCheckedKeys(keys);
                } else {

                    if (item.table !== this.treeCheckName) {
                        this.treeCheckName = item.table;
                        this.$refs.tree.setCheckedKeys([item.tableName]);
                    } else {
                        let keys = this.$refs.tree.getCheckedKeys();
                        keys.push(item.tableName);
                        this.$refs.tree.setCheckedKeys(keys);
                    }
                }
            }
        },

        setFormData() {
            this.rowForm = _.cloneDeep(this.currForms);
            delete this.rowForm.itemList;
            this.formCode = JSON.stringify(this.currForms, null, 4);
            let valueObj = {}, r = {};
            this.currForms.itemList.map(item => {
                valueObj[item.key] = item.value || item.default || '';
                // 如果是自动编码
                if (item.component == 'sam-input' && item.cptype == 'code' && !item.value) {
                    valueObj[item.key] = this.$global.autoCode();
                }
                r[item.key] = item.rules;
            });
            this.formValue = { ...valueObj };
            this.testValue = { ...valueObj };
        },
        // 代码发生改变
        onCmCodeChange(code) {
            //console.log('this is new code', code);
        },
        // 新建表单
        createNew(flag) {
            if (this.currForms.itemList.length) {
                this.$confirm('将清楚表单内所有数据，确定?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.clearForms(flag);
                    this.$refs.tree.setCheckedKeys([]);
                }).catch(() => { });
            } else {
                this.clearForms(flag);
            }
        },
        clearForms(flag) {
            this.CLEAR_FORMS(flag);
            this.slideShow = true;
        },
        // tab标签改变
        tabsClick(obj) {
            //console.log('tabsClick', obj)
        },
        setFrom() {
            let formObj = _.merge({}, this.currForms, this.rowForm);
            //console.log('formObj', formObj);
            this.UPDATE_FORMS({ ...formObj });
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        checkInItme(item) {
            let ob = {
                pIndex: -1,
                cIndex: -1
            };
            if (this.currForms.itemList && this.currForms.itemList.length) {
                let itemList = this.currForms.itemList;
                for (let i = 0; i < itemList.length; i++) {
                    if (itemList[i]['name'] == item.table) {
                        ob.pIndex = i;
                    }
                    let children = itemList[i]['children'];
                    for (let j = 0; j < children.length; j++) {
                        if (children[j]['table'] == item.table && children[j]['name'] == item.name) {
                            ob.cIndex = j;
                            break;
                        }
                    }
                }
            }
            return ob;
        },

    },
    created() {
        this.INIT_FORMS();
        this.ASYNC_GETCOLLS();
    },
    mounted() {
        this.$nextTick(() => {
            if (this.$refs['scrollTree']) {
                this.$refs['scrollTree'].update();
                this.initTree();
            }
        })
    },
    beforeDestroy() {
        this.$storage.session.remove('adminForms');
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
                            &.field-container {
                                .filter {
                                    height: 40px;
                                    padding: 0 20px;
                                    background-color: #dfedfb;
                                    display: flex;
                                    align-items: center;
                                }
                                .content {
                                    height: calc(100% - 40px);
                                    box-sizing: border-box;
                                    padding: 15px;
                                    overflow: hidden;
                                    /deep/ .el-tree {
                                        background: transparent;
                                    }
                                }
                            }
                            &.row-container {
                                padding: 15px 25px 0 25px;
                                box-sizing: border-box;
                                height: 100%;
                                overflow: hidden;
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
.view-form {
    .sumlite-container {
        height: 100%;
        overflow: hidden;
        .scrollbar {
            height: 100%;
            /deep/ .el-scrollbar__wrap {
                overflow-x: hidden;
            }
        }
    }
}
</style>
