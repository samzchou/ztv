<template>
    <section class="aside-container">
        <div class="title">
            <div class="logo" :class="{'mini':!sidebar.opened}" />
        </div>
        <div class="content">
            <el-scrollbar class="scrollbar">
                <el-menu :collapse="!sidebar.opened" :default-active="activeIndex">
                    <el-submenu v-for="(menu,idx) in menuList" :key="idx" :index="String(idx)">
                        <template slot="title">
                            <i :class="menu.icon" v-if="menu.icon" />
                            <span slot="title">{{menu.label}}</span>
                        </template>
                        <el-menu-item v-for="(subMenu,sidx) in menu.children" :key="idx+'-'+sidx" :index="idx+'-'+sidx" @click="goPath(subMenu.path, idx+'-'+sidx)">
                            <i :class="subMenu.icon" v-if="subMenu.icon" />
                            <span>{{subMenu.label}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-scrollbar>
        </div>
    </section>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
//import navMenu from '@/config/navMenu';
export default {
    watch: {
        '$route': 'setRouter'
    },
    computed: {
        ...mapState('admin', ['sidebar', 'navMenu']),
    },

    data: () => ({
        isCollapse: false,
        menuList: [],
        activeIndex: "",
    }),
    methods: {
        //...mapMutations(['UPDATE_PAGETITLE']),
        setRouter() {
            this.activeIndex = '';
            let pathArr = this.$route.path.split('/');
            if (!pathArr[0]) {
                pathArr.splice(0, 1);
            }
            let pIndex = _.findIndex(this.navMenu, { "name": pathArr[0] });
            if (!!~pIndex) {
                this.activeIndex += pIndex;
                let menu = this.navMenu[pIndex];
                if (menu.children && menu.children.length) {
                    let childIndex = _.findIndex(menu.children, { "name": pathArr[1] });
                    if (!!~childIndex) {
                        this.activeIndex += '-' + childIndex;
                    }
                }
            }
            //console.log('this.activeIndex', this.activeIndex)
        },
        goPath(path, index) {
            this.$router.push(path);
        }
    },
    beforeMount() {
        this.menuList = this.navMenu;
    },
    mounted() {
        this.setRouter();
    }
}
</script>

<style lang="scss" scoped>
.aside-container {
    width: calc(100% - 5px);
    height: 100%;
    background-color: #e5ebf5;
    .title {
        height: 50px;
        box-shadow: 0 1px 4px rgba(18, 72, 90, 0.12);
        border-bottom: 1px solid #d4dee1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #51627f;
        .logo {
            width: 150px;
            height: 35px;
            background-image: url(/images/logo.png);
            background-repeat: no-repeat;
            background-position: 10px 0px;
            background-size: contain;
            &.mini {
                width: 55px;
                background-position: 16px 0;
                background-size: cover;
            }
        }
    }
    .content {
        height: calc(100% - 50px);
        box-sizing: border-box;
        //padding: 15px;
        .scrollbar {
            height: calc(100% - 20px);
            /deep/ .el-scrollbar__wrap {
                overflow-x: hidden;
                //margin-right:0 !important;
                .el-menu--collapse {
                    width: auto;
                }
            }
        }
        /deep/ .el-menu {
            border: 0;
            background-color: transparent;
            .el-submenu__title {
                font-weight: bold;
                height: 50px;
                line-height: 50px;
                transition: all 0.2s;
                color: #666;
                .el-submenu__icon-arrow {
                    right: 40px;
                }
            }
            .el-menu-item {
                height: 36px;
                line-height: 36px;
                min-width: auto;
                //font-size: 12px;
                i {
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
