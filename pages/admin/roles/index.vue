<template>
    <section class="sam-page">
        <div class="header">
            <div class="title"><i class="el-icon-price-tag" />系统角色权限设置</div>
        </div>
        <div class="roles-container">
            <div class="left">
                <div class="title">
                    <span>角色列表</span>
                    <span>
                        <el-button type="text" class="el-icon-plus" @click="editItem(null)">新增</el-button>
                    </span>
                </div>
                <div v-if="isAdd" class="edit-forms">
                    <el-form size="small" :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top">
                        <el-form-item label="角色名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addForm">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else class="lists">
                    <ul v-if="tableData.length">
                        <li v-for="item in tableData" :key="item.id">
                            <div>{{item.name}}</div>
                            <div>
                                <el-button size="mini" type="text" class="el-icon-edit" @click="setRoles(item)">配置权限</el-button>
                                <el-button size="mini" type="text" class="el-icon-edit" @click="editItem(item)">修改</el-button>
                                <el-button size="mini" type="text" class="el-icon-delete" @click="removeItem(item)">删除</el-button>
                            </div>
                        </li>
                    </ul>
                    <div v-else class="empty">
                        <p>暂时没有数据</p>
                        <el-button type="text" class="el-icon-plus" @click="editItem(null)">添加角色</el-button>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="collapse" v-if="isSet">
                    <div class="title">权限设置</div>
                    <el-collapse v-model="activeNames">
                        <el-collapse-item v-for="(item,idx) in serviceData.filter(o=>{return o.pid==0})" :key="item.id" :title="item.title" :name="String(idx+1)">
                            <template slot="title">
                                <i class="el-icon-paperclip" />
                                <span style="margin-left:10px">{{item.title}}</span>
                            </template>
                            <div class="list" v-for="child in serviceData.filter(o=>{return o.pid==item.id})" :key="child.id">
                                <div>{{child.title}}</div>
                                <div>
                                    <el-checkbox v-for="c in myCheckArr" :key="c.value" :label="c.value" @change="setCheck($event, c, item.id, child.id)" :checked="checkRoles(c.value, item.id, child.id)">{{c.label}}</el-checkbox>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <div style="padding:20px 0">
                        <el-button size="small" type="primary" @click="saveSubmit">保存设置</el-button>
                    </div>
                </div>
                <div v-else style="padding:50px 15px"><i class="el-icon-back" />请选择左侧角色后配置权限</div>
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
    data: () => ({
        loading: true,
        isAdd: false,
        isSet: false,
        ruleForm: {
            name: ""
        },
        rules: {
            name: [
                { required: true, message: '请输入角色名称', trigger: 'blur' }
            ]
        },
        activeNames: ['1', '2'],
        myCheckArr: [],
        tableData: [],
        serviceData: [],
        editRow: null,
        checkList: []
    }),
    methods: {
        addForm() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let condition = {
                        type: 'addData',
                        collectionName: 'roles',
                        data: { name: this.ruleForm.name }
                    };

                    if (this.editRow) {
                        condition.type = 'updateData';
                        condition.data.id = this.editRow.id;
                    }
                    //console.log('condition', condition.data);
                    this.$axios.$post('mock/db', { data: condition }).then(res => {
                        this.isAdd = false;
                        this.getList();
                        this.editRow = null;
                    });
                }
            });
        },

        setRoles(item) {
            this.editRow = item;
            this.isSet = true;
            this.resetRoles();
        },
        editItem(item) {
            this.editRow = item;
            this.ruleForm.name = item ? item.name : '';
            this.isAdd = true;
            if (!item) {
                this.isSet = false;
                this.resetRoles();
            }
        },
        removeItem(item) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let condition = {
                    type: 'removeData',
                    collectionName: 'roles',
                    data: { id: item.id }
                };
                this.$axios.$post('mock/db', { data: condition }).then(res => {
                    this.$message.info('删除成功!');
                    this.getList();
                });
            }).catch(() => { });
        },

        saveSubmit() {
            let condition = {
                type: 'updateData',
                collectionName: 'roles',
                data: { ...this.editRow }
            };
            console.log('saveSubmit', condition.data)
            this.$axios.$post('mock/db', { data: condition }).then(res => {
                this.editRow = null;
            });
        },
        checkRoles(value, pid, id) {
            if (!this.editRow) {
                return false;
            }
            let obj = {
                "pid": pid,
                "id": id,
                "value": value
            };
            let index = _.findIndex(this.editRow.content, obj);
            if (!!~index) {
                return true;
            }
            return false;
        },
        setCheck(checked, item, pid, id) {
            let obj = {
                "pid": pid,
                "id": id,
                "value": item.value
            }
            if (checked) {
                this.editRow.content.push(obj);
            } else {
                let index = _.findIndex(this.editRow.content, obj);
                this.editRow.content.splice(index, 1);
            }
            console.log('this.checkList', this.editRow.content);
        },
        resetRoles() {
            this.serviceData = [];
            this.getService();
        },
        async getService() {
            let condition = {
                type: 'listData',
                collectionName: 'service',
                data: {}
            };
            let res = await this.$axios.$post('mock/db', { data: condition });
            this.serviceData = res.list.map((item, i) => {
                this.activeNames.push(String(i + 1));
                return item;
            });
            console.log('serviceData', this.serviceData);
        },
        async getList(match = {}) {
            let condition = {
                type: 'listData',
                collectionName: 'roles',
                data: {}
            };
            let result = await this.$axios.$post('mock/db', { data: condition });
            console.log('getList', result);
            this.tableData = result.list;

            //this.getService();

        }
    },
    beforeMount() {
        //this.setData();
    },
    mounted() {
        this.myCheckArr = _.cloneDeep(this.checkArr);
        this.getList();
        //this.rolesByUid();
    },
    layout: 'admin'
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/admin-form';
.sam-page {
    height: 100%;
    .roles-container {
        display: flex;
        height: calc(100% - 40px);
        > div {
            height: 100%;
            &.left {
                flex: 0 0 400px;
                background-color: #fff;
                .title {
                    height: 40px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 15px;
                    border-bottom: 1px solid #eee;
                    background-color: #f0faff;
                }
                .lists {
                    overflow: auto;
                    height: calc(100% - 40px);
                    ul {
                        padding: 15px;
                        > li {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            height: 40px;
                        }
                    }
                }

                .empty,
                .edit-forms {
                    padding: 20px 15px;
                }
            }
            &.right {
                flex: 1;
            }
        }
    }
    .collapse {
        padding: 20px 30px;
        .title {
            padding: 10px 0;
        }
        /deep/ .el-collapse {
            .el-collapse-item__header {
                font-size: 14px;
                padding: 0 20px;
                font-weight: bold;
                color: #21754a;
            }
            .el-collapse-item__wrap {
                border-top: 1px solid #eee;
                .el-collapse-item__content {
                    padding: 0;
                    background-color: #f0fbff;
                    .list {
                        display: flex;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                        height: 40px;
                        align-items: center;
                        box-sizing: border-box;
                        padding: 0 20px;
                        > div {
                            flex: 1;
                            &:first-child {
                                flex: 0 0 120px;
                            }
                        }
                        &:last-child {
                            border: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>