<template>
    <el-container class="app-layout">
        <el-aside width="250px" :class="{'collapse':!sidebar.opened}">
            <app-aside />
        </el-aside>
        <el-container>
            <el-header height="40">
                <app-header class="app-header" />
            </el-header>
            <el-main>
                <div class="main-content">
                    <transition name="page-enter">
                        <nuxt class="page-content page-enter-active" />
                    </transition>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<!-- pages/*.vue -->
<script>
import {
    mapState
} from 'vuex';
import appHeader from './admin-header';
import appAside from './admin-aside';
export default {
    components: {
        appHeader, appAside
    },
    computed: {
        ...mapState('admin',['sidebar']),
    },
    data: () => ({
        breadcrumb: [],
    })
}
</script>

<style lang="scss" scoped>
.app-layout {
	display: flex;
	height: 100%;
	.el-aside {
		transition: width 0.3s;
		overflow: hidden;
		background-color: #c8d4dc;
		box-sizing: border-box;
		border-right: 1px solid #adc0cc;
		&.collapse {
			width: 70px !important;
			.el-submenu__title {
				padding-left: 10px !important;
			}
		}
	}
	.el-header {
		padding: 0;
		height: 50px;
		background-color: #d4dce8;
		box-sizing: border-box;
		padding: 0 15px;
	}
	.el-main {
		padding: 0;
		overflow: hidden;
		.main-content {
			height: 100%;
            
		}
	}
}
</style>
