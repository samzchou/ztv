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
                            <i :class="'my-icon-'+menu.icon" v-if="menu.icon" />
                            <span slot="title">{{menu.title}}</span>
                        </template>
                        <el-menu-item v-for="(subMenu,sidx) in menu.children" :key="idx+'-'+sidx" :index="idx+'-'+sidx" @click="goPath(subMenu, idx+'-'+sidx)">
                            <i :class="'my-icon-'+subMenu.icon" v-if="subMenu.icon" />
                            <span>{{subMenu.title}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-scrollbar>
        </div>
    </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    computed: {
        ...mapState(['sidebar', 'serviceList', 'user', 'collectionData']),
    },
    watch: {
        '$route': 'setRouter',
        serviceList: {
            handler(list) {
                //console.log('serviceList', list)
                this.menuList = _.cloneDeep(list); //this.$global.toTree([...list]);
            },
            immediate: true
        }
    },
    data: () => ({
        isCollapse: false,
        menuList: [],
        activeIndex: "",
    }),
    methods: {
        ...mapActions(['ASYNC_GET_SERVICE']),
        ...mapMutations(['SET_CURRPAGE']),
        setRouter() {
            this.activeIndex = '';
            let pathArr = this.$route.path.split('/');
            if (!pathArr[0]) {
                pathArr.splice(0, 1);
            }
            //console.log('setRouter', this.$route.path, this.collectionData['service']);
            let pageItem = _.find(this.collectionData['service'], {"page_url":this.$route.path});
            //console.log('pageItem', pageItem);
            this.SET_CURRPAGE(pageItem);

            let pIndex = _.findIndex(this.menuList, { "name": pathArr[0] });
            if (!!~pIndex) {
                this.activeIndex += pIndex;
                let menu = this.menuList[pIndex];
                if (menu.children && menu.children.length) {
                    let childIndex = _.findIndex(menu.children, { "name": pathArr[1] });
                    if (!!~childIndex) {
                        this.activeIndex += '-' + childIndex;
                    }
                }
            }
            //console.log('this.activeIndex', this.activeIndex)
        },
        goPath(subMenu, index) {
            //console.log('goPath', subMenu, index);
            this.SET_CURRPAGE(subMenu);
            this.$router.push(subMenu.page_url);
        }
    },
    beforeMount() {
        this.ASYNC_GET_SERVICE();
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
                font-size: 12px;
                i {
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
