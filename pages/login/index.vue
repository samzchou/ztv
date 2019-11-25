<template>
    <div class="login-container">
        <h3>
            <img src="/images/logo.png" />
            <span>信息管理系统</span>
        </h3>
        <div>
            <el-form size="small" label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" @keyup.native.enter="submitForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="margin-top:10px">
                        <el-button type="primary" @click="submitForm" :icon="isLogin?'el-icon-loading':'el-icon-d-arrow-right'" :disabled="isLogin">
                            {{isLogin?'正在验证账号':'验证登录'}}
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ app, route }) {
        let prev_path = route.query.prev_path || '/';
        return {
            prev_path
        }
    },
    data: () => ({
        isLogin: false,
        ruleForm: {
            username: 'admin',
            password: 'admin123456'
        },
        rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],

            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ]
        }
    }),
    methods: {
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.isLogin = true;
                    this.$axios.$post('mock/db', {
                        data: {
                            token: false,
                            type: 'login',
                            collectionName: 'employee',
                            data: this.ruleForm
                        }
                    }).then(result => {
                        this.isLogin = false;
                        if (result) {
                            this.$store.commit('UPDATE_USER', result);
                            this.$cookies.set('token', result.token, '1m', '/');
                            if (this.prev_path && this.prev_path.indexOf('http') === 0) {
                                location.href = this.prev_path;
                            } else {
                                this.$router.replace(this.prev_path);
                            }
                        }
                    })
                }
            });
        }
    },
    layout: "empty"
}
</script>

<style lang="scss" scoped>
.login-container {
    height: 100%;
    width: 100%;
    background-image: url('/images/login-bg.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > h3 {
        height: 40px;
        display: flex;
        align-items: center;
        margin: 10px 0;
        > img {
            height: 100%;
        }
        > span {
            font-size: 21px;
            color: #fff;
        }
    }
    > div {
        //min-height: 300px;
        width: 400px;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.75);
        box-sizing: border-box;
        box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        /deep/ .el-form {
            background-color: #fff;
            padding: 25px 30px;
            border-radius: 5px;
            .el-form-item__label {
                line-height: 24px;
                height: 24px;
            }
        }
    }
}
</style>
