<template>
    <div class="treechart">

        <table v-if="treeData && treeData.dept_name">
            <tr>
                <td :colspan="treeData.children ? treeData.children.length * 2 : 1" :class="{parentLevel: treeData.children, extend: treeData.children && treeData.extend}">
                    <div class="node">
                        <div class="person" @click="$emit('click-node', treeData)">
                            <el-popover v-if="!isDetail" placement="top" trigger="click">
                                <div style="margin: 0">
                                    <el-button size="mini" type="primary" @click="addData(0)">添加下级部门</el-button>
                                    <el-button size="mini" type="primary" @click="addData(1)" v-if="treeData.id!==0">编辑</el-button>
                                    <el-button size="mini" type="warning" @click="removeData" v-if="treeData.pid!==0">删除</el-button>
                                    <el-button size="mini" type="info" @click="viewEmp" v-if="empList.length">查看部门员工</el-button>
                                </div>
                                <div class="avat" :class="{'dept':!empList.length, 'root':treeData.id==0, 'other':treeData.disabled}" slot="reference">
                                    <div>
                                        <span>{{treeData.dept_name}}</span>
                                        <span class="pos" v-if="empList.length">({{empList.length}})</span>
                                        <span class="pos" v-if="treeData.disabled">[已禁用]</span>
                                    </div>
                                    <div class="leader" v-if="treeData.id!==0">主管：{{treeData.leader?treeData.leader.name:'未指定'}}</div>
                                </div>
                            </el-popover>
                            <div class="avat" :class="{'dept':!empList.length}" v-else>
                                <div>
                                    <span>{{treeData.dept_name}}</span>
                                    <span class="pos" v-if="empList.length">({{empList.length}})</span>
                                </div>
                                <div class="leader" v-if="treeData.id!==0">主管：{{treeData.leader?treeData.leader.name:'未指定'}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="extend_handle" v-if="treeData.children && treeData.children.length" @click="toggleExtend(treeData)"></div>
                </td>
            </tr>
            <!-- 这是一个递归组件,注意,这里还要调用,需要传递的数据这里也要传递,否则操作时拿不到子级的数据 -->
            <tr v-show="treeData" v-if="treeData.children && treeData.children.length && treeData.extend">
                <td v-for="(childers, index) in treeData.children" :key="index" colspan="2" class="childLevel">
                    <tree-chart :json="childers" :isDetail="isDetail" :userList="userList" @removeNode="removeNode" />
                </td>
            </tr>
        </table>

        <!-- 添加编辑弹框 -->
        <el-dialog :title="isEdit?'编辑部门':'添加下级部门'" :visible.sync="dialogVisible" @close="clearDialog" :close-on-click-modal="false" append-to-body width="300px">
            <div class="tips">
                <el-form size="mini" :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top">
                    <el-form-item label="部门名称" prop="dept_name">
                        <el-input placeholder="输入部门名称" :maxlength="32" v-model="ruleForm.dept_name" />
                    </el-form-item>
                    <el-form-item label="部门主管" prop="leaderId">
                        <el-select v-model="ruleForm.leaderId" placeholder="请选择部门主管" clearable style="width:100%">
                            <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否禁用" prop="disabled">
                        <el-switch v-model="ruleForm.disabled" active-color="#13ce66" inactive-color="#CCC" />
                    </el-form-item>
                    <el-form-item style="padding:20px 0 0">
                        <el-button size="small" type="info" @click="dialogVisible=false">取消</el-button>
                        <el-button size="small" type="primary" @click="confirm">提交保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

        <el-drawer :title="treeData.dept_name+'部门员工'" :visible.sync="visibleEmp" direction="ltr">
            <div class="list">
                <ul>
                    <li v-for="emp in empList" :key="emp.id">
                        <span>{{emp.name}}</span>
                    </li>
                </ul>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: 'tree-chart',
    props: {
        json: {}, // 渲染数据
        isDetail: {
            default: true // 是否是详情
        },
        userList: Array
    },
    watch: {
        isDetail(val) { // 是否是详情,详情不能添加编辑
            this.isDetail = val;
        },
        json: {
            // 遍历当前的数据
            handler(Props) {
                let extendKey = (jsonData) => {
                    jsonData.extend = jsonData.extend === void 0 ? true : !!jsonData.extend;
                    if (Array.isArray(jsonData.children) && jsonData.children.length) {
                        jsonData.children.forEach(c => {
                            extendKey(c);
                        });
                    }
                    return jsonData;
                };
                if (Props) {
                    this.treeData = extendKey(Props);
                    this.getEmployee();
                }
            },
            immediate: true
        }
    },
    data() {
        return {
            loading: false,
            treeData: {},
            dialogVisible: false, // 添加股东弹框
            isEdit: 0, // 是否编辑 0 新增 1 编辑
            empList: [], // 员工总数
            visibleEmp: false,
            ruleForm: {
                dept_name: "",
                leaderId: "",
                disabled: false
            },
            rules: {
                dept_name: [
                    { required: true, message: "请输入部门名称", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        viewEmp() {
            this.visibleEmp = true;
        },
        // 事件上报后删除节点
        removeNode(id) {
            let index = _.findIndex(this.treeData.children, { "id": id });
            this.treeData.children.splice(index, 1);
            this.$forceUpdate();
        },
        toggleExtend(treeData) {
            treeData.extend = !treeData.extend;
            this.$forceUpdate();
        },

        // 新增或编辑,val: 0 新增, 1 编辑
        addData(val) {
            this.isEdit = val;
            this.dialogVisible = true;
            if (val) {
                this.ruleForm = Object.assign(this.ruleForm, this.treeData);
            }
        },
        // 删除
        removeData() {
            const delId = this.treeData.id;
            let flag = true, error = '';
            if (this.treeData.children && this.treeData.children.length) {
                error = "该部门下有下级子部门，请先删除下级部门";
                flag = false;
            } else if (this.empCount) {
                error = "该部门下有" + this.empCount + "个员工，请先把员工更改所属部门后再删除";
                flag = false;
            }
            if (!flag) {
                this.$alert(error);
                return;
            }
            this.$confirm('确定要删除该部门?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let condition = {
                    type: 'removeData',
                    collectionName: 'department',
                    data: { id: delId }
                };
                this.$axios.$post('mock/db', { data: condition }).then(result => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$emit("removeNode", this.treeData.id);
                });
            }).catch(() => { });
        },
        // 保存数据
        confirm() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.sendData();
                }
            });
        },
        // 发送添加数据
        sendData() {
            this.loading = true;
            let data = {
                dept_name: this.ruleForm.dept_name,
                leaderId: this.ruleForm.leaderId,
                disabled: this.ruleForm.disabled
            };

            let condition = {
                type: 'addData',
                collectionName: 'department',
                data: {}
            }
            if (this.isEdit) {
                condition.type = 'updateData';
                data.id = this.treeData.id;
            } else {
                data.dept_parentid = this.treeData.id;
            }
            condition.data = data;
            console.log('condition', condition);
            //return;

            this.$axios.$post('mock/db', { "data": condition }).then(res => {
                if (res) {
                    this.$message({
                        type: "success",
                        message: this.isEdit ? "编辑成功" : "新增成功"
                    });
                    let leader = _.find(this.userList, { "id": this.ruleForm.leaderId });
                    if (leader) {
                        data.leader = leader;
                    } else {
                        delete this.treeData.leader;
                    }
                    if (this.isEdit) {
                        this.treeData = _.merge(this.treeData, data);
                    } else {
                        if (this.treeData.children) {
                            this.treeData.children.push(data);
                        } else {
                            this.treeData.children = [data];
                        }
                    }
                }
                this.loading = false;
                this.clearDialog();
            });
        },
        // 清除表单信息
        clearDialog() {
            this.$refs.ruleForm.resetFields();
            this.dialogVisible = false;
        },
        async getEmployee(id) {
            if (this.treeData.children && this.treeData.children.length) return;
            let condition = {
                type: 'listData',
                collectionName: 'employee',
                data: { "department": { $in: [this.treeData.id] }, "disabled": 0 },
                column: { id: 1, name: 1 }
            }
            let res = await this.$axios.$post('mock/db', { "data": condition });
            this.empList = res.list;

        }
    }
}
</script>

<style lang="scss" scoped>
.treechart {
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px 20px;

    table {
        border-collapse: separate !important;
        border-spacing: 0 !important;
        display: inline-table;
        margin: 0 auto;
        td {
            position: relative;
            vertical-align: top;
            padding: 0 0 50px 0;
            text-align: center;
        }
    }

    .parent {
        background-color: #199ed8 !important;
        font-weight: bold;
    }
    .extend_handle {
        position: absolute;
        left: 50%;
        bottom: 27px;
        width: 10px;
        height: 10px;
        padding: 5px 10px;
        transform: translate3d(-15px, 0, 0);
        cursor: pointer;
        &:before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 2px solid;
            border-color: #ccc #ccc transparent transparent;
            transform: rotateZ(135deg);
            transform-origin: 50% 50% 0;
            transition: transform ease 300ms;
        }
        &:hover:before {
            border-color: #333 #333 transparent transparent;
        }
    }

    .extend .extend_handle:before {
        transform: rotateZ(-45deg);
    }

    .extend::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 15px;
        height: 15px;
        border-left: 2px solid #ccc;
        transform: translate3d(-1px, 0, 0);
    }
    .childLevel::before {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 100%;
        height: 15px;
        border-left: 2px solid #ccc;
        transform: translate3d(-1px, 0, 0);
    }
    .childLevel::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: -15px;
        border-top: 2px solid #ccc;
    }
    .childLevel:first-child:before,
    .childLevel:last-child:before {
        display: none;
    }
    .childLevel:first-child:after {
        left: 50%;
        height: 15px;
        border: 2px solid;
        border-color: #ccc transparent transparent #ccc;
        border-radius: 6px 0 0 0;
        transform: translate3d(1px, 0, 0);
    }
    .childLevel:last-child:after {
        right: 50%;
        height: 15px;
        border: 2px solid;
        border-color: #ccc #ccc transparent transparent;
        border-radius: 0 6px 0 0;
        transform: translate3d(-1px, 0, 0);
    }
    .childLevel:first-child.childLevel:last-child::after {
        left: auto;
        border-radius: 0;
        border-color: transparent #ccc transparent transparent;
        transform: translate3d(1px, 0, 0);
    }

    .node {
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        padding: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: none;
    }
    .node .person {
        padding-top: 5px;
        position: relative;
        display: inline-block;
        z-index: 2;
        //width: 120px;
        //overflow: hidden;
        > span {
            margin-top: -5px;
        }
    }
    .node .person .avat {
        padding: 5px 10px;
        display: block;
        background-color: #ffcc00;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.2);
        > div {
            font-size: 14px;
            &.leader {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.5);
            }
            .pos {
                color: rgba(0, 0, 0, 0.5);
            }
        }
        .opreate_icon {
            display: none;
        }
        &:hover {
            .opreate_icon {
                display: block;
                position: absolute;
                top: -3px;
                right: -3px;
                padding: 5px;
            }
        }
        &.root {
            height: 50px;
            line-height: 40px;
            background-color: #3eca96 !important;
        }

        &.dept {
            background-color: #199ed8;
        }
        &.other {
            background-color: #ccc !important;
        }
    }
    .node .person .avat img {
        cursor: pointer;
    }
    .node .person .name {
        height: 2em;
        line-height: 2em;
        overflow: hidden;
        width: 100%;
    }
    .node.hasMate::after {
        content: '';
        position: absolute;
        left: 2em;
        right: 2em;
        top: 15px;
        border-top: 2px solid #ccc;
        z-index: 1;
    }
    .node.hasMate .person:last-child {
        margin-left: 1em;
    }

    .landscape {
        transform: rotate(-90deg);
        padding: 0 4em;
    }
    .landscape .node {
        text-align: left;
        height: 8em;
        width: 8em;
    }
    .landscape .person {
        position: relative;
        transform: rotate(90deg);
        padding-left: 4.5em;
        height: 4em;
        top: 4em;
        left: -1em;
    }
    .landscape .person .avat {
        position: absolute;
        left: 0;
    }
    .landscape .person .name {
        height: 4em;
        line-height: 4em;
    }
    .landscape .hasMate {
        position: relative;
    }
    .landscape .hasMate .person {
        position: absolute;
    }
    .landscape .hasMate .person:first-child {
        left: auto;
        right: -4em;
    }
    .landscape .hasMate .person:last-child {
        left: -4em;
        margin-left: 0;
    }

    .tips {
        padding: 10px;
    }
    /* .el-dialog__body {
        padding: 30px 25px;
        p {
            margin-bottom: 15px;
        }
    }
    .el-dialog__headerbtn {
        top: 30px;
        right: 30px;
    } */
}
.el-popover {
    .el-button {
        padding: 8px !important;
        margin-left: 5px !important;
        float: left;
    }
}
.el-drawer__body {
    .list {
        height: 100%;
        overflow: auto;
        ul {
            li {
                padding: 10px 15px;
                border-bottom: 1px solid #eee;
            }
        }
    }
}
</style>