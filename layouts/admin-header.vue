<template>
    <section class="header-container">
        <div class="left">
            <i :class="sidebar.opened?'el-icon-s-fold':'el-icon-s-unfold'" :title="sidebar.opened?'收起导航':'展开导航'" @click="TOGGLE_SIDEBAR" />
            <div class="page-title">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>后台管理</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(page,index) in pageTitle" :key="index">{{page.label}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="right">
            <i class="avatar" style="background-image:url('/images/head_male.jpg')" />
            <span>{{user?user.name:''}}，您好！</span>
            <el-button type="text" icon="el-icon-switch-button" @click="logout">注销退出</el-button>
        </div>
    </section>
</template>

<script>
import {
    mapState, mapMutations
} from 'vuex';
export default {
    watch: {
        '$route': 'setRouter'
    },
    data: () => ({
        pageTitle: [],
    }),
    computed: {
        ...mapState(['user']),
        ...mapState('admin', ['sidebar', 'navMenu']),
    },
    methods: {
        ...mapMutations(['UPDATE_USER']),
		...mapMutations('admin', ['TOGGLE_SIDEBAR', 'UPDATE_MENUACTIVE']),
        setRouter() {
            console.log('this.$route.path', this.$route.path);
            let actIndex = '';
            this.pageTitle = [];
            let pathArr = this.$route.path.split('/');
            if (!pathArr[0]) {
                pathArr.splice(0, 2);
            }
            let pIndex = _.findIndex(this.navMenu, { "name": pathArr[0] });
            if (!!~pIndex) {
                let menu = this.navMenu[pIndex];
                actIndex += pIndex;
                this.pageTitle.push(menu);
                if (menu.children && menu.children.length) {
                    let childIndex = _.findIndex(menu.children, { "name": pathArr[1] });
                    if (!!~childIndex) {
                        actIndex += '-' + childIndex;
                        let child = menu.children[childIndex];
                        this.pageTitle.push(child);
                    }
                }
                this.UPDATE_MENUACTIVE(actIndex);
            }
        },
        logout() {
            this.$confirm('确定注销退出?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.UPDATE_USER(null);
                this.$cookies.set('token', '');
                this.$router.push('/login');
            }).catch(() => { });

        }
    },
    mounted() {
        this.setRouter();
    }
}
</script>

<style lang="scss" scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .left {
        display: flex;
        align-items: center;
        > i {
            font-size: 24px;
            color: #51627f;
            cursor: pointer;
            margin-right: 15px;
        }
        /deep/ .el-breadcrumb {
            font-size: 16px;
        }
    }
    .right {
        display: flex;
        align-items: center;
        .avatar {
            width: 30px;
            height: 30px;
            background-repeat: no-repeat;
            background-position: center;
            border-radius: 50%;
            background-size: cover;
            margin-right: 10px;
        }
    }
}
</style>
