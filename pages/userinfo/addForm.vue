/* eslint-disable */
<template>
    <div class="form-content">
        <el-scrollbar class="scrollbar" ref="scrollbar">
            <el-form
                size="mini"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
            >
                <el-form-item label="登录账号" prop="username">
                    <el-input
                        v-model="ruleForm.username"
                        clearable
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="ruleForm.password"
                        type="password"
                        :disabled="!setPasswrod"
                        clearable
                        show-password
                        autocomplete="off"
                        style="width: 145px;"
                    />
                    <el-button
                        v-if="editUser"
                        type="text"
                        icon="el-icon-lock"
                        @click="resetPasswrod"
                        >{{ setPasswrod ? '取消重置' : '重置密码' }}</el-button
                    >
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input
                        v-model="ruleForm.name"
                        clearable
                        style="width: 145px;"
                    />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio
                        v-model="ruleForm.sex"
                        v-for="sex in sexList"
                        :key="sex.id"
                        :label="sex.id"
                    >
                        {{ sex.label }}
                    </el-radio>
                </el-form-item>
                <el-form-item label="出生年月" prop="brithday">
                    <el-date-picker
                        v-model="ruleForm.brithday"
                        type="date"
                        placeholder="选择日期"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile">
                    <el-input
                        v-model="ruleForm.mobile"
                        clearable
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="邮箱地址" prop="mail">
                    <el-input
                        v-model="ruleForm.mail"
                        clearable
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="所属部门" prop="org">
                    <el-select
                        v-model="ruleForm.org"
                        placeholder="请选择部门"
                        clearable
                    >
                        <el-option
                            v-for="org in orgList"
                            :key="org.id"
                            :label="org.label"
                            :value="org.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="备注说明" prop="content">
                    <el-input
                        v-model="ruleForm.content"
                        type="textarea"
                        clearable
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="submitForm"
                        :icon="loading ? 'el-icon-loading' : ''"
                        :disabled="loading"
                        >{{ editUser ? '编辑保存' : '立即创建' }}</el-button
                    >
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'add-form',
    props: {
        editUser: Object,
        isVisible: {
            type: Boolean,
            default: false
        },
        orgList: [],
        sexList: []
    },

    watch: {
        isVisible(flag) {
            if (flag) {
                this.$nextTick(() => {
                    this.resetForm()
                })
            }
        },
        editUser: {
            handler(obj) {
                if (!_.isEmpty(obj)) {
                    this.ruleForm = _.cloneDeep(obj)
                }
            },
            immediate: true
        }
    },
    computed: {
        ...mapState('userinfo', ['collections', 'role'])
    },

    data() {
        return {
            loading: false,
            setPasswrod: false,
            ruleForm: {
                username: '',
                password: '',
                name: '',
                sex: 1,
                brithday: '',
                mobile: '',
                mail: '',
                org: '',
                content: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    {
                        min: 3,
                        max: 20,
                        message: '长度在 3 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, message: '长度至少在5个字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                mobile: [
                    {
                        required: true,
                        message: '请输入联系电话',
                        trigger: 'blur'
                    }
                ],
                mail: [
                    {
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change']
                    }
                ],
                brithday: [
                    {
                        required: true,
                        message: '请选择出生年月',
                        trigger: 'change'
                    }
                ],
                org: [
                    {
                        required: true,
                        message: '请选择机构部门',
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    methods: {
        resetPasswrod() {
            this.setPasswrod = !this.setPasswrod
            if (this.setPasswrod) {
                this.ruleForm.password = ''
            } else {
                this.ruleForm.password = this.editUser.password
            }
        },
        submitForm() {
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    this.loading = true
                    let condition = {
                        type: 'addData',
                        collectionName: 'user',
                        data: { ...this.ruleForm }
                    }
                    if (this.editUser) {
                        condition.type = 'updateData'
                        condition.updateDate = true
                        condition.data.id = this.editUser.id
                        if (this.ruleForm.password === this.editUser.password) {
                            delete condition.data.password
                        }
                    } else {
                        condition.data.createDate = new Date().getTime()
                    }

                    this.$axios
                        .$post('mock/db', { data: condition })
                        .then(result => {
                            this.$message.success(
                                this.editUser ? '编辑成功' : '新增成功'
                            )
                            this.drawerShow = false
                            this.loading = false
                            this.query.page = 1
                            this.getList()
                        })
                }
            })
        },
        resetForm() {
            this.$refs['ruleForm'].resetFields()
            this.$refs['ruleForm'].clearValidate()
        }
    },
    mounted() {
        this.resetForm()
        console.log('collections', this.collections)
    }
}
</script>

<style lang="scss" scoped>
.form-content {
    overflow: hidden;
    height: 100%;
    .scrollbar {
        width: 100%;
        height: 100%;
        /deep/ .el-scrollbar__wrap {
            overflow-x: hidden;
        }
    }
}
</style>
