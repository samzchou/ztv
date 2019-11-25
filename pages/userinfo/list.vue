<template>
    <section class="userlist-container">
        <div class="forms">
            <div class="left">
                <div class="title">员工列表（根据用户所辖组织机构列出数据；如是超级管理员可列出全部）</div>
            </div>
            <div class="right">
                <search-input :visible.sync="searchShow" :value="searchKey" placeholder="关键字查询" size="mini" width="150px" @change="changeKey"
                />
                <el-button type="text" icon="el-icon-user" @click="addNew" style="margin-left:10px;">新增员工</el-button>
            </div>
        </div>
        <div class="tables">
            <el-table size="mini" v-loading="listLoading" :data="listData.slice((query.page-1)*query.size, query.page*query.size)" stripe
                border highlight-current-row fit max-height="500" style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="80" />
                <el-table-column prop="username" label="用户账号" width="120" />
                <el-table-column prop="name" label="姓名" width="100" />
                <el-table-column prop="sex" label="性别" width="80">
                    <template slot-scope="scope">
                        {{getSexName(scope.row.sex)}}
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="联系电话" width="150" />
                <el-table-column prop="mail" label="邮箱地址" width="150" />
                <el-table-column prop="org" label="部门">
                    <template slot-scope="scope">
                        {{getOrgName(scope.row.org)}}
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="备注说明" />
                <el-table-column label="操作" fixed="right" align="center" width="130">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" icon="el-icon-edit" @click="editItem(scope.row)">编辑
                        </el-button>
                        <el-button type="text" size="mini" icon="el-icon-remove" @click="removeItem(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages">
            <el-pagination size="mini" :total="total" :current-page="query.page" :page-sizes="[20, 30, 50, 100]" @size-change="handleSizeChange"
                @current-change="currentChange" layout="total, sizes, prev, pager, next, jumper" />
        </div>
        <div>
            <sam-element :data="fieldData" />
        </div>
        <!--右側側滑面板 新增员工-->
        <el-drawer size="mini" :title="editUser?'编辑员工':'新增员工'" :visible.sync="drawerShow" direction="rtl" :before-close="handleClose"
            append-to-body :wrapperClosable="false">
            <el-tabs tab-position="left">
                <el-tab-pane label="手动录入">
                    <add-form :editUser="editUser" :isVisible="drawerShow" />
                </el-tab-pane>
                <el-tab-pane label="批量导入">
                    <import-form />
                </el-tab-pane>
            </el-tabs>
        </el-drawer>
    </section>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex';
import searchInput from '~/components/searchInput';
import addForm from './addForm';
import importForm from './importForm';

import samElement from '~/components/form';
export default {
    computed: {
        ...mapState('userinfo', ['collections', 'orgList', 'sexList']),
    },
    components: {
        searchInput, addForm, importForm, samElement
    },
    watch: {
        /* searchKey(val){
            this.listData = this.sourceData.map(item=>{
                if(item.username.includes(val) || item.name.includes(val) || item.mobile.includes(val) || item.mail.includes(val)){
                    return item;
                }
            })
        } */
    },
    data() {
        return {
            fieldData: {
                component: "sam-input",
                type: "text",
                value: "test"
            },
            searchShow: false,
            searchKey: '',
            listLoading: false,
            sourceData: [],
            listData: [],
            total: 0,
            query: {
                page: 1,
                size: 30
            },
            drawerShow: false,
            editUser: null,
        }
    },
    methods: {
        changeKey(val) {
            debugger
            this.searchKey = val;
        },
        getOrgName(id) {
            let str = "";
            /* debugger
            if (id) {
                let obj = _.find(this.orgList, { "id": id });
                str = obj.label;
            } */
            return str;
        },
        getSexName(id) {
            let str = "";
            if (id) {
                let obj = _.find(this.sexList, { "id": id });
                str = obj.label;
            }
            return str;
        },
        // 关闭侧滑框
        handleClose() {
            this.editUser = null;
            this.setPasswrod = false;
            this.drawerShow = false;
        },
        addNew() {
            this.setPasswrod = true;
            this.drawerShow = true;
            this.$nextTick(() => {
                //this.$refs['scrollbar'].update();
            })
        },
        editItem(row) {
            this.ruleForm = { ...row };
            this.editUser = row;
            this.setPasswrod = false;
            this.drawerShow = true;
            /* this.$nextTick(() => {
                this.$refs['ruleForm'].clearValidate();
            }) */
        },
        removeItem(row) {
            this.$confirm('确定删除该用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let condition = {
                    type: 'removeData',
                    collectionName: 'user',
                    data: { id: row.id }
                };
                this.$axios.$post('mock/db', { data: condition }).then(result => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList();
                });
            }).catch(() => { });
        },
        currentChange(page) {
            this.query.page = page;
        },
        handleSizeChange(size) {
            this.query.page = 1;
            this.query.size = size;
        },
        async getList(match = {}) {
            this.listLoading = true;
            let condition = {
                type: 'listData',
                collectionName: 'user',
                data: match
            };

            let result = await this.$axios.$post('mock/db', { data: condition });
            console.log('getList', result);
            this.total = result.total;
            this.sourceData = result.list;
            this.listData = [...result.list];
            this.listLoading = false;
            this.editUser = null;
        },
    },
    mounted() {
        this.getList();
        console.log('collections', this.collections)
    }
}
</script>

<style lang="scss" scoped>
.userlist-container {
	background-color: #fff;
	border: 1px solid #ddd;
	margin: 15px;
	padding: 25px;
	.forms {
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* padding-bottom: 5px;
		border-bottom: 1px solid #eee;
		margin-bottom: 10px; */
		> div {
			display: flex;
			align-items: center;
		}
	}
	.pages {
		padding: 10px 0;
		display: flex;
		justify-content: flex-end;
	}
}
/deep/ .el-drawer {
	height: 100%;
	.el-drawer__header {
		margin-bottom: 0;
		padding: 10px 15px;
		border-bottom: 1px solid #ddd;
		> :first-child {
			font-size: 16px;
		}
	}
	.el-drawer__body {
		padding: 20px 20px 0 0;
		box-sizing: border-box;
		height: calc(100% - 50px);

		.el-tabs {
			height: 100%;
			.el-tabs__content {
				//width: 500px;
				height: 100%;
				overflow: hidden;
				.el-tab-pane {
					height: 100%;
					overflow: hidden;
				}
			}
		}
	}
}
</style>
