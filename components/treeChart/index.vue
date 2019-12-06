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
                                    <div class="leader" v-if="treeData.id!==0">主管：{{getLeader(treeData.leaderId)}}</div>
                                </div>
                            </el-popover>
                            <div class="avat" :class="{'dept':!empList.length}" v-else>
                                <div>
                                    <span>{{treeData.dept_name}}</span>
                                    <span class="pos" v-if="empList.length">({{empList.length}})</span>
                                </div>
                                <div class="leader" v-if="treeData.id!==0">主管：{{getLeader(treeData.leaderId)}}</div>
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
        <el-dialog :title="isEdit?'编辑部门':'添加下级部门'" :visible.sync="dialogVisible" @close="clearDialog" :close-on-click-modal="false" append-to-body width="400px">
            <div class="tips">
                <el-form size="small" :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top">
                    <el-form-item label="部门名称" prop="dept_name">
                        <el-input placeholder="输入部门名称" :maxlength="32" v-model="ruleForm.dept_name" />
                    </el-form-item>
                    <el-form-item label="部门主管/领导" prop="leaderId">
                        <el-select v-model="ruleForm.leaderId" placeholder="请选择部门主管/领导" multiple filterable clearable style="width:100%">
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
                <div class="form">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" />
                    <div>
                        转到其他部门待完善
                        <!-- <el-cascader size="mini" placeholder="转到部门" v-model="deptValue" :options="dop" :props="{ expandTrigger: 'hover' }" /> -->
                    </div>
                </div>
                <el-checkbox-group v-model="checkedEmps" @change="handleCheckedChange">
                    <el-checkbox v-for="emp in empList" :key="emp.id" :label="emp.id">
                        <span>{{emp.name}}</span>
                    </el-checkbox>
                </el-checkbox-group>
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
                ///console.log('Props', Props)
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
            checkAll: false,
            isIndeterminate: true,
            checkedEmps: [],
            deptOptions: [],
            deptValue: "",
            loading: false,
            treeData: {},
            dialogVisible: false, // 添加股东弹框
            isEdit: 0, // 是否编辑 0 新增 1 编辑
            empList: [], // 员工总数
            visibleEmp: false,
            ruleForm: {
                dept_name: "",
                leaderId: [],
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
        handleCheckAllChange() {

        },
        handleCheckedChange() {

        },
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
            this.$forceUpdate(); ids
        },
        // 获取主管
        getLeader(ids) {
            let arr = [];
            this.userList.forEach(item => {
                if (ids.includes(item.id)) {
                    arr.push(item.name)
                }
            });
            return arr.length ? arr.join(",") : "无指定";
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
            let flag = true, error = '', msg = "确定要删除该部门?";
            if (this.treeData.children && this.treeData.children.length) {
                error = "该部门下有下级子部门，请先删除下级部门";
                flag = false;
            }
            if (this.empList.length) {
                msg += "该部门下有" + this.empList.length + "个员工";
                //flag = false;
            }
            if (!flag) {
                this.$alert(error);
                return;
            }

            this.$confirm(msg, '提示', {
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
            //console.log('condition', this.treeData, condition);
            //return;

            this.$axios.$post('mock/db', { "data": condition }).then(res => {
                if (res) {
                    //console.log('sendData', res)
                    if (res === true) { // 做更新
                        this.treeData = { ...data }; //_.merge(this.treeData, data);
                    } else { // 新增
                        data.id = res.id;
                        if (this.treeData.children) {
                            this.treeData.children.push(data);
                        } else {
                            this.treeData.children = [data];
                        }
                    }
                    this.$message.success("保存成功");
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
        // 获取员工
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
@import './style';
</style>