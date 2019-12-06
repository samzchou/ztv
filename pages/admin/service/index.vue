<template>
    <section class="service-container">
        <div class="lists">
            <div class="title">
                <div>系统页面/业务模块管理</div>
                <div>
                    <el-button size="mini" type="primary" @click="addNew">新增</el-button>
                </div>
            </div>
            <div class="tables">
                <el-table size="mini" :data="treeData" stripe border fit row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" max-height="500">
                    <el-table-column label="序号" prop="sort" align="center" width="80" />
                    <el-table-column prop="id" label="ID" width="80" />
                    <el-table-column prop="title" label="服务名称" width="200" />
                    <el-table-column prop="isAdmin" label="是否后台管理" width="100" />
                    <el-table-column label="配置页面" width="200">
                        <template slot-scope="scope">
                            {{getPageName(scope.row.page_id)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="page_url" label="页面URL地址" />
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.pid==0" type="text" size="mini" icon="el-icon-plus" @click="addNew(scope.row)">新增</el-button>
                            <el-button type="text" size="mini" class="icon-link" icon="el-icon-edit" @click="editItem(scope.row)">编辑</el-button>
                            <el-button type="text" size="mini" class="icon-link" icon="el-icon-delete" @click="removeItem(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-drawer title="服务编辑" size="400px" :visible.sync="optsVisible" append-to-body :wrapperClosable="false" direction="rtl">
            <div class="edit-content">
                <el-form size="mini" :model="ruleForm" :rules="rules" ref="ruleForm" status-icon label-position="top">
                    <el-form-item label="上级服务" prop="pid">
                        <el-select v-model="ruleForm.pid" placeholder="请选择" clearable style="width:100%">
                            <el-option v-for="item in listData.filter(o=>{return o.pid===0})" :key="item.id" :label="item.title" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务名称" prop="title">
                        <el-input v-model="ruleForm.title" clearable />
                    </el-form-item>
                    <el-form-item label="是否后台管理" prop="isAdmin">
                        <el-switch v-model="ruleForm.isAdmin" active-color="#13ce66" inactive-color="#CCC" />
                    </el-form-item>
                    <el-form-item label="目录/页面名" prop="name">
                        <el-input v-model="ruleForm.name" clearable @input="setDir" />
                    </el-form-item>
                    <el-form-item label="序号" prop="sort">
                        <el-input-number v-model="ruleForm.sort" :min="0" />
                    </el-form-item>
                    <el-form-item label="关联页面" prop="page_id">
                        <el-select v-model="ruleForm.page_id" placeholder="请选择" clearable style="width:100%" @change="setPages">
                            <el-option v-for="item in pageList" :key="item.id" :label="item.page_name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="页面URL" prop="page_url">
                        <el-input v-model="ruleForm.page_url" readonly />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveData" :icon="formLoading?'el-icon-loading':''" :disabled="formLoading">保存</el-button>
                        <el-button @click="optsVisible=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
    </section>
</template>

<script>
import sliderPanel from '~/components/sliderPanel';
const forms = {
    pid: "",
    title: "",
    isAdmin: false,
    name: "",
    sort: 0,
    page_id: "",
    page_url: ""
};
export default {
    components: {
        sliderPanel
    },
    data: () => ({
        optsVisible: false,
        listData: [],
        treeData: [],
        listLoading: false,
        pages: [],
        pageList: [],
        query: {
            page: 1,
            size: 30,
            total: 0
        },
        formLoading: false,
        ruleForm: { ...forms },
        rules: {
            title: [
                { "required": true, "message": "请填写服务名称", "trigger": "blue" },
                { "min": 2, "max": 8, "type": "string", "message": "长度在2~8个单元", "trigger": "blur" },
            ]
        }
    }),
    methods: {
        getPageName(id) {
            let str = '';
            if (id && _.isNumber(id)) {
                let page = _.find(this.pageList, { "id": id });
                str = page ? page.page_name : "不存在";
            }
            return str;
        },
        editItem(row) {
            delete row.__v, delete row._id;
            this.ruleForm = { ...row };
            if (!this.ruleForm.pid) {
                this.ruleForm.pid = "";
            }
            this.optsVisible = true;

        },
        removeItem(row) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let condition = {
                    type: 'removeData',
                    collectionName: 'service',
                    data: { id: row.id }
                };
                this.$axios.$post('mock/db', { data: condition }).then(res => {
                    this.$message.info('删除成功!');
                    this.getList();
                });
            }).catch(() => { });
        },
        setDir(val) {
            let url = '';
            let item = _.find(this.listData, { "id": this.ruleForm.pid });
            if (item) {
                url = '/' + item.name;
            }
            this.ruleForm.page_url = url + '/' + val;
        },
        setPages(val) {
            this.ruleForm.page_url = '/systems/page?id=' + val;
        },
        currentChange(page) {
            this.query.page = page;
        },
        handleSizeChange(size) {
            this.query.page = 1;
            this.query.size = size;
        },
        addNew(row) {
            this.optsVisible = true;
            this.ruleForm = { ...forms };
            if (row) {
                this.$set(this.ruleForm, 'pid', row.id);
                this.$set(this.ruleForm, 'page_url', '/' + row.name);
            }
        },
        saveData() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let data = { ...this.ruleForm };
                    if (data.pid == '') {
                        data.pid = 0;
                    }
                    this.formLoading = true;
                    let condition = {
                        type: 'addData',
                        collectionName: 'service',
                        data: data
                    };
                    if (this.ruleForm.id) {
                        condition.type = 'updateData';
                    }
                    this.$axios.$post('mock/db', { data: condition }).then(result => {
                        this.$message.success("保存成功");
                        this.getList();
                        this.formLoading = false;
                        this.optsVisible = false;
                    });
                }
            });
        },
        async getList(match = {}) {
            this.listLoading = true;
            let condition = {
                type: 'listData',
                collectionName: 'service',
                data: match
            };
            let result = await this.$axios.$post('mock/db', { data: condition });
            this.listData = result.list;
            this.listLoading = false;
            this.treeData = this.$global.toTree([...result.list]);
        },
        async getPages() {
            let condition = {
                type: 'listData',
                collectionName: 'pageList',
                data: {}
            };
            let result = await this.$axios.$post('mock/db', { data: condition });
            this.pageList = result.list;
            this.getList();
        },
    },
    mounted() {
        this.getPages();
    },
    layout: "admin"
}
</script>

<style lang="scss" scoped>
.service-container {
    height: 100%;
    display: flex;
    .lists {
        width: 100%;
        padding: 20px;
        flex: 1;
        background-color: #ffff;
        box-sizing: border-box;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 16px;
        }
        .tables {
            margin: 15px 0;
            width: 100%;
            box-sizing: border-box;
            .pages {
                display: flex;
                justify-content: flex-end;
            }
        }
    }
    /deep/ .slide-panel {
        flex: 0 0 350px;
        .slide-panel__body {
            padding: 15px 20px;
        }
    }
}
/deep/ .el-drawer {
    .edit-content {
        height: 100%;
        padding: 20px;
    }
}
</style>
